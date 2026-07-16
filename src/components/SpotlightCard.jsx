import { useRef } from 'react'

/*
  Card con luz que sigue al mouse. 💡
  Cómo funciona:
  1. `ref` nos da acceso al <div> real del navegador.
  2. Al mover el mouse, calculamos su posición RELATIVA a la card
     (clientX/Y son coordenadas de pantalla; rect es dónde está la card).
  3. Guardamos esa posición en las variables CSS --x y --y.
  4. El CSS (.spotlight-card::before en index.css) dibuja un
     degradado radial centrado exactamente en ese punto.
*/
export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)

  const seguirMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={seguirMouse}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  )
}
