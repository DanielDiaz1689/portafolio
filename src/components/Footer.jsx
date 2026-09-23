import { perfil, contacto, enlaceWhatsApp } from '../data/perfil'

export default function Footer() {
  const año = new Date().getFullYear()

  return (
    <footer className="border-t border-borde/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

          {/* Logo / nombre */}
          <div>
            <a href="#inicio" className="font-mono text-lg font-semibold">
              <span className="text-acento-claro">&lt;</span>
              {perfil.nombre}
              <span className="text-acento-claro"> /&gt;</span>
            </a>
            <p className="mt-1 text-xs text-apagado/60">
              Desarrollador Web · IA · Meta Ads
            </p>
          </div>

          {/* Links rápidos */}
          <div className="flex flex-wrap justify-center gap-6">
            {contacto.enlaces.map((enlace) => (
              <a
                key={enlace.etiqueta}
                href={enlace.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-apagado transition-colors hover:text-acento-claro"
              >
                <span>{enlace.icono}</span>
                <span>{enlace.etiqueta}</span>
              </a>
            ))}
            <a
              href={enlaceWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-apagado transition-colors hover:text-[#25D366]"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-8 border-t border-borde/40 pt-6 text-center text-xs text-apagado/50">
          © {año} {perfil.nombre} · Hecho con
          <span className="mx-1 text-acento-claro/70">React + Vite + Tailwind</span>
          · Pereira, Colombia
        </div>
      </div>
    </footer>
  )
}
