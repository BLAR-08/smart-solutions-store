// ============================================
// PRODUCTS — Datos de productos de la tienda
// Catálogo de ejemplo para Smart Solutions.
// En producción esto vendría de una API.
// Responsable: Mayerly Aranibar
// ============================================

export const categorias = [
  { id: 'todos',       nombre: 'Todos',            icono: '🛍️' },
  { id: 'seguridad',   nombre: 'Seguridad',        icono: '📷' },
  { id: 'iluminacion', nombre: 'Iluminación',      icono: '💡' },
  { id: 'electro',     nombre: 'Electrodomésticos', icono: '🔌' },
  { id: 'audio',       nombre: 'Audio',            icono: '🔊' },
  { id: 'clima',       nombre: 'Clima',            icono: '🌡️' }
]

export const products = [
  {
    id: 1,
    name: 'Cámara de seguridad WiFi 2K',
    category: 'seguridad',
    price: 189.90,
    stock: 25,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500',
    description: 'Cámara inteligente con visión nocturna, detección de movimiento y audio bidireccional. Compatible con app móvil y asistentes de voz.'
  },
  {
    id: 2,
    name: 'Foco LED inteligente RGB',
    category: 'iluminacion',
    price: 49.90,
    stock: 80,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558002038-876f1d0aa8d6?w=500',
    description: 'Foco regulable con 16 millones de colores, controlable desde el celular. Compatible con Alexa y Google Home.'
  },
  {
    id: 3,
    name: 'Enchufe inteligente WiFi',
    category: 'electro',
    price: 34.90,
    stock: 120,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558089966-a11f54e07996?w=500',
    description: 'Controla cualquier aparato eléctrico desde tu celular. Incluye medidor de consumo energético para ahorrar en tu recibo de luz.'
  },
  {
    id: 4,
    name: 'Parlante Bluetooth portátil',
    category: 'audio',
    price: 129.00,
    stock: 40,
    featured: false,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    description: 'Sonido envolvente con graves profundos, batería de 12 horas y resistencia al agua IPX7. Ideal para usar en casa o al aire libre.'
  },
  {
    id: 5,
    name: 'Termostato inteligente',
    category: 'clima',
    price: 259.00,
    stock: 15,
    featured: true,
    image: 'https://images.unsplash.com/photo-1567925086324-cfdfc1f5a5ab?w=500',
    description: 'Controla la temperatura de tu hogar de forma remota. Aprende tus rutinas y reduce el consumo de energía automáticamente.'
  },
  {
    id: 6,
    name: 'Sensor de movimiento WiFi',
    category: 'seguridad',
    price: 59.90,
    stock: 60,
    featured: false,
    image: 'https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?w=500',
    description: 'Detecta movimiento en tiempo real y envía alertas a tu celular. Fácil de instalar, funciona con pilas.'
  },
  {
    id: 7,
    name: 'Tira LED RGB 5 metros',
    category: 'iluminacion',
    price: 79.90,
    stock: 50,
    featured: false,
    image: 'https://images.unsplash.com/photo-1565636192335-69c79feeb61a?w=500',
    description: 'Tira LED flexible con control por app y mando a distancia. Ritmos de música y animaciones incluidos.'
  },
  {
    id: 8,
    name: 'Aspiradora robot con mapeo',
    category: 'electro',
    price: 899.00,
    stock: 10,
    featured: true,
    image: 'https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?w=500',
    description: 'Robot aspirador con navegación láser, programable desde el celular. 150 minutos de autonomía por carga.'
  },
  {
    id: 9,
    name: 'Barra de sonido 2.1',
    category: 'audio',
    price: 499.00,
    stock: 20,
    featured: false,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500',
    description: 'Barra de sonido con subwoofer inalámbrico. Bluetooth, HDMI y óptico. Transforma la experiencia de tu TV.'
  },
  {
    id: 10,
    name: 'Cerradura inteligente con huella',
    category: 'seguridad',
    price: 349.00,
    stock: 18,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500',
    description: 'Abre tu puerta con huella, clave o desde el celular. Registro de accesos y alertas en tiempo real.'
  },
  {
    id: 11,
    name: 'Ventilador de torre inteligente',
    category: 'clima',
    price: 299.00,
    stock: 22,
    featured: false,
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=500',
    description: 'Ventilador silencioso con oscilación amplia, temporizador y control por app. Modo noche y velocidades ajustables.'
  },
  {
    id: 12,
    name: 'Audífonos inalámbricos TWS',
    category: 'audio',
    price: 159.00,
    stock: 70,
    featured: false,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    description: 'Audífonos True Wireless con cancelación de ruido y 30 horas de batería con el estuche. Bluetooth 5.3.'
  }
]
