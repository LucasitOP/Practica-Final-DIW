import { useEffect, useRef, useState } from 'react';
import RetroDecorations from '../../components/RetroDecorations';

export default function Contact() {
    const turnstileContainerRef = useRef(null);
    const turnstileWidgetIdRef = useRef(null);
    const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        empresa: '',
        website: '',
        contact_ts: String(Date.now()),
        mensaje: '',
    });
    const [turnstileToken, setTurnstileToken] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!turnstileSiteKey || turnstileWidgetIdRef.current !== null || typeof window === 'undefined') {
            return undefined;
        }

        const renderWidget = () => {
            if (!turnstileContainerRef.current || !window.turnstile) {
                return;
            }

            turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
                sitekey: turnstileSiteKey,
                theme: 'dark',
                callback: (token) => setTurnstileToken(token),
                'error-callback': () => setTurnstileToken(''),
                'expired-callback': () => setTurnstileToken(''),
            });
        };

        if (window.turnstile) {
            renderWidget();
            return undefined;
        }

        const scriptId = 'cloudflare-turnstile-script';
        const existingScript = document.getElementById(scriptId);

        if (existingScript) {
            existingScript.addEventListener('load', renderWidget, { once: true });
            return () => existingScript.removeEventListener('load', renderWidget);
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = renderWidget;
        document.head.appendChild(script);

        return () => {
            script.onload = null;
        };
    }, [turnstileSiteKey]);

    const resetTurnstile = () => {
        setTurnstileToken('');

        if (window.turnstile && turnstileWidgetIdRef.current !== null) {
            try {
                window.turnstile.reset(turnstileWidgetIdRef.current);
            } catch (_error) {
                // noop
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    contact_ts: formData.contact_ts,
                    cf_turnstile_token: turnstileToken,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setStatus({ type: 'success', message: '¡Mensaje enviado correctamente!' });
                setFormData({ nombre: '', email: '', empresa: '', website: '', contact_ts: String(Date.now()), mensaje: '' });
                resetTurnstile();
            } else {
                setStatus({ type: 'error', message: data.message || 'Error al enviar el mensaje. Intenta de nuevo.' });
                resetTurnstile();
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Error de conexión. Intenta de nuevo.' });
            resetTurnstile();
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contacto" className="group retro-section retro-bg-circuit text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="squares" />
                <h2 className="section-title retro-title">Contacto</h2>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Información de contacto */}
                    <div className="animate-slideInUp space-y-8 retro-card">
                        <div>
                            <h3 className="text-2xl font-bold text-emerald-200 mb-4">¿Tienes un proyecto?</h3>
                            <p className="text-violet-100/80 text-lg leading-relaxed">
                                Estoy disponible para colaborar en nuevos proyectos. No dudes en contactarme para discutir tus ideas.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-300/10 rounded-lg flex items-center justify-center text-emerald-200 text-xl border border-emerald-300/20">
                                    📧
                                </div>
                                <div>
                                    <h4 className="font-semibold text-violet-100 mb-1">Email</h4>
                                    <a href="mailto:lucas.timoc1@gmail.com" className="text-emerald-200 hover:text-violet-100 transition">
                                        lucas.timoc1@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-300/10 rounded-lg flex items-center justify-center text-emerald-200 text-xl border border-emerald-300/20">
                                    💼
                                </div>
                                <div>
                                    <h4 className="font-semibold text-violet-100 mb-1">LinkedIn</h4>
                                    <a href="https://linkedin.com" className="text-emerald-200 hover:text-violet-100 transition" target="_blank" rel="noopener noreferrer">
                                        /in/lucastimoc
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-300/10 rounded-lg flex items-center justify-center text-emerald-200 text-xl border border-emerald-300/20">
                                    🐙
                                </div>
                                <div>
                                    <h4 className="font-semibold text-violet-100 mb-1">GitHub</h4>
                                    <a href="https://github.com" className="text-emerald-200 hover:text-violet-100 transition" target="_blank" rel="noopener noreferrer">
                                        /lucastimoc
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <form onSubmit={handleSubmit} className="retro-card animate-slideInUp">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="nombre" className="retro-label">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    className="retro-input"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="retro-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="retro-input"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="empresa" className="retro-label">
                                    Empresa (opcional)
                                </label>
                                <input
                                    type="text"
                                    id="empresa"
                                    name="empresa"
                                    value={formData.empresa}
                                    onChange={handleChange}
                                    className="retro-input"
                                    placeholder="Tu empresa"
                                />
                            </div>

                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                autoComplete="off"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="hidden"
                            />

                            <input type="hidden" name="contact_ts" value={formData.contact_ts} />

                            {turnstileSiteKey && (
                                <div className="space-y-3">
                                    <p className="text-sm text-violet-100/75">
                                        Completa la verificación para enviar el mensaje.
                                    </p>
                                    <div ref={turnstileContainerRef} className="overflow-hidden rounded-2xl border border-violet-200/15 p-2 bg-black/30" />
                                </div>
                            )}

                            {!turnstileSiteKey && (
                                <p className="text-sm text-violet-100/60">
                                    El captcha se activa cuando configures <span className="text-emerald-200">VITE_TURNSTILE_SITE_KEY</span>.
                                </p>
                            )}

                            <div>
                                <label htmlFor="mensaje" className="retro-label">
                                    Mensaje
                                </label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="retro-input resize-none min-h-32"
                                    placeholder="Tu mensaje..."
                                ></textarea>
                            </div>

                            {status && (
                                <div
                                    className={`p-4 rounded-lg border ${status.type === 'success'
                                        ? 'bg-emerald-300/10 text-emerald-100 border-emerald-300/20'
                                        : 'bg-violet-300/10 text-violet-100 border-violet-300/20'
                                        }`}
                                >
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || (turnstileSiteKey ? !turnstileToken : false)}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
