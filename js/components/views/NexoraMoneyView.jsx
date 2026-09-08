import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { FinancialDisclaimerBanner } from '../common/Disclaimers.jsx';

export function NexoraMoneyView() {
  const { userProfile, updateProfile, showToast } = useApp();

  const [monthlyContribution, setMonthlyContribution] = useState(4000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12); // 12% annual
  const [investmentYears, setInvestmentYears] = useState(3); // 3 years

  const budget = userProfile.financialGoals || {
    monthlyIncome: 12000,
    monthlyExpenses: 7000,
    monthlySavings: 5000,
    primaryGoal: {
      title: "Higher Education / Master's Prep Fund",
      targetAmount: 150000,
      currentAmount: 42000,
      monthlyContribution: 4000
    }
  };

  // Compound Interest / SIP Future Value calculation
  const sipCalculation = useMemo(() => {
    const P = monthlyContribution;
    const i = expectedReturnRate / 100 / 12;
    const n = investmentYears * 12;

    const totalInvested = P * n;
    // FV = P * [ ((1 + i)^n - 1) / i ] * (1 + i)
    const futureValue = Math.round(P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const estimatedGains = Math.max(0, futureValue - totalInvested);

    return {
      totalInvested,
      futureValue,
      estimatedGains
    };
  }, [monthlyContribution, expectedReturnRate, investmentYears]);

  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'learn' | 'budget'

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              Financial Habit & Goal Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Nexora Money
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              “Build better financial habits before building wealth.” Educational goal-planning & SIP compounding simulator.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'simulator' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Goal Simulator
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'budget' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Budget & Goals
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'learn' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Learn Investing
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Goal Simulator */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls on Left */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-base font-heading font-extrabold text-slate-900">
              Interactive SIP Compounding Simulator
            </h3>

            {/* Slider 1: Monthly Investment */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Monthly Contribution</span>
                <span className="text-emerald-700 font-extrabold">₹{monthlyContribution.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹500</span>
                <span>₹10,000</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Slider 2: Expected CAGR */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Illustrative Expected Return (p.a.)</span>
                <span className="text-emerald-700 font-extrabold">{expectedReturnRate}%</span>
              </div>
              <input
                type="range"
                min="6"
                max="18"
                step="1"
                value={expectedReturnRate}
                onChange={(e) => setExpectedReturnRate(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>6% (Conservative)</span>
                <span>12% (Nifty Index)</span>
                <span>18% (High Growth)</span>
              </div>
            </div>

            {/* Slider 3: Time Horizon */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Time Horizon</span>
                <span className="text-emerald-700 font-extrabold">{investmentYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={investmentYears}
                onChange={(e) => setInvestmentYears(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Year</span>
                <span>5 Years</span>
                <span>10 Years</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
              💡 <strong>Compounding Insight:</strong> Regular ₹{monthlyContribution.toLocaleString()}/mo contributions in a broad index fund over {investmentYears} years can build discipline and fund higher education prep without financial stress.
            </div>
          </div>

          {/* Projection Visualizer on Right */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-heading font-extrabold text-slate-900">
                  Estimated Corpus Projection
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Illustrative Estimate
                </span>
              </div>

              {/* Big Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500">Total Invested</div>
                  <div className="text-xl font-heading font-black text-slate-900 mt-1">
                    ₹{sipCalculation.totalInvested.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800">Estimated Gains</div>
                  <div className="text-xl font-heading font-black text-emerald-700 mt-1">
                    +₹{sipCalculation.estimatedGains.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-950 text-white shadow-md">
                  <div className="text-xs font-bold text-emerald-200">Projected Future Value</div>
                  <div className="text-xl font-heading font-black text-white mt-1">
                    ₹{sipCalculation.futureValue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Visual Proportion Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">Invested: {Math.round((sipCalculation.totalInvested / sipCalculation.futureValue) * 100)}%</span>
                  <span className="text-emerald-700">Compounded Growth: {Math.round((sipCalculation.estimatedGains / sipCalculation.futureValue) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden flex">
                  <div
                    className="bg-slate-400 h-full"
                    style={{ width: `${(sipCalculation.totalInvested / sipCalculation.futureValue) * 100}%` }}
                    title="Invested Capital"
                  />
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(sipCalculation.estimatedGains / sipCalculation.futureValue) * 100}%` }}
                    title="Estimated Compounded Return"
                  />
                </div>
              </div>
            </div>

            <FinancialDisclaimerBanner />
          </div>
        </div>
      )}

      {/* TAB 2: Budget & Goals */}
      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-heading font-extrabold text-slate-900">
              Student Monthly Cash Flow
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700">Monthly Stipend / Allowance</span>
                <span className="font-extrabold text-slate-900">₹{(budget.monthlyIncome || 12000).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700">Essential Expenses (Rent, Food, Books)</span>
                <span className="font-extrabold text-red-600">-₹{(budget.monthlyExpenses || 7000).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900">Monthly Savings Potential</span>
                <span className="font-extrabold text-emerald-700">+₹{(budget.monthlySavings || 5000).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-heading font-extrabold text-slate-900">
              Active Savings Milestones
            </h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{budget.primaryGoal?.title || 'Higher Education Fund'}</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {Math.round(((budget.primaryGoal?.currentAmount || 42000) / (budget.primaryGoal?.targetAmount || 150000)) * 100)}% Funded
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Current: ₹{(budget.primaryGoal?.currentAmount || 42000).toLocaleString()}</span>
                <span>Target: ₹{(budget.primaryGoal?.targetAmount || 150000).toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.round(((budget.primaryGoal?.currentAmount || 42000) / (budget.primaryGoal?.targetAmount || 150000)) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Learn Investing */}
      {activeTab === 'learn' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "What is an SIP?",
              tag: "Habit",
              desc: "A Systematic Investment Plan automatically allocates a fixed amount monthly into mutual funds, averaging out market fluctuations through rupee cost averaging."
            },
            {
              title: "Mutual Funds & Index Funds",
              tag: "Asset Class",
              desc: "Index funds track major indices like Nifty 50 at ultra-low expense ratios, providing diversified exposure across India's top 50 blue-chip companies."
            },
            {
              title: "The Power of Compounding",
              tag: "Core Principle",
              desc: "Albert Einstein called compound interest the 8th wonder. Starting at age 20 vs 30 can double your final corpus with half the total capital invested."
            },
            {
              title: "Emergency Fund First",
              tag: "Risk Management",
              desc: "Always maintain 3-6 months of living expenses in liquid savings before investing in equity or mutual funds."
            },
            {
              title: "Diversification & Asset Allocation",
              tag: "Protection",
              desc: "Don't put all your eggs in one basket. Balancing debt, equity, and gold limits volatility during economic downcycles."
            },
            {
              title: "Avoid Speculative Trading",
              tag: "Discipline",
              desc: "93% of retail derivative and intraday traders lose money. Focus on building high-value career skills and passive long-term compounding."
            }
          ].map((card, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {card.tag}
                </span>
              </div>
              <h4 className="text-sm font-heading font-extrabold text-slate-900">{card.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
