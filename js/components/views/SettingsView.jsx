import React, { useState } from 'https://esm.sh/react@18.2.0';
import { useApp } from '../../context/AppContext.jsx';

export function SettingsView() {
  const {
    isProUser,
    activateProSubscription,
    cancelProSubscription,
    invoices,
    userProfile,
    setActiveModal,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('subscription'); // 'subscription' | 'account' | 'privacy' | 'notifications'

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nexora_profile_${userProfile.name.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported your complete Nexora profile data as JSON!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Account, Subscription & Privacy
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Settings & Subscription
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your SaaS plan tier, billing invoices, security credentials, and data consent.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pt-2 overflow-x-auto">
          {[
            { id: 'subscription', label: 'Subscription & Billing' },
            { id: 'account', label: 'Account Profile' },
            { id: 'privacy', label: 'Privacy & Security' },
            { id: 'notifications', label: 'Notification Alerts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Subscription & Billing */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* Tier Status Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-heading font-extrabold text-slate-900">
                    Current Plan: {isProUser ? 'Nexora Pro' : 'Nexora Free'}
                  </h3>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isProUser ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isProUser ? 'Active' : 'Standard'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isProUser
                    ? 'Next renewal date: 01 Aug 2027 • ₹3,999 / year'
                    : 'Upgrade to unlock 7-dimension matching, priority alerts, and instant resume tailoring.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {!isProUser ? (
                  <button
                    onClick={() => setActiveModal('payment')}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition-all"
                  >
                    Upgrade to Pro (₹499/mo)
                  </button>
                ) : (
                  <button
                    onClick={cancelProSubscription}
                    className="px-4 py-2.5 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition-colors"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>

            {/* Plan Comparison Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border ${!isProUser ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-200' : 'border-slate-200 bg-slate-50'}`}>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Free Tier</div>
                <div className="text-xl font-heading font-black text-slate-900 mt-1">₹0 <span className="text-xs font-normal text-slate-500">Forever</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li>✓ Standard profile & opportunity search</li>
                  <li>✓ Basic career exploration cards</li>
                  <li>✓ Weekly action checklist</li>
                  <li>✓ Up to 5 tracked applications</li>
                  <li className="text-slate-400">✕ 7-dimension match explainability</li>
                  <li className="text-slate-400">✕ Instant AI resume tailoring</li>
                </ul>
              </div>

              <div className={`p-5 rounded-2xl border ${isProUser ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-200' : 'border-blue-600 bg-blue-50/50'}`}>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Nexora Pro</div>
                <div className="text-xl font-heading font-black text-slate-900 mt-1">₹499 <span className="text-xs font-normal text-slate-500">/ month</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-800">
                  <li>✓ <strong>7-Dimension algorithmic match matrix</strong></li>
                  <li>✓ <strong>Unlimited application tracking & notes</strong></li>
                  <li>✓ <strong>AI Resume Tailoring & Interview Prep</strong></li>
                  <li>✓ <strong>Priority deadline alerts & SMS/Email</strong></li>
                  <li>✓ <strong>Dynamic "Rebuild My Week" AI solver</strong></li>
                  <li>✓ <strong>Dedicated 24/7 AI Copilot access</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Billing & Invoice History */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-heading font-extrabold text-slate-900">
              Billing History & Invoices
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                    <th className="pb-3">Invoice ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-slate-900">{inv.id}</td>
                      <td className="py-3 text-slate-600">{inv.date}</td>
                      <td className="py-3 font-semibold text-slate-800">{inv.plan}</td>
                      <td className="py-3 font-extrabold text-slate-900">{inv.amount}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[10px]">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => showToast(`Downloaded invoice ${inv.id} (PDF simulation)`)}
                          className="text-blue-600 hover:text-blue-800 font-bold underline"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Account Profile */}
      {activeTab === 'account' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-heading font-extrabold text-slate-900">Account Credentials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-500 font-bold block mb-1">Email Address</label>
              <input type="email" defaultValue={`${userProfile.name.toLowerCase().replace(/\s+/g, '')}@student.ac.in`} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl" />
            </div>
            <div>
              <label className="text-slate-500 font-bold block mb-1">Registered Phone (for OTP & alerts)</label>
              <input type="text" defaultValue="+91 98765 43210" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Privacy & Security */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-heading font-extrabold text-slate-900">Privacy & Data Governance</h3>
            <p className="text-xs text-slate-500">Nexora adheres to zero data selling principles. Your data is used exclusively to rank opportunities for you.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-900">Data Management Rights</div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
              >
                📥 Export All My Data (JSON)
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to reset all profile and application data?")) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
              >
                Delete Account & Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-heading font-extrabold text-slate-900">Notification Alerts & Channels</h3>
          <div className="space-y-3 text-xs">
            {[
              "Urgent Application Deadlines (3 days prior)",
              "New High-Match Opportunities (>90% fit)",
              "Weekly Action Plan reminders every Monday",
              "Educational savings milestone streak updates"
            ].map((pref, i) => (
              <label key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer font-medium text-slate-800">
                <input type="checkbox" defaultChecked={true} className="w-4 h-4 text-blue-600 rounded" />
                <span>{pref}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
