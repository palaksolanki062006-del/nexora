import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export function WeeklyNavigatorView() {
  const {
    weeklyPlan,
    toggleTaskCompletion,
    postponeTask,
    removeWeeklyTask,
    rebuildWeeklyPlanAI,
    userProfile,
    setCurrentScreen,
    setActiveModal,
    setModalData,
    allOpportunities
  } = useApp();

  const totalHours = weeklyPlan.reduce((acc, t) => acc + (parseFloat(t.estimatedHours) || 1), 0);
  const completedHours = weeklyPlan.filter(t => t.completed).reduce((acc, t) => acc + (parseFloat(t.estimatedHours) || 1), 0);
  const completedCount = weeklyPlan.filter(t => t.completed).length;

  const handleTaskClick = (task) => {
    if (task.opportunityId) {
      const opp = allOpportunities.find(o => o.id === task.opportunityId);
      if (opp) {
        setModalData(opp);
        setActiveModal('opp-detail');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Time-Budgeted Action Plan
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Your Nexora Week
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Balanced execution across urgent applications, skill sprints, career experiments, and financial goals.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Allocated Bandwidth</div>
              <div className="text-base font-heading font-extrabold text-slate-900">
                {totalHours.toFixed(1)} hrs <span className="text-xs font-normal text-slate-400">/ {userProfile.availableHours}h max</span>
              </div>
            </div>
            <div className="px-3.5 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold">
              {completedCount} of {weeklyPlan.length} Done ({Math.round((completedCount / Math.max(1, weeklyPlan.length)) * 100)}%)
            </div>
          </div>
        </div>

        {/* Progress Bar & Capacity Warning */}
        <div className="space-y-1.5 pt-2">
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((completedHours / Math.max(1, totalHours)) * 100))}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{completedHours.toFixed(1)} hours executed</span>
            <span>{(totalHours - completedHours).toFixed(1)} hours remaining this week</span>
          </div>
        </div>
      </div>

      {/* Structured Weekly Tasks List */}
      <div className="space-y-3">
        {weeklyPlan.map((task, idx) => {
          let badgeColor = "bg-blue-100 text-blue-800 border-blue-200";
          if (task.type === "TOP PRIORITY") badgeColor = "bg-red-100 text-red-800 border-red-200";
          if (task.type === "SKILL") badgeColor = "bg-purple-100 text-purple-800 border-purple-200";
          if (task.type === "CAREER") badgeColor = "bg-indigo-100 text-indigo-800 border-indigo-200";
          if (task.type === "FINANCE") badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
          if (task.type === "DEADLINE") badgeColor = "bg-amber-100 text-amber-800 border-amber-200";

          return (
            <div
              key={task.id}
              className={`bg-white rounded-3xl p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.completed
                  ? 'border-slate-200 bg-slate-50/70 opacity-75'
                  : 'border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                    task.completed
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-slate-300 hover:border-blue-500 text-transparent'
                  }`}
                  title={task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                >
                  ✓
                </button>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${badgeColor}`}>
                      {task.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      • {task.categoryBadge}
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      • Deadline: {task.deadline}
                    </span>
                  </div>

                  <h3
                    onClick={() => handleTaskClick(task)}
                    className={`text-sm font-heading font-bold text-slate-900 transition-colors cursor-pointer truncate ${
                      task.completed ? 'line-through text-slate-400' : 'hover:text-blue-600'
                    }`}
                  >
                    {task.title}
                  </h3>

                  {task.tagline && (
                    <p className="text-xs text-slate-500 truncate">
                      {task.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Hour & Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
                  {task.estimatedHours} hrs
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => postponeTask(task.id)}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Postpone to Next Week"
                  >
                    Postpone
                  </button>
                  <button
                    onClick={() => removeWeeklyTask(task.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove from Week"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Rebuild My Week Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Schedule or Availability Changed?
          </div>
          <h3 className="text-lg font-heading font-extrabold text-white">
            Ask Nexora to rebuild my week
          </h3>
          <p className="text-xs text-blue-200 max-w-md">
            Let the AI redistribute priority tasks, optimize for high-leverage outcomes, and cap your workload at {userProfile.availableHours} hours.
          </p>
        </div>

        <button
          onClick={rebuildWeeklyPlanAI}
          className="px-6 py-3.5 bg-white text-blue-900 font-heading font-extrabold text-xs rounded-2xl hover:bg-blue-50 shadow-lg shadow-black/20 hover:scale-105 transition-all shrink-0"
        >
          ✨ Rebuild My Week Plan
        </button>
      </div>
    </div>
  );
}
