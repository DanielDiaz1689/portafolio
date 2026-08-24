import { useState } from 'react'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'
import { contacto, catalogo, enlaceWhatsApp } from '../data/perfil'

/*
  Formulario → WhatsApp 💬
  No necesita servidor: al enviar, arma un mensaje con los datos
  y abre tu WhatsApp con todo ya redactado. El cliente solo
  pulsa "enviar" en su chat y la conversación empieza contigo.
*/

// Estilo compartido de los campos (una sola vez, se reutiliza abajo)
const estiloCampo =
  'w-full rounded-xl border border-borde bg-tarjeta px-4 py-3 text-sm text-texto placeholder-apagado/60 outline-none transition-colors focus:border-acento'

function Campo({ etiqueta, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-apagado">
        {etiqueta}
      </span>
      {children}
    </label>
  )
}

export default function Contact() {
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    empresa: '',
    servicio: catalogo[0].nombre,
    mensaje: '',
  })

  // Actualiza el campo que cambió, conservando los demás
  const cambiar = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault() // evita que el navegador recargue la página
    const texto = [
      `Hola Daniel, soy ${datos.nombre}.`,
      `📌 Servicio de interés: ${datos.servicio}`,
      datos.empresa && `🏢 Empresa: ${datos.empresa}`,
      datos.email && `✉️ Email: ${datos.email}`,
      datos.whatsapp && `📱 WhatsApp: ${datos.whatsapp}`,
      '',
      datos.mensaje,
      '',
      'Me gustaría agendar una cita para hablar del proyecto.',
    ]
      .filter(Boolean) // quita las líneas vacías de campos opcionales
      .join('\n')
    window.open(enlaceWhatsApp(texto), '_blank')
  }

  return (
    <section id="contacto" className="border-t border-borde/50 py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2">
        {/* Columna izquierda: invitación + contacto directo */}
        <Reveal>
          <h2 className="mb-2 font-mono text-sm text-acento-claro">04. — Hablemos</h2>
          <h3 className="mb-4 text-3xl font-bold md:text-4xl">
            {contacto.titulo}{' '}
            <span className="texto-degradado italic">{contacto.tituloAcento}</span>
          </h3>
          <p className="mb-8 max-w-md text-lg text-apagado">{contacto.intro}</p>

          <a
            href={enlaceWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)]"
          >
            💬 Escríbeme por WhatsApp
          </a>

          <div className="space-y-3">
            {contacto.enlaces.map((enlace) => (
              <a
                key={enlace.etiqueta}
                href={enlace.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-apagado transition-colors hover:text-acento-claro"
              >
                <span>{enlace.icono}</span>
                <span className="font-mono text-xs uppercase tracking-widest">
                  {enlace.etiqueta}:
                </span>
                {enlace.valor}
              </a>
            ))}
          </div>
        </Reveal>

        {/* Columna derecha: formulario */}
        <Reveal delay={0.15}>
          <SpotlightCard className="p-7">
            <form onSubmit={enviar} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Campo etiqueta="Nombre">
                  <input
                    required
                    name="nombre"
                    value={datos.nombre}
                    onChange={cambiar}
                    placeholder="Tu nombre"
                    className={estiloCampo}
                  />
                </Campo>
                <Campo etiqueta="Correo electrónico">
                  <input
                    type="email"
                    name="email"
                    value={datos.email}
                    onChange={cambiar}
                    placeholder="tucorreo@ejemplo.com"
                    className={estiloCampo}
                  />
                </Campo>
                <Campo etiqueta="WhatsApp">
                  <input
                    name="whatsapp"
                    value={datos.whatsapp}
                    onChange={cambiar}
                    placeholder="+57 ..."
                    className={estiloCampo}
                  />
                </Campo>
                <Campo etiqueta="Empresa (opcional)">
                  <input
                    name="empresa"
                    value={datos.empresa}
                    onChange={cambiar}
                    placeholder="Nombre de tu empresa"
                    className={estiloCampo}
                  />
                </Campo>
              </div>

              <Campo etiqueta="Servicio de interés">
                <select
                  name="servicio"
                  value={datos.servicio}
                  onChange={cambiar}
                  className={estiloCampo}
                >
                  {catalogo.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </Campo>

              <Campo etiqueta="Cuéntame sobre tu proyecto">
                <textarea
                  required
                  name="mensaje"
                  value={datos.mensaje}
                  onChange={cambiar}
                  rows={4}
                  placeholder="Qué necesitas, para cuándo, y cualquier detalle importante..."
                  className={`${estiloCampo} resize-y`}
                />
              </Campo>

              <button
                type="submit"
                className="w-full rounded-xl bg-acento py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(124,58,237,0.7)]"
              >
                Enviar por WhatsApp →
              </button>
              <p className="text-center text-xs text-apagado/70">
                Al enviar se abrirá WhatsApp con tu mensaje listo — solo confirma el envío.
              </p>
            </form>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
