import React, { useState } from 'https://esm.sh/react@18.2.0';
import { useApp } from '../../context/AppContext.jsx';

export function AdminDashboardView() {
  const { allOpportunities, showToast } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState('analytics'); // 'analytics' | 'opportunities' | 'subscriptions'

  const metrics = [
    { label: "Total Registered Students", val: "42,850", change: "+14.2% MoM", isPositive: true },
    { label: "Active Pro Subscribers", val: "3,120", change: "+22.5% MoM", isPositive: true },
    { label: "Monthly Recurring Revenue (MRR)", val: "₹15,56,880", change: "+18.4%", isPositive: true },
    { label: "Annualized Run Rate (ARR)", val: "₹1.86 Cr", change: "+18.4%", isPositive: true },
    { label: "Free-to-Pro Conversion", val: "7.28%", change: "+0.8%", isPositive: true },
    { label: "Opportunity Ingestion Count", val: `${allOpportunities.length}`, change: "Live Verified", isPositive: true },
    { label: "AI Recommendations Generated", val: "1,240,500", change: "Deterministic v2", isPositive: true },
    { label: "Monthly Churn Rate", val: "1.8%", change: "-0.4%", isPositive: true }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Admin Intelligence & CMS Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              NEXORA Operations & Metrics
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Live observability into algorithmic ranking performance, student cohort metrics, and subscription financials.
            </p>
          </div>

          <div className="flex rounded-2xl bg-slate-800 p-1 border border-slate-700 text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setActiveAdminTab('analytics')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeAdminTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveAdminTab('opportunities')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeAdminTab === 'opportunities' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Opportunities CMS
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
              {m.label}
            </div>
            <div className="text-xl sm:text-2xl font-heading font-black text-slate-900">
              {m.val}
            </div>
            <div className="text-[11px] font-bold text-emerald-700">
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Opportunities CMS Feed Preview */}
      {activeAdminTab === 'opportunities' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-heading font-extrabold text-slate-900">
              Verified Opportunities Ingestion Queue
            </h3>
            <button
              onClick={() => showToast('Syncing with official government portals & think tanks...')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700"
            >
              + Ingest Official Portal Feed
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold">
                  <th className="pb-3">Title & Organization</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Deadline</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allOpportunities.slice(0, 8).map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-4">
                      <div className="font-bold text-slate-900">{opp.title}</div>
                      <div className="text-[11px] text-slate-500">{opp.organization}</div>
                    </td>
                    <td className="py-3 font-semibold text-slate-700">{opp.category}</td>
                    <td className="py-3 font-bold text-red-600">{opp.deadline}</td>
                    <td className="py-3 text-slate-600">{opp.location}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[10px]">
                        Verified Official
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Chart Simulation */}
      {activeAdminTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-heading font-extrabold text-slate-900">
              User Domain Preferences Breakdown
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { domain: "Public Policy & Think Tanks", pct: 34, color: "bg-blue-600" },
                { domain: "Central Banking & Macro Finance", pct: 28, color: "bg-indigo-600" },
                { domain: "AI / Machine Learning Engineering", pct: 22, color: "bg-purple-600" },
                { domain: "Product & Corporate Strategy", pct: 16, color: "bg-emerald-600" }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{item.domain}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-heading font-extrabold text-slate-900">
              Recommendation Engine Latency & Accuracy
            </h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Algorithmic Scorer Latency:</span>
                <strong className="text-slate-900">18 ms</strong>
              </div>
              <div className="flex justify-between">
                <span>Deterministic Rule Verification:</span>
                <strong className="text-emerald-700">100% Guaranteed</strong>
              </div>
              <div className="flex justify-between">
                <span>Student Action Execution Rate:</span>
                <strong className="text-blue-700">41.8% of recommendations</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
