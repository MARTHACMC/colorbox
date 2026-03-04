// Sistema de configuración de visibilidad de categorías y productos
export interface VisibilityConfig {
  categories: Record<string, boolean>;
  products: Record<string, boolean>;
}

// Configuración por defecto - todos los productos visibles
export const defaultVisibilityConfig: VisibilityConfig = {
  categories: {
    'fotografia': true,
    'papeleria-corporativa': true,
    'marketing': true,
    'productos-promocionales': true,
    'decoracion': true,
    'calendarios': true,
  },
  products: {
    // Fotografía
    'impresion-fotos': true,
    'fotolibros': true,
    'fotos-enmarcadas': true,
    // Papelería Corporativa
    'tarjetas-presentacion': true,
    'papel-membretado': true,
    'sobres': true,
    'carpetas': true,
    // Marketing
    'flyers': true,
    'volantes': true,
    'brochures': true,
    'posters': true,
    'banners': true,
    'stickers': true,
    'etiquetas-productos': true,
    // Productos Promocionales
    'tazas': true,
    'termos': true,
    'camisetas': true,
    'gorras': true,
    'boligrafos': true,
    'llaveros': true,
    // Decoración
    'cuadros-decorativos': true,
    'lienzos': true,
    'vinilos': true,
    'wall-art': true,
    // Calendarios
    'calendarios-pared': true,
    'calendarios-escritorio': true,
    'calendarios-personalizados': true,
  }
};

// Tipos de papel disponibles (mínimo 10)
export interface PaperType {
  id: string;
  name: string;
  description: string;
  weight: string;
  finish: 'mate' | 'brillante' | 'satinado' | 'texturizado';
  priceMultiplier: number;
}

export const paperTypes: PaperType[] = [
  {
    id: 'bond-90',
    name: 'Bond Blanco 90gr',
    description: 'Papel estándar para documentos',
    weight: '90g/m²',
    finish: 'mate',
    priceMultiplier: 1.0
  },
  {
    id: 'bond-120',
    name: 'Bond Blanco 120gr',
    description: 'Papel más grueso para documentos importantes',
    weight: '120g/m²',
    finish: 'mate',
    priceMultiplier: 1.2
  },
  {
    id: 'couche-mate-150',
    name: 'Couché Mate 150gr',
    description: 'Ideal para flyers y folletos',
    weight: '150g/m²',
    finish: 'mate',
    priceMultiplier: 1.4
  },
  {
    id: 'couche-brillo-150',
    name: 'Couché Brillo 150gr',
    description: 'Colores vibrantes para marketing',
    weight: '150g/m²',
    finish: 'brillante',
    priceMultiplier: 1.5
  },
  {
    id: 'couche-mate-250',
    name: 'Couché Mate 250gr',
    description: 'Perfecto para tarjetas y portadas',
    weight: '250g/m²',
    finish: 'mate',
    priceMultiplier: 1.8
  },
  {
    id: 'couche-brillo-300',
    name: 'Couché Brillo 300gr',
    description: 'Máxima calidad para impresiones premium',
    weight: '300g/m²',
    finish: 'brillante',
    priceMultiplier: 2.2
  },
  {
    id: 'texturizado-lino',
    name: 'Texturizado Lino',
    description: 'Elegante acabado textil para invitaciones',
    weight: '220g/m²',
    finish: 'texturizado',
    priceMultiplier: 2.5
  },
  {
    id: 'perlado',
    name: 'Papel Perlado',
    description: 'Acabado nacarado para ocasiones especiales',
    weight: '250g/m²',
    finish: 'satinado',
    priceMultiplier: 3.0
  },
  {
    id: 'kraft',
    name: 'Papel Kraft',
    description: 'Look natural y ecológico',
    weight: '200g/m²',
    finish: 'mate',
    priceMultiplier: 1.6
  },
  {
    id: 'vinil-adhesivo',
    name: 'Vinil Adhesivo',
    description: 'Resistente al agua para stickers y etiquetas',
    weight: 'N/A',
    finish: 'brillante',
    priceMultiplier: 2.8
  },
  {
    id: 'lienzo',
    name: 'Lienzo Artístico',
    description: 'Para cuadros y reproducciones artísticas',
    weight: '340g/m²',
    finish: 'mate',
    priceMultiplier: 4.0
  },
  {
    id: 'foto-brillo',
    name: 'Papel Fotográfico Brillo',
    description: 'Calidad profesional para fotografías',
    weight: '260g/m²',
    finish: 'brillante',
    priceMultiplier: 2.0
  }
];

