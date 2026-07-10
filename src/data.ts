export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: 'economic' | 'premium' | 'sun';
  tag?: string;
}

export interface Testimony {
  id: string;
  name: string;
  text: string;
  stars: number;
  role?: string;
  avatar?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Executive',
    description: 'Armazón de acetato premium con bisagras reforzadas. Diseño rectangular ideal para rostros redondos u ovalados.',
    price: 45,
    originalPrice: 90,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    category: 'economic',
    tag: '2X1 Inauguración'
  },
  {
    id: '2',
    name: 'Aviator Modern',
    description: 'Estructura metálica ultraligera de alta resistencia. Estilo aviador renovado con terminales suaves.',
    price: 45,
    originalPrice: 90,
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600',
    category: 'economic',
    tag: '2X1 Popular'
  },
  {
    id: '3',
    name: 'Cat-Eye Elegance',
    description: 'Diseño retro moderno que resalta las facciones. Polímero de alta densidad resistente a impactos cotidianos.',
    price: 45,
    originalPrice: 90,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
    category: 'economic',
    tag: '2X1 Tendencia'
  },
  {
    id: '4',
    name: 'Titanium Minimalist',
    description: 'Aleación de titanio flexible y memory-metal. Máximo confort sin puntos de presión en la nariz.',
    price: 65,
    originalPrice: 130,
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600',
    category: 'premium',
    tag: 'Alta Gama 2X1'
  },
  {
    id: '5',
    name: 'Urban Acetate Hex',
    description: 'Forma geométrica hexagonal vanguardista. Combinación de colores carey y detalles dorados sutiles.',
    price: 65,
    originalPrice: 130,
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=600',
    category: 'premium',
    tag: 'Exclusivo 2X1'
  },
  {
    id: '6',
    name: 'Polarized Explorer',
    description: 'Lunas polarizadas con protección UV400 total. Filtro de alta definición para conducción y exteriores.',
    price: 55,
    originalPrice: 110,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    category: 'sun',
    tag: 'Sol 2X1'
  }
];

export const TESTIMONIALS: Testimony[] = [
  {
    id: '1',
    name: 'María Fernanda C.',
    text: 'Excelente atención en el local de la Alborada. Aproveché la promoción 2X1 y me entregaron mis dos lentes con la medida exacta. Súper recomendados.',
    stars: 5,
    role: 'Cliente Satisfecha',
    avatar: 'https://i.pravatar.cc/150?u=maria'
  },
  {
    id: '2',
    name: 'Carlos Enrique J.',
    text: 'Muy buena experiencia en Los Ceibos. Los lentes BlueBlock realmente descansan la vista después de horas en la oficina. La calidad del armazón es superior.',
    stars: 5,
    role: 'Usuario BlueBlock',
    avatar: 'https://i.pravatar.cc/150?u=carlos'
  },
  {
    id: '3',
    name: 'Ana Lucía P.',
    text: 'Me encantaron mis nuevos Cat-Eye. El diseño es moderno y ligero. Es la primera vez que encuentro una óptica en Urdesa con tanta variedad y buen precio.',
    stars: 5,
    role: 'Diseñadora Digital',
    avatar: 'https://i.pravatar.cc/150?u=ana'
  },
  {
    id: '4',
    name: 'Roberto V.',
    text: 'Compré las gafas polarizadas para manejar y son excelentes. El trato en el local de Samborondón fue impecable. Recomiendo el combo 2X1 sin dudarlo.',
    stars: 5,
    role: 'Empresario',
    avatar: 'https://i.pravatar.cc/150?u=roberto'
  }
];

// Legacy exports to satisfy unused components during transition
export const FRAME_MODELS: any[] = [];
export const FRAME_SHAPES: any[] = [];
export const LENS_OPTIONS: any[] = [];
export const SIMULATION_SCENARIOS: any[] = [];
