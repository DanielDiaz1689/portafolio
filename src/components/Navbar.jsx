import { useEffect, useState } from 'react'
import { secciones, perfil } from '../data/perfil'

/*
  Menú fijo superior con "scrollspy":
  un IntersectionObserver vigila qué sección está en pantalla
  y resalta su enlace en el menú automáticamente.
*/
export default function Navbar() {
  const [activa, setActiva] = useState('inicio')
  const [abierto, setAbierto] = useState(false) // menú móvil

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setActiva(entrada.target.id)
        })
      },
      // La sección se considera "activa" cuando cruza el centro de la pantalla
      { rootMargin: '-45% 0px -45% 0px' }
    )

    secciones.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect() // limpieza al desmontar
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-borde/60 bg-fondo/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="font-mono text-lg font-semibold">
          <span className="text-acento-claro">&lt;</span>
          {perfil.nombre}
          <span className="text-acento-claro"> /&gt;</span>
        </a>

        {/* Enlaces — escritorio */}
        <ul className="hidden items-center gap-8 md:flex">
          {secciones.map(({ id, nombre }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm transition-colors duration-200 ${
                  activa === id
                    ? 'font-semibold text-acento-claro'
                    : 'text-apagado hover:text-texto'
                }`}
              >
                {nombre}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa — móvil */}
        <button
          onClick={() => setAbierto(!abierto)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Abrir menú"
        >
          <span className={`h-0.5 w-6 bg-texto transition-transform ${abierto ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-texto transition-opacity ${abierto ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-texto transition-transform ${abierto ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Menú desplegable — móvil */}
      {abierto && (
        <ul className="flex flex-col gap-4 border-t border-borde bg-tarjeta px-6 py-6 md:hidden">
          {secciones.map(({ id, nombre }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setAbierto(false)}
                className={activa === id ? 'text-acento-claro' : 'text-apagado'}
              >
                {nombre}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
