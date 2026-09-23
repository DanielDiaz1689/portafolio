import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'
import { sobreMi } from '../data/perfil'
import {
  Atom, Server, Braces, Zap, Palette, Flame,
  Bot, Megaphone, Triangle, GitBranch
} from 'lucide-react'

const TECNOLOGIAS = [
  { nombre: 'React',     Icono: Atom },
  { nombre: 'Node.js',   Icono: Server },
  { nombre: 'Python',    Icono: Braces },
  { nombre: 'Supabase',  Icono: Zap },
  { nombre: 'Tailwind',  Icono: Palette },
  { nombre: 'Vite',      Icono: Flame },
  { nombre: 'Claude IA', Icono: Bot },
  { nombre: 'Meta Ads',  Icono: Megaphone },
  { nombre: 'Vercel',    Icono: Triangle },
  { nombre: 'Git',       Icono: GitBranch },
]

export default function About() {
  return (
    <section id="sobre-mi" className="border-t border-borde/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-2">01 — Sobre mí</p>
          <h3 className="mb-10 text-3xl font-bold md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Quién soy
          </h3>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Texto */}
          <Reveal delay={0.1}>
            <div className="space-y-4 text-base leading-relaxed text-apagado">
              {sobreMi.parrafos.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>

            {/* Badges de tecnologías */}
            <div className="mt-8">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-apagado/60">
                Tecnologías que uso
              </p>
              <div className="flex flex-wrap gap-2">
                {TECNOLOGIAS.map(({ nombre, Icono }) => (
                  <span key={nombre} className="tech-badge cursor-default">
                    <Icono size={13} aria-hidden="true" />
                    {nombre}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {sobreMi.estadisticas.map((stat, i) => (
              <Reveal key={stat.etiqueta} delay={0.15 + i * 0.1}>
                <SpotlightCard className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <span className="font-mono text-3xl font-bold text-acento-claro" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {stat.numero}
                  </span>
                  <span className="mt-2 text-sm text-apagado">{stat.etiqueta}</span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
