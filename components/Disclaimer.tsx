
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm mb-6 shadow-sm">
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <p className="font-bold mb-1 uppercase text-[10px] tracking-widest text-amber-900">System Notification & Disclaimer</p>
        <p className="leading-relaxed opacity-90">
          MediSense provides computational analysis of laboratory data for educational purposes and is <strong>not a medical diagnostic system</strong>. 
          This output should not be treated as a professional medical consultation. 
          Consult a licensed physician before making any healthcare decisions based on this analysis.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
