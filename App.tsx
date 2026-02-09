
import React, { useState } from 'react';
import { ANALYSIS_CONTENT } from './constants/analysisData';
import { GermanyMap } from './components/GermanyMap';
import { StateSidebar } from './components/StateSidebar';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleStateClick = (id: string) => {
    setSelectedId(id);
  };

  const analysis = selectedId ? ANALYSIS_CONTENT[selectedId] : null;

  const availableStates = Object.entries(ANALYSIS_CONTENT).map(([id, data]) => ({
    id,
    name: data.title
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe]">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-5 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 p-2.5 rounded-xl shadow-md shadow-emerald-100">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">EcoMap Deutschland</h1>
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Regionale Nachhaltigkeitsanalyse</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase">Geodaten Aktiv</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 lg:p-8 gap-8 overflow-hidden">
        {/* Left: Map Container */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 relative overflow-hidden">
          <div className="absolute top-6 left-8">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">Interaktive Karte</h3>
          </div>
          
          <div className="flex-1 w-full flex items-center justify-center p-4">
            <GermanyMap 
              selectedId={selectedId} 
              onStateClick={handleStateClick} 
            />
          </div>

          {/* Quick Access Grid */}
          <div className="mt-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Schnellauswahl</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {availableStates.map(state => (
                  <button 
                    key={state.id}
                    onClick={() => handleStateClick(state.id)}
                    title={state.name}
                    className={`px-2 py-1.5 text-[10px] font-bold rounded-lg border transition-all duration-200 ${
                      selectedId === state.id 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
                      : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    {state.id}
                  </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sidebar Container */}
        <div className="w-full lg:w-[450px] flex flex-col min-h-[500px]">
          <StateSidebar 
            stateId={selectedId} 
            analysis={analysis}
          />
        </div>
      </main>

      <footer className="py-6 px-4 text-center">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">
          Eigene Geodaten-Analyse &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
