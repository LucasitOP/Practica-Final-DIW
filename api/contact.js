const FIVE_MINUTES_SECONDS = 300;
const MIN_FORM_FILL_MS = 2500;
const FIVE_MINUTES_MS = FIVE_MINUTES_SECONDS * 1000;
const localRateLimitStore = new Map();

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

const checkLocalRateLimit = (ip) => {
  const now = Date.now();

  for (const [key, expiresAt] of localRateLimitStore.entries()) {
    if (expiresAt <= now) {
      localRateLimitStore.delete(key);
    }
  }

  const key = `contact:ip:${ip}`;
  const currentExpiry = localRateLimitStore.get(key) || 0;

  if (currentExpiry > now) {
    return {
      allowed: false,
      mode: 'memory',
      retryAfterSeconds: Math.ceil((currentExpiry - now) / 1000)
    };
  }

  localRateLimitStore.set(key, now + FIVE_MINUTES_MS);
  return { allowed: true, mode: 'memory', retryAfterSeconds: 0 };
};

const checkRateLimit = async (ip) => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return checkLocalRateLimit(ip);
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
    return checkLocalRateLimit(ip);
  }

  const data = await response.json();
  if (data.result === 'OK') {
    return { allowed: true, mode: 'upstash', retryAfterSeconds: 0 };
  }

  const ttlEndpoint = `${url}/ttl/${encodeURIComponent(key)}`;
  const ttlResponse = await fetch(ttlEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  let retryAfterSeconds = FIVE_MINUTES_SECONDS;
  if (ttlResponse.ok) {
    const ttlData = await ttlResponse.json().catch(() => null);
    const ttlValue = Number(ttlData?.result);
    if (Number.isFinite(ttlValue) && ttlValue > 0) {
      retryAfterSeconds = ttlValue;
    }
  }

  return { allowed: false, mode: 'upstash', retryAfterSeconds };
};

const verifyTurnstileToken = async ({ token, ip }) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { enabled: false, ok: true };
  }

  if (!token) {
    return { enabled: true, ok: false };
  }

  const params = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip
  });

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!response.ok) {
    return { enabled: true, ok: false };
  }

  const data = await response.json().catch(() => null);
  return { enabled: true, ok: Boolean(data?.success) };
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
    const { nombre, email, mensaje, empresa, contact_ts, cf_turnstile_token } = req.body || {};

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
    const captchaCheck = await verifyTurnstileToken({
      token: String(cf_turnstile_token || '').trim(),
      ip
    });

    if (!captchaCheck.ok) {
      return json(res, 400, {
        message: captchaCheck.enabled
          ? 'Captcha inválido o ausente. Inténtalo de nuevo.'
          : 'No se pudo verificar el captcha.'
      });
    }

    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.allowed) {
      res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds || FIVE_MINUTES_SECONDS));
      return json(res, 429, {
        message: `Solo se permite 1 mensaje cada 5 minutos. Espera ${rateLimit.retryAfterSeconds || FIVE_MINUTES_SECONDS}s e inténtalo de nuevo.`
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
