
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ReportSummary } from '../types';
import { askFollowUp } from '../services/geminiService';

interface ChatProps {
  summary: ReportSummary;
  history: ChatMessage[];
  onMessageSent: (msg: ChatMessage) => void;
}

const Chat: React.FC<ChatProps> = ({ summary, history, onMessageSent }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    onMessageSent(userMsg);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askFollowUp(input, summary, history.map(m => ({ role: m.role, content: m.content })));
      const botMsg: ChatMessage = {
        role: 'model',
        content: response,
        timestamp: new Date()
      };
      onMessageSent(botMsg);
    } catch (err) {
      console.error(err);
      onMessageSent({
        role: 'model',
        content: "System connection error. Please try your question again.",
        timestamp: new Date()
      });
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    "Explain my results",
    "Which values are abnormal?",
    "Next clinical steps",
    "Is this typical?"
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg h-[600px] flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <h3 className="font-bold text-slate-800">Interpretation Query</h3>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Context: {summary.labs.length} markers</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
      >
        {history.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <p className="text-slate-600 text-sm font-medium">
              Analysis Loaded.
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Enter a question below to consult the analysis regarding specific findings.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(s)}
                  className="text-xs bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded border border-slate-200 shadow-sm transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-white rounded-br-none shadow-sm' 
                : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
            }`}>
              {msg.content}
              <div className={`text-[10px] mt-1 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 px-3 py-2 rounded-xl rounded-bl-none flex gap-1 items-center">
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a query..."
            disabled={isTyping}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-400 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 p-1.5 bg-slate-800 text-white rounded hover:bg-slate-900 disabled:opacity-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
