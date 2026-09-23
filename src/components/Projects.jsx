import Reveal from './Reveal'
import { proyectos } from '../data/perfil'
import SpotlightCard from './SpotlightCard'

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
                Aquí aparecerán las páginas web y aplicaciones que voy construyendo. ¡Vuelve pronto!
              </p>
            </SpotlightCard>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((proyecto, i) => (
              <Reveal key={proyecto.titulo} delay={i * 0.1}>
                <div className="spotlight-card group h-full flex flex-col overflow-hidden">
                  {/* Imagen con overlay en hover */}
                  {proyecto.imagen && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={proyecto.imagen}
                        alt={proyecto.titulo}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay con botón al hacer hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-fondo/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                        {proyecto.enlace && (
                          <a
                            href={proyecto.enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-acento-claro/50 bg-acento/20 px-5 py-2.5 font-semibold text-acento-claro backdrop-blur-sm transition-all hover:bg-acento hover:text-white"
                          >
                            Ver proyecto →
                          </a>
                        )}
                      </div>
                      {/* Degradado inferior */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-tarjeta to-transparent" />
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col p-6">
                    <h4 className="mb-2 text-lg font-semibold leading-snug">{proyecto.titulo}</h4>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-apagado">
                      {proyecto.descripcion}
                    </p>

                    {proyecto.enlace && (
                      <a
                        href={proyecto.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm text-acento-claro transition-all hover:gap-3 hover:text-texto"
                      >
                        Ver proyecto <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
