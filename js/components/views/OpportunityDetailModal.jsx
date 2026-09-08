import React, { useState } from 'https://esm.sh/react@18.2.0';
import { useApp } from '../../context/AppContext.jsx';
import { Modal } from '../common/Modal.jsx';
import { ScoreBadge } from '../common/ScoreBadge.jsx';
import { VerifiedBadge } from '../common/Disclaimers.jsx';

export function OpportunityDetailModal() {
  const {
    activeModal,
    setActiveModal,
    modalData: opp,
    userProfile,
    addApplication,
    addToWeeklyPlan,
    showToast
  } = useApp();

  const [checklist, setChecklist] = useState({
    resumeTailored: false,
    sopWritten: false,
    transcriptsCollected: true,
    officialFormSubmitted: false,
    interviewPrepDone: false
  });

  const isOpen = activeModal === 'opp-detail' && opp !== null;

  if (!opp) return null;

  const userSkillNames = (userProfile.skills || []).map(s => s.name.toLowerCase());
  const requiredSkills = opp.requiredSkills || [];

  const matchedSkills = requiredSkills.filter(req => 
    userSkillNames.some(usk => usk.includes(req.toLowerCase()) || req.toLowerCase().includes(usk))
  );

  const missingSkills = requiredSkills.filter(req => 
    !userSkillNames.some(usk => usk.includes(req.toLowerCase()) || req.toLowerCase().includes(usk))
  );

  const handleApplyOfficial = () => {
    addApplication(opp, 'Applied');
    window.open(opp.sourceUrl || 'https://google.com', '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setActiveModal(null)}
      title={opp.title}
      subtitle={`${opp.organization} • ${opp.category} • ${opp.location}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Top Header Card with Match Score */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {opp.category}
              </span>
              {opp.verifiedSource && <VerifiedBadge />}
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-white">
              {opp.organization}
            </div>
            <div className="text-xs text-blue-200">
              Deadline: <strong className="text-white">{opp.deadline}</strong> ({opp.daysLeft} days remaining) {opp.stipend && `• Stipend: ${opp.stipend}`}
            </div>
          </div>

          <div className="shrink-0">
            <ScoreBadge score={opp.matchScore} size="lg" />
          </div>
        </div>

        {/* 6-Factor Match Breakdown Bars */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider">
            Nexora Match Dimension Breakdown
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-slate-500 font-medium">Career Fit</div>
              <div className="text-base font-heading font-extrabold text-slate-900">{opp.careerAlignmentPercent || 94}%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-slate-500 font-medium">Skill Synergy</div>
              <div className="text-base font-heading font-extrabold text-slate-900">{opp.skillMatchPercent || 88}%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-slate-500 font-medium">Eligibility Match</div>
              <div className="text-base font-heading font-extrabold text-emerald-700">{opp.eligibilityPercent || 100}%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-slate-500 font-medium">Time Feasibility</div>
              <div className="text-base font-heading font-extrabold text-slate-900">{opp.timeFeasibilityPercent || 90}%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-slate-500 font-medium">Location Match</div>
              <div className="text-base font-heading font-extrabold text-slate-900">95%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-slate-500 font-medium">Quality & Standing</div>
              <div className="text-base font-heading font-extrabold text-slate-900">{opp.opportunityQualityPercent || 96}%</div>
            </div>
          </div>
        </div>

        {/* WHY YOU SHOULD CONSIDER THIS */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5">
          <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            WHY YOU SHOULD CONSIDER THIS
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {opp.whyRecommended || opp.description}
          </p>
        </div>

        {/* SKILL GAP MATRIX */}
        <div className="space-y-3">
          <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider">
            Your Skill Gap Analysis
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Skills you have */}
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                <span>✓ Skills You Have ({matchedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-emerald-800 font-semibold text-xs rounded-lg border border-emerald-200">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">General foundational skills apply</span>
                )}
              </div>
            </div>

            {/* Skills to polish/acquire */}
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1">
                <span>⚡ Skills to Polish / Acquire ({missingSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-amber-900 font-semibold text-xs rounded-lg border border-amber-300 shadow-2xs">
                      + {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-700 font-semibold">No critical skill gaps identified! 🎉</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* APPLICATION CHECKLIST */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider">
            Interactive Application Checklist
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.resumeTailored}
                onChange={(e) => setChecklist({ ...checklist, resumeTailored: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Tailor Resume for {opp.organization}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.sopWritten}
                onChange={(e) => setChecklist({ ...checklist, sopWritten: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Statement of Purpose / Cover Letter</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.transcriptsCollected}
                onChange={(e) => setChecklist({ ...checklist, transcriptsCollected: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Academic Transcripts / ID Proof</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.interviewPrepDone}
                onChange={(e) => setChecklist({ ...checklist, interviewPrepDone: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Review Interview Talking Points</span>
            </label>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            Official Source: <a href={opp.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">{opp.organization} Official Portal</a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                addApplication(opp, 'Considering');
                setActiveModal(null);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Track in Kanban
            </button>
            <button
              onClick={() => {
                addToWeeklyPlan(opp);
                setActiveModal(null);
              }}
              className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold rounded-xl transition-colors"
            >
              + Add to Weekly Plan
            </button>
            <button
              onClick={handleApplyOfficial}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Apply on Official Site</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
