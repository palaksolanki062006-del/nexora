import React, { useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { AppProvider, useApp } from './context/AppContext.jsx';

// Layout
import { Sidebar } from './components/layout/Sidebar.jsx';
import { Header } from './components/layout/Header.jsx';
import { MobileNav } from './components/layout/MobileNav.jsx';

// AI Copilot & Payment
import { NexoraAIAssistant } from './components/ai/NexoraAIAssistant.jsx';
import { PaymentModal } from './components/payment/PaymentModal.jsx';

// Views
import { WelcomeView } from './components/views/WelcomeView.jsx';
import { ProfileView } from './components/views/ProfileView.jsx';
import { DashboardView } from './components/views/DashboardView.jsx';
import { NextBestActionView } from './components/views/NextBestActionView.jsx';
import { OpportunityExplorerView } from './components/views/OpportunityExplorerView.jsx';
import { OpportunityDetailModal } from './components/views/OpportunityDetailModal.jsx';
import { CareerNavigatorView } from './components/views/CareerNavigatorView.jsx';
import { CareerComparisonView } from './components/views/CareerComparisonView.jsx';
import { WeeklyNavigatorView } from './components/views/WeeklyNavigatorView.jsx';
import { ApplicationTrackerView } from './components/views/ApplicationTrackerView.jsx';
import { NexoraMoneyView } from './components/views/NexoraMoneyView.jsx';
import { SettingsView } from './components/views/SettingsView.jsx';
import { AdminDashboardView } from './components/views/AdminDashboardView.jsx';

function MainApp() {
  const { currentScreen, toastMessage } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If on Welcome/Onboarding screen, render full-screen without sidebar/topbar
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-[#f8f9ff]">
        <WelcomeView />
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl animate-slide-up flex items-center gap-2 border border-slate-800">
            <span>✨</span>
            <span>{toastMessage.message}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8f9ff] text-slate-900 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
          {currentScreen === 'dashboard' && <DashboardView />}
          {currentScreen === 'next-best-action' && <NextBestActionView />}
          {currentScreen === 'opportunities' && <OpportunityExplorerView />}
          {currentScreen === 'career-nav' && <CareerNavigatorView />}
          {currentScreen === 'career-compare' && <CareerComparisonView />}
          {currentScreen === 'weekly' && <WeeklyNavigatorView />}
          {currentScreen === 'applications' && <ApplicationTrackerView />}
          {currentScreen === 'money' && <NexoraMoneyView />}
          {currentScreen === 'profile' && <ProfileView />}
          {currentScreen === 'settings' && <SettingsView />}
          {currentScreen === 'admin' && <AdminDashboardView />}
        </main>

        {/* Mobile Sticky Bottom Navigation */}
        <MobileNav />
      </div>

      {/* Global Modals & Floating AI */}
      <OpportunityDetailModal />
      <PaymentModal />
      <NexoraAIAssistant />

      {/* Global Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl animate-slide-up flex items-center gap-2 border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

// Mount to DOM
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
