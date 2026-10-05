export const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Contacto', href: '#contacto' },
]

export const heroImages = [
  '/hero/hero-1.webp',
  '/hero/hero-2.webp',
  '/hero/hero-3.webp',
  '/hero/hero-4.webp',
  '/hero/hero-5.webp',
  '/hero/hero-6.webp',
]

export const portfolioCategories = [
  { id: 'bodas', label: 'Historias de Bodas' },
  { id: 'retratos', label: 'Sesiones y Retratos' },
  { id: 'eventos', label: 'Cobertura de eventos' },
  { id: 'producto', label: 'Arquitectura y Producto' },
  { id: 'drone', label: 'Video & Dron' },
]

export const weddings = [
  {
    couple: 'Sol & Darko',
    location: 'Patagonia Argentina',
    images: ['/boda-sol-1.webp', '/boda-sol-2.webp', '/boda-sol-3.webp'],
  },
  {
    couple: 'Marcelo & Michelli',
    location: 'Hotel Llao Llao',
    images: [
      '/boda-marcelo-1.webp',
      '/boda-marcelo-2.webp',
      '/boda-marcelo-3.webp',
    ],
  },
  {
    couple: 'Barby & Luis',
    location: 'Villa La Angostura, Patagonia',
    images: ['/boda-barby-1.webp', '/boda-barby-2.webp', '/boda-barby-3.webp'],
  },
  {
    couple: 'Emma & Dante',
    location: 'Club Suizo, Bariloche',
    images: Array.from({ length: 6 }, (_, index) => `/boda-ema-${index + 1}.webp`),
  },
]

export const partyImages = [
  ...Array.from({ length: 5 }, (_, index) => `/fiesta-${index + 1}.webp`),
  ...Array.from({ length: 6 }, (_, index) => `/album/fiesta-${index + 1}.webp`),
]

export const momentImages = Array.from(
  { length: 6 },
  (_, index) => `/instante-${index + 1}.webp`,
)

export const postWeddingImages = [
  ...Array.from({ length: 3 }, (_, index) => `/postboda-${index + 1}.webp`),
  ...Array.from({ length: 4 }, (_, index) => `/album/postboda-${index + 1}.webp`),
]

export const portraitGroups = [
  {
    title: 'Pedida de mano sorpresa en Bariloche',
    description: 'Una experiencia íntima en los paisajes de la Patagonia.',
    images: ['/pedida-1.webp', '/pedida-2.webp'],
  },
  {
    title: 'Primavera',
    description: 'Flores y colores vibrantes.',
    images: Array.from({ length: 6 }, (_, index) => `/primavera-${index + 1}.webp`),
  },
  {
    title: 'Verano',
    description: 'Lagos turquesas y atardeceres tardíos.',
    images: Array.from({ length: 8 }, (_, index) => `/verano-${index + 1}.webp`),
  },
  {
    title: 'Otoño',
    description: 'Tonos ocres y dorados.',
    images: Array.from({ length: 7 }, (_, index) => `/otoño-${index + 1}.webp`),
  },
  {
    title: 'Invierno Patagónico',
    description: 'Magia bajo la nieve y paisajes blancos.',
    images: Array.from({ length: 7 }, (_, index) => `/invierno-${index + 1}.webp`),
  },
]

export const portraitLocations = [
  {
    title: 'Circuito Chico',
    description: 'Bahía López, Punto Panorámico y Golf de Llao Llao.',
    images: Array.from({ length: 3 }, (_, index) => `/circuito-${index + 1}.webp`),
  },
  {
    title: 'Estepa y Mirador del Valle Encantado',
    description: 'Paisajes inmensos y formaciones rocosas.',
    images: Array.from({ length: 5 }, (_, index) => `/estepa-${index + 1}.webp`),
  },
  {
    title: 'Villa La Angostura y Camino de los 7 Lagos',
    description: 'Bosques, lagos y caminos de montaña.',
    images: Array.from({ length: 4 }, (_, index) => `/locaciones-${index + 1}.webp`),
  },
  {
    title: 'San Martín de los Andes',
    description: 'Sesiones a destino con locación coordinada.',
    images: [],
  },
]

export const eventImages = Array.from(
  { length: 14 },
  (_, index) => `/evento-${index + 1}.webp`,
)

export const services = [
  {
    id: 'bodas',
    title: 'Fotografía de Boda',
    description: 'Bodas en Bariloche y a destino.',
    price: 'Desde USD 500',
    quote: true,
    features: [
      'Cobertura completa del evento.',
      'Sesiones preboda y postboda.',
      'Video documental y dron.',
      'Bodas íntimas o elopements.',
      'Asesoramiento de salones, decoración y maquillaje.',
    ],
  },
  {
    id: 'retratos',
    title: 'Fotografía de Retratos',
    description: 'Tour fotográfico.',
    price: 'Desde USD 200',
    features: [
      'Sesiones personalizadas para parejas, familias y retratos.',
      'Pedidas de mano sorpresa.',
      'Fotografía con dron.',
      'Locaciones en Bariloche, Villa La Angostura y San Martín de los Andes.',
    ],
  },
  {
    id: 'eventos',
    title: 'Fotografía de Eventos',
    description: 'Cobertura integral audiovisual.',
    price: 'Desde USD 350',
    quote: true,
    features: [
      'Eventos corporativos.',
      'Cumpleaños, aniversarios y fiestas de 15 años.',
      'Video en vivo del momento.',
      'Video tradicional y reels.',
    ],
  },
]

export const reviews = [
  {
    id: 1,
    name: 'Natalia',
    title: 'Gracias Melisa',
    text: 'Desde la primera entrevista nos generó confianza. Retrató los momentos más importantes de forma espontánea y nos dejó recuerdos para toda la vida.',
    date: '20/02/2025',
  },
  {
    id: 2,
    name: 'Sol & Darko',
    title: 'Boda Darko & Sol',
    text: 'Estamos muy felices de haber compartido este momento con Meli. Es una excelente profesional y una persona que contagia su buena onda.',
    date: '19/01/2023',
  },
  {
    id: 3,
    name: 'Maximiliano',
    title: 'Casamiento',
    text: 'Melisa estuvo siempre a disposición y nos quedaron fotos hermosas de uno de los mejores días de nuestras vidas.',
    date: '24/10/2024',
  },
  {
    id: 4,
    name: 'Nahir',
    title: 'Todo muy lindo',
    text: 'Nos encantaron las fotos y los clips de la preboda y la boda. Nos hizo sentir muy cómodos durante toda la cobertura.',
    date: '11/04/2025',
  },
]

export const awards = [
  { name: 'Wedding Awards 2025', src: '/album/wedding-award-2025.webp' },
  { name: 'Wedding Awards 2024', src: '/album/wedding-award-2024.webp' },
  { name: 'Casamientos.com', src: '/premio-1.webp' },
]

export const instagramUrl = 'https://www.instagram.com/fotosmelisasantacruz/'
export const photoTourUrl = 'https://www.barilochefototour.com.ar/'
export const googleReviewsUrl =
  'https://www.google.com/search?q=Fotografia+Melisa+Santa+Cruz+Bariloche+rese%C3%B1as'
