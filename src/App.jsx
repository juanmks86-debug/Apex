import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Capitulo1 from './components/ui/Capitulo1';
import Capitulo2 from './components/ui/Capitulo2';
import Capitulo3 from './components/ui/Capitulo3';

function App() {
  const [capituloActivo, setCapituloActivo] = useState(1);
  const [dimensionActiva, setDimensionActiva] = useState('productiva');

  return (
    <div className="flex min-h-screen bg-[#060b19] text-white">
      <Sidebar 
        capituloActivo={capituloActivo} 
        setCapituloActivo={setCapituloActivo}
        dimensionActiva={dimensionActiva}
        setDimensionActiva={setDimensionActiva}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 px-6 py-4 space-y-2">
          {/* Vistas según la Dimensión Activa */}
          {dimensionActiva === 'productiva' && (
            <>
              {capituloActivo === 1 && <Capitulo1 />}
              {capituloActivo === 2 && <Capitulo2 />}
              {capituloActivo === 3 && <Capitulo3 />}
              {capituloActivo === 4 && (
                <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
                  <h2 className="text-xl font-bold text-slate-200">Capítulo 4: El impacto territorial</h2>
                  <p className="text-sm mt-2">Contenido en desarrollo...</p>
                </div>
              )}
              {capituloActivo === 5 && (
                <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
                  <h2 className="text-xl font-bold text-slate-200">Capítulo 5: El futuro</h2>
                  <p className="text-sm mt-2">Contenido en desarrollo...</p>
                </div>
              )}
            </>
          )}

          {dimensionActiva === 'cultural' && (
            <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800 mt-4">
              <h2 className="text-xl font-bold text-amber-200">Dimensión Cultural</h2>
              <p className="text-sm mt-2">Módulo en proceso de desarrollo e integración de datos...</p>
            </div>
          )}

          {dimensionActiva === 'tecnologica' && (
            <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800 mt-4">
              <h2 className="text-xl font-bold text-emerald-200">Dimensión Tecnológica</h2>
              <p className="text-sm mt-2">Módulo en proceso de desarrollo e integración de datos...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;