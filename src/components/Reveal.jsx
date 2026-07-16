import { motion } from 'framer-motion'

/*
  Animación de aparición al hacer scroll. 🎬
  Envuelve cualquier contenido:
    <Reveal><h2>Título</h2></Reveal>
  - initial: cómo empieza (invisible y 30px más abajo)
  - whileInView: cómo termina cuando entra en pantalla
  - viewport once: la animación solo ocurre la primera vez
  - delay: permite escalonar varios elementos en cascada
*/
export default function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
