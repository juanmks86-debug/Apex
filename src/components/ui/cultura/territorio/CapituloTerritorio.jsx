import React, { useEffect, useRef, useState } from 'react';
import { Drama, Sun, MapPin, Play, ArrowRight, Mountain, Camera } from 'lucide-react';
import Foto from '../Foto';
import CapituloNav from '../CapituloNav';
import RecorridoQuebrada from './RecorridoQuebrada';
import MapaQuebrada from './MapaQuebrada';
import { portada, textos } from './territorioData';

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };
const anillo =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9b552]';

const iconosPuntos = { pueblos: MapPin, historia: Camera, paisajes: Mountain };

/* ---- B. Ventana de video: el <video> se carga recién al hacer clic ---- */
function VentanaVideo() {
  const [activo, setActivo] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_0_0_2px_#f4a340,0_0_28px_rgba(244,163,64,0.45)]">
      {activo && !error ? (
        <video
          src={portada.video}
          poster={portada.poster}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <>
          <Foto src={portada.poster} tono={1} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          <button
            type="button"
            onClick={() => {
              setError(false);
              setActivo(true);
            }}
            aria-label="Reproducir video de la Quebrada"
            className={`absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 bg-black/45 text-white backdrop-blur-sm transition-transform hover:scale-105 motion-reduce:transition-none ${anillo}`}
          >
            <Play size={26} fill="currentColor" className="ml-1" />
          </button>
          {error && (
            <p className="absolute inset-x-0 bottom-4 px-4 text-center text-sm text-[#f7ecd9]">
              El video estará disponible pronto.
            </p>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Capítulo 01 de la dimensión Cultura: El territorio.
 * Se muestra DENTRO de DimensionCultural (no es una página aparte).
 */
export default function CapituloTerritorio({ onVolver, onIrA }) {
  const [recorrido, setRecorrido] = useState(false);
  const [mapaAbierto, setMapaAbierto] = useState(false);
  const raiz = useRef(null);

  useEffect(() => {
    if (raiz.current) raiz.current.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <section ref={raiz} className="relative overflow-hidden rounded-3xl bg-[#170d0a] text-[#f7ecd9] shadow-2xl">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400;1,500&display=swap');`}</style>

      {/* ============ A. Hero ============ */}
      <div className="relative min-h-[440px] 2xl:min-h-[520px]">
        <Foto
          src={portada.foto}
          tono={0}
          alt="Cerros de colores y pueblo de la Quebrada de Humahuaca"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#170d0a]/90 via-[#170d0a]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#170d0a] to-transparent" />

        <div className="absolute right-4 top-4 z-20 flex items-center overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-md md:right-6 md:top-5">
          <button
            type="button"
            aria-label="Cambiar tema"
            className={`flex h-10 w-12 items-center justify-center border-r border-white/15 hover:bg-white/10 ${anillo}`}
          >
            <Sun size={18} />
          </button>
          <button
            type="button"
            className={`flex h-10 items-center gap-2 px-4 text-sm font-medium hover:bg-white/10 ${anillo}`}
          >
            <MapPin size={16} /> Explorar Jujuy
          </button>
        </div>

        <div className="relative z-10 flex flex-col px-6 pb-24 pt-6 md:px-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[13px] font-medium tracking-wide backdrop-blur-md">
            <Drama size={18} className="text-[#f4a340]" /> DIMENSIÓN CULTURA
          </span>

          <div className="mt-6 max-w-[520px]">
            <h1 style={serif} className="leading-[1.05]">
              <span className="block text-[42px] font-bold sm:text-5xl 2xl:text-[66px]">
                <span className="text-[#f4a340]">01.</span> El territorio
              </span>
              <span className="mt-1 block text-[28px] font-normal italic sm:text-4xl 2xl:text-[44px]">
                Donde nace la historia
              </span>
            </h1>

            <div className="my-5 h-[3px] w-14 rounded bg-[#f4a340]" aria-hidden="true" />

            <p className="max-w-[440px] text-base leading-relaxed text-[#f7ecd9]/95 2xl:text-[17px]" style={serif}>
              {textos.intro}
            </p>

            <button
              type="button"
              onClick={() => setRecorrido(true)}
              className={`mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#f9b552] to-[#ee9230] px-6 py-3 text-sm font-bold text-[#2a1405] shadow-lg shadow-[#f4a340]/30 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none ${anillo}`}
            >
              <Play size={16} fill="currentColor" /> Recorrer la Quebrada <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ============ B, C y D ============ */}
      <div className="relative z-10 -mt-14 grid gap-5 px-4 pb-6 md:grid-cols-2 md:px-6 lg:grid-cols-[1.15fr_0.95fr_1fr] lg:items-stretch">
        <div className="md:col-span-2 lg:col-span-1">
          <VentanaVideo />
        </div>

        {/* C. Un paisaje con identidad */}
        <div className="flex flex-col justify-center px-1 lg:px-3">
          <h2 className="flex items-center gap-3 text-xl font-bold md:text-2xl" style={serif}>
            <Mountain size={26} className="shrink-0 text-[#f4a340]" /> {textos.identidadTitulo}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#f7ecd9]/90" style={serif}>
            {textos.identidad}
          </p>
          <ul className="mt-5 space-y-3">
            {textos.puntos.map((p) => {
              const Icono = iconosPuntos[p.icono] || MapPin;
              return (
                <li key={p.texto} className="flex items-center gap-4 text-sm text-[#f7ecd9]/90">
                  <Icono size={26} strokeWidth={1.6} className="shrink-0 text-[#f4a340]" />
                  {p.texto}
                </li>
              );
            })}
          </ul>
        </div>

        {/* D. Mapa interactivo */}
        <MapaQuebrada expandido={mapaAbierto} setExpandido={setMapaAbierto} />
      </div>

      <CapituloNav actual="01" onVolver={onVolver} onIrA={onIrA} />

      {recorrido && (
        <RecorridoQuebrada
          onCerrar={() => setRecorrido(false)}
          onMapa={() => {
            setRecorrido(false);
            setMapaAbierto(true);
          }}
        />
      )}
    </section>
  );
}