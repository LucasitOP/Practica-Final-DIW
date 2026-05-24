import RetroDecorations from '../../components/RetroDecorations';

export default function Stats() {
    const stats = [
        { number: '2+', label: 'Proyectos Completados', description: 'Aplicaciones web y herramientas desarrolladas' },
        { number: '9+', label: 'Tecnologías Dominadas', description: 'Frontend, backend y bases de datos' },
        { number: '1', label: 'Certificación IBM', description: 'Software Development & AI Fundamentals' },
        { number: '3+', label: 'Años de Experiencia', description: 'Desde 2017 con servidor privado Nostale' },
    ];

    return (
        <section id="estadisticas" className="group retro-section retro-bg-grid text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="rain" />
                <h2 className="section-title retro-title">Logros Destacados</h2>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <article key={stat.label} className="retro-card text-center">
                            <div className="text-5xl md:text-6xl font-black text-emerald-200 mb-3 tracking-tight">{stat.number}</div>
                            <h3 className="text-xl font-bold mb-2 text-violet-50">{stat.label}</h3>
                            <p className="text-violet-100/80 text-sm leading-relaxed">{stat.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}