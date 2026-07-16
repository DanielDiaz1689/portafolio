import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'
import { servicios } from '../data/perfil'

export default function Services() {
  return (
    <section id="servicios" className="border-t border-borde/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="mb-2 font-mono text-sm text-acento-claro">02.</h2>
          <h3 className="mb-10 text-3xl font-bold md:text-4xl">Servicios</h3>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {servicios.map((servicio, i) => (
            <Reveal key={servicio.titulo} delay={i * 0.12}>
              <SpotlightCard className="h-full p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-acento/15 text-3xl">
                  {servicio.icono}
                </div>
                <h4 className="mb-3 text-xl font-semibold">{servicio.titulo}</h4>
                <p className="text-apagado">{servicio.descripcion}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
