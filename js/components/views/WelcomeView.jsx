import React, { useState } from 'https://esm.sh/react@18.2.0';
import { useApp } from '../../context/AppContext.jsx';

export function WelcomeView() {
  const { setCurrentScreen, switchPersona, updateProfile, PERSONA_PRESETS } = useApp();

  const [wizardStep, setWizardStep] = useState(0); // 0: Landing Hero, 1: Step 1 (Basic), 2: Step 2 (Skills & Experience), 3: Step 3 (Career Goals & Values), 4: Step 4 (Time & Constraints)
  
  // Custom onboarding form state
  const [formData, setFormData] = useState({
    name: "Aditya Roy",
    college: "Delhi University / IIT Delhi",
    degree: "B.A. Economics / B.Tech Computer Science",
    year: "3rd Year",
    skills: ["Policy Analysis", "Economic Research", "Excel & Data Modeling", "Python"],
    targetCareers: ["policy-analyst", "rbi-grade-b"],
    availableHours: 10,
    preferredLocation: "Delhi NCR / Remote",
    remoteOnly: false,
    timeline: "Next 6-12 Months"
  });

  const availableSkillOptions = [
    "Policy Analysis", "Economic Research", "Excel & Data Modeling", "Academic Writing", 
    "Python", "PyTorch & Deep Learning", "Financial Modeling", "Valuation & DCF", 
    "Public Speaking", "SQL & Data Extraction", "React & TypeScript", "Stata / Econometrics"
  ];

  const availableCareerOptions = [
    { id: "policy-analyst", label: "Policy Analyst & Think Tank Consultant" },
    { id: "rbi-grade-b", label: "Reserve Bank of India (RBI) Grade B Officer" },
    { id: "upsc-civil-services", label: "UPSC Civil Services (IAS / IFS / IPS)" },
    { id: "ai-research-scientist", label: "AI / ML Research Scientist" },
    { id: "product-management", label: "Product Management (APM → PM)" },
    { id: "investment-banking", label: "Investment Banking / FinTech Analyst" }
  ];

  const handleFinishOnboarding = () => {
    updateProfile({
      name: formData.name,
      college: formData.college,
      degree: formData.degree,
      year: formData.year,
      availableHours: formData.availableHours,
      preferredLocation: formData.preferredLocation,
      remoteOnly: formData.remoteOnly,
      timeline: formData.timeline,
      targetCareers: formData.targetCareers,
      skills: formData.skills.map(s => ({ name: s, level: "Intermediate", score: 75 }))
    });
    localStorage.setItem('nexora_onboarded', 'true');
    setCurrentScreen('dashboard');
  };

  const handleExploreDemo = (personaId) => {
    switchPersona(personaId);
    localStorage.setItem('nexora_onboarded', 'true');
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg text-slate-900 tracking-tight">NEXORA</span>
            <span className="hidden sm:inline text-xs text-blue-600 font-semibold ml-2">Personal Navigator</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExploreDemo('persona-aarav')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Explore Demo (Aarav)
          </button>
          <button
            onClick={() => setWizardStep(1)}
            className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
          >
            Build My Navigator
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full flex flex-col justify-center">
        {wizardStep === 0 ? (
          /* Step 0: Hero & Problem Statement Presentation */
          <div className="space-y-12 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>The Personal Decision Layer for Students & Young Professionals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Know What To <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">Do Next.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                Your AI personal navigator for careers, opportunities, skills, and financial goals. Nexora brings all the fragmented context together to answer one critical question: <strong>“What should I do next?”</strong>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => setWizardStep(1)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-heading font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>Build My Navigator</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button
                  onClick={() => handleExploreDemo('persona-aarav')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-sm hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  Explore Live Demo
                </button>
              </div>
            </div>

            {/* Problem Statement vs Nexora Layer */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">The Problem</span>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mt-1">
                  “Too many platforms. Too many opportunities. Too many decisions.”
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Students waste 15+ hours weekly juggling disconnected portals without knowing what actually fits their profile.
                </p>
              </div>

              {/* Scattered vs Nexora */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left: Chaos */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Current Fragmented Reality</span>
                    <span className="text-red-500 text-[10px] font-bold">10+ Disconnected Apps</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                    {["LinkedIn", "Internshala", "Government Portals", "Scholarships", "UPSC Forums", "Coursera", "FinTech Apps", "ChatGPT"].map((p, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-red-600 font-semibold pt-1 flex items-center gap-1.5">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Result: Information overload, missed deadlines, analysis paralysis.
                  </div>
                </div>

                {/* Right: Nexora Decision Layer */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-3 shadow-md shadow-blue-500/20">
                  <div className="text-xs font-bold text-blue-100 flex items-center justify-between">
                    <span>NEXORA Decision Layer</span>
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded">1 Unified Engine</span>
                  </div>
                  <div className="text-sm font-heading font-extrabold text-white leading-snug">
                    100 Opportunities → 20 Relevant → 7 Matches → 3 Priorities → 1 Next Best Action
                  </div>
                  <div className="text-xs text-blue-100 pt-1 flex items-center gap-1.5">
                    <svg className="w-4 h-4 shrink-0 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Deterministic eligibility filtering + AI explainability & action tracking.
                  </div>
                </div>
              </div>

              {/* Demo Persona Selector Cards */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 mb-3 text-center">
                  Or launch directly with a pre-configured student profile:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PERSONA_PRESETS.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleExploreDemo(p.id)}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{p.degree.split(' ')[0]}</div>
                        <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Explore {p.name.split(' ')[0]} →</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Multi-Step Onboarding Wizard */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-2xl mx-auto w-full animate-slide-up">
            {/* Wizard Progress Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step {wizardStep} of 4</span>
                <h3 className="text-xl font-heading font-extrabold text-slate-900 mt-0.5">
                  {wizardStep === 1 && "Academic Background"}
                  {wizardStep === 2 && "Skills & Competencies"}
                  {wizardStep === 3 && "Target Career Paths"}
                  {wizardStep === 4 && "Weekly Time & Constraints"}
                </h3>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map(s => (
                  <div 
                    key={s} 
                    className={`w-7 h-1.5 rounded-full ${s <= wizardStep ? 'bg-blue-600' : 'bg-slate-200'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Academic Background */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">College / University</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Degree & Major</label>
                    <input
                      type="text"
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Year / Semester</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year (Final Year)</option>
                      <option>4th Year (Engineering/Design)</option>
                      <option>Postgraduate / Master's</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Skills & Competencies */}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500">
                  Select your current skills. Nexora will match opportunities and highlight high-leverage skill gaps.
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSkillOptions.map((sk) => {
                    const isSelected = formData.skills.includes(sk);
                    return (
                      <button
                        type="button"
                        key={sk}
                        onClick={() => {
                          if (isSelected) {
                            setFormData({ ...formData, skills: formData.skills.filter(s => s !== sk) });
                          } else {
                            setFormData({ ...formData, skills: [...formData.skills, sk] });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{sk}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Target Career Paths */}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500">
                  Choose 1 to 3 career paths you want to explore or pursue:
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {availableCareerOptions.map((c) => {
                    const isSelected = formData.targetCareers.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          if (isSelected) {
                            setFormData({ ...formData, targetCareers: formData.targetCareers.filter(id => id !== c.id) });
                          } else {
                            setFormData({ ...formData, targetCareers: [...formData.targetCareers, c.id] });
                          }
                        }}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800">{c.label}</span>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 text-transparent'
                        }`}>
                          ✓
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Time & Constraints */}
            {wizardStep === 4 && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Available Weekly Hours</label>
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {formData.availableHours} Hours / Week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    step="2"
                    value={formData.availableHours}
                    onChange={(e) => setFormData({ ...formData, availableHours: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>4 hrs (Light)</span>
                    <span>10-15 hrs (Recommended)</span>
                    <span>30 hrs (Intensive)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Location</label>
                    <input
                      type="text"
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preparation Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                    >
                      <option>Immediate (1-3 Months)</option>
                      <option>Next 6-12 Months (Graduation 2027)</option>
                      <option>Long-term (1-2 Years)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="remoteOnlyCheck"
                    checked={formData.remoteOnly}
                    onChange={(e) => setFormData({ ...formData, remoteOnly: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="remoteOnlyCheck" className="text-xs font-medium text-slate-700">
                    Prioritize remote and online opportunities
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setWizardStep(wizardStep - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Back
              </button>

              {wizardStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishOnboarding}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-heading font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-lg transition-all"
                >
                  Build My Navigator 🚀
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-200/80 text-center text-xs text-slate-400">
        NEXORA • AI Personal Navigator • Built for Ambitious Students & Young Professionals
      </footer>
    </div>
  );
}
