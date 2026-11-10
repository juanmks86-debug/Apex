import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';

// Importación de las imágenes locales desde la carpeta assets
import litioImg from '../../assets/Litio.jpg';
import energiaImg from '../../assets/Energia.jpg';
import agroImg from '../../assets/Agro.jpg';
import turismoImg from '../../assets/Turismo.webp';

const sectores = [
  {
    titulo: 'Litio',
    subtitulo: 'Innovación y desarrollo',
    imagen: litioImg,
  },
  {
    titulo: 'Energías Renovables',
    subtitulo: 'Energía para el futuro',
    imagen: energiaImg,
  },
  {
    titulo: 'Agroindustria',
    subtitulo: 'Producción con valor',
    imagen: agroImg,
  },
  {
    titulo: 'Turismo',
    subtitulo: 'Nuestra identidad',
    imagen: turismoImg,
  },
];

export default function Capitulo3() {
  return (
    <section className="relative pl-8 py-3">
      {/* Línea vertical y punto cian */}
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/40 via-cyan-500/50 to-transparent" />
      <div className="absolute left-[7px] top-9 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] border-2 border-[#060b19]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Izquierda: Texto y Botón (3 columnas) */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-3.5">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Capítulo 3
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
            La nueva matriz productiva
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            El litio, las energías renovables y la agroindustria conforman el presente y futuro de Jujuy.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-cyan-200 bg-cyan-950/40 border border-cyan-500/50 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <span className="text-[10px]">▷</span> Explorar sectores <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Centro: 4 Tarjetas de Sectores con Imágenes Locales (6 columnas) */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sectores.map((sec, index) => (
            <div
              key={index}
              className="relative h-36 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all p-3.5 flex flex-col justify-end group cursor-pointer shadow-lg"
            >
              {/* Imagen de fondo local con efecto hover de acercamiento */}
              <img 
                src={sec.imagen} 
                alt={sec.titulo}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Degradado oscuro superpuesto para garantizar la lectura de los textos */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-[#070d19]/60 to-transparent" />

              {/* Contenido de la tarjeta */}
              <div className="relative z-10">
                <h3 className="text-xs font-bold text-white leading-snug">
                  {sec.titulo}
                </h3>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  {sec.subtitulo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Derecha: Tarjeta Visión de Futuro + Silueta Jujuy (3 columnas) */}
        <div className="lg:col-span-3 bg-[#0a1326] border border-slate-800/90 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between gap-2 relative z-10">
            <h3 className="text-sm font-bold text-white leading-snug">
              Una provincia con visión de futuro
            </h3>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
              <BarChart2 size={18} />
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed mt-3 relative z-10">
            Jujuy avanza hacia una economía más diversificada, sostenible e inclusiva.
          </p>

          {/* Silueta estilizada de Jujuy en la esquina inferior derecha */}
          <svg viewBox="0 0 100 100" className="w-24 h-24 self-end mt-2 text-cyan-500/40 fill-current">
            <path d="M25,15 L55,10 L75,25 L85,45 L70,70 L65,90 L45,85 L35,65 L15,50 L20,30 Z" />
          </svg>
        </div>

      </div>
    </section>
  );
}