// Formatos disponibles
export interface Format {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: 'mm' | 'cm' | 'pulgadas';
}

export const formats: Format[] = [
  { id: 'tarjeta', name: 'Tarjeta (9×5cm)', width: 90, height: 50, unit: 'mm' },
  { id: 'carta', name: 'Carta (21.6×27.9cm)', width: 216, height: 279, unit: 'mm' },
  { id: 'oficio', name: 'Oficio (21.6×35.6cm)', width: 216, height: 356, unit: 'mm' },
  { id: 'a4', name: 'A4 (21×29.7cm)', width: 210, height: 297, unit: 'mm' },
  { id: 'a3', name: 'A3 (29.7×42cm)', width: 297, height: 420, unit: 'mm' },
  { id: 'a2', name: 'A2 (42×59.4cm)', width: 420, height: 594, unit: 'mm' },
  { id: 'a1', name: 'A1 (59.4×84.1cm)', width: 594, height: 841, unit: 'mm' },
  { id: '4x6', name: '4×6 pulgadas (10×15cm)', width: 4, height: 6, unit: 'pulgadas' },
  { id: '5x7', name: '5×7 pulgadas (13×18cm)', width: 5, height: 7, unit: 'pulgadas' },
  { id: '8x10', name: '8×10 pulgadas (20×25cm)', width: 8, height: 10, unit: 'pulgadas' },
  { id: '11x14', name: '11×14 pulgadas (28×36cm)', width: 11, height: 14, unit: 'pulgadas' },
  { id: '16x20', name: '16×20 pulgadas (41×51cm)', width: 16, height: 20, unit: 'pulgadas' },
  { id: '20x30', name: '20×30 pulgadas (51×76cm)', width: 20, height: 30, unit: 'pulgadas' },
  { id: '24x36', name: '24×36 pulgadas (61×91cm)', width: 24, height: 36, unit: 'pulgadas' },
  { id: '36x48', name: '36×48 pulgadas (91×122cm)', width: 36, height: 48, unit: 'pulgadas' },
  { id: '48x72', name: '48×72 pulgadas (122×183cm)', width: 48, height: 72, unit: 'pulgadas' },
];

// Categorías de productos
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  products: Product[];
}

// Producto individual
export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  basePrice: number;
  priceUnit: 'unidad' | 'cm2' | 'm2' | 'pagina';
  availableFormats: string[];
  availablePapers: string[];
  minQuantity: number;
  maxQuantity: number;
  image: string;
  features: string[];
  turnaroundTime: string;
}

