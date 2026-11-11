// Todo el contenido del capítulo 01 vive acá: cambiá textos y rutas sin tocar los componentes.
// Las fotos y el video van en: public/cultura/territorio/
// Si un archivo no existe, se muestra un degradado de reemplazo (no se rompe nada).
const BASE = '/cultura/territorio';

export const portada = {
  foto: `${BASE}/hero.jpg`, // panorámica de la Quebrada (fondo del hero)
  video: `${BASE}/quebrada.mp4`,
  poster: `${BASE}/video-poster.jpg`,
};

export const textos = {
  intro:
    'La Quebrada de Humahuaca, un paisaje único de montañas, colores y tradición, es el corazón cultural de Jujuy. Aquí, la tierra y su gente conservan una historia viva que se transmite de generación en generación.',
  identidadTitulo: 'Un paisaje con identidad',
  identidad:
    'La Quebrada de Humahuaca fue declarada Patrimonio Mundial por la UNESCO en 2003, y se destaca por sus cerros multicolores, pueblos ancestrales y profundo legado cultural.',
  // icono: 'pueblos' | 'historia' | 'paisajes' (los dibuja CapituloTerritorio)
  puntos: [
    { icono: 'pueblos', texto: 'Recorre sus pueblos' },
    { icono: 'historia', texto: 'Conoce su historia' },
    { icono: 'paisajes', texto: 'Descubre sus paisajes' },
  ],
};

// Pueblos de sur a norte. x / y son porcentajes sobre el mapa esquemático (0-100).
export const pueblos = [
  {
    id: 'purmamarca',
    nombre: 'Purmamarca',
    lugar: 'Al pie del Cerro de los Siete Colores',
    x: 20,
    y: 74,
    tono: 0,
    fotos: [`${BASE}/purmamarca-1.jpg`, `${BASE}/purmamarca-2.jpg`],
    ubicacion: 'Al sur de la Quebrada, cerca del cruce con la Ruta Nacional 52.',
    descripcion:
      'Purmamarca conserva su plaza, su feria artesanal y la iglesia de adobe de Santa Rosa de Lima. Los colores del cerro que la cobija cambian con la luz de cada hora.',
  },
  {
    id: 'maimara',
    nombre: 'Maimará',
    lugar: 'La Paleta del Pintor',
    x: 40,
    y: 60,
    tono: 1,
    fotos: [`${BASE}/maimara-1.jpg`, `${BASE}/maimara-2.jpg`],
    ubicacion: 'Sobre la Ruta Nacional 9, antes de llegar a Tilcara.',
    descripcion:
      'Sus cerros forman la Paleta del Pintor, un abanico de rojos, ocres y verdes que se aprecia mejor desde la ruta. El cementerio, trepado en la ladera, es una de las postales más conocidas de la Quebrada.',
  },
  {
    id: 'tilcara',
    nombre: 'Tilcara',
    lugar: 'El Pucará y la vida cultural',
    x: 55,
    y: 50,
    tono: 2,
    fotos: [`${BASE}/tilcara-1.jpg`, `${BASE}/tilcara-2.jpg`],
    ubicacion: 'En el centro de la Quebrada, sobre la Ruta Nacional 9.',
    descripcion:
      'Aquí se levanta el Pucará, un antiguo poblado fortificado prehispánico sobre un cerro. El pueblo reúne museos, ferias y peñas, y es una de las paradas culturales más activas de la región.',
  },
  {
    id: 'uquia',
    nombre: 'Uquía',
    lugar: 'Los ángeles arcabuceros',
    x: 72,
    y: 33,
    tono: 3,
    fotos: [`${BASE}/uquia-1.jpg`, `${BASE}/uquia-2.jpg`],
    ubicacion: 'Entre Huacalera y Humahuaca, sobre la Ruta Nacional 9.',
    descripcion:
      'Su iglesia de San Francisco de Paula guarda las célebres pinturas cuzqueñas de ángeles con arcabuz. Es un pueblo pequeño y tranquilo, de calles de adobe.',
  },
  {
    id: 'humahuaca',
    nombre: 'Humahuaca',
    lugar: 'La puerta norte de la Quebrada',
    x: 86,
    y: 19,
    tono: 0,
    fotos: [`${BASE}/humahuaca-1.jpg`, `${BASE}/humahuaca-2.jpg`],
    ubicacion: 'Al norte de la Quebrada, sobre la Ruta Nacional 9.',
    descripcion:
      'Con sus calles empedradas, el Cabildo y el monumento a la Independencia, Humahuaca es la cabecera de la Quebrada. Su Carnaval es una de las fiestas más intensas de la región.',
  },
];

// Escenas del recorrido cinematográfico: una de apertura y una por cada pueblo.
export const escenas = [
  {
    id: 'quebrada',
    lugar: 'Quebrada de Humahuaca',
    titulo: 'Un corredor de montañas',
    texto:
      'Por aquí corre el Río Grande, entre cerros de mil colores. Desde 2003 es Patrimonio Mundial de la UNESCO y es el corazón cultural de Jujuy. Recorrelo de sur a norte, pueblo por pueblo.',
    foto: portada.foto,
    tono: 0,
    duracion: 8000,
  },
  ...pueblos.map((p) => ({
    id: p.id,
    lugar: p.lugar,
    titulo: p.nombre,
    texto: p.descripcion,
    foto: p.fotos[0],
    tono: p.tono,
    duracion: 8000,
  })),
];