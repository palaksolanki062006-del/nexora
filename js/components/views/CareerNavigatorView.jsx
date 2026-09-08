import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { ScoreBadge } from '../common/ScoreBadge.jsx';

export function CareerNavigatorView() {
  const {
    CAREER_PATHS,
    userProfile,
    setCurrentScreen,
    compareCareerIds,
    setCompareCareerIds,
    showToast
  } = useApp();

  const [decisionPrompt, setDecisionPrompt] = useState("I am confused between RBI Grade B, UPSC Civil Services and Policy Consulting.");

  const handleSelectForCompare = (careerId) => {
    if (compareCareerIds.includes(careerId)) {
      if (compareCareerIds.length <= 2) {
        showToast('Keep at least 2 career paths selected for comparison', 'info');
        return;
      }
      setCompareCareerIds(compareCareerIds.filter(id => id !== careerId));
      showToast('Removed from comparison matrix');
    } else {
      if (compareCareerIds.length >= 3) {
        showToast('Maximum 3 career paths can be compared side-by-side', 'info');
        return;
      }
      setCompareCareerIds([...compareCareerIds, careerId]);
      showToast('Added to comparison matrix');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Top Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              AI Career Intelligence Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Career Navigator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore structural realities, preparation timelines, and personalized fit scores across high-impact careers.
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('career-compare')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Compare Selected ({compareCareerIds.length})</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* Career Decision Prompt Input */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            What career decision are you trying to make?
          </label>
          <div className="relative">
            <input
              type="text"
              value={decisionPrompt}
              onChange={(e) => setDecisionPrompt(e.target.value)}
              placeholder="e.g. I am confused between RBI Grade B, UPSC, and Corporate Strategy..."
              className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600 shadow-2xs transition-all"
            />
            <button
              onClick={() => setCurrentScreen('career-compare')}
              className="absolute right-2 top-2 px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              Analyze Fit
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[11px] text-slate-400 font-medium">Quick comparison presets:</span>
            {[
              "RBI Grade B vs UPSC vs Policy Consulting",
              "AI Research Scientist vs Product Management",
              "Investment Banking vs FinTech vs MBA"
            ].map((preset, i) => (
              <button
                key={i}
                onClick={() => {
                  setDecisionPrompt(preset);
                  if (i === 0) setCompareCareerIds(['rbi-grade-b', 'upsc-civil-services', 'policy-analyst']);
                  if (i === 1) setCompareCareerIds(['ai-research-scientist', 'product-management']);
                  if (i === 2) setCompareCareerIds(['investment-banking', 'product-management', 'rbi-grade-b']);
                }}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full transition-colors font-medium"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Career Path Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAREER_PATHS.map((path) => {
          const isSelectedForCompare = compareCareerIds.includes(path.id);
          return (
            <div
              key={path.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-5 ${
                isSelectedForCompare
                  ? 'border-blue-500 ring-2 ring-blue-100 shadow-md'
                  : 'border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {path.category}
                    </span>
                    <h3 className="text-lg font-heading font-extrabold text-slate-900 mt-1">
                      {path.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {path.tagline}
                    </p>
                  </div>
                  <ScoreBadge score={path.fitScore} size="md" />
                </div>

                {/* Core Parameters Matrix */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Preparation Effort</div>
                    <div className="font-bold text-slate-900">{path.prepEffort}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Starting Salary</div>
                    <div className="font-bold text-emerald-700">{path.startingSalary}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Job Stability</div>
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      {'★'.repeat(path.stability)}{'☆'.repeat(5 - path.stability)}
                      <span className="text-[10px] text-slate-400 font-normal">({path.stability}/5)</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Work Flexibility</div>
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      {'★'.repeat(path.flexibility)}{'☆'.repeat(5 - path.flexibility)}
                      <span className="text-[10px] text-slate-400 font-normal">({path.flexibility}/5)</span>
                    </div>
                  </div>
                </div>

                {/* Why Aligned & Skills Required */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 text-slate-700 leading-relaxed">
                    <strong className="text-blue-900 block font-heading font-bold mb-0.5">Personalized Fit Rationale:</strong>
                    {path.whyAligned}
                  </div>

                  <div>
                    <div className="text-slate-500 font-semibold mb-1">Required Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {path.skillsRequired.map((sk, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Compare Toggle */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Career Ceiling: <strong className="text-slate-700">{path.careerCeiling}</strong>
                </span>

                <button
                  onClick={() => handleSelectForCompare(path.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelectedForCompare
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{isSelectedForCompare ? '✓ Selected for Compare' : '+ Select to Compare'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
