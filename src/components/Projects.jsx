import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'
import { proyectos } from '../data/perfil'

/*
  Si proyectos está vacío (data/perfil.js) muestra un aviso elegante.
  Cuando agregues proyectos al array, aparecen automáticamente en cards.
*/
export default function Projects() {
  return (
    <section id="proyectos" className="border-t border-borde/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="mb-2 font-mono text-sm text-acento-claro">03.</h2>
          <h3 className="mb-10 text-3xl font-bold md:text-4xl">Proyectos</h3>
        </Reveal>

        {proyectos.length === 0 ? (
          <Reveal delay={0.1}>
            <SpotlightCard className="flex flex-col items-center gap-4 p-14 text-center">
              <span className="text-5xl">🚧</span>
              <h4 className="text-xl font-semibold">Próximamente</h4>
              <p className="max-w-md text-apagado">
                Aquí aparecerán las páginas web y aplicaciones que voy
                construyendo. ¡Vuelve pronto!
              </p>
            </SpotlightCard>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((proyecto, i) => (
              <Reveal key={proyecto.titulo} delay={i * 0.12}>
                <SpotlightCard className="h-full overflow-hidden">
                  {proyecto.imagen && (
                    <img
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h4 className="mb-2 text-lg font-semibold">{proyecto.titulo}</h4>
                    <p className="mb-4 text-sm text-apagado">{proyecto.descripcion}</p>
                    {proyecto.enlace && (
                      <a
                        href={proyecto.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-acento-claro hover:underline"
                      >
                        Ver proyecto →
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
