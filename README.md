# PracticaFinal DIW

En este Repositorio voy a guardar y documentar la manera en la que voy a realizar mi práctica de CFGS 2º DAW que tengo asignada para finalizar la evaluación de la asignatura en febrero de 2026.

# PROYECTO: PORTFOLIO PROFESIONAL WEB

## 1. CONTEXTO DEL PROYECTO

Un portfolio profesional es una herramienta fundamental para cualquier perfil técnico del
ámbito del desarrollo y el diseño web.
En este proyecto deberás diseñar y maquetar una interfaz web que funcione como portfolio
profesional, mostrando tu perfil, tus habilidades y trabajos, utilizando únicamente HTML y
CSS.
El objetivo es crear una interfaz clara, usable y visualmente coherente, aplicando los
conocimientos adquiridos en la asignatura.

## 2. OBJETIVOS DEL PROYECTO

- Estructurar correctamente documentos HTML usando etiquetas semánticas.
- Aplicar estilos CSS de forma organizada y coherente.
- Diseñar una interfaz usable y visualmente adecuada.
- Separar correctamente estructura (HTML) y presentación (CSS).
- Maquetar una página web profesional sin usar JavaScript.

## 3. REQUISITOS FUNCIONALES

El portfolio deberá incluir al menos los siguientes bloques o secciones:

1. Inicio
2. Sobre mí / Perfil
3. Proyectos / Trabajos
4. Contacto (formulario sin funcionalidad).
   Se puede hacer en una sola página (tipo landing page) o usando múltiples páginas.

## 4. ESTRUCTURA HTML OBLIGATORIA

Uso correcto de etiquetas semánticas (header, nav, main, section, footer, …), jerarquía de
encabezados, listas, enlaces, imágenes y atributo alt.

## 5. REQUISITOS CSS

- Archivo CSS externo.
- Uso del modelo de caja.
- Selectores simples y combinados.
- Uso de pseudo-clases como :hover. …
- Maquetación con position o display.
- Organización de elementos en secciones con flex o grid.
- Diseño visual coherente.
- Diseño responsive básico.
- Transiciones/animaciones CSS.
- Comentarios explicativos en el CSS.
- Guía de estilos.

## 6. ORGANIZACIÓN DE ARCHIVOS

Estructura clara de carpetas y archivos (html, css, img).

## 7. RESTRICCIONES

No se permite JavaScript ni frameworks (React, Tailwind, …). Sólo HTML y CSS.

## 8. Contacto real desde Vercel (opcional)

Se ha añadido un endpoint serverless en [api/contact.js](api/contact.js) y un script cliente en [js/contact.js](js/contact.js) para que el formulario de [index.html](index.html) pueda enviar emails reales.

### Variables de entorno en Vercel

Configura estas variables en el proyecto desplegado:

- `RESEND_API_KEY`: API key de Resend.
- `CONTACT_TO_EMAIL`: correo donde recibirás los mensajes.
- `CONTACT_FROM_EMAIL`: remitente verificado en Resend (por ejemplo `Portfolio <onboarding@resend.dev>` en pruebas).
- `UPSTASH_REDIS_REST_URL`: URL REST de Upstash Redis.
- `UPSTASH_REDIS_REST_TOKEN`: token REST de Upstash Redis.
- `TURNSTILE_SECRET_KEY` (opcional): secret key de Cloudflare Turnstile para exigir captcha server-side.

Para activar Turnstile en cliente, sustituye `TU_SITE_KEY_TURNSTILE` en [index.html](index.html) por tu site key pública.

### Seguridad incluida

- Límite por IP: 1 mensaje cada 5 minutos (HTTP 429 si se excede).
- Límite por IP robusto: si no hay Upstash o falla temporalmente, se aplica fallback en memoria.
- Honeypot anti-bot.
- Tiempo mínimo de cumplimentación del formulario.
- Captcha opcional (Cloudflare Turnstile) validado en servidor si configuras `TURNSTILE_SECRET_KEY`.
- Validación de campos y longitud del mensaje.

> Nota: si no configuras Upstash, el formulario seguirá funcionando, pero sin limitación persistente entre invocaciones serverless.

## 9. RÚBRICA DE EVALUACIÓN

Se evaluarán los siguientes aspectos:
| Criterio | Excelente (10-9) | Adecuado (8-6) | Básico (5-4) | Insuficiente (<4) |
| --- | --- | --- | --- | --- |
| **Estructura HTML** | Uso correcto y completo de etiquetas semánticas y jerarquía | Estructura correcta con pequeños errores | Estructura incompleta o poco clara | Estructura incorrecta o desordenada |
| **CSS y modelo de caja** | Uso correcto y coherente del modelo de caja | Uso aceptable con pequeños fallos | Uso básico y poco consistente | No se entiende o está mal aplicado |
| **Maquetación** | Interfaz bien distribuida y equilibrada | Maquetación funcional pero mejorable | Maquetación confusa | No hay una maquetación clara |
| **Diseño de interfaz (UI)** | Diseño profesional, legible y coherente | Diseño correcto | Diseño pobre o poco usable | Diseño descuidado |
| **Navegación** | Clara, intuitiva y consistente | Navegación funcional | Navegación confusa | Navegación incorrecta |
| **Organización del proyecto** | Archivos bien estructurados y ordenados | Organización aceptable | Organización mejorable | Desorden total |
| **Presentación final** | Acabado profesional | Acabado correcto | Acabado básico | Incompleto |

# Apéndice A. ¿Qué incluye una guía de estilo básica?

Una guía de estilo sencilla debería incluir estos 4 bloques:

## Colores

Definir la paleta de colores que se va a usar.
Ejemplo:
• Color principal: #2c3e50
• Color secundario: #3498db
• Color de fondo: #f4f4f4
• Color de texto: #333333
• Color de énfasis: #e74c3c
Objetivo: que no aparezcan colores nuevos sin criterio.

## Tipografías

Indicar qué fuentes se usan y para qué.
Ejemplo:
• Fuente principal: Arial, sans-serif
• Títulos: tamaño grande y en negrita
• Texto general: tamaño medio
• Enlaces: mismo tipo de letra que el texto
Objetivo: mantener uniformidad y legibilidad.

## Componentes básicos

Definir el aspecto de los elementos que se repiten.
Ejemplo:
• Botones:
o Color de fondo
o Color al pasar el ratón
o Borde redondeado
• Tarjetas:
o Sombra
o Espaciado interno
• Enlaces:
o Color normal
o Color hover
o Sin subrayado / con subrayado
Objetivo: que todos los botones y tarjetas sean iguales.
## Espaciados y estructura
Reglas generales de separación y tamaño.
Ejemplo:
• Margen entre secciones: 40px
• Padding interno de cajas: 20px
• Ancho máximo del contenido: 1000px
• Footer siempre separado del contenido
Objetivo: evitar diseños “apretados” o caóticos.
