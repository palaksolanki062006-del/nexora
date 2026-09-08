// NEXORA Frontend REST Client for FastAPI Backend with MongoDB

const API_BASE_URL = 'http://localhost:8000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch('http://localhost:8000/health');
      return await res.json();
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  },

  // Profiles & Personas
  getPersonaPresets: () => request('/profiles/presets'),
  getCurrentProfile: (personaId) => request(`/profiles/current${personaId ? `?persona_id=${personaId}` : ''}`),
  getProfileById: (personaId) => request(`/profiles/${personaId}`),
  updateProfile: (personaId, updates) => request(`/profiles/${personaId}`, { method: 'PUT', body: updates }),
  switchPersona: (personaId) => request(`/profiles/switch/${personaId}`, { method: 'POST' }),

  // Opportunities
  getOpportunities: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.targetCareer && params.targetCareer !== 'All') query.append('targetCareer', params.targetCareer);
    if (params.isRemote !== undefined) query.append('isRemote', params.isRemote);
    if (params.search) query.append('search', params.search);
    if (params.personaId) query.append('personaId', params.personaId);
    if (params.minScore) query.append('minScore', params.minScore);
    const qs = query.toString();
    return request(`/opportunities${qs ? `?${qs}` : ''}`);
  },
  getNextBestAction: (personaId) => request(`/opportunities/next-best-action${personaId ? `?personaId=${personaId}` : ''}`),
  getOpportunityDetail: (oppId, personaId) => request(`/opportunities/${oppId}${personaId ? `?personaId=${personaId}` : ''}`),
  markOpportunityNotRelevant: (opportunityId, reason, personaId) => 
    request(`/opportunities/reject${personaId ? `?personaId=${personaId}` : ''}`, {
      method: 'POST',
      body: { opportunityId, reason }
    }),

  // Applications Tracker
  getApplications: (stage) => request(`/applications${stage && stage !== 'All' ? `?stage=${stage}` : ''}`),
  createApplication: (appData) => request('/applications', { method: 'POST', body: appData }),
  updateApplicationStage: (appId, stage, appliedDate = null, interviewDate = null) => 
    request(`/applications/${appId}/stage`, {
      method: 'PUT',
      body: { stage, appliedDate, interviewDate }
    }),
  updateApplicationNotes: (appId, notes) => 
    request(`/applications/${appId}/notes`, {
      method: 'PUT',
      body: { notes }
    }),
  deleteApplication: (appId) => request(`/applications/${appId}`, { method: 'DELETE' }),

  // Weekly Plan
  getWeeklyPlan: () => request('/weekly-plan'),
  addWeeklyTask: (taskData) => request('/weekly-plan', { method: 'POST', body: taskData }),
  updateWeeklyTask: (taskId, updates) => request(`/weekly-plan/${taskId}`, { method: 'PUT', body: updates }),
  toggleWeeklyTask: (taskId) => request(`/weekly-plan/${taskId}/toggle`, { method: 'POST' }),
  postponeWeeklyTask: (taskId) => request(`/weekly-plan/${taskId}/postpone`, { method: 'POST' }),
  deleteWeeklyTask: (taskId) => request(`/weekly-plan/${taskId}`, { method: 'DELETE' }),
  rebuildWeeklyPlanAI: (personaId) => request(`/weekly-plan/rebuild-ai${personaId ? `?personaId=${personaId}` : ''}`, { method: 'POST' }),

  // Career Navigator
  getCareers: () => request('/careers'),
  getCareerDetail: (careerId) => request(`/careers/${careerId}`),
  compareCareers: (careerIds) => request('/careers/compare', { method: 'POST', body: { careerIds } }),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (notifId) => request(`/notifications/${notifId}/read`, { method: 'POST' }),
  getUnreadNotifCount: () => request('/notifications/unread-count'),

  // Billing & Pro
  getSubscriptionStatus: () => request('/billing/status'),
  getInvoices: () => request('/billing/invoices'),
  upgradeToPro: (planName = 'Nexora Pro (Annual)') => request('/billing/upgrade', { method: 'POST', body: { planName } }),
  cancelPro: () => request('/billing/cancel', { method: 'POST' }),

  // AI Assistant Copilot
  chatWithAI: (message, personaId, currentScreen, history = []) => 
    request('/ai/chat', {
      method: 'POST',
      body: { message, personaId, currentScreen, history }
    }),

  // Admin
  getAdminMetrics: () => request('/admin/metrics'),
};

export default api;
