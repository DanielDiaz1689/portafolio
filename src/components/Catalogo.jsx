import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { catalogo, enlaceWhatsApp } from '../data/perfil'

/*
  Catálogo de servicios con pestañas. 🗂️
  - useState guarda qué categoría está activa.
  - Al hacer clic en una pestaña solo cambia ese estado:
    React re-dibuja la lista SIN recargar la página.
  - "Cotizar este servicio" abre WhatsApp con un mensaje
    que ya menciona la categoría que el cliente estaba viendo.
*/
export default function Catalogo() {
  const [activa, setActiva] = useState(catalogo[0].id)
  const categoria = catalogo.find((c) => c.id === activa)

  return (
    <section id="servicios" className="border-t border-borde/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="mb-2 font-mono text-sm text-acento-claro">02.</h2>
          <h3 className="mb-3 text-3xl font-bold md:text-4xl">
            Lo que hago <span className="texto-degradado italic">por tu empresa</span>
          </h3>
          <p className="mb-10 max-w-xl text-apagado">
            Elige una categoría para ver los servicios y sus tarifas.
          </p>
        </Reveal>

        {/* Pestañas de categorías */}
        <Reveal delay={0.1}>
          <div className="mb-10 flex flex-wrap gap-3">
            {catalogo.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiva(cat.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  activa === cat.id
                    ? 'border-acento bg-acento/15 text-texto'
                    : 'border-borde text-apagado hover:border-acento-claro/50 hover:text-texto'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Lista de servicios de la categoría activa */}
        <AnimatePresence mode="wait">
          <motion.div
            key={categoria.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {categoria.items.map((item) => (
              <div
                key={item.titulo}
                className="flex flex-col gap-2 border-b border-borde/60 py-7 transition-colors hover:bg-tarjeta/50 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div className="max-w-2xl">
                  <h4 className="mb-1.5 text-lg font-semibold">{item.titulo}</h4>
                  <p className="text-sm leading-relaxed text-apagado">
                    {item.descripcion}
                  </p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  {item.precio ? (
                    <>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-apagado">
                        Desde
                      </p>
                      <p className="text-xl font-semibold text-acento-claro">
                        {item.precio}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-acento-claro">
                      A cotizar
                    </p>
                  )}
                </div>
              </div>
            ))}

            <a
              href={enlaceWhatsApp(
                `Hola Daniel, me interesa el servicio de "${categoria.nombre}". ¿Podemos agendar una llamada?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 font-medium text-acento-claro transition-colors hover:text-texto"
            >
              Cotizar este servicio <span aria-hidden>→</span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
