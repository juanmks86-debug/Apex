import React from 'react';
import {
  Home,
  Map as MapaIcon,
  TrendingUp,
  Leaf,
  Drama,
  Users,
  Cpu,
  Camera,
  MapPin,
  Settings,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

/* ------------------------------------------------------------------
   Tema por dimensión: el sidebar es el mismo, cambian los colores.
   Las claves coinciden con los valores de `dimensionActiva`.
------------------------------------------------------------------- */
const temas = {
  productiva: { acento: '#38bdf8', rgb: '56,189,248', desde: '#0a1424', hasta: '#10283a' },
  cultural: { acento: '#f4a340', rgb: '244,163,64', desde: '#1f1830', hasta: '#3a2218' },
  tecnologica: { acento: '#34d399', rgb: '52,211,153', desde: '#09171c', hasta: '#0f2e2a' },
};

/* ------------------------------------------------------------------
   Ítems del menú.
   - `dimension`: valor que se envía a setDimensionActiva.
   - Los que no tienen `dimension` se muestran como "Pronto" (deshabilitados).
     Cuando tengas la página de alguno, agregale su `dimension` y se activa.
------------------------------------------------------------------- */
const items = [
  { id: 'inicio', nombre: 'Inicio', icono: Home },
  { id: 'territorio', nombre: 'Territorio', icono: MapaIcon },
  { id: 'economia', nombre: 'Economía', icono: TrendingUp, dimension: 'productiva', conCapitulos: true },
  { id: 'naturaleza', nombre: 'Naturaleza', icono: Leaf },
  { id: 'cultura', nombre: 'Cultura', icono: Drama, dimension: 'cultural' },
  { id: 'sociedad', nombre: 'Sociedad', icono: Users },
  { id: 'tecnologia', nombre: 'Tecnología', icono: Cpu, dimension: 'tecnologica' },
  { id: 'turismo', nombre: 'Turismo', icono: Camera },
];

const capitulosProductiva = [
  { id: 1, titulo: 'Capítulo 1', subtitulo: 'El territorio', icono: MapPin },
  { id: 2, titulo: 'Capítulo 2', subtitulo: 'La transformación', icono: TrendingUp },
  { id: 3, titulo: 'Capítulo 3', subtitulo: 'La nueva matriz productiva', icono: Settings },
  { id: 4, titulo: 'Capítulo 4', subtitulo: 'El impacto territorial', icono: Users },
  { id: 5, titulo: 'Capítulo 5', subtitulo: 'El futuro', icono: Lightbulb },
];

/* Redes: reemplazá los href por tus enlaces reales */
const redes = [
  { id: 'youtube', label: 'YouTube', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'x', label: 'X', href: '#' },
];

function IconoRed({ id }) {
  const comun = { viewBox: '0 0 24 24', className: 'h-5 w-5', 'aria-hidden': true };
  if (id === 'youtube')
    return (
      <svg {...comun} fill="currentColor">
        <path fillRule="evenodd" d="M4 5h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zm6 4v6l5.2-3z" />
      </svg>
    );
  if (id === 'instagram')
    return (
      <svg {...comun} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (id === 'facebook')
    return (
      <svg {...comun} fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  return (
    <svg {...comun} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
    </svg>
  );
}

/* Curvas de nivel de montaña (decoración del fondo) */
function CurvasMontana({ rgb }) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full"
      viewBox="0 0 180 224"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d="M-10 150 L25 118 L45 132 L90 78 L125 118 L150 100 L195 140"
          transform={`translate(0 ${i * 9})`}
          fill="none"
          stroke={`rgba(${rgb},${(0.5 - i * 0.045).toFixed(2)})`}
          strokeWidth="0.9"
        />
      ))}
    </svg>
  );
}

