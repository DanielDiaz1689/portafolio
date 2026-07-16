import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'
import { contacto } from '../data/perfil'

export default function Contact() {
  return (
    <section id="contacto" className="border-t border-borde/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="mb-2 font-mono text-sm text-acento-claro">04.</h2>
          <h3 className="mb-4 text-3xl font-bold md:text-4xl">Contacto</h3>
          <p className="mb-10 max-w-lg text-lg text-apagado">{contacto.intro}</p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contacto.enlaces.map((enlace, i) => (
            <Reveal key={enlace.etiqueta} delay={i * 0.1}>
              <a href={enlace.url} target="_blank" rel="noopener noreferrer">
                <SpotlightCard className="flex items-center gap-4 p-6">
                  <span className="text-3xl">{enlace.icono}</span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-widest text-apagado">
                      {enlace.etiqueta}
                    </p>
                    <p className="truncate font-medium text-acento-claro">
                      {enlace.valor}
                    </p>
                  </div>
                </SpotlightCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
