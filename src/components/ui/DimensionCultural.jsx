import React, { useState } from 'react';
import {
  Drama,
  Sun,
  MapPin,
  Compass,
  ArrowRight,
  Play,
  Box,
  Mouse,
  ChevronDown,
  ChevronsRight,
} from 'lucide-react';
// ▼ Capítulos de la dimensión
import CapituloTerritorio from './cultura/territorio/CapituloTerritorio';
import { buscarCapitulo } from './cultura/capitulos';

/* ------------------------------------------------------------------
   Datos
   Reemplazá las URLs por tus imágenes locales (ej: /img/hero.jpg)
------------------------------------------------------------------- */
const IMAGEN_HERO =
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80';

const tarjetasCulturales = [
  {
    id: '01',
    titulo: 'El territorio: Donde nace la historia',
    descripcion: 'Descubrí la Quebrada de Humahuaca, sus paisajes, comunidades y patrimonio.',
    imagen: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '02',
    titulo: 'La cosmovisión andina',
    descripcion: 'Qué representa la Pachamama, la reciprocidad y el respeto por la naturaleza.',
    imagen: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '03',
    titulo: 'El ritual: Conexión Pachamama',
    descripcion: 'Participá de esta experiencia inmersiva y descubrí el ritual de agradecimiento.',
    imagen: 'https://images.unsplash.com/photo-1516026662394-266d554a9386?auto=format&fit=crop&w=600&q=80',
    destacada: true, // tarjeta con experiencia 3D
  },
  {
    id: '04',
    titulo: 'La memoria viva',
    descripcion: 'Música, tejidos, gastronomía, festividades y saberes transmitidos.',
    imagen: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '05',
    titulo: 'Tradición y futuro',
    descripcion: 'Cómo las nuevas tecnologías ayudan a preservar y difundir nuestra cultura.',
    imagen: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a566?auto=format&fit=crop&w=600&q=80',
  },
];

