import { useEffect, useState } from 'react'
import { secciones, perfil } from '../data/perfil'

export default function Navbar() {
  const [activa, setActiva] = useState('inicio')
  const [abierto, setAbierto] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgreso(total > 0 ? (window.scrollY / total) * 100 : 0)
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => { if (e.isIntersecting) setActiva(e.target.id) })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    secciones.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Barra de progreso */}
      <div className="scroll-progress" style={{ width: `${progreso}%` }} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-borde/60 bg-fondo/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="font-mono text-lg font-semibold group">
            <span className="text-acento-claro group-hover:text-texto transition-colors">&lt;</span>
            {perfil.nombre.split(' ')[0]}
            <span className="text-acento-claro group-hover:text-texto transition-colors"> /&gt;</span>
          </a>

          {/* Desktop */}
          <ul className="hidden items-center gap-8 md:flex">
            {secciones.map(({ id, nombre }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative text-sm transition-colors duration-200 ${
                    activa === id ? 'text-texto font-semibold' : 'text-apagado hover:text-texto'
                  }`}
                >
                  {nombre}
                  {activa === id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-acento to-acento-claro rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburguesa */}
          <button
            onClick={() => setAbierto(!abierto)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Abrir menú"
          >
            <span className={`h-0.5 w-6 bg-texto transition-transform duration-300 ${abierto ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-texto transition-opacity duration-300 ${abierto ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-texto transition-transform duration-300 ${abierto ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </nav>

        {/* Menú móvil */}
        {abierto && (
          <ul className="flex flex-col gap-4 border-t border-borde bg-fondo/95 backdrop-blur-xl px-6 py-6 md:hidden">
            {secciones.map(({ id, nombre }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setAbierto(false)}
                  className={`block py-1 transition-colors ${activa === id ? 'text-acento-claro font-semibold' : 'text-apagado'}`}
                >
                  {nombre}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>
    </>
  )
}
