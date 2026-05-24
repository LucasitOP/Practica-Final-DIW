import RetroDecorations from '../../components/RetroDecorations';

export default function Skills() {
    const skillCategories = [
        {
            category: 'Frontend',
            skills: [
                { name: 'React', level: 90 },
                { name: 'JavaScript', level: 85 },
                { name: 'Tailwind CSS', level: 88 },
                { name: 'HTML & CSS', level: 95 },
                { name: 'Vite', level: 85 },
            ],
        },
        {
            category: 'Backend',
            skills: [
                { name: 'Node.js', level: 80 },
                { name: 'Express', level: 78 },
                { name: 'MongoDB', level: 75 },
                { name: 'PostgreSQL', level: 72 },
            ],
        },
        {
            category: 'Herramientas',
            skills: [
                { name: 'Git', level: 88 },
                { name: 'GitHub', level: 90 },
                { name: 'VS Code', level: 95 },
                { name: 'Figma', level: 75 },
            ],
        },
    ];

    return (
        <section id="skills" className="group retro-section retro-bg-circuit text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="dots" />
                <h2 className="section-title retro-title">Mis Skills</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {skillCategories.map((category, idx) => (
                        <div
                            key={idx}
                            className="retro-card animate-slideInUp"
                            style={{ animationDelay: `${idx * 0.2}s` }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-emerald-200">{category.category}</h3>

                            <div className="space-y-6">
                                {category.skills.map((skill, skillIdx) => (
                                    <div key={skillIdx}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold text-violet-100">{skill.name}</span>
                                            <span className="text-emerald-200 font-bold">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-black/35 rounded-full h-2 border border-violet-100/10 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-violet-300 via-emerald-300 to-slate-200 h-2 rounded-full transition-all duration-1000"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
