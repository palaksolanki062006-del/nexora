import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import api from '../../services/api.js';

export function NexoraAIAssistant() {
  const {
    isAIChatOpen,
    setIsAIChatOpen,
    userProfile,
    nextBestAction,
    topPriorities,
    weeklyPlan,
    applications,
    currentScreen,
    setCurrentScreen,
    rebuildWeeklyPlanAI,
    addToWeeklyPlan,
    CAREER_PATHS,
    isProUser,
    setActiveModal
  } = useApp();

  const [messages, setMessages] = useState([
    {
      id: "msg-0",
      sender: "ai",
      text: `Hello ${userProfile.name.split(' ')[0]}! I am **Nexora AI**, your personal navigator. I'm actively tracking your progress across ${applications.length} applications and your ${userProfile.degree} goals. What decision can I help you resolve right now?`,
      time: "Just now",
      suggestions: [
        "What should I focus on this month?",
        "Why did you recommend this internship?",
        "What skills am I missing?",
        "Compare RBI Grade B vs UPSC"
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isAIChatOpen) {
      scrollToBottom();
    }
  }, [messages, isAIChatOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const userText = textToSend || inputVal;
    if (!userText.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    const processResponse = async () => {
      try {
        const serverRes = await api.chatWithAI(userText, userProfile?.id, currentScreen);
        if (serverRes && serverRes.reply) {
          const mappedActions = (serverRes.actions || []).map(act => {
            if (act.actionType === 'navigate') {
              return { label: act.label, handler: () => setCurrentScreen(act.payload?.screen || 'dashboard') };
            } else if (act.actionType === 'addToWeekly') {
              return { label: act.label, handler: () => addToWeeklyPlan(nextBestAction) };
            } else if (act.actionType === 'rebuildWeekly') {
              return { label: act.label, handler: () => rebuildWeeklyPlanAI() };
            }
            return { label: act.label, handler: () => setCurrentScreen('dashboard') };
          });

          const aiMsg = {
            id: `msg-${Date.now()}`,
            sender: "ai",
            text: serverRes.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: mappedActions,
            suggestions: serverRes.suggestions || []
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        // Fallback to local intelligence below
      }

      // Local Fallback Reasoning Engine
      let aiReply = "";
      let actions = [];
      let newSuggestions = [];

      const query = userText.toLowerCase();

      if (query.includes("focus") || query.includes("what should i do") || query.includes("next")) {
        aiReply = `Based on your profile as a **${userProfile.year} ${userProfile.degree}** student with **${userProfile.availableHours}h/week** capacity, your highest-ROI move right now is:\n\n1. **${nextBestAction.title}** (${nextBestAction.matchScore}% Match) at **${nextBestAction.organization}**.\n   *Deadline: ${nextBestAction.deadline}*\n2. Complete your 2-hour high-leverage skill module to close your econometrics/data gap.\n3. Keep your weekly study time under ${userProfile.availableHours} hours to avoid burnout.`;
        actions = [
          { label: "View Next Best Action", handler: () => setCurrentScreen('next-best-action') },
          { label: "Add to Weekly Plan", handler: () => addToWeeklyPlan(nextBestAction) }
        ];
        newSuggestions = ["Why did you recommend this internship?", "Build my weekly plan"];
      } else if (query.includes("why") || query.includes("recommend")) {
        aiReply = `I prioritized **${nextBestAction.title}** at **${nextBestAction.organization}** for 3 specific reasons:\n\n- **Career Alignment (96%)**: Aligns directly with your target career in *${userProfile.targetCareers.join(', ').replace(/-/g, ' ')}*.\n- **Skill Proof (92%)**: Leverages your strengths in ${userProfile.skills.slice(0, 2).map(s => s.name).join(' & ')} while giving you an official publication credential.\n- **Urgency (Feasibility)**: Closes in **${nextBestAction.daysLeft} days**, requiring only ~${nextBestAction.estimatedTimeMinutes || 25} minutes to submit.`;
        actions = [
          { label: "Open Opportunity Details", handler: () => setCurrentScreen('next-best-action') }
        ];
        newSuggestions = ["What skills am I missing?", "What should I do this month?"];
      } else if (query.includes("skill") || query.includes("missing") || query.includes("gap")) {
        aiReply = `Analyzing your current profile vs target career requirements:\n\n✅ **Verified Strengths**: ${userProfile.skills.filter(s => s.score >= 75).map(s => s.name).join(', ')}.\n⚠️ **Primary Skill Gap**: **Stata / Empirical Econometric Modeling** and **Timed Speed Aptitude**.\n\n*Recommendation*: Take the 4-week ISI Econometrics sprint or solve 1 previous year paper this weekend.`;
        actions = [
          { label: "View ISI Course in Explorer", handler: () => setCurrentScreen('opportunities') }
        ];
        newSuggestions = ["Build my weekly plan", "Compare RBI Grade B vs UPSC"];
      } else if (query.includes("compare") || query.includes("rbi") || query.includes("upsc") || query.includes("mba")) {
        aiReply = `Comparing **RBI Grade B** vs **UPSC Civil Services** for your profile:\n\n- **RBI Grade B (89% Fit)**: 800-1,200 hrs prep effort, ₹18L-24L CTC, 5/5 job stability, strong synergy with your economics syllabus.\n- **UPSC (82% Fit)**: 2,500+ hrs prep over 2-3 years, extreme competition (<0.2% pass rate), high opportunity cost.\n\n*Nexora Verdict*: RBI Grade B currently offers higher immediate feasibility given your 6-12 month timeline.`;
        actions = [
          { label: "Open Side-by-Side Comparison Matrix", handler: () => setCurrentScreen('career-compare') }
        ];
        newSuggestions = ["What should I do this month?", "Why did you recommend this internship?"];
      } else if (query.includes("rebuild") || query.includes("weekly plan") || query.includes("week")) {
        aiReply = `I have recalculated your weekly schedule against your **${userProfile.availableHours} available hours**. I balanced 1 urgent application, 1 skill diagnostic module, 1 career experiment, and 1 finance savings habit.`;
        actions = [
          { label: "Rebuild My Week Now", handler: () => rebuildWeeklyPlanAI() },
          { label: "View Weekly Navigator", handler: () => setCurrentScreen('weekly') }
        ];
        newSuggestions = ["What should I focus on this month?", "What skills am I missing?"];
      } else {
        aiReply = `I understand your question regarding "${userText}". As your AI Navigator, I evaluate all decisions through the lens of your **${userProfile.degree}** goals and your **${userProfile.availableHours}h/week** capacity. Would you like me to tailor your weekly plan or analyze a specific career path?`;
        newSuggestions = [
          "What should I focus on this month?",
          "Why did you recommend this internship?",
          "Compare RBI Grade B vs UPSC",
          "Rebuild my weekly plan"
        ];
      }

      const aiMsg = {
        id: `msg-${Date.now()}`,
        sender: "ai",
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actions,
        suggestions: newSuggestions
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    };

    setTimeout(processResponse, 600);
  };

  return (
    <>
      {/* Floating Orb Button */}
      {!isAIChatOpen && (
        <button
          onClick={() => setIsAIChatOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:scale-105 transition-all group animate-float border border-white/20"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-heading tracking-tight">Nexora AI</span>
        </button>
      )}

      {/* Slide-over / Modal Chat Window */}
      {isAIChatOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] h-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold font-heading">Nexora AI Copilot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
                <span className="text-[10px] text-blue-200">
                  Context: {userProfile.name.split(' ')[0]} • {currentScreen}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([{
                  id: "msg-reset",
                  sender: "ai",
                  text: `Chat reset. I am ready to help you with your next action!`,
                  time: "Just now",
                  suggestions: ["What should I focus on this month?", "Why did you recommend this internship?"]
                }])}
                className="p-1 rounded text-slate-300 hover:text-white text-xs"
                title="Clear Chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => setIsAIChatOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                  }`}
                >
                  {m.text}
                </div>

                {/* Embedded Action Buttons */}
                {m.actions && m.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={act.handler}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] rounded-lg border border-blue-200 transition-colors shadow-2xs"
                      >
                        ⚡ {act.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Context Suggestion Chips */}
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {m.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[10px] bg-white hover:bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200 transition-colors"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-2xl border border-slate-200 w-20">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about your goals or priorities..."
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