// Categoría: Fotografía
const fotografiaProducts: Product[] = [
  {
    id: 'impresion-fotos',
    name: 'Impresión de Fotografías',
    description: 'Impresión profesional de fotografías en diversos tamaños y acabados. Ideal para conservar tus recuerdos más preciados con la máxima calidad.',
    shortDescription: 'Tus recuerdos en alta calidad',
    categoryId: 'fotografia',
    basePrice: 0.5,
    priceUnit: 'unidad',
    availableFormats: ['4x6', '5x7', '8x10', '11x14', '16x20', '20x30', '24x36'],
    availablePapers: ['foto-brillo', 'couche-mate-250', 'lienzo'],
    minQuantity: 1,
    maxQuantity: 1000,
    image: '/images/products/fotos.jpg',
    features: ['Alta resolución', 'Colores vibrantes', 'Resistente a la decoloración', 'Varios acabados'],
    turnaroundTime: '24-48 horas'
  },
  {
    id: 'fotolibros',
    name: 'Fotolibros',
    description: 'Crea álbumes personalizados con tus mejores fotos. Perfectos para bodas, viajes, eventos especiales o como regalo único.',
    shortDescription: 'Álbumes personalizados únicos',
    categoryId: 'fotografia',
    basePrice: 25,
    priceUnit: 'pagina',
    availableFormats: ['a4', 'a3', 'carta'],
    availablePapers: ['couche-mate-250', 'couche-brillo-300', 'texturizado-lino', 'perlado'],
    minQuantity: 1,
    maxQuantity: 50,
    image: '/images/products/fotolibros.jpg',
    features: ['Tapa dura o blanda', 'Encuadernación profesional', 'Diseño personalizado', 'Papel de alta calidad'],
    turnaroundTime: '3-5 días'
  },
  {
    id: 'fotos-enmarcadas',
    name: 'Fotos Enmarcadas',
    description: 'Fotografías impresas y enmarcadas listas para colgar. Elige entre diferentes estilos de marco para complementar tu decoración.',
    shortDescription: 'Listas para colgar',
    categoryId: 'fotografia',
    basePrice: 35,
    priceUnit: 'unidad',
    availableFormats: ['5x7', '8x10', '11x14', '16x20', '20x30'],
    availablePapers: ['foto-brillo', 'lienzo'],
    minQuantity: 1,
    maxQuantity: 100,
    image: '/images/products/fotos-enmarcadas.jpg',
    features: ['Marcos de madera o metal', 'Vidrio de protección', 'Listo para colgar', 'Varios acabados'],
    turnaroundTime: '2-3 días'
  }
];

