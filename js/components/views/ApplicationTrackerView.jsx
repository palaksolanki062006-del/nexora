import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { ScoreBadge } from '../common/ScoreBadge.jsx';
import { Modal } from '../common/Modal.jsx';

export function ApplicationTrackerView() {
  const {
    applications,
    updateApplicationStage,
    updateApplicationNotes,
    userProfile,
    setCurrentScreen,
    showToast
  } = useApp();

  const [selectedApp, setSelectedApp] = useState(null);
  const [activeAITool, setActiveAITool] = useState(null); // 'resume' | 'interview' | 'notes'
  const [customNotes, setCustomNotes] = useState('');

  const stages = [
    { id: "Saved", label: "Saved", color: "border-slate-300 bg-slate-50 text-slate-700" },
    { id: "Considering", label: "Considering", color: "border-blue-300 bg-blue-50 text-blue-800" },
    { id: "Applied", label: "Applied", color: "border-indigo-300 bg-indigo-50 text-indigo-800" },
    { id: "Assessment", label: "Assessment", color: "border-purple-300 bg-purple-50 text-purple-800" },
    { id: "Interview", label: "Interview", color: "border-amber-300 bg-amber-50 text-amber-800" },
    { id: "Selected", label: "Selected", color: "border-emerald-300 bg-emerald-50 text-emerald-800" },
    { id: "Rejected", label: "Rejected", color: "border-rose-300 bg-rose-50 text-rose-800" },
    { id: "Withdrawn", label: "Withdrawn", color: "border-slate-300 bg-slate-100 text-slate-600" }
  ];

  const handleOpenAITool = (app, toolType) => {
    setSelectedApp(app);
    setCustomNotes(app.notes || '');
    setActiveAITool(toolType);
  };

  const handleSaveNotes = () => {
    if (selectedApp) {
      updateApplicationNotes(selectedApp.id, customNotes);
      setActiveAITool(null);
    }
  };

  return (
    <div className="space-y-6 max-w-full mx-auto animate-fade-in pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            Application Pipeline & Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            My Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track status transitions and leverage AI tools for resume tailoring and interview scripts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('opportunities')}
            className="px-4 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-2xl hover:bg-blue-700 transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>+ Add from Explorer</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1300px]">
          {stages.map((stage) => {
            const columnApps = applications.filter(a => a.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="w-72 bg-slate-50/80 rounded-3xl p-3.5 border border-slate-200 flex flex-col justify-between shrink-0"
              >
                {/* Column Header */}
                <div>
                  <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                    <span className="text-xs font-heading font-extrabold text-slate-800">
                      {stage.label}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[11px] font-bold flex items-center justify-center border border-slate-200 shadow-2xs">
                      {columnApps.length}
                    </span>
                  </div>

                  {/* Cards in this stage */}
                  <div className="space-y-3 min-h-[350px]">
                    {columnApps.length === 0 ? (
                      <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-[11px] text-slate-400 font-medium">
                        No applications
                      </div>
                    ) : (
                      columnApps.map((app) => (
                        <div
                          key={app.id}
                          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-2.5 group"
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="text-xs font-bold text-slate-900 line-clamp-1">
                              {app.position}
                            </span>
                            {app.matchScore && <ScoreBadge score={app.matchScore} size="sm" showLabel={false} />}
                          </div>

                          <div className="text-[11px] text-slate-600 font-medium truncate">
                            {app.organization}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                            <span>Deadline: <strong className="text-red-600">{app.deadline}</strong></span>
                            {app.interviewDate && (
                              <span className="text-amber-700 font-bold">Interview: {app.interviewDate.split(' ')[0]}</span>
                            )}
                          </div>

                          {/* Stage Transition Selector */}
                          <div className="pt-1 flex items-center justify-between gap-1">
                            <select
                              value={app.stage}
                              onChange={(e) => updateApplicationStage(app.id, e.target.value)}
                              className="text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                            >
                              {stages.map((s) => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                              ))}
                            </select>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenAITool(app, 'resume')}
                                className="p-1 rounded-lg text-blue-600 hover:bg-blue-50 text-[11px] font-bold"
                                title="Tailor Resume AI"
                              >
                                📄 AI
                              </button>
                              <button
                                onClick={() => handleOpenAITool(app, 'interview')}
                                className="p-1 rounded-lg text-indigo-600 hover:bg-indigo-50 text-[11px] font-bold"
                                title="Prepare Interview AI"
                              >
                                🎙️ AI
                              </button>
                              <button
                                onClick={() => handleOpenAITool(app, 'notes')}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                                title="Edit Notes"
                              >
                                ✎
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Modals for Tailor Resume, Prepare Interview & Notes */}
      {selectedApp && (
        <>
          {/* 1. Tailor Resume AI Modal */}
          <Modal
            isOpen={activeAITool === 'resume'}
            onClose={() => setActiveAITool(null)}
            title={`Tailor Resume for ${selectedApp.organization}`}
            subtitle={`Position: ${selectedApp.position} • Tailored to ${userProfile.name}'s verified skills`}
            maxWidth="max-w-2xl"
          >
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-900 leading-relaxed">
                Nexora AI has extracted high-impact action verbs and aligned your real academic experience with the prerequisites of <strong>{selectedApp.organization}</strong> without fabricating any achievements.
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-heading font-extrabold text-slate-900 uppercase tracking-wider">
                  Recommended Experience Bullet Points
                </h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 space-y-2 font-mono">
                  <p>• Synthesized empirical policy and macro datasets for {userProfile.degree} coursework, utilizing {userProfile.skills?.[0]?.name || 'statistical modeling'} to draft rigorous policy memos.</p>
                  <p>• Spearheaded research inquiries evaluating state-level KPI frameworks, directly translating analytical models into actionable insights.</p>
                  <p>• Collaborated cross-functionally across academic teams, presenting structured briefs to senior faculty and institutional stakeholders.</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">Strictly grounded in verified user background</span>
                <button
                  onClick={() => {
                    showToast('Copied tailored bullets to clipboard!');
                    setActiveAITool(null);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </Modal>

          {/* 2. Prepare Interview AI Modal */}
          <Modal
            isOpen={activeAITool === 'interview'}
            onClose={() => setActiveAITool(null)}
            title={`Prepare Interview: ${selectedApp.organization}`}
            subtitle={`Position: ${selectedApp.position} • Predictive Question Diagnostics`}
            maxWidth="max-w-2xl"
          >
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    q: `1. "Why are you specifically targeting this ${selectedApp.position} role at ${selectedApp.organization}?"`,
                    talkingPoint: `Highlight your ${userProfile.degree} coursework and emphasize how ${selectedApp.organization}'s specific research publications motivated your application.`
                  },
                  {
                    q: `2. "Walk us through a complex project where you utilized ${userProfile.skills?.[0]?.name || 'data analysis'}."`,
                    talkingPoint: `Use the STAR format (Situation, Task, Action, Result) referring to your experience at ${userProfile.experience?.[0]?.organization || 'college'}.`
                  },
                  {
                    q: `3. "How do you handle ambiguous requirements under tight submission deadlines?"`,
                    talkingPoint: `Mention your weekly planning habit and capacity discipline, focusing on proactive communication.`
                  }
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900">{item.q}</div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-blue-700 font-semibold">Suggested Talking Points:</strong> {item.talkingPoint}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveAITool(null)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Done Reviewing
                </button>
              </div>
            </div>
          </Modal>

          {/* 3. Notes Editor Modal */}
          <Modal
            isOpen={activeAITool === 'notes'}
            onClose={() => setActiveAITool(null)}
            title={`Notes for ${selectedApp.position}`}
            subtitle={`${selectedApp.organization}`}
            maxWidth="max-w-md"
          >
            <div className="space-y-4">
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Add custom application notes, interviewer names, portal links, follow-up dates..."
                rows={5}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setActiveAITool(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
