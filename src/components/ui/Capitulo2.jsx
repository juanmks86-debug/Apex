import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

export default function Capitulo2() {
  return (
    <section className="relative pl-8 py-3 border-b border-slate-800/60">
      {/* Línea vertical de tiempo y punto violeta */}
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/40 via-purple-500/50 to-cyan-500/40" />
      <div className="absolute left-[7px] top-9 w-3.5 h-3.5 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] border-2 border-[#060b19]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Izquierda: Texto y Botón (4 columnas) */}
        <div className="lg:col-span-4 space-y-3.5">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Capítulo 2
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            La transformación
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            En los últimos años, Jujuy diversifica su matriz productiva, impulsando la minería, las energías renovables y el turismo.
          </p>
          <div className="pt-1">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-purple-200 bg-purple-950/40 border border-purple-500/50 hover:bg-purple-900/50 hover:border-purple-400 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <span className="text-[10px]">▶</span> Ver evolución <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Centro: Gráfico de Evolución del empleo (5 columnas) */}
        <div className="lg:col-span-5 bg-[#0a1122] border border-slate-800/90 rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-cyan-400" />
            <h3 className="text-xs font-semibold text-white">
              Evolución del empleo por sector
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {/* Gráfico SVG */}
            <div className="flex-1">
              <svg viewBox="0 0 300 105" className="w-full h-auto overflow-visible">
                {/* Líneas guía horizontales */}
                {[
                  { y: 15, label: '100%' },
                  { y: 42, label: '75%' },
                  { y: 69, label: '50%' },
                  { y: 96, label: '25%' },
                  { y: 120, label: '0%' },
                ].map((row, i) => (
                  <g key={i}>
                    <text x="0" y={row.y + 3} fill="#64748b" fontSize="9">
                      {row.label}
                    </text>
                    <line x1="32" y1={row.y} x2="290" y2={row.y} stroke="#1e293b" strokeWidth="1" />
                  </g>
                ))}

                {/* Años eje X */}
                {[
                  { x: 40, year: '2015' },
                  { x: 88, year: '2017' },
                  { x: 136, year: '2019' },
                  { x: 184, year: '2021' },
                  { x: 232, year: '2023' },
                  { x: 280, year: '2026' },
                ].map((col, i) => (
                  <text key={i} x={col.x} y="133" textAnchor="middle" fill="#64748b" fontSize="9">
                    {col.year}
                  </text>
                ))}

                {/* Línea Minería (Violeta) */}
                <polyline fill="none" stroke="#a855f7" strokeWidth="2" points="40,68 88,66 136,56 184,48 232,32 280,18" />
                {[, [88,66], [136,56], [184,48], [232,32], [280,18] ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r="2.5" fill="#c084fc" />
                ))}

                {/* Línea Agroindustria (Verde) */}
                <polyline fill="none" stroke="#22c55e" strokeWidth="2" points="40,94 88,92 136,84 184,78 232,70 280,62" />
                {[, [88,92], [136,84], [184,78], [232,70], [280,62] ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r="2.5" fill="#4ade80" />
                ))}

                {/* Línea Turismo (Naranja) */}
                <polyline fill="none" stroke="#f59e0b" strokeWidth="2" points="40,101 88,99 136,92 184,86 232,80 280,74" />
                {[, [88,99], [136,92], [184,86], [232,80], [280,74] ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r="2.5" fill="#fbbf24" />
                ))}

                {/* Línea Servicios (Azul) */}
                <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points="40,107 88,106 136,102 184,99 232,96 280,92" />
                {[, [88,106], [136,102], [184,99], [232,96], [280,92] ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r="2.5" fill="#60a5fa" />
                ))}
              </svg>
            </div>

            {/* Leyenda derecha */}
            <div className="space-y-2.5 text-[11px] shrink-0 pr-1">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Minería
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Agroindustria
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Turismo
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Servicios
              </div>
            </div>
          </div>
        </div>

        {/* Derecha: Imagen destacada de Minería (3 columnas) */}
        <div className="lg:col-span-3 h-36 rounded-xl overflow-hidden border border-slate-800 relative group">
          <div className="w-full h-full bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-950 flex flex-col justify-end p-4">
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
              Sector Minero
            </span>
            <p className="text-xs text-slate-200 font-medium mt-0.5">
              Desarrollo industrial en la Puna jujeña
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
