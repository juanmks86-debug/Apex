import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BarChart3, Camera, ChevronRight, Factory, Home, Layers3, Maximize2,
  Mountain, Pickaxe, Satellite, Sun, Users, Wheat
} from 'lucide-react';
import { CHAPTERS, buildBlocks, SECTOR_COLOR, fmtNum } from './storyData';
import { PROVINCIAL_TOTALS } from '../data';

const REFERENCE_ASSETS = {
  hero: '/reference-assets/hero-territory.jpg',
  mineria: '/reference-assets/mineria.jpg',
  litio: '/reference-assets/litio.jpg',
  energia: '/reference-assets/energia.jpg',
  agroindustria: '/reference-assets/agroindustria.jpg',
  turismo: '/reference-assets/turismo.jpg'
};

const NAV = [
  ['territorio', 'El territorio', Mountain, 0],
  ['mineria', 'La transformación', Pickaxe, 1],
  ['energia', 'La nueva matriz', Sun, 2],
  ['agroindustria', 'Impacto productivo', Wheat, 3],
  ['turismo', 'El futuro', Satellite, 3]
];

const SECTOR_CARDS = [
  { slug: 'mineria', title: 'Litio', subtitle: 'Innovación y desarrollo', icon: Pickaxe, color: '#9b5cff' },
  { slug: 'energia', title: 'Energías renovables', subtitle: 'Energía para el futuro', icon: Sun, color: '#13d7ed' },
  { slug: 'agroindustria', title: 'Agroindustria', subtitle: 'Producción con valor', icon: Wheat, color: '#f59e0b' },
  { slug: 'turismo', title: 'Turismo', subtitle: 'Nuestra identidad', icon: Camera, color: '#d946ef' }
];

