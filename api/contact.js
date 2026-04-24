const FIVE_MINUTES_SECONDS = 300;
const MIN_FORM_FILL_MS = 2500;

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(payload));
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return (
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const checkRateLimit = async (ip) => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return { allowed: true, mode: 'disabled' };
  }

  const key = `contact:ip:${ip}`;
  const endpoint = `${url}/set/${encodeURIComponent(key)}/1?EX=${FIVE_MINUTES_SECONDS}&NX=true`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return { allowed: true, mode: 'failed-open' };
  }

  const data = await response.json();
  return { allowed: data.result === 'OK', mode: 'upstash' };
};

const sendEmail = async ({ nombre, email, mensaje, ip }) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !to || !from) {
    throw new Error('Missing email env vars');
  }

  const subject = `Nuevo contacto desde portfolio: ${nombre}`;
  const text = [
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    `IP: ${ip}`,
    '',
    'Mensaje:',
    mensaje
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text
    })
  });

  if (!response.ok) {
    throw new Error('Resend request failed');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { message: 'Método no permitido.' });
  }

  try {
    const { nombre, email, mensaje, empresa, contact_ts } = req.body || {};

    if (empresa) {
      return json(res, 200, { message: 'OK' });
    }

    const startedAt = Number(contact_ts);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_FILL_MS) {
      return json(res, 400, { message: 'Verificación anti-spam no superada.' });
    }

    const cleanNombre = String(nombre || '').trim();
    const cleanEmail = String(email || '').trim();
    const cleanMensaje = String(mensaje || '').trim();

    if (!cleanNombre || !cleanEmail || !cleanMensaje) {
      return json(res, 400, { message: 'Faltan campos obligatorios.' });
    }

    if (cleanNombre.length > 120 || cleanMensaje.length > 2000) {
      return json(res, 400, { message: 'El contenido es demasiado largo.' });
    }

    if (!isValidEmail(cleanEmail)) {
      return json(res, 400, { message: 'Email no válido.' });
    }

    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return json(res, 429, {
        message: 'Solo se permite 1 mensaje cada 5 minutos. Inténtalo de nuevo más tarde.'
      });
    }

    await sendEmail({
      nombre: cleanNombre,
      email: cleanEmail,
      mensaje: cleanMensaje,
      ip
    });

    return json(res, 200, { message: 'Mensaje enviado correctamente.' });
  } catch (_error) {
    return json(res, 500, {
      message: 'No se pudo procesar el envío. Inténtalo más tarde.'
    });
  }
}
