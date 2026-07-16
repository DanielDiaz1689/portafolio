# Portafolio — Daniel Díaz

Página de presentación personal construida con **React + Vite + Tailwind CSS + Framer Motion**.

## Comandos

```bash
npm install      # instalar dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # genera la versión final para publicar (carpeta dist/)
```

## ¿Dónde edito cada cosa?

| Quiero cambiar... | Archivo |
|---|---|
| Mis textos, servicios, enlaces, proyectos | `src/data/perfil.js` |
| Los colores y fuentes del tema | `src/index.css` (bloque `@theme`) |
| Una sección concreta | `src/components/<Sección>.jsx` |
| El orden de las secciones | `src/App.jsx` |
| Mi foto | `src/assets/foto-daniel.png` |

## Estructura

- `src/data/perfil.js` — todo el contenido (textos, enlaces) separado del código
- `src/components/` — una sección por archivo
- `src/components/SpotlightCard.jsx` — card reutilizable con luz que sigue al mouse
- `src/components/Reveal.jsx` — animación de aparición al hacer scroll
