
import React from 'react';
import { StateAnalysis } from '../types';

interface StateSidebarProps {
  stateId: string | null;
  analysis: StateAnalysis | null;
}

export const StateSidebar: React.FC<StateSidebarProps> = ({ stateId, analysis }) => {
  if (!stateId || !analysis) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-xl shadow-slate-200/50">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
          <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.002a2 2 0 011.332-1.882l8-2.667a2 2 0 011.336 0l8 2.667A2 2 0 0121 5.002v10.486a2 2 0 01-1.553 1.947L15 20m-6 0l-1-4m1 4l1-4m-7 4l1-4m15 4l-1-4M9 20v-4m6 4v-4m-6 0h6" />
          </svg>
        </div>
        <h3 className="text-slate-900 font-bold text-lg mb-2">Regionale Einblicke</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Wähle ein Bundesland auf der Karte aus, um deine individuelle Nachhaltigkeitsanalyse anzuzeigen.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col">
      {/* Header Profile */}
      <div className="bg-slate-900 p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Regionaler Bericht</span>
          <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-emerald-500/20">Analyse Aktiv</span>
        </div>
        
        <h2 className="text-3xl font-extrabold tracking-tight mb-6 leading-tight">{analysis.title}</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-40 mb-1">Umwelt-Score</span>
              <span className="text-3xl font-black text-emerald-400 leading-none">{analysis.score}%</span>
            </div>
            <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full transition-all duration-1000 ease-out" 
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Eigene Nachhaltigkeitsanalyse</h4>
        </div>
        
        <div className="prose prose-slate">
          <div className="text-slate-600 leading-[1.8] text-sm whitespace-pre-wrap font-medium">
            {analysis.text}
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[10px] text-slate-400 leading-relaxed font-semibold italic">
             "Diese Daten werden manuell gepflegt und spiegeln spezifische regionale Nachhaltigkeitsziele wider."
           </p>
        </div>
      </div>

      {/* Bottom Identity */}
      <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
           <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Verifizierte Inhalte</span>
        </div>
        <span className="text-[10px] font-bold text-slate-300 uppercase">Code: {stateId}</span>
      </div>
    </div>
  );
};
