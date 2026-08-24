import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { perfil, negocio, enlaceWhatsApp } from '../data/perfil'
import fotoDaniel from '../assets/foto-daniel.png'

/*
  Efecto de máquina de escribir ⌨️
  Escribe letra a letra la frase actual, espera 2s,
  la borra, y pasa a la siguiente de perfil.roles.
*/
function useEscritura(frases) {
  const [texto, setTexto] = useState('')
  const [indice, setIndice] = useState(0) // qué frase toca
  const [borrando, setBorrando] = useState(false)

  useEffect(() => {
    const fraseActual = frases[indice % frases.length]

    const tiempo = setTimeout(
      () => {
        if (!borrando) {
          // escribiendo: agrega una letra
          setTexto(fraseActual.slice(0, texto.length + 1))
          if (texto === fraseActual) setBorrando(true)
        } else {
          // borrando: quita una letra
          setTexto(fraseActual.slice(0, texto.length - 1))
          if (texto === '') {
            setBorrando(false)
            setIndice(indice + 1)
          }
        }
      },
      borrando ? 40 : texto === fraseActual ? 2000 : 80
    )

    return () => clearTimeout(tiempo)
  }, [texto, borrando, indice, frases])

  return texto
}

/* Foto con inclinación 3D que sigue al mouse 🃏 */
function FotoTilt() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // spring = movimiento con inercia suave, no robótico
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 })

  const moverMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // posición del mouse normalizada de -0.5 a 0.5
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const salirMouse = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={moverMouse}
      onMouseLeave={salirMouse}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative h-90 w-72 rounded-3xl border border-borde bg-tarjeta shadow-[0_25px_60px_-15px_rgba(124,58,237,0.35)]"
    >
      {/* halo de luz detrás de la foto */}
      <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-acento/50 via-transparent to-acento-claro/30 blur-xl" />
      <img
        src={fotoDaniel}
        alt="Daniel Díaz"
        className="h-full w-full rounded-3xl object-cover object-top"
      />
    </motion.div>
  )
}

export default function Hero() {
  const textoEscrito = useEscritura(perfil.roles)

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Orbes de luz del fondo (decorativos) */}
      <div className="orbe left-[-10%] top-[10%] h-96 w-96 bg-acento" />
      <div className="orbe bottom-[5%] right-[-5%] h-80 w-80 bg-indigo-600" />

      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-14 px-6 pt-28 pb-16 md:flex-row md:justify-between md:pt-20">
        {/* Columna de texto */}
        <div className="max-w-xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 font-mono text-xs tracking-[0.25em] text-acento-claro"
          >
            {perfil.etiqueta}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="texto-degradado mb-4 text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            {perfil.nombre}
          </motion.h1>

          {/* Frase con efecto de escritura */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-5 h-8 text-xl font-medium text-apagado md:text-2xl"
          >
            {textoEscrito}
            <span className="cursor-escritura" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 text-apagado"
          >
            {perfil.descripcion}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <a
              href={enlaceWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#25D366] px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)]"
            >
              💬 Hablemos por WhatsApp
            </a>
            <a
              href="#servicios"
              className="rounded-xl border border-borde bg-tarjeta px-7 py-3.5 font-semibold transition-all hover:-translate-y-0.5 hover:border-acento hover:text-acento-claro"
            >
              Ver servicios
            </a>
          </motion.div>

          {/* Datos rápidos que generan confianza */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-apagado/80"
          >
            {negocio.datosRapidos}
          </motion.p>
        </div>

        {/* Columna de la foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FotoTilt />
        </motion.div>
      </div>
    </section>
  )
}