// Categoría: Papelería Corporativa
const papeleriaProducts: Product[] = [
  {
    id: 'tarjetas-presentacion',
    name: 'Tarjetas de Presentación',
    description: 'Tarjetas profesionales que dejan una impresión duradera. Disponibles en diversos acabados como mate, brillo, texturizado y con detalles en relieve.',
    shortDescription: 'Tu primera impresión profesional',
    categoryId: 'papeleria-corporativa',
    basePrice: 25,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: ['couche-mate-250', 'couche-brillo-300', 'texturizado-lino', 'perlado', 'kraft'],
    minQuantity: 100,
    maxQuantity: 10000,
    image: '/images/products/tarjetas.jpg',
    features: ['Diseño profesional incluido', 'Barniz UV opcional', 'Esquinas redondeadas', 'Papel de lujo disponible'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'papel-membretado',
    name: 'Papel Membretado',
    description: 'Papel con el diseño de tu empresa para cartas, facturas y documentos oficiales. Proyecta profesionalismo en cada comunicación.',
    shortDescription: 'Documentos con identidad',
    categoryId: 'papeleria-corporativa',
    basePrice: 0.15,
    priceUnit: 'unidad',
    availableFormats: ['carta', 'oficio', 'a4'],
    availablePapers: ['bond-90', 'bond-120', 'couche-mate-150'],
    minQuantity: 500,
    maxQuantity: 50000,
    image: '/images/products/papel-membretado.jpg',
    features: ['Diseño corporativo', 'Papel de calidad', 'Impresión nítida', 'Opción reciclado'],
    turnaroundTime: '2-4 días'
  },
  {
    id: 'sobres',
    name: 'Sobres Personalizados',
    description: 'Sobres con el branding de tu empresa en diferentes tamaños. Perfectos para correspondencia oficial y envíos profesionales.',
    shortDescription: 'Correspondencia profesional',
    categoryId: 'papeleria-corporativa',
    basePrice: 0.25,
    priceUnit: 'unidad',
    availableFormats: ['carta', 'oficio'],
    availablePapers: ['bond-90', 'kraft'],
    minQuantity: 250,
    maxQuantity: 25000,
    image: '/images/products/sobres.jpg',
    features: ['Ventana opcional', 'Cierre autoadhesivo', 'Diseño personalizado', 'Varios tamaños'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'carpetas',
    name: 'Carpetas Corporativas',
    description: 'Carpetas con bolsillos y diseño personalizado. Ideales para presentaciones, propuestas y material de ventas.',
    shortDescription: 'Presentaciones impactantes',
    categoryId: 'papeleria-corporativa',
    basePrice: 3.5,
    priceUnit: 'unidad',
    availableFormats: ['carta', 'oficio', 'a4'],
    availablePapers: ['couche-mate-250', 'couche-brillo-300', 'kraft'],
    minQuantity: 50,
    maxQuantity: 5000,
    image: '/images/products/carpetas.jpg',
    features: ['Bolsillos interiores', 'Ranura para tarjeta', 'Laminación opcional', 'Diseño profesional'],
    turnaroundTime: '3-5 días'
  }
];

// Categoría: Marketing
const marketingProducts: Product[] = [
  {
    id: 'flyers',
    name: 'Flyers',
    description: 'Volantes publicitarios de alto impacto. Perfectos para promociones, eventos y campañas de marketing directo.',
    shortDescription: 'Promoción de alto impacto',
    categoryId: 'marketing',
    basePrice: 0.08,
    priceUnit: 'unidad',
    availableFormats: ['carta', 'a4', 'tarjeta'],
    availablePapers: ['couche-mate-150', 'couche-brillo-150', 'bond-120'],
    minQuantity: 100,
    maxQuantity: 50000,
    image: '/images/products/flyers.jpg',
    features: ['Diseño incluido', 'Entrega rápida', 'Varios acabados', 'Doble cara disponible'],
    turnaroundTime: '24-48 horas'
  },
  {
    id: 'volantes',
    name: 'Volantes',
    description: 'Material publicitario económico para distribución masiva. Ideal para alcance amplio con presupuesto limitado.',
    shortDescription: 'Alcance masivo económico',
    categoryId: 'marketing',
    basePrice: 0.05,
    priceUnit: 'unidad',
    availableFormats: ['carta', 'a4', 'tarjeta'],
    availablePapers: ['bond-90', 'bond-120'],
    minQuantity: 500,
    maxQuantity: 100000,
    image: '/images/products/volantes.jpg',
    features: ['Precio competitivo', 'Entrega express', 'Diseño profesional', 'Cantidades grandes'],
    turnaroundTime: '24 horas'
  },
  {
    id: 'brochures',
    name: 'Brochures',
    description: 'Folletos plegados con información detallada de tus productos o servicios. Disponibles en diversos tipos de pliegue.',
    shortDescription: 'Información detallada elegante',
    categoryId: 'marketing',
    basePrice: 0.45,
    priceUnit: 'unidad',
    availableFormats: ['carta', 'a4'],
    availablePapers: ['couche-mate-150', 'couche-brillo-150', 'texturizado-lino'],
    minQuantity: 100,
    maxQuantity: 10000,
    image: '/images/products/brochures.jpg',
    features: ['Díptico, tríptico, z-fold', 'Diseño profesional', 'Papel de calidad', 'Acabados especiales'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'posters',
    name: 'Posters',
    description: 'Carteles de gran formato para publicidad interior. Captura la atención con colores vibrantes y alta calidad de impresión.',
    shortDescription: 'Gran formato impactante',
    categoryId: 'marketing',
    basePrice: 5,
    priceUnit: 'unidad',
    availableFormats: ['11x14', '16x20', '20x30', '24x36', 'a2', 'a1'],
    availablePapers: ['couche-mate-150', 'couche-brillo-150'],
    minQuantity: 1,
    maxQuantity: 1000,
    image: '/images/products/posters.jpg',
    features: ['Alta resolución', 'Colores vibrantes', 'Laminación opcional', 'Montaje disponible'],
    turnaroundTime: '24-48 horas'
  },
  {
    id: 'banners',
    name: 'Banners y Lonas',
    description: 'Publicidad de gran formato para exteriores e interiores. Resistentes a la intemperie con colores duraderos.',
    shortDescription: 'Publicidad exterior resistente',
    categoryId: 'marketing',
    basePrice: 8,
    priceUnit: 'm2',
    availableFormats: ['36x48', '48x72'],
    availablePapers: ['vinil-adhesivo'],
    minQuantity: 1,
    maxQuantity: 100,
    image: '/images/products/banners.jpg',
    features: ['Resistente a la intemperie', 'Ojetes incluidos', 'Doble costura', 'Colores UV'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'stickers',
    name: 'Stickers y Calcomanías',
    description: 'Adhesivos personalizados en cualquier forma y tamaño. Perfectos para branding, promociones y decoración.',
    shortDescription: 'Adhesivos en cualquier forma',
    categoryId: 'marketing',
    basePrice: 0.15,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta', 'carta', 'a4'],
    availablePapers: ['vinil-adhesivo', 'couche-mate-150'],
    minQuantity: 50,
    maxQuantity: 10000,
    image: '/images/products/stickers.jpg',
    features: ['Corte personalizado', 'Resistente al agua', 'Interior y exterior', 'Fácil aplicación'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'etiquetas-productos',
    name: 'Etiquetas de Productos',
    description: 'Etiquetas profesionales para tus productos. Resistentes, con acabados de alta calidad y diseño personalizado.',
    shortDescription: 'Etiquetado profesional',
    categoryId: 'marketing',
    basePrice: 0.1,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: ['vinil-adhesivo', 'couche-mate-150', 'kraft'],
    minQuantity: 100,
    maxQuantity: 50000,
    image: '/images/products/etiquetas.jpg',
    features: ['Resistentes', 'Corte preciso', 'Diseño personalizado', 'Varios acabados'],
    turnaroundTime: '2-4 días'
  }
];

// Categoría: Productos Promocionales
const promocionalesProducts: Product[] = [
  {
    id: 'tazas',
    name: 'Tazas Personalizadas',
    description: 'Tazas de cerámica con tu diseño. El regalo promocional perfecto que todos usarán todos los días.',
    shortDescription: 'El regalo del día a día',
    categoryId: 'productos-promocionales',
    basePrice: 8,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: [],
    minQuantity: 12,
    maxQuantity: 1000,
    image: '/images/products/tazas.jpg',
    features: ['Cerámica de alta calidad', 'Resistente al microondas', 'Lavavajillas seguro', 'Caja de regalo opcional'],
    turnaroundTime: '3-5 días'
  },
  {
    id: 'termos',
    name: 'Termos y Botellas',
    description: 'Termos y botellas personalizadas para hidratación con estilo. Excelente visibilidad de marca.',
    shortDescription: 'Hidratación con estilo',
    categoryId: 'productos-promocionales',
    basePrice: 15,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: [],
    minQuantity: 12,
    maxQuantity: 500,
    image: '/images/products/termos.jpg',
    features: ['Acero inoxidable', 'Mantiene temperatura', 'Diseño duradero', 'Varios tamaños'],
    turnaroundTime: '3-5 días'
  },
  {
    id: 'camisetas',
    name: 'Camisetas Personalizadas',
    description: 'Playeras con impresión de alta calidad. Perfectas para eventos, uniformes o merchandising.',
    shortDescription: 'Viste tu marca',
    categoryId: 'productos-promocionales',
    basePrice: 12,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: [],
    minQuantity: 12,
    maxQuantity: 500,
    image: '/images/products/camisetas.jpg',
    features: ['Algodón 100%', 'Impresión duradera', 'Varias tallas', 'Varios colores'],
    turnaroundTime: '3-5 días'
  },
  {
    id: 'gorras',
    name: 'Gorras Bordadas',
    description: 'Gorras con bordado de tu logo. Accesorio práctico con excelente exposición de marca.',
    shortDescription: 'Accesorio con estilo',
    categoryId: 'productos-promocionales',
    basePrice: 18,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: [],
    minQuantity: 12,
    maxQuantity: 500,
    image: '/images/products/gorras.jpg',
    features: ['Bordado profesional', 'Ajustable', 'Varios colores', 'Alta durabilidad'],
    turnaroundTime: '5-7 días'
  },
  {
    id: 'boligrafos',
    name: 'Bolígrafos Personalizados',
    description: 'Plumas con tu logo impreso. El clásico promocional que nunca falla.',
    shortDescription: 'El clásico efectivo',
    categoryId: 'productos-promocionales',
    basePrice: 1.5,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: [],
    minQuantity: 50,
    maxQuantity: 5000,
    image: '/images/products/boligrafos.jpg',
    features: ['Tinta de calidad', 'Diseño ergonómico', 'Varios colores', 'Empaque opcional'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'llaveros',
    name: 'Llaveros Personalizados',
    description: 'Llaveros con tu marca. Un recordatorio constante de tu negocio en las manos de tus clientes.',
    shortDescription: 'Siempre presente',
    categoryId: 'productos-promocionales',
    basePrice: 3,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta'],
    availablePapers: [],
    minQuantity: 50,
    maxQuantity: 2000,
    image: '/images/products/llaveros.jpg',
    features: ['Metal o acrílico', 'Diseño duradero', 'Varios estilos', 'Empaque individual'],
    turnaroundTime: '3-5 días'
  }
];

// Categoría: Decoración
const decoracionProducts: Product[] = [
  {
    id: 'cuadros-decorativos',
    name: 'Cuadros Decorativos',
    description: 'Impresiones artísticas enmarcadas para hogar u oficina. Transforma cualquier espacio con arte personalizado.',
    shortDescription: 'Arte para tus espacios',
    categoryId: 'decoracion',
    basePrice: 45,
    priceUnit: 'unidad',
    availableFormats: ['11x14', '16x20', '20x30', '24x36'],
    availablePapers: ['lienzo', 'couche-mate-250'],
    minQuantity: 1,
    maxQuantity: 100,
    image: '/images/products/cuadros.jpg',
    features: ['Marco incluido', 'Listo para colgar', 'Varios estilos', 'Alta calidad artística'],
    turnaroundTime: '3-5 días'
  },
  {
    id: 'lienzos',
    name: 'Impresión en Lienzo',
    description: 'Tus fotos o diseños en lienzo de artista. Elegancia y durabilidad para decoración premium.',
    shortDescription: 'Elegancia artística',
    categoryId: 'decoracion',
    basePrice: 35,
    priceUnit: 'unidad',
    availableFormats: ['8x10', '11x14', '16x20', '20x30', '24x36'],
    availablePapers: ['lienzo'],
    minQuantity: 1,
    maxQuantity: 50,
    image: '/images/products/lienzos.jpg',
    features: ['Lienzo de artista', 'Bastidor de madera', 'Listo para colgar', 'Acabado galería'],
    turnaroundTime: '3-5 días'
  },
  {
    id: 'vinilos',
    name: 'Vinilos Decorativos',
    description: 'Adhesivos de gran formato para paredes y ventanas. Personaliza tu espacio con mensajes o diseños únicos.',
    shortDescription: 'Transforma tus paredes',
    categoryId: 'decoracion',
    basePrice: 12,
    priceUnit: 'm2',
    availableFormats: ['carta', 'a4', 'a3', 'a2', 'a1'],
    availablePapers: ['vinil-adhesivo'],
    minQuantity: 1,
    maxQuantity: 100,
    image: '/images/products/vinilos.jpg',
    features: ['Fácil aplicación', 'Removible', 'Resistente', 'Corte personalizado'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'wall-art',
    name: 'Wall Art Modular',
    description: 'Conjuntos de impresiones coordinadas para crear murales decorativos. Diseño impactante para cualquier ambiente.',
    shortDescription: 'Murales impactantes',
    categoryId: 'decoracion',
    basePrice: 85,
    priceUnit: 'unidad',
    availableFormats: ['16x20', '20x30', '24x36'],
    availablePapers: ['lienzo', 'couche-mate-250'],
    minQuantity: 1,
    maxQuantity: 20,
    image: '/images/products/wall-art.jpg',
    features: ['Set coordinado', 'Diseño profesional', 'Varios paneles', 'Instalación incluida'],
    turnaroundTime: '5-7 días'
  }
];

// Categoría: Calendarios
const calendariosProducts: Product[] = [
  {
    id: 'calendarios-pared',
    name: 'Calendarios de Pared',
    description: 'Calendarios mensuales o anuales para pared. Mantén tu marca visible todo el año en oficinas y hogares.',
    shortDescription: 'Visibilidad todo el año',
    categoryId: 'calendarios',
    basePrice: 8,
    priceUnit: 'unidad',
    availableFormats: ['a3', 'a2', '11x14'],
    availablePapers: ['couche-mate-150', 'couche-brillo-150'],
    minQuantity: 10,
    maxQuantity: 1000,
    image: '/images/products/calendarios-pared.jpg',
    features: ['Espiral o encuadernado', 'Fotos personalizadas', 'Diseño profesional', 'Agujero para colgar'],
    turnaroundTime: '3-5 días'
  },
  {
    id: 'calendarios-escritorio',
    name: 'Calendarios de Escritorio',
    description: 'Calendarios de sobremesa con tu branding. Prácticos y funcionales para el día a día de oficina.',
    shortDescription: 'Prácticos de escritorio',
    categoryId: 'calendarios',
    basePrice: 5,
    priceUnit: 'unidad',
    availableFormats: ['tarjeta', 'a4'],
    availablePapers: ['couche-mate-150', 'bond-120'],
    minQuantity: 25,
    maxQuantity: 2000,
    image: '/images/products/calendarios-escritorio.jpg',
    features: ['Base incluida', '12 meses', 'Diseño personalizado', 'Compacto'],
    turnaroundTime: '2-3 días'
  },
  {
    id: 'calendarios-personalizados',
    name: 'Calendarios Personalizados',
    description: 'Calendarios con fotos familiares o de empresa. El regalo perfecto para clientes y empleados.',
    shortDescription: 'Regalo personalizado único',
    categoryId: 'calendarios',
    basePrice: 15,
    priceUnit: 'unidad',
    availableFormats: ['a4', 'a3'],
    availablePapers: ['couche-mate-250', 'couche-brillo-300'],
    minQuantity: 5,
    maxQuantity: 500,
    image: '/images/products/calendarios-personalizados.jpg',
    features: ['Fotos personalizadas', 'Diseño único', 'Alta calidad', 'Empaque de regalo'],
    turnaroundTime: '3-5 días'
  }
];

// Exportar todas las categorías
export const categories: Category[] = [
  {
    id: 'fotografia',
    name: 'Fotografía',
    description: 'Impresión de fotos, fotolibros y enmarcados',
    icon: 'Camera',
    color: '#ff87cf',
    products: fotografiaProducts
  },
  {
    id: 'papeleria-corporativa',
    name: 'Papelería Corporativa',
    description: 'Tarjetas, membretes, sobres y carpetas',
    icon: 'Briefcase',
    color: '#0097b2',
    products: papeleriaProducts
  },
  {
    id: 'marketing',
    name: 'Marketing y Publicidad',
    description: 'Flyers, banners, stickers y más',
    icon: 'Megaphone',
    color: '#ff8f4b',
    products: marketingProducts
  },
  {
    id: 'productos-promocionales',
    name: 'Productos Promocionales',
    description: 'Tazas, camisetas, gorras y regalos',
    icon: 'Gift',
    color: '#7ab93d',
    products: promocionalesProducts
  },
  {
    id: 'decoracion',
    name: 'Decoración',
    description: 'Cuadros, lienzos y vinilos decorativos',
    icon: 'Home',
    color: '#8e5db7',
    products: decoracionProducts
  },
  {
    id: 'calendarios',
    name: 'Calendarios',
    description: 'Calendarios de pared y escritorio',
    icon: 'Calendar',
    color: '#ffd034',
    products: calendariosProducts
  }
];

// Función para obtener productos visibles según configuración
export function getVisibleProducts(config: VisibilityConfig = defaultVisibilityConfig): Product[] {
  const visibleProducts: Product[] = [];
  
  categories.forEach(category => {
    if (config.categories[category.id]) {
      category.products.forEach(product => {
        if (config.products[product.id] !== false) {
          visibleProducts.push(product);
        }
      });
    }
  });
  
  return visibleProducts;
}

// Función para obtener categorías visibles
export function getVisibleCategories(config: VisibilityConfig = defaultVisibilityConfig): Category[] {
  return categories.filter(category => config.categories[category.id]);
}

// Función para obtener un producto por ID
export function getProductById(id: string): Product | undefined {
  for (const category of categories) {
    const product = category.products.find(p => p.id === id);
    if (product) return product;
  }
  return undefined;
}

// Función para obtener tipos de papel disponibles para un producto
export function getPaperTypesForProduct(product: Product): PaperType[] {
  return paperTypes.filter(paper => product.availablePapers.includes(paper.id));
}

// Función para obtener formatos disponibles para un producto
export function getFormatsForProduct(product: Product): Format[] {
  return formats.filter(format => product.availableFormats.includes(format.id));
}
