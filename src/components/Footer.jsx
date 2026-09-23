import { Mail, Globe, GitBranch, MessageCircle, MapPin } from 'lucide-react'
import { perfil, enlaceWhatsApp } from '../data/perfil'

const LINKS = [
  { etiqueta: 'Email',     href: `mailto:${perfil.email || 'daniel.diaz@utp.edu.co'}`, Icono: Mail,          hover: 'hover:text-acento-claro' },
  { etiqueta: 'LinkedIn',  href: perfil.linkedin || '#',                                Icono: Globe,         hover: 'hover:text-blue-400' },
  { etiqueta: 'GitHub',    href: perfil.github || 'https://github.com/DanielDiaz1689', Icono: GitBranch,     hover: 'hover:text-texto' },
  { etiqueta: 'WhatsApp',  href: enlaceWhatsApp(),                                     Icono: MessageCircle, hover: 'hover:text-[#25D366]' },
]

export default function Footer() {
  const año = new Date().getFullYear()

  return (
    <footer className="border-t border-borde/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

          {/* Logo / nombre */}
          <div>
            <a href="#inicio" className="font-mono text-lg font-semibold transition-colors hover:text-acento-claro" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-acento-claro">&lt;</span>
              {perfil.nombre}
              <span className="text-acento-claro"> /&gt;</span>
            </a>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-apagado/60">
              <MapPin size={11} aria-hidden="true" />
              Pereira, Colombia · Desarrollador Web · IA
            </p>
          </div>

          {/* Links sociales */}
          <div className="flex flex-wrap justify-center gap-1">
            {LINKS.map(({ etiqueta, href, Icono, hover }) => (
              <a
                key={etiqueta}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={etiqueta}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-apagado transition-all duration-200 hover:bg-tarjeta ${hover} cursor-pointer`}
              >
                <Icono size={15} aria-hidden="true" />
                <span>{etiqueta}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-8 border-t border-borde/40 pt-6 text-center text-xs text-apagado/50">
          © {año} {perfil.nombre} · Hecho con
          <span className="mx-1 text-acento-claro/70">React + Vite + Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
