import RetroDecorations from '../../components/RetroDecorations';

export default function Certifications() {
    const certifications = [
        {
            issuer: 'IBM',
            title: 'Curso de Desarrollo de Software e IA',
            description: 'Formación especializada en principios de desarrollo de software y aplicaciones de inteligencia artificial. Adquisición de conocimientos en metodologías modernas de desarrollo.',
            year: '2025',
        },
    ];

    return (
        <section id="certificaciones" className="group retro-section retro-bg-grid text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="squares" />
                <h2 className="section-title retro-title">Certificaciones y Logros</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {certifications.map((certification) => (
                        <article key={certification.title} className="retro-card flex gap-5 items-start">
                            <div className="retro-badge shrink-0">
                                <span>{certification.issuer}</span>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-emerald-200">{certification.title}</h3>
                                <p className="text-violet-100/80 mb-3 leading-relaxed">{certification.description}</p>
                                <span className="inline-flex px-3 py-1 rounded-full border border-amber-300/30 text-amber-200 text-xs uppercase tracking-[0.2em]">
                                    {certification.year}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}