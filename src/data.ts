import { FrameModel, FrameShape, LensOption, Review } from './types';

export const FRAME_SHAPES: FrameShape[] = [
  {
    id: 'round',
    name: 'Retro Round',
    description: 'Estilo clásico circular de inspiración vintage, suaviza rostros angulares.',
    icon: 'Orbit'
  },
  {
    id: 'square',
    name: 'Geometric Square',
    description: 'Formas rectangulares modernas que añaden estructura y carácter.',
    icon: 'Square'
  },
  {
    id: 'clubmaster',
    name: 'Clubmaster Icon',
    description: 'Montura mixta clásica con parte superior reforzada para un aire intelectual.',
    icon: 'Glasses'
  },
  {
    id: 'aviator',
    name: 'Aviator Premium',
    description: 'La silueta atemporal con doble puente, moderna y audaz.',
    icon: 'Sliders'
  }
];

export const LENS_OPTIONS: LensOption[] = [
  {
    id: 'clear',
    name: 'BlueBlock Clear',
    description: 'Filtrado del 98% de luz azul dañina con lente transparente cristalina. Ideal para diario.',
    priceModifier: 0
  },
  {
    id: 'tint',
    name: 'BlueBlock Sun Tint',
    description: 'Lente ligeramente ahumada o ámbar para exteriores y pantallas con alto contraste.',
    priceModifier: 5
  },
  {
    id: 'prescription',
    name: 'BlueBlock Recetado',
    description: 'Protección con graduación personalizada (puedes adjuntar tu receta al comprar).',
    priceModifier: 15
  }
];

export const FRAME_MODELS: FrameModel[] = [
  {
    id: 'model-tortoise',
    name: 'Tortoise Vintage',
    description: 'Nuestra montura estrella con patrón carey vintage clásico. Lentes de acetato de alta densidad pulidos a mano para brindar distinción y confort.',
    basePrice: 35,
    shapes: ['round', 'clubmaster', 'square'],
    colors: [
      { name: 'Carey Clásico', hex: '#633c16', class: 'bg-amber-900 border-amber-950' },
      { name: 'Miel Dorado', hex: '#d97706', class: 'bg-amber-600 border-amber-700' },
      { name: 'Café Espresso', hex: '#271b13', class: 'bg-stone-900 border-stone-950' }
    ],
    image: 'https://i.ibb.co/67cqgcsh/FB-IMG-1783531796390.jpg',
    rating: 4.9,
    reviewsCount: 184,
    material: 'Acetato Biodegradable',
    featured: true
  },
  {
    id: 'model-clear',
    name: 'Clear Crystal',
    description: 'El clásico transparente contemporáneo de Happy View. Una montura translúcida ultraligera y fresca que resalta sutilmente las facciones.',
    basePrice: 35,
    shapes: ['round', 'square'],
    colors: [
      { name: 'Rosa Cuarzo', hex: '#fbcfe8', class: 'bg-pink-100 border-pink-300' },
      { name: 'Gris Bruma', hex: '#cbd5e1', class: 'bg-blue-100/50 border-blue-200' }
    ],
    image: 'https://i.ibb.co/dwJMNH0B/FB-IMG-1783531791193.jpg',
    rating: 4.8,
    reviewsCount: 142,
    material: 'TR90 Aeroespacial',
    featured: true
  },
  {
    id: 'model-obsidian',
    name: 'Obsidian Modern',
    description: 'Gafas de diseño audaz y sobrio en color negro profundo y acabados premium. Perfectas para profesionales digitales de alto rendimiento.',
    basePrice: 35,
    shapes: ['square', 'aviator', 'clubmaster'],
    colors: [
      { name: 'Negro Mate', hex: '#1c1b1b', class: 'bg-neutral-900 border-black' },
      { name: 'Gris Grafito', hex: '#4b5563', class: 'bg-gray-600 border-gray-700' },
      { name: 'Azul Abismo', hex: '#1e3a8a', class: 'bg-blue-900 border-blue-950' }
    ],
    image: 'https://i.ibb.co/20BQ6SRs/FB-IMG-1783531786216.jpg',
    rating: 4.9,
    reviewsCount: 96,
    material: 'Polímero TR90 Resistente',
    featured: false
  },
  {
    id: 'model-titanium',
    name: 'Titanium Slim',
    description: 'Estructura esbelta, liviana y flexible con aleaciones seleccionadas de alta gama. Una silueta elegante que no pesa nada en el rostro.',
    basePrice: 40,
    shapes: ['aviator', 'round'],
    colors: [
      { name: 'Oro Pulido', hex: '#d97706', class: 'bg-yellow-600 border-yellow-700' },
      { name: 'Plata Satinado', hex: '#9ca3af', class: 'bg-stone-400 border-stone-500' },
      { name: 'Oro Rosa', hex: '#fda4af', class: 'bg-rose-300 border-rose-400' }
    ],
    image: 'https://i.ibb.co/wN5kX7wF/FB-IMG-1783531782155.jpg',
    rating: 5.0,
    reviewsCount: 55,
    material: 'Aleación de Titanio & Acero',
    featured: false
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sofía Martínez',
    location: 'Madrid, ES',
    rating: 5,
    text: 'Pasaba más de 10 horas frente a las pantallas y mis ojos terminaban secos y con ardor todos los días. Desde que compré mis Tortoise con BlueBlock, los dolores de cabeza desaparecieron por completo. ¡Y el diseño es precioso!',
    date: 'Hace 3 días',
    frameStyle: 'Tortoise Vintage - Retro Round',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Alejandro Ruiz',
    location: 'Barcelona, ES',
    rating: 5,
    text: 'Aproveché la oferta combo de 2 por $60. Pedí uno transparente y uno Obsidian. La calidad de los materiales se siente de óptica de lujo. El envío fue súper rápido y llegaron en fundas hermosas. Totalmente recomendado.',
    date: 'Hace 1 semana',
    frameStyle: 'Obsidian Modern + Clear Crystal',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Valentina Castro',
    location: 'Santiago, CL',
    rating: 4.8,
    text: 'Suelo jugar videojuegos de noche y me costaba mucho conciliar el sueño. Con estos lentes noto la vista mucho más descansada y logro dormir mucho más rápido. Un 10 de 10 en diseño y protección.',
    date: 'Hace 2 semanas',
    frameStyle: 'Clear Crystal - Rosa Cuarzo',
    verified: true
  }
];

export const SIMULATION_SCENARIOS = [
  {
    id: 'gaming',
    name: 'Sesión de Gaming Nocturna',
    description: 'Monitores de alta tasa de refresco emitiendo luz azul concentrada en un entorno oscuro.',
    originalBg: 'bg-neutral-950 border border-neutral-800',
    blueLightLevel: 95,
    imagePlaceholder: '🎮'
  },
  {
    id: 'office',
    name: 'Trabajo Remoto con Hojas de Cálculo',
    description: 'Pantallas blancas brillantes con texto pequeño bajo luz de oficina fluorescente.',
    originalBg: 'bg-neutral-900 border border-neutral-800',
    blueLightLevel: 80,
    imagePlaceholder: '💻'
  },
  {
    id: 'scrolling',
    name: 'Redes Sociales antes de Dormir',
    description: 'Pantalla del smartphone muy cerca del rostro en la cama, afectando la melatonina.',
    originalBg: 'bg-neutral-950 border border-neutral-800',
    blueLightLevel: 90,
    imagePlaceholder: '📱'
  }
];
