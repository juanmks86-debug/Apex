import React, { useState } from 'react';

const enlaces = ['Inicio', 'Explorar Datos', 'Análisis'];

export default function Header() {
  const [activo, setActivo] = useState('Inicio');

  return (
    <header className="w-full h-16 px-8 bg-[#070d19]/90 backdrop-blur-sm border-b border-slate-800/60 flex items-center justify-between sticky top-0 z-20">
      
      {/* Título principal de la barra superior */}
      <h2 className="text-[15px] font-semibold text-white tracking-wide">
        Matriz Productiva Departamental de Jujuy
      </h2>

      {/* Menú de navegación derecho */}
      <nav className="flex items-center gap-7">
        {enlaces.map((item) => {
          const esActivo = activo === item;
          return (
            <button
              key={item}
              onClick={() => setActivo(item)}
              className={`text-xs transition-colors pb-1 ${
                esActivo
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {item}
            </button>
          );
        })}
      </nav>

    </header>
  );
}
