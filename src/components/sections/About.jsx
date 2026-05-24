import RetroDecorations from '../../components/RetroDecorations';

export default function About() {
    return (
        <section id="sobre-mi" className="group retro-section retro-bg-void text-violet-50">
            <div className="container-custom">
                <RetroDecorations variant="dots" />
                <h2 className="section-title retro-title">Sobre mí</h2>

                <div className="grid lg:grid-cols-2 gap-12 items-center animate-slideInUp">
                    <div className="retro-card">
                        <p className="text-lg text-violet-100/80 mb-6 leading-relaxed">
                            Soy un estudiante de Desarrollo de Aplicaciones Web apasionado por la tecnología y la programación, abierto a desarrollar y crear cualquier tipo de proyectos.
                        </p>

                        <p className="text-lg text-violet-100/80 mb-6 leading-relaxed">
                            Mi objetivo es aprender y crecer profesionalmente con el nuevo mundo que se va actualizando gracias a la IA.
                        </p>

                        <p className="text-lg text-violet-100/80 mb-8 leading-relaxed">
                            Especializado en tecnologías modernas del front-end y con experiencia en desarrollo full-stack.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#contacto" className="btn-primary">
                                Contacta conmigo
                            </a>
                            <a href="/Proyecto_Portfolio_Profesional_UI.pdf" download className="btn-secondary">
                                Descargar CV
                            </a>
                            <a href="#proyectos" className="btn-secondary">
                                Ver mis proyectos
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="relative w-full max-w-md">
                            <div className="w-full aspect-square rounded-3xl shadow-2xl shadow-black/40 p-1 overflow-hidden border border-violet-200/20 bg-gradient-to-br from-violet-300/20 via-emerald-300/10 to-slate-200/20 animate-floatGlow">
                                <img
                                    src="/img/perfil.jpeg"
                                    alt="Foto de Lucas Timoc"
                                    className="w-full h-full rounded-3xl object-cover grayscale-[15%] contrast-110"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
