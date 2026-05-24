import RetroDecorations from '../../components/RetroDecorations';

export default function Projects() {
    const projects = [
        {
            title: 'Buscador de Campeones de League of Legends',
            description: 'Frontend estático que consume la API Data Dragon de Riot para mostrar información detallada de campeones.',
            tech: ['HTML', 'CSS', 'JavaScript', 'API REST'],
            image: '/img/buscadorLol.jpg',
            link: 'https://github.com/LucasitOP/buscadorLeagueOfLegendsPractica',
        },
        {
            title: 'Amigo Invisible APP',
            description: 'Aplicación CLI en Java para organizar un amigo invisible pensada para alumnos de 2º DAW.',
            tech: ['Java', 'CLI', 'Navicat', 'MySQL'],
            image: '/img/amigoInvisible.jpg',
            link: 'https://github.com/LucasitOP/amigoinvisibleTerminal',
        },
        {
            title: 'Experiencia Nostale',
            description: 'Proyecto personal de servidor privado con scripting, administración de bases de datos y colaboración en tiempo real.',
            tech: ['Navicat', 'Scripting', 'MySQL', 'Servidor'],
            image: '/img/amigoInvisible.jpg',
            link: '#experiencia',
        },
        {
            title: 'Diseño Responsive',
            description: 'Portfolio y maquetaciones adaptables centradas en desktop y mobile, con cuidado especial por la jerarquía visual.',
            tech: ['Responsive', 'UI', 'CSS', 'Accesibilidad'],
            image: '/img/buscadorLol.jpg',
            link: '#sobre-mi',
        },
        {
            title: 'Aprendizaje Continuo',
            description: 'Evolución constante en desarrollo web, inteligencia artificial y herramientas modernas de frontend y backend.',
            tech: ['IA', 'Frontend', 'Backend', 'Autoaprendizaje'],
            image: '/img/amigoInvisible.jpg',
            link: '#estadisticas',
        },
        {
            title: 'GitHub y Repositorios',
            description: 'El código fuente de mis proyectos se organiza y publica para que sea sencillo revisarlo y seguir el progreso.',
            tech: ['GitHub', 'Repos', 'Versionado', 'Código'],
            image: '/img/buscadorLol.jpg',
            link: 'https://github.com/LucasitOP?tab=repositories',
        },
    ];

    return (
        <section id="proyectos" className="group retro-section retro-bg-neon text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="dots" />
                <h2 className="section-title retro-title">Mis Proyectos</h2>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="retro-card group animate-slideInUp"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className="relative mb-4 overflow-hidden rounded-2xl h-48 border border-amber-100/10">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300 contrast-110 saturate-110"
                                />
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-emerald-200">{project.title}</h3>

                            <p className="text-violet-100/80 mb-4 text-sm leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech, techIdx) => (
                                    <span
                                        key={techIdx}
                                        className="px-3 py-1 bg-emerald-300/10 text-emerald-200 text-xs rounded-full font-semibold border border-emerald-300/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                className="inline-block text-emerald-200 font-semibold hover:text-violet-100 transition"
                            >
                                Ver proyecto →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
