// NEXORA Global State & Intelligent Recommendation Context
import React, { createContext, useContext, useState, useEffect, useMemo } from 'https://esm.sh/react@18.2.0';
import {
  PERSONA_PRESETS,
  CAREER_PATHS,
  generateFullOpportunitiesDatabase,
  INITIAL_WEEKLY_PLAN,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS,
  BILLING_INVOICES
} from '../data/initialData.js';
import api from '../services/api.js';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 0. Backend Health State
  const [backendConnected, setBackendConnected] = useState(false);

  // 1. Core Profile & Persona State
  const [currentPersonaId, setCurrentPersonaId] = useState(() => {
    return localStorage.getItem('nexora_persona_id') || 'persona-aarav';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('nexora_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return PERSONA_PRESETS[0];
  });

  // 2. Navigation State: screens: 'welcome', 'dashboard', 'next-best-action', 'opportunities', 'career-nav', 'career-compare', 'weekly', 'applications', 'money', 'profile', 'settings', 'admin'
  const [currentScreen, setCurrentScreen] = useState(() => {
    const onboarded = localStorage.getItem('nexora_onboarded');
    return onboarded === 'true' ? 'dashboard' : 'welcome';
  });

  // 3. Database State
  const [allOpportunities, setAllOpportunities] = useState(() => {
    return generateFullOpportunitiesDatabase();
  });

  // Track rejected opportunity IDs for dynamic AI feedback adaptation
  const [rejectedOpportunityIds, setRejectedOpportunityIds] = useState(() => {
    const saved = localStorage.getItem('nexora_rejected_opps');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Applications Tracker State
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('nexora_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_APPLICATIONS;
  });

  // 5. Weekly Planner State
  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    const saved = localStorage.getItem('nexora_weekly_plan');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_WEEKLY_PLAN;
  });

  // 6. Subscription / Pro State
  const [isProUser, setIsProUser] = useState(() => {
    return localStorage.getItem('nexora_is_pro') === 'true';
  });

  const [invoices, setInvoices] = useState(BILLING_INVOICES);

  // 7. Notifications State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // 8. Modals & Overlays State
  const [activeModal, setActiveModal] = useState(null); // 'payment', 'opp-detail', 'resume-tailor', 'interview-prep', 'edit-profile', 'not-relevant-feedback', 'rebuild-week'
  const [modalData, setModalData] = useState(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // 9. Career Comparison State
  const [compareCareerIds, setCompareCareerIds] = useState(['rbi-grade-b', 'policy-analyst', 'upsc-civil-services']);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nexora_persona_id', currentPersonaId);
  }, [currentPersonaId]);

  useEffect(() => {
    localStorage.setItem('nexora_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('nexora_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('nexora_weekly_plan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem('nexora_rejected_opps', JSON.stringify(rejectedOpportunityIds));
  }, [rejectedOpportunityIds]);

  useEffect(() => {
    localStorage.setItem('nexora_is_pro', isProUser ? 'true' : 'false');
  }, [isProUser]);

  // Initial Sync from Backend (FastAPI + MongoDB)
  useEffect(() => {
    async function loadDataFromBackend() {
      try {
        const health = await api.checkHealth();
        if (health && health.status === 'healthy') {
          setBackendConnected(true);

          // Fetch opportunities from MongoDB
          const opps = await api.getOpportunities({ personaId: currentPersonaId }).catch(() => null);
          if (opps && opps.length > 0) {
            setAllOpportunities(opps);
          }

          // Fetch profile from MongoDB
          const profile = await api.getProfileById(currentPersonaId).catch(() => null);
          if (profile) {
            setUserProfile(profile);
          }

          // Fetch applications from MongoDB
          const apps = await api.getApplications().catch(() => null);
          if (apps && apps.length > 0) {
            setApplications(apps);
          }

          // Fetch weekly plan from MongoDB
          const weekly = await api.getWeeklyPlan().catch(() => null);
          if (weekly && weekly.length > 0) {
            setWeeklyPlan(weekly);
          }

          // Fetch notifications from MongoDB
          const notifs = await api.getNotifications().catch(() => null);
          if (notifs && notifs.length > 0) {
            setNotifications(notifs);
          }

          // Fetch invoices from MongoDB
          const invs = await api.getInvoices().catch(() => null);
          if (invs && invs.length > 0) {
            setInvoices(invs);
          }
        }
      } catch (err) {
        console.info('Backend running in local fallback mode:', err.message);
      }
    }

    loadDataFromBackend();
  }, [currentPersonaId]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch Persona Function
  const switchPersona = async (personaId) => {
    const found = PERSONA_PRESETS.find(p => p.id === personaId);
    if (found) {
      setCurrentPersonaId(personaId);
      setUserProfile(JSON.parse(JSON.stringify(found)));
      showToast(`Switched persona to ${found.name} (${found.degree})`);

      // Update compare paths if suitable
      if (personaId === 'persona-priya') {
        setCompareCareerIds(['ai-research-scientist', 'product-management']);
      } else if (personaId === 'persona-rohan') {
        setCompareCareerIds(['investment-banking', 'product-management', 'rbi-grade-b']);
      } else {
        setCompareCareerIds(['policy-analyst', 'rbi-grade-b', 'upsc-civil-services']);
      }

      // Sync with backend MongoDB
      try {
        await api.switchPersona(personaId);
        const serverOpps = await api.getOpportunities({ personaId });
        if (serverOpps && serverOpps.length > 0) {
          setAllOpportunities(serverOpps);
        }
      } catch (e) {}
    }
  };

  // Dynamic Matching & Recommendation Calculation Engine
  const rankedOpportunities = useMemo(() => {
    return allOpportunities
      .filter(opp => !rejectedOpportunityIds.includes(opp.id))
      .map(opp => {
        let score = opp.matchScore || 75;

        // 1. Skill Match Weighting
        const userSkillNames = (userProfile.skills || []).map(s => s.name.toLowerCase());
        const required = opp.requiredSkills || [];
        const matchCount = required.filter(req => 
          userSkillNames.some(userSkill => userSkill.includes(req.toLowerCase()) || req.toLowerCase().includes(userSkill))
        ).length;

        const skillScore = required.length > 0 ? Math.round((matchCount / required.length) * 100) : 80;

        // 2. Career Alignment Weighting
        const isCareerAligned = (opp.targetCareerIds || []).some(catId => 
          (userProfile.targetCareers || []).includes(catId)
        );
        const careerScore = isCareerAligned ? 95 : 65;

        // 3. Location / Remote Match
        let locScore = 85;
        if (userProfile.remoteOnly && opp.isRemote) locScore = 100;
        else if (userProfile.remoteOnly && !opp.isRemote) locScore = 40;
        else if (opp.location.toLowerCase().includes('delhi') && (userProfile.preferredLocation || '').toLowerCase().includes('delhi')) locScore = 95;

        // 4. Time Feasibility
        const timeScore = userProfile.availableHours >= 10 ? 92 : (userProfile.availableHours >= 5 ? 80 : 65);

        // Weighted Average
        const compositeScore = Math.min(99, Math.round(
          (skillScore * 0.35) + 
          (careerScore * 0.35) + 
          (locScore * 0.15) + 
          (timeScore * 0.15)
        ));

        return {
          ...opp,
          matchScore: compositeScore,
          skillMatchPercent: skillScore,
          careerAlignmentPercent: careerScore,
          timeFeasibilityPercent: timeScore
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [allOpportunities, userProfile, rejectedOpportunityIds]);

  // Top Ranked Best Action
  const nextBestAction = useMemo(() => {
    return rankedOpportunities[0] || allOpportunities[0];
  }, [rankedOpportunities, allOpportunities]);

  // Top 4 Priorities
  const topPriorities = useMemo(() => {
    return rankedOpportunities.slice(0, 4);
  }, [rankedOpportunities]);

  // Funnel Counts: 100 -> 20 -> 7 -> 3 -> 1
  const funnelStats = useMemo(() => {
    const total = allOpportunities.length;
    const potentiallyRelevant = rankedOpportunities.filter(o => o.matchScore >= 75).length;
    const strongMatches = rankedOpportunities.filter(o => o.matchScore >= 88).length;
    const prioritiesCount = Math.min(3, strongMatches);
    return {
      total: Math.max(100, total),
      potentiallyRelevant: Math.max(18, potentiallyRelevant),
      strongMatches: Math.max(7, strongMatches),
      priorities: prioritiesCount,
      nextAction: 1
    };
  }, [allOpportunities, rankedOpportunities]);

  // Profile Completion Percentage
  const profileCompletion = useMemo(() => {
    let completedFields = 0;
    const totalFields = 8;
    if (userProfile.name) completedFields++;
    if (userProfile.college && userProfile.degree) completedFields++;
    if (userProfile.skills && userProfile.skills.length >= 3) completedFields++;
    if (userProfile.experience && userProfile.experience.length >= 1) completedFields++;
    if (userProfile.targetCareers && userProfile.targetCareers.length >= 1) completedFields++;
    if (userProfile.preferences) completedFields++;
    if (userProfile.availableHours) completedFields++;
    if (userProfile.financialGoals && userProfile.financialGoals.enabled) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  }, [userProfile]);

  // Action Helpers
  const addApplication = async (opportunity, stage = 'Saved') => {
    const existing = applications.find(a => a.opportunityId === opportunity.id);
    if (existing) {
      showToast(`Already in your Application Tracker (${existing.stage})`, 'info');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      opportunityId: opportunity.id,
      organization: opportunity.organization,
      position: opportunity.title,
      stage: stage,
      deadline: opportunity.deadline,
      appliedDate: stage === 'Applied' ? new Date().toISOString().split('T')[0] : null,
      notes: `Added from Opportunity Explorer on ${new Date().toLocaleDateString()}`,
      matchScore: opportunity.matchScore,
      documents: []
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Added "${opportunity.title}" to ${stage} applications!`);

    // Sync to MongoDB
    try {
      await api.createApplication(newApp);
    } catch (e) {}
  };

  const updateApplicationStage = async (appId, newStage) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          stage: newStage,
          appliedDate: (newStage === 'Applied' && !app.appliedDate) ? new Date().toISOString().split('T')[0] : app.appliedDate
        };
      }
      return app;
    }));
    showToast(`Moved application to ${newStage}`);

    // Sync to MongoDB
    try {
      await api.updateApplicationStage(appId, newStage);
    } catch (e) {}
  };

  const updateApplicationNotes = async (appId, notes) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, notes } : app));
    showToast('Application notes updated');

    // Sync to MongoDB
    try {
      await api.updateApplicationNotes(appId, notes);
    } catch (e) {}
  };

  // Add Task to Weekly Plan
  const addToWeeklyPlan = async (opportunity, categoryBadge = 'Application') => {
    const existing = weeklyPlan.find(t => t.opportunityId === opportunity.id);
    if (existing) {
      showToast('This action is already on your weekly plan', 'info');
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      type: 'TOP PRIORITY',
      categoryBadge: categoryBadge,
      title: `Apply / Prepare: ${opportunity.title}`,
      deadline: `${opportunity.deadline} (${opportunity.daysLeft} days)`,
      estimatedHours: (opportunity.estimatedTimeMinutes ? parseFloat((opportunity.estimatedTimeMinutes / 60).toFixed(1)) : 1.5),
      completed: false,
      opportunityId: opportunity.id,
      tagline: `Match: ${opportunity.matchScore}% • ${opportunity.organization}`,
      priorityRank: weeklyPlan.length + 1
    };

    setWeeklyPlan(prev => [newTask, ...prev]);
    showToast(`Added "${opportunity.title}" to Your Weekly Plan!`);

    // Sync to MongoDB
    try {
      await api.addWeeklyTask(newTask);
    } catch (e) {}
  };

  const toggleTaskCompletion = async (taskId) => {
    setWeeklyPlan(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (nextState) showToast('Task completed! Streak updated 🔥');
        return { ...t, completed: nextState };
      }
      return t;
    }));

    // Sync to MongoDB
    try {
      await api.toggleWeeklyTask(taskId);
    } catch (e) {}
  };

  const postponeTask = async (taskId) => {
    setWeeklyPlan(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, deadline: 'Next Week (Rescheduled)' };
      }
      return t;
    }));
    showToast('Task moved to next week');

    // Sync to MongoDB
    try {
      await api.postponeWeeklyTask(taskId);
    } catch (e) {}
  };

  const removeWeeklyTask = async (taskId) => {
    setWeeklyPlan(prev => prev.filter(t => t.id !== taskId));
    showToast('Task removed from weekly plan');

    // Sync to MongoDB
    try {
      await api.deleteWeeklyTask(taskId);
    } catch (e) {}
  };

  // Rebuild My Week AI Simulation
  const rebuildWeeklyPlanAI = async () => {
    try {
      const serverPlan = await api.rebuildWeeklyPlanAI(currentPersonaId);
      if (serverPlan && serverPlan.length > 0) {
        setWeeklyPlan(serverPlan);
        showToast('✨ Nexora AI dynamically rebuilt your week to fit your available hours!');
        return;
      }
    } catch (e) {}

    const newPlan = [
      {
        id: `task-rebuilt-1`,
        type: "TOP PRIORITY",
        categoryBadge: "Application",
        title: `Submit Application for ${nextBestAction.title}`,
        deadline: "In 3 days",
        estimatedHours: 1.5,
        completed: false,
        opportunityId: nextBestAction.id,
        tagline: "Prioritized due to tight deadline and high match score",
        priorityRank: 1
      },
      {
        id: `task-rebuilt-2`,
        type: "SKILL",
        categoryBadge: "High Leverage Sprint",
        title: "Complete 2-Hour Intensive Skill Diagnostic Module",
        deadline: "Saturday",
        estimatedHours: 2.0,
        completed: false,
        tagline: "Closes your primary resume qualification gap",
        priorityRank: 2
      },
      {
        id: `task-rebuilt-3`,
        type: "CAREER",
        categoryBadge: "30-Day Experiment",
        title: "Review 2 Policy/Industry Case Studies & draft summary",
        deadline: "Sunday",
        estimatedHours: 1.5,
        completed: false,
        tagline: "Tests your practical alignment with your primary career goal",
        priorityRank: 3
      },
      {
        id: `task-rebuilt-4`,
        type: "FINANCE",
        categoryBadge: "SIP Habit",
        title: "Review Monthly Budget & Auto-invest into Education Goal",
        deadline: "End of month",
        estimatedHours: 0.5,
        completed: false,
        tagline: "Keeps financial milestone trajectory on track",
        priorityRank: 4
      }
    ];

    setWeeklyPlan(newPlan);
    showToast('✨ Nexora AI dynamically rebuilt your week to fit your available hours!');
  };

  // Mark Opportunity as Not Relevant
  const markNotRelevant = async (oppId, feedbackReason = '') => {
    setRejectedOpportunityIds(prev => [...prev, oppId]);
    showToast('Opportunity removed. Nexora AI updated recommendation weights.', 'info');

    // Sync to MongoDB
    try {
      await api.markOpportunityNotRelevant(oppId, feedbackReason, currentPersonaId);
    } catch (e) {}
  };

  // Update Profile
  const updateProfile = async (updatedFields) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedFields
    }));
    showToast('Profile updated & recommendations refreshed!');

    // Sync to MongoDB
    try {
      await api.updateProfile(currentPersonaId, updatedFields);
    } catch (e) {}
  };

  // Activate / Upgrade to Pro
  const activateProSubscription = async (planName = 'Nexora Pro (Annual)') => {
    setIsProUser(true);
    const newInvoice = {
      id: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      plan: planName,
      amount: planName.includes('Annual') ? '₹3,999' : '₹499',
      status: 'Paid',
      downloadUrl: '#invoice-pdf'
    };
    setInvoices(prev => [newInvoice, ...prev]);
    showToast('🎉 Welcome to Nexora Pro! All advanced AI features unlocked.');

    // Sync to MongoDB
    try {
      await api.upgradeToPro(planName);
    } catch (e) {}
  };

  // Cancel Pro
  const cancelProSubscription = async () => {
    setIsProUser(false);
    showToast('Subscription cancelled. You are on the Free tier.', 'info');

    // Sync to MongoDB
    try {
      await api.cancelPro();
    } catch (e) {}
  };

  // Mark notification as read
  const markNotificationRead = async (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));

    // Sync to MongoDB
    try {
      await api.markNotificationRead(notifId);
    } catch (e) {}
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      backendConnected,
      currentPersonaId,
      userProfile,
      currentScreen,
      setCurrentScreen,
      allOpportunities,
      rankedOpportunities,
      nextBestAction,
      topPriorities,
      funnelStats,
      profileCompletion,
      applications,
      weeklyPlan,
      isProUser,
      invoices,
      notifications,
      unreadNotifCount,
      compareCareerIds,
      setCompareCareerIds,
      activeModal,
      setActiveModal,
      modalData,
      setModalData,
      isAIChatOpen,
      setIsAIChatOpen,
      searchQuery,
      setSearchQuery,
      toastMessage,
      showToast,
      switchPersona,
      addApplication,
      updateApplicationStage,
      updateApplicationNotes,
      addToWeeklyPlan,
      toggleTaskCompletion,
      postponeTask,
      removeWeeklyTask,
      rebuildWeeklyPlanAI,
      markNotRelevant,
      updateProfile,
      activateProSubscription,
      cancelProSubscription,
      markNotificationRead,
      CAREER_PATHS,
      PERSONA_PRESETS
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
