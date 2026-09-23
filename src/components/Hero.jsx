import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { perfil, negocio, enlaceWhatsApp } from '../data/perfil'
import fotoDaniel from '../assets/foto-daniel.png'

function useEscritura(frases) {
  const [texto, setTexto] = useState('')
  const [indice, setIndice] = useState(0)
  const [borrando, setBorrando] = useState(false)

  useEffect(() => {
    const fraseActual = frases[indice % frases.length]
    const tiempo = setTimeout(
      () => {
        if (!borrando) {
          setTexto(fraseActual.slice(0, texto.length + 1))
          if (texto === fraseActual) setBorrando(true)
        } else {
          setTexto(fraseActual.slice(0, texto.length - 1))
          if (texto === '') { setBorrando(false); setIndice(indice + 1) }
        }
      },
      borrando ? 40 : texto === fraseActual ? 2000 : 80
    )
    return () => clearTimeout(tiempo)
  }, [texto, borrando, indice, frases])

  return texto
}

function FotoTilt() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 })

  const moverMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      onMouseMove={moverMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative h-90 w-72 rounded-3xl"
    >
      {/* Halo exterior animado */}
      <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-acento/40 via-violet-600/20 to-acento-claro/30 blur-2xl animate-pulse" />
      {/* Marco con borde degradado */}
      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-acento via-acento-claro/50 to-transparent">
        <img
          src={fotoDaniel}
          alt="Daniel Díaz"
          className="h-full w-full rounded-3xl object-cover object-top"
        />
      </div>
      {/* Badge flotante */}
      <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-xl border border-borde bg-tarjeta/90 px-4 py-2 text-xs font-mono backdrop-blur-sm shadow-xl">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-acento-claro">Disponible</span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const textoEscrito = useEscritura(perfil.roles)

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Orbes */}
      <div className="orbe left-[-15%] top-[5%] h-[500px] w-[500px] bg-acento" />
      <div className="orbe bottom-[0%] right-[-10%] h-[400px] w-[400px] bg-violet-700" />
      <div className="orbe top-[50%] left-[40%] h-[300px] w-[300px] bg-indigo-600 opacity-15" />

      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-14 px-6 pt-28 pb-16 md:flex-row md:justify-between md:pt-20">

        {/* Texto */}
        <div className="max-w-xl text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-acento/30 bg-acento/10 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-acento-claro animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] text-acento-claro">{perfil.etiqueta}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="texto-degradado mb-4 text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            {perfil.nombre}
          </motion.h1>

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
            className="mb-8 text-apagado leading-relaxed"
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
              className="group relative overflow-hidden rounded-xl bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-8px_rgba(37,211,102,0.5)]"
            >
              <span className="relative z-10">💬 Hablemos por WhatsApp</span>
            </a>
            <a
              href="#proyectos"
              className="rounded-xl border border-borde bg-tarjeta/60 px-7 py-3.5 font-semibold backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-acento/60 hover:bg-acento/10 hover:text-acento-claro"
            >
              Ver proyectos ↓
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-apagado/60"
          >
            {negocio.datosRapidos}
          </motion.p>
        </div>

        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FotoTilt />
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-apagado/50">scroll</span>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-borde/60 p-1">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-acento-claro"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
