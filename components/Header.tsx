
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [showRoadmap, setShowRoadmap] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/><path d="m9.05 4.87 1.05 1.05"/><path d="m14.95 4.87-1.05 1.05"/><path d="M12 12v10"/><path d="m8 14 4 4"/><path d="m16 14-4 4"/></svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">MediSense AI</h1>
        </div>
        
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setShowRoadmap(!showRoadmap)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all shadow-sm group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            FUTURE WORK
          </button>

          {showRoadmap && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowRoadmap(false)}></div>
              <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                  Project Roadmap
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">NIH Dataset Integration</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Leveraging the NIH clinical dataset for peer-reviewed medical grounding.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">RAG-Powered Chat</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Retrieval-Augmented Generation for complex medical Q&A with direct citations.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Specialized Diagnostics</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Extending analysis to Oncology (Cancer) reports, MRI findings, and Gene sequencing.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                   <span className="text-[10px] text-slate-400 font-medium">In Development</span>
                   <div className="flex -space-x-1.5">
                      {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-slate-200 border-2 border-white"></div>)}
                   </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
