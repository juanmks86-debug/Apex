import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Settings, 
  Users, 
  Lightbulb, 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  BookOpen, 
  Cpu 
} from 'lucide-react';

const capitulosProductiva = [
  { id: 1, titulo: 'Capítulo 1', subtitulo: 'El territorio', icono: MapPin },
  { id: 2, titulo: 'Capítulo 2', subtitulo: 'La transformación', icono: TrendingUp },
  { id: 3, titulo: 'Capítulo 3', subtitulo: 'La nueva matriz productiva', icono: Settings },
  { id: 4, titulo: 'Capítulo 4', subtitulo: 'El impacto territorial', icono: Users },
  { id: 5, titulo: 'Capítulo 5', subtitulo: 'El futuro', icono: Lightbulb },
];

export default function Sidebar({ capituloActivo, setCapituloActivo, dimensionActiva, setDimensionActiva }) {
  
  const handleDimensionClick = (dim) => {
    setDimensionActiva(dim);
    if (dim === 'productiva') {
      // Al hacer clic en productiva, abre/cierra y fija el capítulo 1
      setCapituloActivo(1);
    }
  };

  return (
    <aside className="w-52 sticky top-0 h-screen bg-[#070d19] text-slate-300 flex flex-col justify-between border-r border-slate-800/60 select-none shrink-0">
      
      {/* Parte Superior: Logo SVG con degradado y Título */}
      <div>
        <div className="flex flex-col items-center pt-7 pb-5 px-4 text-center">
          <svg className="w-12 h-9 mb-2" viewBox="0 0 64 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="montanaGrad" x1="0" y1="0" x2="64" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <path d="M4 38L20 12L31 28L43 8L60 38H4Z" fill="url(#montanaGrad)" />
            <path d="M20 12L26 21L21 24L16 19L20 12Z" fill="#e0f2fe" fillOpacity="0.85" />
            <path d="M43 8L49 19L44 22L39 16L43 8Z" fill="#e0f2fe" fillOpacity="0.85" />
          </svg>

          <h1 className="text-[22px] font-bold text-white tracking-wide leading-none">
            Jujuy
          </h1>
          <p className="text-[11px] text-slate-400 mt-1.5 tracking-wide">
            Datos que cuentan
          </p>
        </div>

        {/* Listado de Dimensiones */}
        <div className="px-3 space-y-2 mt-2">
          
          {/* 1. Dimensión Productiva (Con los 5 capítulos desplegables) */}
          <div>
            <button
              onClick={() => handleDimensionClick('productiva')}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 text-xs font-semibold border border-slate-800/80 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] tracking-wide text-cyan-100">Dim. Productiva</span>
              </div>
              {dimensionActiva === 'productiva' ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              )}
            </button>

            {/* Solo se muestran los capítulos si la dimensión activa es la productiva */}
            {dimensionActiva === 'productiva' && (
              <nav className="mt-2 ml-2 pl-3 border-l border-slate-800 space-y-3">
                {capitulosProductiva.map((cap) => {
                  const Icono = cap.icono;
                  const esActivo = capituloActivo === cap.id;

                  return (
                    <button
                      key={cap.id}
                      onClick={() => setCapituloActivo(cap.id)}
                      className="w-full flex items-start gap-2.5 text-left group transition-all"
                    >
                      <div className={`mt-0.5 transition-colors ${
                        esActivo ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}>
                        <Icono size={16} strokeWidth={esActivo ? 2.3 : 1.8} />
                      </div>
                      <div>
                        <div className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                          esActivo ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {cap.titulo}
                        </div>
                        <div className={`text-[11px] leading-snug mt-0.5 transition-colors ${
                          esActivo ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-300'
                        }`}>
                          {cap.subtitulo}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          {/* 2. Dimensión Cultural (Sin subcapítulos) */}
          <div>
            <button
              onClick={() => handleDimensionClick('cultural')}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 text-xs font-semibold border border-slate-800/80 transition-all group"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] tracking-wide text-amber-100">Dim. Cultural</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </button>
          </div>

          {/* 3. Dimensión Tecnológica (Sin subcapítulos) */}
          <div>
            <button
              onClick={() => handleDimensionClick('tecnologica')}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 text-xs font-semibold border border-slate-800/80 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] tracking-wide text-emerald-100">Dim. Tecnológica</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </button>
          </div>

        </div>
      </div>

      {/* Parte Inferior: Fondo de montaña oscura + Lema manuscrito */}
      <div className="relative h-44 flex flex-col justify-end p-5 text-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" 
          alt="Montañas de Jujuy"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070d19] via-[#070d19]/60 to-amber-950/40" />

        <div className="relative z-10 pb-1">
          <p style={{ fontFamily: "'Caveat', cursive" }} className="text-2xl text-amber-100/95 leading-none">
            Jujuy
          </p>
          <p style={{ fontFamily: "'Caveat', cursive" }} className="text-[17px] text-amber-50/90 leading-tight mt-0.5">
            crece, se transforma<br />y mira al futuro
          </p>
        </div>
      </div>

    </aside>
  );
}