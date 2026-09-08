import React, { useState } from 'https://esm.sh/react@18.2.0';
import { useApp } from '../../context/AppContext.jsx';
import { ScoreBadge } from '../common/ScoreBadge.jsx';
import { DecisionFunnel } from '../common/DecisionFunnel.jsx';
import { VerifiedBadge, AIDisclaimerBanner } from '../common/Disclaimers.jsx';

export function DashboardView() {
  const {
    userProfile,
    nextBestAction,
    topPriorities,
    weeklyPlan,
    applications,
    setCurrentScreen,
    addToWeeklyPlan,
    addApplication,
    setActiveModal,
    setModalData,
    toggleTaskCompletion,
    rankedOpportunities
  } = useApp();

  const [deadlineTab, setDeadlineTab] = useState('All'); // 'All' | 'Internships' | 'Scholarships' | 'Government Programs' | 'Research'

  // Weekly hours calculations
  const totalWeeklyHours = weeklyPlan.reduce((acc, t) => acc + (parseFloat(t.estimatedHours) || 1), 0);
  const completedHours = weeklyPlan.filter(t => t.completed).reduce((acc, t) => acc + (parseFloat(t.estimatedHours) || 1), 0);
  const completedTasksCount = weeklyPlan.filter(t => t.completed).length;

  // Upcoming deadlines from ranked opportunities
  const upcomingDeadlines = rankedOpportunities
    .filter(o => deadlineTab === 'All' || o.category === deadlineTab)
    .slice(0, 5);

  const handleOpenDetail = (opportunity) => {
    setModalData(opportunity);
    setActiveModal('opp-detail');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-10">
      {/* Top Greeting & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Personal AI Navigator
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            Good morning, {userProfile.name.split(' ')[0]}.
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Here is what matters most right now. Nexora filtered {rankedOpportunities.length}+ signals into 1 immediate action.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setCurrentScreen('weekly')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            This Week ({completedTasksCount}/{weeklyPlan.length} Done)
          </button>
          <button
            onClick={() => setCurrentScreen('opportunities')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            Explore All Opportunities →
          </button>
        </div>
      </div>

      {/* HERO CARD: YOUR NEXT BEST ACTION */}
      {nextBestAction && (
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10 border border-slate-800 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Tag & Match Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-heading font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  YOUR NEXT BEST ACTION
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  • Closes in {nextBestAction.daysLeft} days
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-200">AI Relevance Confidence:</span>
                <ScoreBadge score={nextBestAction.matchScore} size="lg" />
              </div>
            </div>

            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 mb-1">
                <span>{nextBestAction.organization}</span>
                <span>•</span>
                <span>{nextBestAction.category}</span>
                <span>•</span>
                <span>{nextBestAction.location}</span>
                {nextBestAction.stipend && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-300 font-bold">{nextBestAction.stipend}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight leading-snug">
                {nextBestAction.title}
              </h2>
            </div>

            {/* Why Nexora Recommends This Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-1.5">
              <div className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Why Nexora recommends it right now:
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                “{nextBestAction.whyRecommended}”
              </p>
            </div>

            {/* Action Buttons & Time */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Deadline: <strong className="text-white">{nextBestAction.deadline}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Est. Time: <strong className="text-white">~{nextBestAction.estimatedTimeMinutes || 25} mins</strong>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => addToWeeklyPlan(nextBestAction)}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors border border-white/20"
                >
                  + Add to Weekly Plan
                </button>
                <button
                  onClick={() => setCurrentScreen('next-best-action')}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors border border-white/20"
                >
                  Why This? (Breakdown)
                </button>
                <button
                  onClick={() => handleOpenDetail(nextBestAction)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-heading font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all"
                >
                  View Opportunity →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The Nexora Decision Funnel */}
      <DecisionFunnel />

      {/* Two Column Grid: Top Priorities & This Week Capacity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: TOP PRIORITIES */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900 flex items-center gap-2">
                  <span>YOUR TOP PRIORITIES</span>
                  <span className="text-xs font-normal text-slate-500">Ranked by urgency & impact</span>
                </h3>
              </div>
              <button
                onClick={() => setCurrentScreen('opportunities')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                View all →
              </button>
            </div>

            <div className="space-y-3">
              {topPriorities.map((opp, idx) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {opp.title}
                          </span>
                          {opp.verifiedSource && <VerifiedBadge />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {opp.organization} • <span className="font-semibold text-slate-700">{opp.category}</span> • Deadline: <span className="text-red-600 font-bold">{opp.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <ScoreBadge score={opp.matchScore} size="sm" />
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1 pl-9">
                    {opp.whyRecommended}
                  </p>

                  <div className="flex items-center justify-between pl-9 pt-1 border-t border-slate-100/80 text-xs">
                    <span className="text-[11px] text-slate-400">
                      Est. {opp.estimatedTimeMinutes || 20} mins • {opp.location}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToWeeklyPlan(opp)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
                      >
                        + Add to Week
                      </button>
                      <button
                        onClick={() => handleOpenDetail(opp)}
                        className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAREER PROGRESS MILESTONES */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-heading font-bold text-slate-900">Career Trajectory Progress</h3>
              <button
                onClick={() => setCurrentScreen('career-nav')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Career Navigator →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80">
                <div className="text-xs font-bold text-blue-900">Primary Goal</div>
                <div className="text-sm font-heading font-extrabold text-blue-950 mt-1 capitalize">
                  {userProfile.targetCareers?.[0]?.replace(/-/g, ' ') || 'Policy Analyst'}
                </div>
                <div className="text-[11px] text-blue-700 mt-1">94% Target Fit</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="text-xs font-bold text-emerald-900">Applications Pipeline</div>
                <div className="text-sm font-heading font-extrabold text-emerald-950 mt-1">
                  {applications.length} Tracked
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">
                  {applications.filter(a => a.stage === 'Interview' || a.stage === 'Selected').length} Advanced Rounds
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80">
                <div className="text-xs font-bold text-purple-900">Skill Competency</div>
                <div className="text-sm font-heading font-extrabold text-purple-950 mt-1">
                  {userProfile.skills?.length || 5} Verified Skills
                </div>
                <div className="text-[11px] text-purple-700 mt-1">
                  Top: {userProfile.skills?.[0]?.name || 'Analysis'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: THIS WEEK & UPCOMING DEADLINES */}
        <div className="space-y-6">
          {/* THIS WEEK TIME BUDGET */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900">THIS WEEK</h3>
                <p className="text-xs text-slate-500">Weekly capacity: {userProfile.availableHours}h allocated</p>
              </div>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {completedHours.toFixed(1)} / {totalWeeklyHours.toFixed(1)} hrs
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((completedHours / Math.max(1, totalWeeklyHours)) * 100))}%` }}
              />
            </div>

            {/* Quick Task Checklist */}
            <div className="space-y-2 pt-1">
              {weeklyPlan.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200 opacity-60 line-through'
                      : 'bg-white border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{task.title}</div>
                    <div className="text-[10px] text-slate-500">{task.estimatedHours}h • {task.categoryBadge}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreen('weekly')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
            >
              Open Full Weekly Navigator →
            </button>
          </div>

          {/* UPCOMING DEADLINES MODULE */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-heading font-bold text-slate-900">Upcoming Deadlines</h3>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                Action Required
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 text-[10px] font-bold">
              {['All', 'Internships', 'Scholarships', 'Government Programs'].map((t) => (
                <button
                  key={t}
                  onClick={() => setDeadlineTab(t)}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    deadlineTab === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Deadlines List */}
            <div className="space-y-2.5">
              {upcomingDeadlines.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => handleOpenDetail(opp)}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-slate-900 truncate">{opp.title}</div>
                    <div className="text-[11px] text-slate-500">{opp.organization}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-extrabold text-red-600">{opp.daysLeft}d left</div>
                    <div className="text-[10px] text-slate-400">{opp.deadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FINANCIAL GOAL CARD (If enabled) */}
          {userProfile.financialGoals?.enabled && (
            <div className="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-3xl p-6 text-white border border-emerald-800 shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span>NEXORA MONEY</span>
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px]">Active Goal</span>
              </div>
              <div>
                <div className="text-sm font-heading font-extrabold text-white">
                  {userProfile.financialGoals.primaryGoal.title}
                </div>
                <div className="flex justify-between text-xs text-emerald-200 mt-1">
                  <span>Saved: ₹{userProfile.financialGoals.primaryGoal.currentAmount.toLocaleString()}</span>
                  <span>Target: ₹{userProfile.financialGoals.primaryGoal.targetAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-full bg-emerald-950/60 h-2 rounded-full overflow-hidden border border-emerald-700/50">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((userProfile.financialGoals.primaryGoal.currentAmount / userProfile.financialGoals.primaryGoal.targetAmount) * 100))}%`
                  }}
                />
              </div>
              <button
                onClick={() => setCurrentScreen('money')}
                className="w-full py-2 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-colors"
              >
                View Financial Goal Simulator →
              </button>
            </div>
          )}
        </div>
      </div>

      <AIDisclaimerBanner />
    </div>
  );
}
