// Configuración compartida de los 5 capítulos de la dimensión Cultura.
// Para activar un capítulo nuevo: pasá `disponible` a true y mostralo desde DimensionCultural.
export const capitulos = [
  { id: '01', corto: 'Territorio', titulo: 'El territorio', disponible: true },
  { id: '02', corto: 'Cosmovisión', titulo: 'La cosmovisión andina', disponible: false },
  { id: '03', corto: 'Ritual', titulo: 'El ritual', disponible: false },
  { id: '04', corto: 'Memoria', titulo: 'La memoria viva', disponible: false },
  { id: '05', corto: 'Futuro', titulo: 'Tradición y futuro', disponible: false },
];

export const buscarCapitulo = (id) => capitulos.find((c) => c.id === id);

export const siguienteDe = (id) => {
  const i = capitulos.findIndex((c) => c.id === id);
  return i >= 0 ? capitulos[i + 1] || null : null;
};