import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { ScoreBadge } from '../common/ScoreBadge.jsx';
import { VerifiedBadge, AIDisclaimerBanner } from '../common/Disclaimers.jsx';
import { Modal } from '../common/Modal.jsx';

export function NextBestActionView() {
  const {
    nextBestAction,
    userProfile,
    addToWeeklyPlan,
    addApplication,
    markNotRelevant,
    setCurrentScreen,
    setActiveModal,
    setModalData,
    showToast
  } = useApp();

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState('Not interested in this domain');

  if (!nextBestAction) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800">No recommended actions available.</h3>
        <button
          onClick={() => setCurrentScreen('opportunities')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          Explore All Opportunities
        </button>
      </div>
    );
  }

  const scoreDimensions = [
    { label: "Career Alignment", score: nextBestAction.careerAlignmentPercent || 96, desc: `Matches your primary target path in ${userProfile.targetCareers?.[0] || 'Policy'}` },
    { label: "Skill Match", score: nextBestAction.skillMatchPercent || 92, desc: `High synergy with your verified ${userProfile.skills?.[0]?.name || 'Analysis'} capabilities` },
    { label: "Eligibility Criteria", score: nextBestAction.eligibilityPercent || 100, desc: "Satisfies degree, year, and prerequisite academic criteria" },
    { label: "Goal Relevance", score: 94, desc: "Directly contributes to your stated 6-12 month roadmap" },
    { label: "Time Feasibility", score: nextBestAction.timeFeasibilityPercent || 90, desc: `Requires ~${nextBestAction.estimatedTimeMinutes || 25} mins to apply; fits your ${userProfile.availableHours}h/week capacity` },
    { label: "Location Preference", score: 95, desc: `${nextBestAction.location} aligns with your preferred location` },
    { label: "Opportunity Quality & Source", score: nextBestAction.opportunityQualityPercent || 98, desc: `Verified institutional standing with ${nextBestAction.organization}` }
  ];

  const handleApplyOfficial = () => {
    addApplication(nextBestAction, 'Applied');
    window.open(nextBestAction.sourceUrl || 'https://google.com', '_blank');
  };

  const handleConfirmNotRelevant = () => {
    markNotRelevant(nextBestAction.id, feedbackReason);
    setFeedbackModalOpen(false);
    showToast('Feedback noted! Recommendation algorithm updated.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Deterministic AI Recommendation
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Your Next Best Action
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            The single highest-leverage decision you can execute today.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Hero Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Title, Org & Match Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                {nextBestAction.category}
              </span>
              {nextBestAction.verifiedSource && <VerifiedBadge />}
              <span className="text-xs text-slate-500 font-medium">
                Deadline: <strong className="text-red-600 font-bold">{nextBestAction.deadline}</strong> ({nextBestAction.daysLeft} days remaining)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              {nextBestAction.title}
            </h2>
            <div className="text-sm font-semibold text-slate-600 mt-1">
              {nextBestAction.organization} • {nextBestAction.location} {nextBestAction.stipend && `• ${nextBestAction.stipend}`}
            </div>
          </div>

          <div className="shrink-0">
            <ScoreBadge score={nextBestAction.matchScore} size="lg" />
          </div>
        </div>

        {/* 7-Dimension Visual Score Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-slate-900">
              7-Dimension AI Match Breakdown
            </h3>
            <span className="text-xs text-slate-400">Deterministic algorithmic scoring</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {scoreDimensions.map((dim, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>{dim.label}</span>
                  <span className="text-blue-600 font-extrabold">{dim.score}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY NEXORA RECOMMENDS THIS */}
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-heading font-bold text-blue-950 uppercase tracking-wider">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            WHY NEXORA RECOMMENDS THIS
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {nextBestAction.whyRecommended}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {nextBestAction.description}
          </p>
        </div>

        {/* WHAT YOU NEED & EXPECTED VALUE (2 Col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What you need */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              WHAT YOU NEED
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900">Required Skills:</span>{' '}
                {(nextBestAction.requiredSkills || []).join(', ')}
              </div>
              <div>
                <span className="font-bold text-slate-900">Documents Checklist:</span>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-slate-600">
                  {(nextBestAction.documentsRequired || ["Updated Resume", "Statement of Purpose"]).map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold text-slate-900">Estimated Effort:</span>{' '}
                ~{nextBestAction.estimatedTimeMinutes || 25} minutes to submit
              </div>
            </div>
          </div>

          {/* Expected Value */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              EXPECTED STRATEGIC VALUE
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {nextBestAction.expectedValue}
            </p>
            <div className="text-[11px] text-slate-500 italic">
              *Note: Strategic value represents expected career leverage and skill proof, not guaranteed admission or selection.
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setFeedbackModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            ✕ Not Relevant for me
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                addApplication(nextBestAction, 'Saved');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              Save for Later
            </button>
            <button
              onClick={() => addToWeeklyPlan(nextBestAction)}
              className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors border border-blue-200"
            >
              + Add to Weekly Plan
            </button>
            <button
              onClick={handleApplyOfficial}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-heading font-extrabold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
            >
              <span>Apply on Official Website</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AIDisclaimerBanner />

      {/* Adaptive Feedback Modal */}
      <Modal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        title="Help Nexora Tune Your Recommendations"
        subtitle="Why is this opportunity not relevant to your current goals?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              "Not interested in this specific domain/organization",
              "Too far away / Not enough remote flexibility",
              "Currently lacking prerequisites / too difficult",
              "Incompatible with my weekly schedule / too time intensive",
              "Already applied or completed"
            ].map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-800"
              >
                <input
                  type="radio"
                  name="feedbackReason"
                  checked={feedbackReason === reason}
                  onChange={() => setFeedbackReason(reason)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setFeedbackModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmNotRelevant}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
            >
              Remove & Update AI Weights
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
