(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('contact-status');
  const submitBtn = document.getElementById('contact-submit');
  const tsInput = document.getElementById('contact_ts');

  if (tsInput) {
    tsInput.value = String(Date.now());
  }

  const showStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('is-error', 'is-success', 'is-loading');
    if (type) statusEl.classList.add(type);
  };

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      nombre: String(formData.get('nombre') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      mensaje: String(formData.get('mensaje') || '').trim(),
      empresa: String(formData.get('empresa') || '').trim(),
      contact_ts: String(formData.get('contact_ts') || '').trim(),
      cf_turnstile_token: String(formData.get('cf-turnstile-response') || '').trim()
    };

    if (!payload.nombre || !payload.email || !payload.mensaje) {
      showStatus('Completa los campos obligatorios.', 'is-error');
      return;
    }

    submitBtn.disabled = true;
    showStatus('Enviando mensaje…', 'is-loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        showStatus(data.message || 'No se pudo enviar el mensaje.', 'is-error');
        return;
      }

      form.reset();
      if (tsInput) {
        tsInput.value = String(Date.now());
      }
      showStatus('Mensaje enviado correctamente. Gracias por contactar.', 'is-success');
    } catch (_error) {
      showStatus('Error de red. Inténtalo más tarde.', 'is-error');
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
