import { useState, useEffect } from 'react';
import RetroDecorations from '../../components/RetroDecorations';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: 'Hola, soy Lucas',
            subtitle: 'Desarrollador Web apasionado',
            cta: 'Ver mis trabajos',
            ctaLink: '#proyectos',
        },
        {
            title: '¿Quién soy?',
            subtitle: 'Estudiante de DAW apasionado por la programación y la tecnología',
            cta: 'Conóceme mejor',
            ctaLink: '#sobre-mi',
        },
        {
            title: '¿Tienes un proyecto?',
            subtitle: 'Estoy disponible para nuevas oportunidades',
            cta: 'Hablemos',
            ctaLink: '#contacto',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => setCurrentSlide(index);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const slide = slides[currentSlide];

    return (
        <section id="inicio" className="group retro-bg-circuit relative min-h-[92vh] flex items-center justify-center overflow-hidden text-violet-50">
            {/* Fondo animado */}
            <div className="absolute inset-0 opacity-90">
                <div className="absolute top-10 left-10 w-72 h-72 bg-violet-500/18 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400/14 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_42%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.06)_95%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.06)_95%)] bg-[length:26px_26px] opacity-25 animate-pulse"></div>
                <div className="absolute top-16 right-[12%] h-16 w-16 border border-emerald-300/30 bg-emerald-300/10 rotate-12 animate-floatGlow"></div>
                <div className="absolute bottom-24 left-[14%] h-10 w-10 border border-violet-300/40 bg-violet-300/10 -rotate-12 animate-floatGlow" style={{ animationDelay: '1.2s' }}></div>
                <RetroDecorations variant="rain" />
            </div>

            <div className="container-custom relative z-10 text-center text-amber-50 animate-slideInUp max-w-5xl">
                <div className="retro-card bg-[#08050d]/78 border-violet-200/15 py-12 md:py-16 px-6 md:px-10">
                    <h1 className="text-4xl md:text-7xl font-black mb-4 leading-tight tracking-[0.08em]">
                        {slide.title.split(' ').map((word, idx) => (
                            <span key={idx}>
                                {word === 'Lucas' ? <span className="text-emerald-300">{word}</span> : word}
                                {idx < slide.title.split(' ').length - 1 ? ' ' : ''}
                            </span>
                        ))}
                    </h1>

                    <p className="text-lg md:text-2xl mb-8 text-amber-100/85 opacity-90">{slide.subtitle}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <a href={slide.ctaLink} className="btn-primary inline-block">
                            {slide.cta}
                        </a>
                        <a href="/Proyecto_Portfolio_Profesional_UI.pdf" download className="btn-secondary inline-block">
                            Descargar CV
                        </a>
                    </div>

                    {/* Controles del carousel */}
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full transition text-2xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-100 hover:bg-emerald-300/20"
                        >
                            ❮
                        </button>

                        <div className="flex gap-3">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`h-3 rounded-full transition ${idx === currentSlide ? 'bg-emerald-300 w-8' : 'bg-violet-100/30 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full transition text-2xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-100 hover:bg-emerald-300/20"
                        >
                            ❯
                        </button>
                    </div>
                </div>
            </div>

            {/* Indicador de scroll */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
