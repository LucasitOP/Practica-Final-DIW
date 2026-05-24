import RetroDecorations from '../../components/RetroDecorations';

export default function Experience() {
    const timeline = [
        {
            date: '2024 - 2026',
            title: 'Grado Superior en Desarrollo de Aplicaciones Web',
            description: 'CFGS 2º DAW • Estudiante de 2º curso especializado en desarrollo web full-stack, aplicaciones de escritorio y diseño de interfaces profesionales.',
        },
        {
            date: '2025',
            title: 'Curso IBM: Desarrollo de Software e IA',
            description: 'Certificación en principios de desarrollo de software y aplicaciones de inteligencia artificial, completado con éxito.',
        },
        {
            date: '2017 - 2019',
            title: 'Servidor Privado Nostale - Proyecto Personal',
            description: 'Desarrollo de un servidor privado de Nostale junto con amigos. Experiencia en gestión de bases de datos con Navicat, scripting, administración de servidores y trabajo colaborativo.',
        },
    ];

    return (
        <section id="experiencia" className="group retro-section retro-bg-void text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="squares" />
                <h2 className="section-title retro-title">Trayectoria Académica</h2>

                <div className="retro-timeline">
                    {timeline.map((item) => (
                        <article key={item.title} className="retro-timeline-item">
                            <div className="retro-timeline-marker" />
                            <div className="retro-card">
                                <div className="text-emerald-200 uppercase tracking-[0.2em] text-xs mb-2">{item.date}</div>
                                <h3 className="text-2xl font-bold mb-3 text-violet-50">{item.title}</h3>
                                <p className="text-violet-100/80 leading-relaxed">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}