
import React, { useState } from 'react';
import { ReportState, ChatMessage, ReportSummary } from './types';
import { processReport } from './services/geminiService';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import FileUpload from './components/FileUpload';
import LabResults from './components/LabResults';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [state, setState] = useState<ReportState>({
    isProcessing: false,
    error: null,
    summary: null,
    history: []
  });

  const handleFileSelect = async (base64: string, mimeType: string) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    let dataToProcess = base64;
    let actualMime = mimeType;

    if (base64 === "SAMPLE_TRIGGER") {
      dataToProcess = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
      actualMime = "image/png";
    }

    try {
      const result = await processReport(dataToProcess, actualMime);
      setState(prev => ({ 
        ...prev, 
        summary: result, 
        isProcessing: false,
        history: [] 
      }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: err.message || "Extraction failed. Please ensure the clinical record is clear."
      }));
    }
  };

  const handleNewMessage = (msg: ChatMessage) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, msg]
    }));
  };

  const resetReport = () => {
    setState({
      isProcessing: false,
      error: null,
      summary: null,
      history: []
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {!state.summary ? (
          <div className="max-w-2xl mx-auto space-y-8 mt-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Analyze <span className="text-blue-600">Clinical Data</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
                Transform laboratory results into structured medical interpretation.
              </p>
            </div>

            <FileUpload 
              onFileSelect={handleFileSelect} 
              isLoading={state.isProcessing} 
            />

            {state.error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm flex gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {state.error}
              </div>
            )}

            <Disclaimer />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={resetReport}
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-colors group px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  New Analysis
                </button>
              </div>
              
              <LabResults summary={state.summary} />
              
              <div className="pt-6">
                 <Disclaimer />
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <Chat 
                summary={state.summary} 
                history={state.history} 
                onMessageSent={handleNewMessage} 
              />
              <p className="text-[9px] text-slate-400 text-center mt-4 uppercase tracking-[0.2em]">
                Secure Data Transfer
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
