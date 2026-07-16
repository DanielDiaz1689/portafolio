/*
  ══════════════════════════════════════════════════
  TU INFORMACIÓN — edita este archivo con confianza.
  Todo lo que cambies aquí se refleja en la página
  sin tocar ningún componente.
  ══════════════════════════════════════════════════
*/

export const perfil = {
  nombre: 'Daniel Díaz',
  saludo: 'Hola, soy',
  // El efecto de escritura rota entre estas frases:
  roles: [
    'Desarrollador Web',
    'Creador de soluciones digitales',
    'Freelancer',
  ],
  descripcion:
    'Transformo ideas en experiencias digitales modernas, rápidas y llamativas para tu negocio.',
}

export const sobreMi = {
  parrafos: [
    'Profesional apasionado por la tecnología y la creación de experiencias digitales que marquen la diferencia. Con enfoque en resultados y atención al detalle.',
    'Me especializo en desarrollar proyectos que conectan ideas con realidad, siempre con la mejor calidad y un trato cercano.',
  ],
  estadisticas: [
    { numero: '+5', etiqueta: 'Proyectos completados' },
    { numero: '100%', etiqueta: 'Compromiso' },
    { numero: '24/7', etiqueta: 'Disponibilidad' },
  ],
}

export const servicios = [
  {
    icono: '🌐',
    titulo: 'Desarrollo web',
    descripcion:
      'Sitios y aplicaciones web modernas, rápidas y adaptadas a tus necesidades.',
  },
  {
    icono: '🎨',
    titulo: 'Diseño de interfaces',
    descripcion:
      'Interfaces claras y atractivas que mejoran la experiencia del usuario.',
  },
  {
    icono: '💡',
    titulo: 'Consultoría',
    descripcion:
      'Asesoramiento técnico para llevar tu proyecto al siguiente nivel.',
  },
]

// Cuando tengas proyectos reales, agrégalos aquí con este formato:
// { titulo: 'Mi tienda', descripcion: '...', imagen: '/proyectos/tienda.png', enlace: 'https://...' }
export const proyectos = []

export const contacto = {
  intro: '¿Tienes un proyecto en mente? Escríbeme y hablemos.',
  enlaces: [
    {
      etiqueta: 'Email',
      valor: 'daniel2001barragan@gmail.com',
      url: 'mailto:daniel2001barragan@gmail.com',
      icono: '✉️',
    },
    {
      etiqueta: 'LinkedIn',
      valor: '/danieldiaz',
      url: 'https://linkedin.com/in/danieldiaz',
      icono: '💼',
    },
    {
      etiqueta: 'GitHub',
      valor: '@danieldiaz',
      url: 'https://github.com',
      icono: '🐙',
    },
  ],
}

// Enlaces del menú de navegación (id = sección de la página)
export const secciones = [
  { id: 'inicio', nombre: 'Inicio' },
  { id: 'sobre-mi', nombre: 'Sobre mí' },
  { id: 'servicios', nombre: 'Servicios' },
  { id: 'proyectos', nombre: 'Proyectos' },
  { id: 'contacto', nombre: 'Contacto' },
]