/* ------------------------------------------------------------------
   Ornamento: rombo andino (chakana simplificada)
------------------------------------------------------------------- */
function Rombo({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 2 62 32 32 62 2 32Z" fill="none" stroke="#f08a2b" strokeWidth="4" />
      <path d="M32 12 52 32 32 52 12 32Z" fill="#c8561d" stroke="#f9b04a" strokeWidth="2" />
      <path d="M32 22 42 32 32 42 22 32Z" fill="none" stroke="#fbd08a" strokeWidth="2.5" />
      <path d="M32 29 35 32 32 35 29 32Z" fill="#fbd08a" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Componente principal
------------------------------------------------------------------- */
export default function DimensionCultural({ onExplorar3D, onIngresar }) {
  const [tarjetaActiva, setTarjetaActiva] = useState('03');

  // Estado del capítulo abierto (null = se muestran las 5 tarjetas)
  const [capituloAbierto, setCapituloAbierto] = useState(null);
  const capituloDisponible = (id) => Boolean(buscarCapitulo(id) && buscarCapitulo(id).disponible);

  // Renderizado dinámico según el capítulo seleccionado
  if (capituloAbierto) {
    switch (capituloAbierto) {
      case '01':
        return (
          <CapituloTerritorio
            onVolver={() => setCapituloAbierto(null)}
            onIrA={(id) => setCapituloAbierto(id)}
          />
        );
      // Aquí puedes agregar más casos (case '02', case '03', etc.) a medida que los desarrolles
      default:
        return (
          <div className="rounded-3xl bg-[#ecdac2] p-12 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-[#2a1405]">Capítulo en construcción</h2>
            <p className="mt-2 text-sm text-[#2a1405]/80">Este contenido estará disponible próximamente.</p>
            <button
              type="button"
              onClick={() => setCapituloAbierto(null)}
              className="mt-6 rounded-full bg-gradient-to-b from-[#f9b552] to-[#ee9230] px-6 py-2.5 text-sm font-semibold text-[#2a1405] shadow-md"
            >
              Volver a la dimensión
            </button>
          </div>
        );
    }
  }

  const serifDisplay = { fontFamily: "'Playfair Display SC', 'Playfair Display', Georgia, serif" };
  const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-b from-[#ecdac2] to-[#dcc3a2] shadow-2xl">
      {/* Tipografías */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400;1,500&family=Playfair+Display+SC:wght@700;900&display=swap');`}</style>

      {/* ============================ 1. HERO ============================ */}
      <div className="relative min-h-[440px] overflow-hidden 2xl:min-h-[540px]">
        <img
          src={IMAGEN_HERO}
          alt="Cerros de colores de la Quebrada de Humahuaca al atardecer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Degradados: lectura del texto a la izquierda y fundido inferior */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f0c]/90 via-[#1a0f0c]/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a0f0c]/60 to-transparent" />

        {/* Controles superiores derecha */}
        <div className="absolute right-4 top-4 z-20 flex items-center overflow-hidden rounded-full border border-white/10 bg-black/40 text-[#f7ecd9] backdrop-blur-md md:right-6 md:top-5">
          <button
            type="button"
            aria-label="Cambiar tema"
            className="flex h-10 w-12 items-center justify-center border-r border-white/15 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f4a340]"
          >
            <Sun size={18} />
          </button>
          <button
            type="button"
            className="flex h-10 items-center gap-2 px-4 text-sm font-medium hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f4a340]"
          >
            <MapPin size={16} /> Explorar Jujuy
          </button>
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col gap-5 px-6 pb-20 pt-6 md:px-10 md:pt-6 2xl:pb-28 2xl:pt-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[13px] font-medium tracking-wide text-[#f7ecd9] backdrop-blur-md md:ml-[88px]">
            <Drama size={18} className="text-[#f4a340]" /> DIMENSIÓN CULTURA
          </span>

          <div className="flex items-start gap-5">
            <Rombo className="mt-2 hidden h-[56px] w-[56px] shrink-0 md:block 2xl:mt-3 2xl:h-[72px] 2xl:w-[72px]" />

            <div className="max-w-[640px]">
              <h1 className="leading-[0.95]" style={serifDisplay}>
                <span className="block text-[40px] font-black text-[#f7ecd9] sm:text-5xl md:text-[56px] 2xl:text-[76px]">
                  Conexión
                </span>
                <span className="block bg-gradient-to-b from-[#fbc765] to-[#e8852a] bg-clip-text text-[44px] font-black text-transparent sm:text-5xl md:text-[60px] 2xl:text-[80px]">
                  Pachamama
                </span>
              </h1>

              <p
                className="mt-4 border-b border-[#f4a340]/50 pb-3 text-base italic leading-snug text-[#f7ecd9] md:text-lg 2xl:mt-5 2xl:pb-4 2xl:text-[22px]"
                style={serif}
              >
                La tierra tiene memoria.
                <br />
                Nosotros tenemos la responsabilidad de mantenerla viva.
              </p>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 2xl:mt-4 2xl:text-[15px]">
                Un viaje por la cosmovisión andina, las tradiciones y el vínculo ancestral entre las
                comunidades y la Madre Tierra.
              </p>

              <button
                type="button"
                onClick={onExplorar3D}
                className="mt-5 inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#f9b552] to-[#ee9230] py-2 pl-2.5 pr-5 text-sm font-semibold text-[#2a1405] shadow-lg shadow-[#f4a340]/30 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none 2xl:mt-6 2xl:py-2.5 2xl:pl-3 2xl:text-[15px]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a1405]/80 text-[#f9b552]">
                  <Compass size={16} />
                </span>
                Explorar experiencia 3D
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* "Desliza para descubrir" */}
        <div className="absolute bottom-20 right-6 z-10 hidden items-center gap-3 rounded-xl bg-black/35 px-4 py-3 text-sm text-[#f7ecd9] backdrop-blur-md lg:flex 2xl:bottom-24">
          <Mouse size={28} strokeWidth={1.5} />
          Desliza para descubrir
          <ChevronDown size={16} />
        </div>

        {/* Borde ondulado hacia el papel */}
        <svg
          className="absolute bottom-0 left-0 h-14 w-full text-[#ecdac2]"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,38 C160,12 330,58 540,40 C740,22 900,4 1100,28 C1260,48 1360,34 1440,22 L1440,64 L0,64 Z"
          />
        </svg>
      </div>

      {/* ======================== 2. TARJETAS ======================== */}
      <div className="relative px-4 pb-4 pt-2 md:px-6">
        {/* Línea conectora entre tarjetas */}
        <div className="absolute left-4 right-4 top-[112px] hidden h-px bg-[#8a5a3c]/60 lg:block 2xl:top-[130px]" aria-hidden="true" />

        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {tarjetasCulturales.map((item) => {
            const activa = tarjetaActiva === item.id;
            const es3D = Boolean(item.destacada);

            return (
              <div key={item.id} className="relative">
                {/* Badge Experiencia 3D */}
                {es3D && (
                  <span className="absolute -top-3 right-3 z-25 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#f7b04c] to-[#d9822a] px-3 py-1.5 text-xs font-semibold leading-tight text-[#2a1405] shadow-lg">
                    <Box size={18} />
                    <span>
                      Experiencia
                      <br />
                      3D
                    </span>
                  </span>
                )}

                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={activa}
                  onClick={() => setTarjetaActiva(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTarjetaActiva(item.id);
                    }
                  }}
                  className={`group flex h-full min-h-[260px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#3a2628] to-[#2a1a1c] transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4a340] motion-reduce:transition-none 2xl:min-h-[300px] ${
                    activa
                      ? 'shadow-[0_0_0_2px_#f4a340,0_0_30px_rgba(244,163,64,0.55)]'
                      : 'shadow-lg shadow-black/30 hover:shadow-[0_0_0_1px_rgba(244,163,64,0.6)]'
                  }`}
                >
                  {/* Imagen */}
                  <div className="relative h-28 shrink-0 2xl:h-32">
                    <img
                      src={item.imagen}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#3a2628] to-transparent" />
                    <span className="absolute bottom-[-14px] left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#f9b552] to-[#e8852a] text-sm font-bold text-[#2a1405] shadow-md">
                      {item.id}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                    <h3 className="text-base font-bold leading-tight text-white 2xl:text-[19px]" style={serif}>
                      {item.titulo}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-snug text-[#eadfcf]/85 2xl:text-[13.5px]">
                      {item.descripcion}
                    </p>

                    <div className="mt-auto pt-4">
                      {es3D && activa ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onIngresar?.(item);
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#f9b552] to-[#ee9230] py-2.5 text-sm font-bold text-[#2a1405] shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        >
                          <Play size={14} fill="currentColor" /> Ingresar
                        </button>
                      ) : (
                        capituloDisponible(item.id) ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCapituloAbierto(item.id);
                            }}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4a340] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4a340]"
                          >
                            Conocer más <ArrowRight size={14} />
                          </button>
                        ) : (
                          <span className="text-sm font-medium text-[#f4a340]/60">Próximamente</span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================== 3. BANNER INFERIOR ======================== */}
      <div className="px-4 pb-5 md:px-6">
        <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#2a1a1c] via-[#3a2630] to-[#2a1a1c] px-6 py-5 md:flex-row md:gap-6">
          <div className="flex items-center gap-3">
            <Rombo className="h-10 w-10 shrink-0" />
            <ChevronsRight size={18} className="text-[#f4a340]/70" aria-hidden="true" />
            <p className="text-xl italic text-[#f7ecd9] md:whitespace-nowrap 2xl:text-2xl" style={serif}>
              Una cultura viva, un legado para el futuro
            </p>
          </div>

          <p className="max-w-sm border-white/20 text-xs leading-snug text-[#eadfcf]/85 md:border-l md:pl-5">
            La cultura de Jujuy nos invita a valorar nuestras raíces, compartir nuestras tradiciones
            y construir un futuro en armonía.
          </p>

          {/* Silueta de cerros e iglesia */}
          <svg
            className="ml-auto hidden h-14 w-56 shrink-0 md:block"
            viewBox="0 0 280 70"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cerro" x1="0" x2="1">
                <stop offset="0" stopColor="#f08a2b" stopOpacity="0" />
                <stop offset="0.5" stopColor="#f9b04a" />
                <stop offset="1" stopColor="#f08a2b" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path d="M0 68 60 30 95 48 140 8 190 52 215 42 250 62" fill="none" stroke="url(#cerro)" strokeWidth="2" />
            <path d="M30 68 75 38 105 56 145 22 185 58" fill="none" stroke="url(#cerro)" strokeWidth="1.5" opacity="0.7" />
            {/* Iglesia */}
            <rect x="215" y="34" width="52" height="34" fill="#f4eadb" />
            <rect x="238" y="14" width="12" height="22" fill="#f4eadb" />
            <path d="M236 14 244 4 252 14Z" fill="#f4eadb" />
            <rect x="241" y="44" width="6" height="14" rx="3" fill="#3a2630" />
          </svg>
        </div>
      </div>
    </section>
  );
}