import RetroDecorations from '../../components/RetroDecorations';

export default function Interests() {
    const interests = [
        {
            title: '🎮 Videojuegos',
            description: 'Apasionado por los videojuegos desde una edad temprana. Más allá del entretenimiento, me han enseñado resolución de problemas, trabajo en equipo y pensamiento estratégico.',
        },
        {
            title: '💻 Modding & Desarrollo en Nostale',
            description: 'Comencé mi viaje en programación (2017-2019) desarrollando un servidor privado de Nostale junto con amigos. Usé Navicat para bases de datos, scripts y administración del proyecto.',
        },
        {
            title: '🚀 Innovación Tecnológica',
            description: 'Entusiasta de nuevas tecnologías y tendencias. Me interesa especialmente cómo la IA está transformando el desarrollo web y la creación de experiencias digitales únicas.',
        },
    ];

    return (
        <section id="intereses" className="group retro-section retro-bg-neon text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="rain" />
                <h2 className="section-title retro-title">Intereses y Pasiones</h2>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {interests.map((interest) => (
                        <article key={interest.title} className="retro-card">
                            <h3 className="text-2xl font-bold mb-4 text-emerald-200">{interest.title}</h3>
                            <p className="text-violet-100/80 leading-relaxed">{interest.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}