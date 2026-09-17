/*
  ══════════════════════════════════════════════════
  TU INFORMACIÓN — edita este archivo con confianza.
  Todo lo que cambies aquí se refleja en la página
  sin tocar ningún componente.
  ══════════════════════════════════════════════════
*/

export const negocio = {
  // ⚠️ IMPORTANTE: reemplaza con TU número de WhatsApp.
  // Formato: 57 (Colombia) + celular, SIN "+", SIN espacios.
  // Ejemplo real: '573001112233'
  whatsapp: '573136676011',
  mensajeInicial: 'Hola Daniel, vi tu página y me interesa hablar sobre un proyecto.',
  datosRapidos: 'Pereira, Colombia · Respuesta en menos de 24h · Precios cerrados',
}

/* Construye un enlace que abre WhatsApp con un mensaje ya escrito */
export function enlaceWhatsApp(mensaje = negocio.mensajeInicial) {
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(mensaje)}`
}

export const perfil = {
  nombre: 'Daniel Díaz',
  saludo: 'Hola, soy',
  etiqueta: 'SOFTWARE · IA · AUTOMATIZACIÓN · META ADS',
  // El efecto de escritura rota entre estas frases:
  roles: [
    'Desarrollador Web',
    'Automatizaciones con IA',
    'Campañas en Meta Ads',
  ],
  descripcion:
    'Construyo software a medida, automatizaciones con inteligencia artificial y campañas de tráfico digital para empresas que quieren crecer con orden.',
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

/*
  CATÁLOGO DE SERVICIOS 🗂️
  - Cada categoría es una pestaña en la página.
  - precio: pon el texto que quieras ('USD $80 /mes', 'USD $350 único pago'...)
    o déjalo en null y mostrará "A cotizar".
*/
export const catalogo = [
  {
    id: 'web',
    nombre: 'Desarrollo web',
    items: [
      {
        titulo: 'Landing page de conversión',
        descripcion:
          'Sitio orientado a captar clientes. Diseño persuasivo, formularios y llamadas a la acción optimizadas para resultados.',
        precio: null,
      },
      {
        titulo: 'Panel administrativo',
        descripcion:
          'Dashboard hecho a medida para la operación interna de tu empresa: usuarios, métricas, reportes y permisos.',
        precio: null,
      },
    ],
  },
  {
    id: 'automatizaciones',
    nombre: 'Automatizaciones',
    items: [
      {
        titulo: 'Automatización de procesos',
        descripcion:
          'Convierte tareas repetitivas (reportes, correos, inventarios, pedidos) en flujos automáticos que trabajan por ti.',
        precio: null,
      },
      {
        titulo: 'Integraciones a medida',
        descripcion:
          'Conecta tus herramientas entre sí: tienda online, WhatsApp, correo, hojas de cálculo y más.',
        precio: null,
      },
    ],
  },
  {
    id: 'ia',
    nombre: 'IA',
    items: [
      {
        titulo: 'Agentes de IA a medida',
        descripcion:
          'Asistentes inteligentes que generan contenido, analizan información o atienden procesos de tu negocio.',
        precio: null,
      },
      {
        titulo: 'Chatbot de atención 24/7',
        descripcion:
          'Responde a tus clientes a cualquier hora por WhatsApp o web, con respuestas entrenadas para tu negocio.',
        precio: null,
      },
    ],
  },
  {
    id: 'meta-ads',
    nombre: 'Meta Ads',
    items: [
      {
        titulo: 'Gestión de pauta en Meta Ads',
        descripcion:
          'Estrategia, segmentación, optimización y reportes mensuales. Manejamos tu presupuesto para que cada peso traiga resultados.',
        precio: null,
      },
      {
        titulo: 'Pack de 6 videos UGC para anuncios',
        descripcion:
          'Contenido auténtico estilo creador para campañas de conversión. Producción ágil enfocada en resultados.',
        precio: null,
      },
    ],
  },
  {
    id: 'soporte',
    nombre: 'Soporte',
    items: [
      {
        titulo: 'Hosting + mantenimiento web',
        descripcion:
          'Servidor, dominio, actualizaciones y correcciones incluidas. Tu sitio siempre online, siempre actualizado.',
        precio: 'USD $80 /mes',
      },
      {
        titulo: 'Soporte técnico continuo',
        descripcion:
          'Resolución de incidentes, ajustes menores y asistencia con tiempos de respuesta garantizados.',
        precio: 'USD $150 /mes',
      },
      {
        titulo: 'Mantenimiento de automatizaciones',
        descripcion:
          'Monitoreo, ajustes y garantía de funcionamiento continuo de tus flujos críticos. Si algo falla, lo arreglamos.',
        precio: 'USD $200 /mes',
      },
      {
        titulo: 'Backups y monitoreo',
        descripcion:
          'Copias de seguridad automáticas y alertas de disponibilidad. Tu información protegida y tu sistema vigilado.',
        precio: 'USD $100 /mes',
      },
    ],
  },
]

// Agrega más proyectos con este mismo formato.
// enlace: null → muestra la card sin botón; cuando publiques
// el proyecto en internet, pon aquí su URL real.
export const proyectos = [
  {
    titulo: 'Reto 200 — Tablero de Ahorro',
    descripcion:
      'Tablero interactivo de ahorro con 200 celdas. Cada número representa $1.000 COP; la meta es acumular $20.100.000. Progreso visible en tiempo real, persistencia local y mensajes motivacionales.',
    imagen: '/proyectos/reto200.jpg',
    enlace: 'https://claude.ai/artifact/MYkAMoNsV6j7S2zVTu1pBi',
  },
    {
    titulo: 'DropiAnalyzer',
    descripcion: 'Sitio web para encontrar los mejores productos winners.',
    imagen: '/proyectos/dropianalyzer.jpg',  // ← foto de miniatura
    enlace: 'https://dropi-analyzer.vercel.app/', // ← URL de Vercel
  },
  {
    titulo: 'EVENTO15 — Wedding & Event Planners',
    descripcion:
      'Sitio premium para planificadores de bodas y eventos. Galería cinematográfica con efecto scroll-zoom, sistema de agendamiento de citas con confirmación por correo, WhatsApp integrado y videos de eventos. Verde esmeralda + dorado. React + Vercel.',
    imagen: '/proyectos/evento15.jpg',
    enlace: 'https://evento15.vercel.app/',
  },
  {
    titulo: 'VIP STORE — Tienda de tecnología',
    descripcion:
      'Ecommerce completo: catálogo con filtros y buscador, carrito de compras con IVA, pago simulado y panel administrativo con métricas de ventas. React + Tailwind.',
    imagen: '/proyectos/vip-store.jpg',
    enlace: 'https://vip-store-nu.vercel.app/',
  },
]

export const contacto = {
  titulo: '¿Tienes un proyecto',
  tituloAcento: 'en mente?', // esta parte se muestra en morado cursiva
  intro:
    'Cuéntame qué necesitas y te envío una propuesta personalizada, sin costo y sin compromiso.',
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
