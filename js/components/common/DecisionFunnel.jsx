import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export function DecisionFunnel({ compact = false }) {
  const { funnelStats, setCurrentScreen } = useApp();

  const stages = [
    { label: "Total Tracked", count: funnelStats.total, sub: "Scattered opportunities", color: "bg-slate-100 text-slate-700 border-slate-200" },
    { label: "Potentially Relevant", count: funnelStats.potentiallyRelevant, sub: "Passed eligibility filters", color: "bg-blue-50 text-blue-800 border-blue-200" },
    { label: "Strong Matches", count: funnelStats.strongMatches, sub: "High skill & career synergy", color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
    { label: "Top Priorities", count: funnelStats.priorities, sub: "Immediate deadlines & value", color: "bg-purple-50 text-purple-800 border-purple-200" },
    { label: "Next Best Action", count: funnelStats.nextAction, sub: "Your highest ROI move today", color: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md", isHero: true }
  ];

  if (compact) {
    return (
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Decision Funnel:
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{funnelStats.total}</span>
          <span className="text-slate-300">→</span>
          <span className="bg-blue-50 px-2 py-0.5 rounded text-blue-700">{funnelStats.potentiallyRelevant}</span>
          <span className="text-slate-300">→</span>
          <span className="bg-indigo-50 px-2 py-0.5 rounded text-indigo-700">{funnelStats.strongMatches}</span>
          <span className="text-slate-300">→</span>
          <span className="bg-purple-50 px-2 py-0.5 rounded text-purple-700">{funnelStats.priorities}</span>
          <span className="text-slate-300">→</span>
          <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-extrabold shadow-xs">1 Action</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            <h3 className="text-base font-heading font-bold text-slate-900">
              The Nexora Decision Funnel
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            How Nexora cuts through information noise to determine what matters right now.
          </p>
        </div>
        <button
          onClick={() => setCurrentScreen('next-best-action')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group self-start md:self-auto"
        >
          View 1 Action Breakdown
          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border transition-all duration-200 relative ${stage.color} ${stage.isHero ? 'ring-2 ring-blue-400 ring-offset-1' : 'hover:border-slate-300'}`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className={`text-2xl font-heading font-black tracking-tight ${stage.isHero ? 'text-white' : 'text-slate-900'}`}>
                {stage.count}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${stage.isHero ? 'bg-white/20 text-white' : 'bg-black/5 text-slate-600'}`}>
                Stage {idx + 1}
              </span>
            </div>
            <div className={`text-xs font-bold leading-tight ${stage.isHero ? 'text-blue-50' : 'text-slate-800'}`}>
              {stage.label}
            </div>
            <div className={`text-[11px] mt-1 leading-snug ${stage.isHero ? 'text-blue-100' : 'text-slate-500'}`}>
              {stage.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