function SectorTrendChart() {
  const rows = PROVINCIAL_TOTALS.yearlyData;
  const series = [
    ['litio', 'Minería', '#b65cff'],
    ['agro', 'Agroindustria', '#19c96d'],
    ['turismo', 'Turismo', '#f6a51a'],
    ['empleo', 'Servicios', '#179bf2']
  ];
  const W = 600, H = 190, L = 42, R = 12, T = 12, B = 28;
  const normalized = (key, value) => value / rows[0][key] * 100;
  const values = series.flatMap(([key]) => rows.map((r) => normalized(key, r[key])));
  const top = Math.ceil(Math.max(...values, 150) / 50) * 50;
  const X = (i) => L + i * ((W - L - R) / (rows.length - 1));
  const Y = (v) => T + (1 - v / top) * (H - T - B);
  return (
    <div className="min-w-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" role="img" aria-label="Evolución de sectores productivos entre 2015 y 2026">
        {[0, 50, 100, 150, 200].filter((v) => v <= top).map((v) => (
          <g key={v}><line x1={L} x2={W - R} y1={Y(v)} y2={Y(v)} stroke="#ffffff16" /><text x={L - 8} y={Y(v) + 3} textAnchor="end" fontSize="10" fill="#7790a8">{v}%</text></g>
        ))}
        {rows.map((r, i) => <text key={r.year} x={X(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#7790a8">{r.year}</text>)}
        {series.map(([key, label, color]) => <g key={key}>
          <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={rows.map((r, i) => `${X(i)},${Y(normalized(key, r[key]))}`).join(' ')} />
          {rows.map((r, i) => <circle key={r.year} cx={X(i)} cy={Y(normalized(key, r[key]))} r="3.5" fill={color} />)}
        </g>)}
      </svg>
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-300">
        {series.map(([, label, color]) => <span key={label} className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />{label}</span>)}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, tone = '#16d5ed' }) {
  return <div className="dashboard-metric"><Icon className="h-5 w-5" style={{ color: tone }} /><div><div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div><strong>{value}</strong></div></div>;
}

function PhotoCard({ card }) {
  const Icon = card.icon;
  return <article className="sector-card" style={{ '--sector-color': card.color }}>
    <img src={REFERENCE_ASSETS[card.slug]} alt={`${card.title} en la matriz productiva de Jujuy`} />
    <div className="sector-card-shade" />
    <div className="relative z-10 flex h-full flex-col justify-end p-4">
      <Icon className="mb-2 h-5 w-5" style={{ color: card.color }} />
      <h3>{card.title}</h3><p>{card.subtitle}</p>
    </div>
  </article>;
}

export default function StoryMode({ mapRef, areas, reducedMotion, onStoryState, onExplore, onActive }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const refs = useRef([]);
  const blocks = useMemo(() => Object.fromEntries(CHAPTERS.map((c) => [c.id, buildBlocks(c.id, { areas })])), [areas]);
  const chapter = CHAPTERS[active];
  const territory = blocks.territorio;
  const area = territory.kpis.find((k) => k.label === 'Superficie');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let next = 0;
      refs.current.forEach((el, index) => { if (el && el.getBoundingClientRect().top <= line) next = index; });
      setActive((previous) => previous === next ? previous : next);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    onStoryState({ ...(chapter.map || {}), highlightIds: chapter.map?.highlightIds ?? null, focusIds: chapter.map?.focusIds ?? null, pois: chapter.map?.pois ?? null, previewIds: chapter.map?.previewIds ?? [] });
    mapRef.current?.applyCamera(chapter.camera);
    onActive?.(chapter.id);
  }, [active, chapter, mapRef, onActive, onStoryState]);

  const go = (index) => refs.current[index]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  return <div className="story-dashboard">
    <aside className="story-sidebar">
      <div className="story-brand"><div className="story-brand-mark"><Mountain /></div><strong>Jujuy</strong><span>Datos que<br />cuentan</span></div>
      <div className="story-sidebar-line" />
      <nav aria-label="Capítulos de la historia" className="story-sidebar-nav">
        {NAV.map(([id, label, Icon, target], index) => {
          return <button key={id} onClick={() => go(target)} className={chapter.id === id ? 'is-active' : ''} data-rail={id} aria-current={chapter.id === id ? 'step' : undefined}>
            <span className="story-nav-dot"><Icon /></span><span><b>Capítulo {index + 1}</b>{label}</span>
          </button>;
        })}
      </nav>
      <div className="story-sidebar-footer"><div className="story-footer-mountains" /><em>Jujuy crece,<br />se transforma<br />y mira al futuro</em></div>
    </aside>

    <main className="story-dashboard-main">
      <div className="story-progress" style={{ width: `${progress * 100}%` }} />
      <header className="story-dashboard-header">
        <div className="header-institution"><span className="mini-logo"><Mountain /></span><span><b>Matriz Productiva Departamental de Jujuy</b><small>Transformación Territorial y Generación de Nuevas Actividades Económicas (2015–2026)</small></span></div>
        <nav className="header-actions"><button className="is-selected" onClick={() => go(0)}><Home /> Inicio</button><button onClick={onExplore}><BarChart3 /> Explorar datos</button><button onClick={() => go(1)}><Layers3 /> Análisis</button><button aria-label="Pantalla completa"><Maximize2 /></button></nav>
      </header>

      <section className="story-hero" ref={(el) => (refs.current[0] = el)} data-chapter="territorio">
        <img src={REFERENCE_ASSETS.hero} alt="Paisaje territorial de Jujuy con mapa productivo" className="story-hero-image" />
        <div className="story-hero-overlay" />
        <div className="story-hero-copy">
          <span className="story-kicker">Capítulo 1</span><h1>El territorio</h1><p>Jujuy, una provincia diversa y estratégica, donde la geografía se convierte en motor de desarrollo.</p>
          <div className="dashboard-metrics"><Metric icon={Layers3} label="Superficie" value={area?.value ? `${fmtNum(area.value)} km²` : 'Calculando'} /><Metric icon={Users} label="Población" value="No disponible" tone="#3d9cff" /><Metric icon={Satellite} label="Departamentos" value="16" tone="#1bd66b" /><Metric icon={BarChart3} label="PBI 2026 (est.)" value={PROVINCIAL_TOTALS.pbiGrowth} tone="#f6a51a" /></div>
          <button className="story-primary-button" onClick={() => go(1)}>Descubrir el mapa <ChevronRight /></button>
        </div>
        <div className="story-map-callout"><strong>Susques</strong><span>Minería y energías renovables</span><small>Escena ilustrativa del proyecto</small></div>
      </section>

      <section className="story-section story-transformation" ref={(el) => (refs.current[1] = el)} data-chapter="mineria">
        <div className="section-copy"><span className="story-kicker">Capítulo 2</span><h2>La <em>transformación</em></h2><p>En los últimos años, Jujuy diversifica su matriz productiva, impulsando el litio, las energías renovables y el turismo.</p><button className="story-outline-button" onClick={() => go(2)}>Ver evolución <ChevronRight /></button></div>
        <div className="chart-panel"><div className="chart-panel-title"><BarChart3 /> Evolución de la actividad por sector</div><SectorTrendChart /><p className="chart-note">Índice 2015 = 100 · datos económicos ilustrativos y sin fuente oficial verificada.</p></div>
      </section>

      <section className="story-section story-matrix" ref={(el) => (refs.current[2] = el)} data-chapter="energia">
        <div className="section-copy"><span className="story-kicker">Capítulo 3</span><h2>La nueva matriz <em>productiva</em></h2><p>El litio, las energías renovables y la agroindustria conforman el presente y futuro de Jujuy.</p><button className="story-outline-button" onClick={onExplore}>Explorar sectores <ChevronRight /></button></div>
        <div className="sector-grid">{SECTOR_CARDS.map((card) => <PhotoCard key={card.slug} card={card} />)}</div>
      </section>

      <section className="story-section story-future" ref={(el) => (refs.current[3] = el)} data-chapter="agroindustria">
        <div><span className="story-kicker">Capítulo 4</span><h2>Una provincia<br /><em>con visión de futuro</em></h2><p>Jujuy avanza hacia una economía más diversificada, sostenible e inclusiva.</p><button className="story-primary-button" onClick={onExplore}>Explorar los datos <ChevronRight /></button></div>
        <div className="future-stat"><Factory /><strong>16</strong><span>departamentos<br />conectados</span></div>
      </section>

      <footer className="story-dashboard-footer">Datos económicos ilustrativos, pendientes de fuente oficial · Límites territoriales: IGN / IDERA · Año 2026 parcial.</footer>
    </main>
  </div>;
}
