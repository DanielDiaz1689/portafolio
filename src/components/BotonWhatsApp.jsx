import { motion } from 'framer-motion'
import { enlaceWhatsApp } from '../data/perfil'

/*
  Botón flotante de WhatsApp 📱
  Siempre visible en la esquina inferior derecha (position: fixed).
  Aparece con una pequeña animación al cargar la página.
*/
export default function BotonWhatsApp() {
  return (
    <motion.a
      href={enlaceWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.45)]"
    >
      {/* Logo de WhatsApp en SVG (dibujo vectorial, no imagen) */}
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.58-1.67a12.74 12.74 0 0 0 6.22 1.6h.01c7.06 0 12.79-5.74 12.79-12.8s-5.74-12.73-12.8-12.73zm0 23.4h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9.99 1.04-3.8-.25-.4a10.55 10.55 0 0 1-1.63-5.68c0-5.87 4.78-10.65 10.66-10.65a10.6 10.6 0 0 1 10.64 10.66c0 5.87-4.78 10.6-10.76 10.6zm5.84-7.96c-.32-.16-1.9-.93-2.19-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.65 9.65 0 0 1-1.78-2.21c-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z" />
      </svg>
    </motion.a>
  )
}
