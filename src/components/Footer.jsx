export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="group retro-bg-void text-violet-50 py-12 mt-8 border-t border-violet-300/15">
            <div className="container-custom">
                <div className="grid md:grid-cols-4 gap-8 mb-8 text-left">
                    {/* Sobre */}
                    <div>
                        <h4 className="text-xl font-black mb-4 text-emerald-200 tracking-[0.2em] uppercase">Lucas Timoc</h4>
                        <p className="text-violet-100/75 text-sm leading-relaxed">
                            Desarrollador web apasionado por crear experiencias digitales excepcionales.
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h5 className="font-semibold mb-4 text-emerald-200 uppercase tracking-[0.2em] text-sm">Enlaces</h5>
                        <ul className="space-y-2 text-sm text-violet-100/75">
                            <li><a href="#inicio" className="hover:text-emerald-200 transition">Inicio</a></li>
                            <li><a href="#sobre-mi" className="hover:text-emerald-200 transition">Sobre mí</a></li>
                            <li><a href="#certificaciones" className="hover:text-emerald-200 transition">Certificaciones</a></li>
                            <li><a href="#intereses" className="hover:text-emerald-200 transition">Intereses</a></li>
                            <li><a href="#skills" className="hover:text-emerald-200 transition">Skills</a></li>
                            <li><a href="#experiencia" className="hover:text-emerald-200 transition">Experiencia</a></li>
                            <li><a href="#estadisticas" className="hover:text-emerald-200 transition">Estadísticas</a></li>
                            <li><a href="#proyectos" className="hover:text-emerald-200 transition">Proyectos</a></li>
                            <li><a href="/Proyecto_Portfolio_Profesional_UI.pdf" download className="hover:text-emerald-200 transition">Descargar CV</a></li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div>
                        <h5 className="font-semibold mb-4 text-emerald-200 uppercase tracking-[0.2em] text-sm">Redes Sociales</h5>
                        <div className="space-y-2 text-sm text-violet-100/75">
                            <a href="https://github.com" className="block hover:text-emerald-200 transition">GitHub</a>
                            <a href="https://linkedin.com" className="block hover:text-emerald-200 transition">LinkedIn</a>
                            <a href="https://twitter.com" className="block hover:text-emerald-200 transition">Twitter</a>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h5 className="font-semibold mb-4 text-emerald-200 uppercase tracking-[0.2em] text-sm">Contacto</h5>
                        <div className="space-y-2 text-sm text-violet-100/75">
                            <p>📧 <a href="mailto:lucas.timoc1@gmail.com" className="hover:text-emerald-200 transition">lucas.timoc1@gmail.com</a></p>
                            <p>📱 +34 123 456 789</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-violet-300/15 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-violet-100/70">
                    <p>&copy; {currentYear} Lucas Timoc. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-emerald-200 transition">Privacidad</a>
                        <a href="#" className="hover:text-emerald-200 transition">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
