import React from 'https://esm.sh/react@18.2.0';
import { useApp } from '../../context/AppContext.jsx';
import { ScoreBadge } from '../common/ScoreBadge.jsx';
import { AIDisclaimerBanner } from '../common/Disclaimers.jsx';

export function CareerComparisonView() {
  const {
    CAREER_PATHS,
    compareCareerIds,
    setCompareCareerIds,
    userProfile,
    setCurrentScreen,
    addToWeeklyPlan
  } = useApp();

  const selectedPaths = CAREER_PATHS.filter(p => compareCareerIds.includes(p.id));

  const comparisonRows = [
    { label: "Nexora AI Fit Score", render: (p) => <ScoreBadge score={p.fitScore} size="md" /> },
    { label: "Eligibility Criteria", render: (p) => <span className="text-xs text-slate-700">{p.eligibility}</span> },
    { label: "Preparation Effort & Hours", render: (p) => <span className="text-xs font-bold text-slate-900">{p.prepEffort}</span> },
    { label: "Realistic Prep Timeline", render: (p) => <span className="text-xs font-semibold text-blue-700">{p.timeline}</span> },
    { label: "Financial Cost & Test Prep", render: (p) => <span className="text-xs text-slate-700">{p.cost}</span> },
    { label: "Opportunity Cost", render: (p) => <span className="text-xs font-semibold text-amber-800">{p.opportunityCost}</span> },
    { label: "Starting CTC / Compensation", render: (p) => <span className="text-xs font-bold text-emerald-700">{p.startingSalary}</span> },
    { label: "Career Growth & Ceiling", render: (p) => <span className="text-xs text-slate-700">{p.careerCeiling}</span> },
    {
      label: "Job Stability (1-5)",
      render: (p) => (
        <span className="text-xs font-bold text-slate-800">
          {'★'.repeat(p.stability)}{'☆'.repeat(5 - p.stability)} ({p.stability}/5)
        </span>
      )
    },
    {
      label: "Work Flexibility / Remote (1-5)",
      render: (p) => (
        <span className="text-xs font-bold text-slate-800">
          {'★'.repeat(p.flexibility)}{'☆'.repeat(5 - p.flexibility)} ({p.flexibility}/5)
        </span>
      )
    },
    {
      label: "Identified Skill Gaps for You",
      render: (p) => (
        <div className="flex flex-wrap gap-1">
          {(p.skillGap || []).map((sk, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
              + {sk}
            </span>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Multilateral Decision Matrix
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Career Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Side-by-side empirical trade-off analysis tailored to your {userProfile.degree} profile.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentScreen('career-nav')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            ← Modify Compared Careers
          </button>
        </div>
      </div>

      {/* YOUR CURRENT POSITION & NEXORA RECOMMENDATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Current Position */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-extrabold text-slate-900 uppercase tracking-wider">
              YOUR CURRENT POSITION SNAPSHOT
            </h3>
            <span className="text-xs font-bold text-blue-600">{userProfile.year}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            You are enrolled in <strong>{userProfile.degree}</strong> with <strong>{userProfile.availableHours} hours/week</strong> available study bandwidth. Your verified strengths are <strong>{userProfile.skills?.slice(0, 3).map(s => s.name).join(', ')}</strong>.
          </p>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-700">
            <div>• <strong>Timeline Constraint:</strong> {userProfile.timeline || 'Next 6-12 Months'}</div>
            <div>• <strong>Key Stated Preference:</strong> Public Impact ({userProfile.preferences?.impact || 90}%), Stability ({userProfile.preferences?.stability || 85}%)</div>
          </div>
        </div>

        {/* Nexora Recommendation */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-heading font-bold text-blue-300 uppercase tracking-wider">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            NEXORA AI RECOMMENDATION
          </div>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
            “Based on your current profile, writing background, and 6–12 month graduation horizon, <strong>{selectedPaths[0]?.title || 'Policy Analyst'}</strong> currently appears more aligned for immediate execution, while keeping <strong>{selectedPaths[1]?.title || 'RBI Grade B'}</strong> as a structured 12-month competitive goal.”
          </p>
          <div className="text-[11px] text-blue-300 italic">
            *Nexora evaluates feasibility and risk-adjusted return on effort; it does not claim guaranteed outcomes.
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 sm:p-5 text-xs font-heading font-extrabold text-slate-500 uppercase tracking-wider w-1/4">
                  Evaluation Dimension
                </th>
                {selectedPaths.map((path) => (
                  <th key={path.id} className="p-4 sm:p-5 text-sm font-heading font-extrabold text-slate-900 min-w-[240px]">
                    <div>{path.title}</div>
                    <div className="text-[11px] font-normal text-slate-500 mt-0.5">{path.category}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 text-xs font-bold text-slate-800 align-top bg-slate-50/30">
                    {row.label}
                  </td>
                  {selectedPaths.map((path) => (
                    <td key={path.id} className="p-4 sm:p-5 align-top">
                      {row.render(path)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WHAT SHOULD I DO THIS MONTH? Practical Low-Cost Experiments */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Low-Risk Reality Check</span>
            <h3 className="text-lg font-heading font-extrabold text-slate-900 mt-0.5">
              What Should I Do This Month? (4 Practical Experiments)
            </h3>
          </div>
          <span className="text-xs text-slate-500">Test actual fit before committing 500+ hours</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {selectedPaths.flatMap((p) => p.recommendedExperiments || []).slice(0, 4).map((exp, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{exp.title}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px]">{exp.timeNeeded}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                <span className="text-[10px] text-emerald-700 font-semibold">Impact: {exp.impact}</span>
                <button
                  onClick={() => addToWeeklyPlan({ title: exp.title, deadline: 'In 7 days', estimatedTimeMinutes: 120, matchScore: 92, id: `exp-${i}` }, 'Experiment')}
                  className="px-3 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 text-xs font-bold rounded-lg transition-colors shadow-2xs"
                >
                  + Add to Weekly Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIDisclaimerBanner />
    </div>
  );
}
