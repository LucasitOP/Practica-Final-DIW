# Portfolio Profesional - Lucas Timoc 

Un portfolio moderno y profesional construido con **React**, **Vite** y **Tailwind CSS**. Diseñado para mostrar tus habilidades y proyectos de desarrollo web.

##  Características

- ✅ **Diseño Responsivo**: Funciona perfectamente en todos los dispositivos
- ✅ **Componentes Modernos**: Construido con React y componentes reutilizables
- ✅ **Animaciones Suaves**: Transiciones y animaciones profesionales
- ✅ **Tailwind CSS**: Estilos personalizados con utilidades de Tailwind
- ✅ **Carrusel de Diapositivas**: Hero section con cambios automáticos
- ✅ **Secciones Completas**: Sobre mí, Skills, Proyectos, Contacto
- ✅ **Optimizado para SEO**: Meta tags y estructura semántica
- ✅ **Formulario de Contacto**: Integrado con API backend

##  Tecnologías

- **React 19** - Librería UI moderna
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de CSS utilitario
- **JavaScript ES6+** - Código moderno y limpio


## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx           # Navegación principal
│   ├── Footer.jsx           # Pie de página
│   └── sections/
│       ├── Hero.jsx         # Sección héroe con carrusel
│       ├── About.jsx        # Sobre mí
│       ├── Skills.jsx       # Habilidades técnicas
│       ├── Projects.jsx     # Portafolio de proyectos
│       └── Contact.jsx      # Formulario de contacto
├── App.jsx                  # Componente principal
├── index.css                # Estilos globales + Tailwind
└── main.jsx                 # Punto de entrada

```

### Agregar Nuevos Proyectos
Edita el array `projects` en `src/components/sections/Projects.jsx`:

```js
const projects = [
  {
    title: 'Mi Proyecto',
    description: 'Descripción...',
    tech: ['React', 'Tailwind'],
    image: 'url-imagen',
    link: 'url-proyecto',
  },
  // ...
];
```

### Actualizar Información Personal
- **Header**: `src/components/Header.jsx`
- **About**: `src/components/sections/About.jsx`
- **Contact**: `src/components/sections/Contact.jsx`

##  Despliegue

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Sube la carpeta 'dist' a Netlify
```

### GitHub Pages
```bash
npm run build
# Configura el repositorio para servir desde la carpeta 'dist'
```

##  Contacto

- **Email**: lucas@example.com
- **LinkedIn**: linkedin.com/in/lucastimoc
- **GitHub**: github.com/lucastimoc

## Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo para tu propio portfolio.

---

**Realizado por Lucas Timoc**
