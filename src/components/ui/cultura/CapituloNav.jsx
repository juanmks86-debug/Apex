import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { capitulos, siguienteDe } from './capitulos';

const anillo =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4a340]';

/**
 * Barra inferior de todos los capítulos de Cultura.
 * - actual: id del capítulo abierto ('01'...'05')
 * - onVolver: vuelve a las cinco tarjetas
 * - onIrA(id): salta a otro capítulo disponible
 */
export default function CapituloNav({ actual, onVolver, onIrA }) {
  const idx = capitulos.findIndex((c) => c.id === actual);
  const sig = siguienteDe(actual);
  const sigOk = Boolean(sig && sig.disponible);

  return (
    <nav
      aria-label="Navegación entre capítulos"
      className="relative border-t border-white/10 bg-gradient-to-t from-[#2a1409] to-transparent px-4 py-5 md:px-6"
    >
      <div className="grid items-center gap-4 md:grid-cols-[auto_1fr_auto]">
        {/* Volver */}
        <button
          type="button"
          onClick={onVolver}
          className={`flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-5 text-sm font-medium text-[#f7ecd9] transition-colors hover:bg-white/10 motion-reduce:transition-none ${anillo}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-b from-[#6b3f1f] to-[#3d2412] text-[#f9b552]">
            <ArrowLeft size={18} />
          </span>
          Volver al recorrido
        </button>

        {/* Stepper */}
        <div className="relative mx-2 hidden md:block xl:mx-8">
          <div className="absolute left-[10%] right-[10%] top-[7px] h-px bg-white/20" aria-hidden="true" />
          <div
            className="absolute left-[10%] top-[7px] h-px bg-[#f4a340]"
            style={{ width: `${(80 * Math.max(idx, 0)) / (capitulos.length - 1)}%` }}
            aria-hidden="true"
          />
          <ol className="relative flex">
            {capitulos.map((c) => {
              const activo = c.id === actual;
              return (
                <li key={c.id} className="flex flex-1 justify-center">
                  <button
                    type="button"
                    disabled={!c.disponible || activo}
                    onClick={() => onIrA && onIrA(c.id)}
                    aria-current={activo ? 'step' : undefined}
                    title={c.disponible ? undefined : 'Próximamente'}
                    className={`flex flex-col items-center gap-2 disabled:cursor-default ${anillo}`}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${
                        activo
                          ? 'bg-[#f9b552] shadow-[0_0_12px_3px_rgba(244,163,64,0.6)]'
                          : c.disponible
                          ? 'bg-slate-300'
                          : 'bg-slate-500/70'
                      }`}
                    />
                    <span
                      className={`whitespace-nowrap text-xs ${
                        activo ? 'font-semibold text-[#f7ecd9]' : c.disponible ? 'text-slate-200' : 'text-slate-400'
                      }`}
                    >
                      {Number(c.id)}. {c.corto}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Siguiente */}
        {sig ? (
          <button
            type="button"
            disabled={!sigOk}
            onClick={() => onIrA && onIrA(sig.id)}
            title={sigOk ? undefined : 'Próximamente'}
            className={`flex w-fit items-center gap-3 justify-self-end rounded-full bg-gradient-to-b from-[#f9b552] to-[#ee9230] px-6 py-3 text-sm font-bold text-[#2a1405] shadow-lg shadow-[#f4a340]/20 transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-55 disabled:shadow-none motion-reduce:transition-none ${anillo}`}
          >
            Siguiente: {sig.corto}
            {!sigOk && (
              <span className="rounded-full border border-[#2a1405]/40 px-2 py-px text-[10px] font-semibold">Pronto</span>
            )}
            <ArrowRight size={18} />
          </button>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}