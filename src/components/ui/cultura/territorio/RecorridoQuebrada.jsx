import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, X, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import Foto from '../Foto';
import { escenas } from './territorioData';

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };
const anillo =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9b552]';

const css = `
@keyframes rq-a{from{transform:scale(1.02) translate3d(0,0,0)}to{transform:scale(1.16) translate3d(-2%,-1.5%,0)}}
@keyframes rq-b{from{transform:scale(1.16) translate3d(2%,1%,0)}to{transform:scale(1.03) translate3d(0,0,0)}}
@keyframes rq-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes rq-texto{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.rq-a{animation:rq-a linear forwards}
.rq-b{animation:rq-b linear forwards}
.rq-fill{transform-origin:left;animation:rq-fill linear forwards}
.rq-texto{animation:rq-texto .9s ease-out both}
@media (prefers-reduced-motion:reduce){.rq-a,.rq-b,.rq-texto{animation:none}}
`;

/**
 * Recorrido por escenas con zoom lento, texto que entra y barra de progreso.
 * Teclado: ← → cambian de escena, Espacio pausa, Esc cierra.
 * - onCerrar: cierra el recorrido
 * - onMapa: se llama desde la pantalla final ("Explorar el mapa")
 */
export default function RecorridoQuebrada({ onCerrar, onMapa }) {
  const reducido =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [i, setI] = useState(0);
  const [pausa, setPausa] = useState(reducido);
  const [fin, setFin] = useState(false);
  const [vuelta, setVuelta] = useState(0);
  const raiz = useRef(null);
  const n = escenas.length;

  // Bloquea el scroll de fondo y devuelve el foco al cerrar
  useEffect(() => {
    const overflowPrevio = document.body.style.overflow;
    const focoPrevio = document.activeElement;
    document.body.style.overflow = 'hidden';
    if (raiz.current) raiz.current.focus();
    return () => {
      document.body.style.overflow = overflowPrevio;
      if (focoPrevio && focoPrevio.focus) focoPrevio.focus();
    };
  }, []);

  const siguiente = () => {
    if (i >= n - 1) setFin(true);
    else setI(i + 1);
  };
  const anterior = () => {
    setFin(false);
    if (i > 0) setI(i - 1);
  };
  const repetir = () => {
    setFin(false);
    setI(0);
    setVuelta((v) => v + 1);
    setPausa(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onCerrar();
    } else if (e.key === 'ArrowRight') siguiente();
    else if (e.key === 'ArrowLeft') anterior();
    else if (e.key === ' ' && e.target === e.currentTarget) {
      e.preventDefault();
      setPausa((p) => !p);
    }
  };

  const estadoAnim = pausa || fin ? 'paused' : 'running';
  const actual = escenas[i];

  return createPortal(
    <div
      ref={raiz}
      role="dialog"
      aria-modal="true"
      aria-label="Recorrido por la Quebrada de Humahuaca"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[60] overflow-hidden bg-black text-[#f7ecd9] outline-none"
    >
      <style>{css}</style>

      {/* Escenas apiladas con fundido entre una y otra */}
      {escenas.map((e, k) => {
        const activa = k === i;
        return (
          <div
            key={e.id}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${
              activa ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Foto
              src={e.foto}
              tono={e.tono}
              className={`h-full w-full object-cover ${activa ? (k % 2 ? 'rq-b' : 'rq-a') : ''}`}
              style={
                activa ? { animationDuration: `${e.duracion + 2000}ms`, animationPlayState: estadoAnim } : undefined
              }
            />
          </div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

      {/* Barra superior: progreso y controles */}
      <div className="absolute inset-x-0 top-0 z-10 px-4 pt-4 md:px-8 md:pt-6">
        <div className="flex gap-1.5">
          {escenas.map((e, k) => (
            <div key={e.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
              {k < i && <div className="h-full w-full bg-[#f9b552]" />}
              {k === i && (
                <div
                  key={`${i}-${vuelta}`}
                  className="rq-fill h-full w-full bg-[#f9b552]"
                  style={{ animationDuration: `${e.duracion}ms`, animationPlayState: estadoAnim }}
                  onAnimationEnd={siguiente}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-[#f7ecd9]/85">
            {i + 1} de {n}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPausa((p) => !p)}
              aria-label={pausa ? 'Reanudar recorrido' : 'Pausar recorrido'}
              className={`grid h-10 w-10 place-items-center rounded-full bg-black/45 backdrop-blur-sm hover:bg-black/65 ${anillo}`}
            >
              {pausa ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
            </button>
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar recorrido"
              className={`grid h-10 w-10 place-items-center rounded-full bg-black/45 backdrop-blur-sm hover:bg-black/65 ${anillo}`}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Flechas laterales */}
      <button
        type="button"
        onClick={anterior}
        disabled={i === 0 && !fin}
        aria-label="Escena anterior"
        className={`absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 disabled:opacity-30 md:grid ${anillo}`}
      >
        <ChevronLeft size={26} />
      </button>
      <button
        type="button"
        onClick={siguiente}
        disabled={fin}
        aria-label="Escena siguiente"
        className={`absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 disabled:opacity-30 md:grid ${anillo}`}
      >
        <ChevronRight size={26} />
      </button>

      {/* Texto de la escena */}
      {!fin && (
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 pb-10 md:px-20 md:pb-14">
          <div key={`${i}-${vuelta}`} className="rq-texto max-w-2xl" aria-live="polite">
            <p className="text-sm font-medium text-[#f9b552] md:text-base">{actual.lugar}</p>
            <h2 className="mt-1 text-4xl font-bold leading-tight md:text-6xl" style={serif}>
              {actual.titulo}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#f7ecd9]/90 md:text-lg" style={serif}>
              {actual.texto}
            </p>
          </div>
        </div>
      )}

      {/* Pantalla final */}
      {fin && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-black/65 p-6 backdrop-blur-sm">
          <div className="rq-texto max-w-md text-center">
            <h2 className="text-3xl font-bold md:text-4xl" style={serif}>
              Fin del recorrido
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#f7ecd9]/85">
              Pasaste por los cinco pueblos de la Quebrada. Ahora podés ubicarlos en el mapa.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onMapa}
                className={`rounded-full bg-gradient-to-b from-[#f9b552] to-[#ee9230] px-6 py-3 text-sm font-bold text-[#2a1405] ${anillo}`}
              >
                Explorar el mapa
              </button>
              <button
                type="button"
                onClick={repetir}
                className={`inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 ${anillo}`}
              >
                <RotateCcw size={16} /> Ver de nuevo
              </button>
              <button
                type="button"
                onClick={onCerrar}
                className={`rounded-full border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 ${anillo}`}
              >
                Volver al capítulo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}