export default function Sidebar({
  capituloActivo,
  setCapituloActivo,
  dimensionActiva,
  setDimensionActiva,
  onDescubrir, // opcional: acción de la tarjeta "una tierra para descubrir"
}) {
  const t = temas[dimensionActiva] || temas.productiva;

  const handleDimensionClick = (dim) => {
    if (!dim) return;
    setDimensionActiva(dim);
    if (dim === 'productiva') {
      // Al hacer clic en productiva, abre y fija el capítulo 1
      setCapituloActivo(1);
    }
  };

  return (
    <aside
      className="sticky top-0 flex h-screen w-[180px] shrink-0 select-none flex-col overflow-hidden border-r border-white/5 text-slate-200 2xl:w-52"
      style={{ background: `linear-gradient(180deg, ${t.desde} 0%, ${t.hasta} 100%)` }}
    >
      <style>{`
        .sb-nav{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.18) transparent}
        @media (max-height:720px){.sb-redes{display:none}}
        @media (max-height:640px){.sb-card{display:none}}
      `}</style>

      <CurvasMontana rgb={t.rgb} />

      {/* Logo */}
      <div className="relative shrink-0 px-5 pb-3 pt-6">
        <svg className="mb-1.5 h-9 w-20" viewBox="0 0 100 44" fill="none" aria-hidden="true">
          <path d="M4 40 34 8l14 18 12-12 36 26Z" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
          <path d="M56 40 74 18l22 22Z" fill={t.acento} />
          <path d="M34 8l6 8-6 3-6-4Z" fill="#fff" />
        </svg>
        <h1 className="text-[28px] font-extrabold leading-none tracking-wide text-white">JUJUY</h1>
        <p className="mt-1.5 text-[12px] leading-tight text-slate-300">
          Conectando
          <br />
          Dimensiones
        </p>
      </div>

      {/* Menú */}
      <nav aria-label="Dimensiones" className="sb-nav relative min-h-0 flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {items.map((d) => {
            const Icono = d.icono;
            const disponible = Boolean(d.dimension);
            const activa = disponible && dimensionActiva === d.dimension;

            return (
              <li key={d.id} className="relative">
                {activa && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-[19px] h-7 w-1 -translate-y-1/2 rounded-r-full"
                    style={{ background: t.acento, boxShadow: `0 0 14px 2px rgba(${t.rgb},0.8)` }}
                  />
                )}

                <button
                  type="button"
                  disabled={!disponible}
                  aria-current={activa ? 'page' : undefined}
                  title={disponible ? undefined : 'Próximamente'}
                  onClick={() => handleDimensionClick(d.dimension)}
                  className={`flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-left text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none ${
                    activa
                      ? 'text-white'
                      : disponible
                      ? 'text-slate-200/85 hover:bg-white/5 hover:text-white'
                      : 'cursor-default text-slate-400/55'
                  }`}
                  style={{
                    outlineColor: t.acento,
                    ...(activa && {
                      background: `linear-gradient(90deg, rgba(${t.rgb},0.34), rgba(${t.rgb},0.14))`,
                      boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.4)`,
                    }),
                  }}
                >
                  <Icono size={20} strokeWidth={1.9} style={activa ? { color: t.acento } : undefined} />
                  <span className="flex-1">{d.nombre}</span>

                  {d.conCapitulos &&
                    (activa ? (
                      <ChevronDown size={14} className="text-slate-300" />
                    ) : (
                      <ChevronRight size={14} className="text-slate-400" />
                    ))}

                  {!disponible && (
                    <span className="rounded-full border border-white/15 px-1.5 py-px text-[9px] font-normal text-slate-400/80">
                      Pronto
                    </span>
                  )}
                </button>

                {/* Capítulos de la dimensión productiva */}
                {d.conCapitulos && activa && (
                  <div className="ml-5 mt-2 space-y-3 border-l border-white/10 pb-2 pl-3">
                    {capitulosProductiva.map((cap) => {
                      const IconoCap = cap.icono;
                      const esActivo = capituloActivo === cap.id;

                      return (
                        <button
                          key={cap.id}
                          type="button"
                          onClick={() => setCapituloActivo(cap.id)}
                          aria-current={esActivo ? 'step' : undefined}
                          className="group flex w-full items-start gap-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          style={{ outlineColor: t.acento }}
                        >
                          <span
                            className={`mt-0.5 transition-colors ${esActivo ? '' : 'text-slate-500 group-hover:text-slate-300'}`}
                            style={esActivo ? { color: t.acento } : undefined}
                          >
                            <IconoCap size={16} strokeWidth={esActivo ? 2.3 : 1.8} />
                          </span>
                          <span>
                            <span
                              className={`block text-[10px] font-semibold tracking-wide transition-colors ${
                                esActivo ? '' : 'text-slate-400 group-hover:text-slate-200'
                              }`}
                              style={esActivo ? { color: t.acento } : undefined}
                            >
                              {cap.titulo}
                            </span>
                            <span
                              className={`mt-0.5 block text-[11px] leading-snug transition-colors ${
                                esActivo ? 'font-medium text-white' : 'text-slate-400 group-hover:text-slate-300'
                              }`}
                            >
                              {cap.subtitulo}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tarjeta inferior (se oculta en pantallas de poco alto) */}
      <div className="sb-card relative shrink-0 px-3 pb-3 pt-2">
        <button
          type="button"
          onClick={onDescubrir}
          className="group flex w-full gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
          style={{ outlineColor: t.acento }}
        >
          <span className="flex shrink-0 flex-col items-center gap-2.5">
            <svg className="h-9 w-9" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M20 4c8 0 15 5 16 13s-4 17-13 18S6 31 5 22 10 4 20 4Z"
                stroke="#f3e6d3"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path d="M19 9c6-1 12 3 12 9s-4 12-10 13" stroke="#f3e6d3" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
            </svg>
            <span
              className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <ArrowRight size={16} />
            </span>
          </span>
          <span className="self-start pt-0.5">
            <span className="block text-[13px] font-semibold leading-tight text-white">
              Jujuy,
              <br />
              una tierra
              <br />
              para descubrir
            </span>
            <svg className="mt-1.5 h-2 w-16" viewBox="0 0 64 8" fill="none" aria-hidden="true">
              <path d="M2 5c14-4 34-4 60-1" stroke={t.acento} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>

      {/* Redes (se ocultan en pantallas de poco alto) */}
      <div className="sb-redes relative flex shrink-0 items-center justify-between px-6 pb-5 pt-1 text-slate-400">
        {redes.map((r) => (
          <a
            key={r.id}
            href={r.href}
            aria-label={r.label}
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
            style={{ outlineColor: t.acento }}
          >
            <IconoRed id={r.id} />
          </a>
        ))}
      </div>
    </aside>
  );
}