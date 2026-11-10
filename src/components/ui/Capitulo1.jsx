import React, { useState } from 'react';
import { MapPin, ArrowRight, Maximize2, Users, Map, TrendingUp } from 'lucide-react';

const datosDepartamentos = {
  Susques: {
    region: 'Puna',
    superficie: '9.199 km²',
    poblacion: '4.145 hab.',
    actividad: 'Minería (Litio y Solar)',
  },
  'Dr. Manuel Belgrano': {
    region: 'Valles',
    superficie: '1.917 km²',
    poblacion: '319.998 hab.',
    actividad: 'Servicios y Comercio',
  },
  Humahuaca: {
    region: 'Quebrada',
    superficie: '3.792 km²',
    poblacion: '17.366 hab.',
    actividad: 'Turismo y Agricultura',
  },
  Ledesma: {
    region: 'Yungas',
    superficie: '3.249 km²',
    poblacion: '85.125 hab.',
    actividad: 'Agroindustria',
  },
};

export default function Capitulo1() {
  const [deptoActivo, setDeptoActivo] = useState('Susques');
  const info = datosDepartamentos[deptoActivo];

  return (
    <section className="relative pl-8 py-4 border-b border-slate-800/60 bg-gradient-to-r from-[#060b19] via-[#0b1528] to-amber-950/20 rounded-xl overflow-hidden">
      {/* Línea vertical y punto cian */}
      <div className="absolute left-3 top-4 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-purple-500/40" />
      <div className="absolute left-[7px] top-7 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] border-2 border-[#060b19]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pr-4">
        
        {/* Izquierda (5 columnas): Título + Descripción + 4 KPIs compactos + Botón */}
        <div className="lg:col-span-5 space-y-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            Capítulo 1
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight leading-none">
            El territorio
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Jujuy, una provincia diversa y estratégica, donde la geografía se convierte en motor de desarrollo.
          </p>

          {/* 4 KPIs en fila compacta */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[
              { label: 'Superficie', valor: '53.219 km²', icono: Maximize2 },
              { label: 'Población', valor: '797.955', icono: Users },
              { label: 'Deptos.', valor: '16', icono: Map },
              { label: 'PBI (Est.)', valor: 'USD 4.100 M', icono: TrendingUp },
            ].map((kpi, i) => {
              const Icono = kpi.icono;
              return (
                <div key={i} className="bg-[#080f1e]/90 border border-slate-800/80 rounded-lg p-2">
                  <Icono size={13} className="text-cyan-400 mb-1" />
                  <p className="text-[9px] text-slate-400 leading-none">{kpi.label}</p>
                  <p className="text-[11px] font-bold text-white mt-1 leading-tight">{kpi.valor}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-1">
            <button className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-medium text-cyan-200 bg-cyan-950/50 border border-cyan-500/50 hover:bg-cyan-900/60 transition-all">
              <span className="text-[9px]">▶</span> Descubrir el mapa <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Centro (4 columnas): Mapa interactivo de regiones */}
        <div className="lg:col-span-4 flex justify-center">
          <svg viewBox="0 0 200 175" className="w-48 h-44 drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <path
              onClick={() => setDeptoActivo('Susques')}
              d="M35,55 L85,45 L95,95 L55,115 L25,85 Z"
              className={`cursor-pointer transition-colors stroke-[#060b19] stroke-2 ${
                deptoActivo === 'Susques' ? 'fill-purple-500' : 'fill-purple-900/60 hover:fill-purple-700'
              }`}
            />
            <path
              onClick={() => setDeptoActivo('Humahuaca')}
              d="M85,15 L135,20 L125,65 L85,45 Z"
              className={`cursor-pointer transition-colors stroke-[#060b19] stroke-2 ${
                deptoActivo === 'Humahuaca' ? 'fill-amber-500' : 'fill-amber-800/60 hover:fill-amber-700'
              }`}
            />
            <path
              onClick={() => setDeptoActivo('Ledesma')}
              d="M125,65 L170,75 L155,125 L115,110 Z"
              className={`cursor-pointer transition-colors stroke-[#060b19] stroke-2 ${
                deptoActivo === 'Ledesma' ? 'fill-emerald-500' : 'fill-emerald-800/60 hover:fill-emerald-700'
              }`}
            />
            <path
              onClick={() => setDeptoActivo('Dr. Manuel Belgrano')}
              d="M85,95 L115,110 L110,155 L75,145 Z"
              className={`cursor-pointer transition-colors stroke-[#060b19] stroke-2 ${
                deptoActivo === 'Dr. Manuel Belgrano' ? 'fill-cyan-400' : 'fill-cyan-800/60 hover:fill-cyan-700'
              }`}
            />
          </svg>
        </div>

        {/* Derecha (3 columnas): Tarjeta flotante del departamento */}
        <div className="lg:col-span-3 bg-[#080f1e]/95 border border-slate-700/80 rounded-xl p-3.5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin size={13} className="text-cyan-400" /> {deptoActivo}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300">
              {info.region}
            </span>
          </div>
          <div className="text-[11px] space-y-1 text-slate-300">
            <p><span className="text-slate-400">Población:</span> <strong className="text-white">{info.poblacion}</strong></p>
            <p><span className="text-slate-400">Superficie:</span> <strong className="text-white">{info.superficie}</strong></p>
            <p><span className="text-slate-400">Actividad:</span> <strong className="text-cyan-300">{info.actividad}</strong></p>
          </div>
        </div>

      </div>
    </section>
  );
}
