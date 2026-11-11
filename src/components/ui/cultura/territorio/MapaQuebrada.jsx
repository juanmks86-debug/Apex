import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Map as MapaIcon, Maximize2, MapPin, ArrowRight, X, ExternalLink } from 'lucide-react';
import Foto from '../Foto';
import { pueblos } from './territorioData';

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };
const anillo =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9b552]';

/* ---- Ruta: curva suave que pasa por todos los pueblos ---- */
const ENTRADA = { x: 3, y: 92 };
const SALIDA = { x: 99, y: 6 };

function curvaPorPuntos(pts) {
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

const RUTA = curvaPorPuntos([ENTRADA, ...pueblos, SALIDA]);
const CRESTA = 'M0 62 L10 50 L18 58 L30 36 L42 52 L54 30 L66 46 L78 22 L90 40 L100 20';

/* ---- Fondo esquemático de la Quebrada (cerros y ruta) ---- */
function Terreno() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="mq-cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2430" />
          <stop offset="1" stopColor="#6a3326" />
        </linearGradient>
        <linearGradient id="mq-atras" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b5482f" />
          <stop offset="1" stopColor="#5a2a2a" />
        </linearGradient>
        <linearGradient id="mq-frente" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a3b2c" />
          <stop offset="1" stopColor="#331a18" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#mq-cielo)" />
      <polygon points="0,100 0,62 10,50 18,58 30,36 42,52 54,30 66,46 78,22 90,40 100,20 100,100" fill="url(#mq-atras)" />
      <polygon points="0,100 0,82 12,72 26,84 40,70 56,82 70,64 84,76 100,58 100,100" fill="url(#mq-frente)" />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path
          key={k}
          d={CRESTA}
          transform={`translate(0 ${k * 7})`}
          fill="none"
          stroke="rgba(244,163,64,0.16)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path
        d={RUTA}
        fill="none"
        stroke="rgba(244,163,64,0.4)"
        strokeWidth="8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ filter: 'blur(3px)' }}
      />
      <path
        d={RUTA}
        fill="none"
        stroke="#f9b552"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ---- Lienzo con los marcadores (botones reales, accesibles con teclado) ---- */
function Lienzo({ seleccionado, onElegir, grande }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
      <Terreno />
      {pueblos.map((p) => {
        const activo = seleccionado === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onElegir(p.id)}
            aria-label={`${p.nombre}: ver información`}
            aria-pressed={activo}
            className={`group absolute -translate-x-1/2 -translate-y-full rounded ${anillo}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <MapPin
              size={grande ? 34 : 26}
              strokeWidth={2}
              color="#f9b552"
              fill={activo ? '#f9b552' : 'rgba(42,20,5,0.75)'}
              className={`drop-shadow-[0_0_8px_rgba(244,163,64,0.9)] transition-transform motion-reduce:transition-none ${
                activo ? 'scale-125' : 'group-hover:scale-110'
              }`}
            />
            <span
              className={`pointer-events-none absolute left-full top-1 ml-1 whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white transition-opacity motion-reduce:transition-none ${
                grande || activo ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
              }`}
            >
              {p.nombre}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Mapa interactivo.
 * - expandido / setExpandido: lo controla CapituloTerritorio (para abrirlo desde el recorrido)
 */
export default function MapaQuebrada({ expandido, setExpandido }) {
  const [sel, setSel] = useState(null);
  const [fotoIdx, setFotoIdx] = useState(0);
  const cerrarRef = useRef(null);
  const pueblo = pueblos.find((p) => p.id === sel) || null;

  const elegir = (id) => {
    setSel(id);
    setFotoIdx(0);
  };

  // Modal: bloquea scroll, cierra con Esc y devuelve el foco
  useEffect(() => {
    if (!expandido) return undefined;
    const overflowPrevio = document.body.style.overflow;
    const focoPrevio = document.activeElement;
    document.body.style.overflow = 'hidden';
    if (cerrarRef.current) cerrarRef.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setExpandido(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener('keydown', onKey);
      if (focoPrevio && focoPrevio.focus) focoPrevio.focus();
    };
  }, [expandido, setExpandido]);

  return (
    <>
      {/* Tarjeta compacta */}
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#3a2628]/85 to-[#2a1a1c]/90 p-4 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <MapaIcon className="mt-0.5 shrink-0 text-[#f4a340]" size={22} />
            <div>
              <h3 className="text-lg font-bold text-[#f7ecd9]" style={serif}>
                Mapa Interactivo
              </h3>
              <p className="mt-0.5 text-xs leading-snug text-[#eadfcf]/80">
                Explorá la Quebrada y descubrí sus principales localidades.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpandido(true)}
            aria-label="Ampliar mapa"
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#f7ecd9]/80 hover:bg-white/10 hover:text-white ${anillo}`}
          >
            <Maximize2 size={18} />
          </button>
        </div>

        <div className="relative mt-3">
          <Lienzo
            seleccionado={sel}
            onElegir={(id) => {
              elegir(id);
              setExpandido(true);
            }}
          />
          <button
            type="button"
            onClick={() => setExpandido(true)}
            className={`absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-[#f4a340]/70 bg-black/65 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/80 motion-reduce:transition-none ${anillo}`}
          >
            <MapPin size={14} className="text-[#f9b552]" /> Explorar mapa <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Vista ampliada */}
      {expandido &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm md:p-6"
            onClick={() => setExpandido(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Mapa interactivo de la Quebrada de Humahuaca"
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-full w-full max-w-5xl gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-[#1c110d] p-4 text-[#f7ecd9] shadow-2xl md:p-5 lg:grid-cols-[1.5fr_1fr]"
            >
              <button
                ref={cerrarRef}
                type="button"
                onClick={() => setExpandido(false)}
                aria-label="Cerrar mapa"
                className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 hover:bg-black/80 ${anillo}`}
              >
                <X size={18} />
              </button>

              <div>
                <h3 className="mb-3 text-2xl font-bold" style={serif}>
                  La Quebrada, de sur a norte
                </h3>
                <Lienzo seleccionado={sel} onElegir={elegir} grande />
                <p className="mt-2 text-xs text-[#eadfcf]/65">
                  Mapa esquemático: muestra el orden de los pueblos a lo largo de la ruta, no distancias reales.
                </p>
              </div>

              <aside className="flex flex-col pt-1 lg:pt-12">
                {pueblo ? (
                  <>
                    <Foto
                      src={pueblo.fotos[fotoIdx]}
                      tono={pueblo.tono + fotoIdx}
                      alt={`Foto de ${pueblo.nombre}`}
                      className="h-44 w-full rounded-xl object-cover"
                    />
                    {pueblo.fotos.length > 1 && (
                      <div className="mt-2 flex gap-2">
                        {pueblo.fotos.map((f, k) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setFotoIdx(k)}
                            aria-label={`Foto ${k + 1} de ${pueblo.nombre}`}
                            aria-pressed={k === fotoIdx}
                            className={`h-12 w-16 overflow-hidden rounded-lg ring-2 ${
                              k === fotoIdx ? 'ring-[#f4a340]' : 'opacity-70 ring-transparent'
                            } ${anillo}`}
                          >
                            <Foto src={f} tono={pueblo.tono + k} className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                    <h4 className="mt-3 text-2xl font-bold" style={serif}>
                      {pueblo.nombre}
                    </h4>
                    <p className="text-sm text-[#f4a340]">{pueblo.lugar}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#eadfcf]/90">{pueblo.descripcion}</p>
                    <p className="mt-3 flex gap-2 text-sm text-[#eadfcf]/85">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-[#f4a340]" />
                      {pueblo.ubicacion}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${pueblo.nombre}, Jujuy, Argentina`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#f4a340]/50 px-4 py-2 text-sm font-semibold text-[#f4a340] hover:bg-[#f4a340]/10 ${anillo}`}
                    >
                      Ver en Google Maps <ExternalLink size={14} />
                    </a>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed text-[#eadfcf]/80">
                    Elegí un pueblo en el mapa para ver su historia, sus fotos y dónde queda.
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {pueblos.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => elegir(p.id)}
                      aria-pressed={sel === p.id}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors motion-reduce:transition-none ${
                        sel === p.id
                          ? 'border-[#f4a340] bg-[#f4a340]/20 text-white'
                          : 'border-white/15 text-[#eadfcf]/85 hover:bg-white/10'
                      } ${anillo}`}
                    >
                      {p.nombre}
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}