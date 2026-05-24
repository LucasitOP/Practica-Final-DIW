import { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: '#inicio', label: 'Inicio' },
        { href: '#sobre-mi', label: 'Sobre mí' },
        { href: '#certificaciones', label: 'Certificaciones' },
        { href: '#intereses', label: 'Intereses' },
        { href: '#skills', label: 'Skills' },
        { href: '#experiencia', label: 'Experiencia' },
        { href: '#estadisticas', label: 'Estadísticas' },
        { href: '#proyectos', label: 'Proyectos' },
        { href: '#contacto', label: 'Contacto' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-[#09060f]/90 backdrop-blur-md border-b border-violet-300/15 shadow-2xl shadow-black/40">
            <div className="container-custom py-4 flex justify-between items-center">
                <a href="#inicio" className="text-2xl font-black text-violet-100 hover:text-emerald-300 transition tracking-[0.2em] uppercase">
                    Lucas<span className="text-emerald-300"> Timoc</span>
                </a>

                {/* Menú Desktop */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-violet-100 hover:text-emerald-300 transition duration-300 font-medium uppercase tracking-wider text-sm"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Botón Hamburguesa Mobile */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Menú Mobile */}
            {menuOpen && (
                <nav className="md:hidden bg-[#09060f]/95 backdrop-blur-sm border-t border-violet-300/15">
                    <div className="container-custom py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block text-violet-100 hover:text-emerald-300 transition uppercase tracking-wider text-sm"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
