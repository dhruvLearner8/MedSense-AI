
import React from 'react';
import { ReportSummary, LabStatus } from '../types';

interface LabResultsProps {
  summary: ReportSummary;
}

const LabResults: React.FC<LabResultsProps> = ({ summary }) => {
  const getStatusColor = (status: LabStatus) => {
    switch (status) {
      case LabStatus.NORMAL: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case LabStatus.LOW: return 'bg-amber-50 text-amber-700 border-amber-200';
      case LabStatus.HIGH: return 'bg-orange-50 text-orange-700 border-orange-200';
      case LabStatus.CRITICAL: return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Card */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Report Overview
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">{summary.overview}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Key Findings</h3>
            <ul className="space-y-2">
              {summary.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-blue-500 font-bold">•</span>
                  {finding}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Next Steps</h3>
            <ul className="space-y-2">
              {summary.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-emerald-500 font-bold">✓</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lab Parameters Table */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Lab Parameters</h2>
          <span className="text-xs text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">
            {summary.labs.length} markers identified
          </span>
        </div>
        
        <div className="overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Parameter</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Value</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Ref. Range</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">What this means</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.labs.map((lab, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{lab.parameter}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-slate-900">{lab.value} <span className="text-xs text-slate-400 font-sans">{lab.unit}</span></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-500">{lab.referenceRange}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lab.status)}`}>
                        {lab.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 leading-normal max-w-xs">{lab.interpretation}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabResults;
