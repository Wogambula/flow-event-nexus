import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import AuthPage from './pages/AuthPage';
import { Toaster } from './components/ui/sonner';

type Page = 'landing' | 'events' | 'event-details' | 'dashboard' | 'create' | 'auth';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [pageParams, setPageParams] = useState<any>(null);

  // Simple routing logic
  const navigate = (page: string, params: any = null) => {
    setCurrentPage(page as Page);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'events':
        return <EventsPage onNavigate={navigate} initialParams={pageParams} />;
      case 'event-details':
        return <EventDetailsPage onNavigate={navigate} params={pageParams} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'create':
        return <CreateEvent onNavigate={navigate} />;
      case 'auth':
        return <AuthPage onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar onNavigate={navigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;