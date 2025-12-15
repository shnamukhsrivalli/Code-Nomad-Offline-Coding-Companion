import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { AppState, ViewState } from './types';

// Components
import Sidebar from './components/Sidebar';
import DocViewer from './components/DocViewer';
import ErrorExplainer from './components/ErrorExplainer';
import SnippetVault from './components/SnippetVault';
import PracticeArena from './components/PracticeArena';
import InterviewPrep from './components/InterviewPrep';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentView: 'dashboard',
    isOnline: navigator.onLine,
    theme: 'dark'
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Network listener
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderView = () => {
    switch (state.currentView) {
      case 'docs':
        return <DocViewer />;
      case 'error-solver':
        return <ErrorExplainer isOnline={state.isOnline} />;
      case 'snippets':
        return <SnippetVault />;
      case 'practice':
        return <PracticeArena />;
      case 'interview':
        return <InterviewPrep />;
      case 'dashboard':
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-brand-400 to-indigo-400 bg-clip-text text-transparent">
              CodeNomad
            </h1>
            <p className="text-slate-400 text-lg max-w-md mb-8">
              Your offline-first coding companion. Access docs, solve errors, and practice logic without an internet connection.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <button 
                  onClick={() => setState(s => ({...s, currentView: 'docs'}))}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-brand-500 transition-all group"
                >
                  <span className="block text-xl font-bold text-slate-200 group-hover:text-brand-400">Docs</span>
                  <span className="text-xs text-slate-500">Python & JS</span>
                </button>
                <button 
                  onClick={() => setState(s => ({...s, currentView: 'error-solver'}))}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-brand-500 transition-all group"
                >
                   <span className="block text-xl font-bold text-slate-200 group-hover:text-brand-400">Debug</span>
                   <span className="text-xs text-slate-500">Fix Errors</span>
                </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      <Sidebar 
        currentView={state.currentView} 
        onChangeView={(view: ViewState) => setState(prev => ({ ...prev, currentView: view }))}
        isOnline={state.isOnline}
        isMobileOpen={isMobileNavOpen}
        setIsMobileOpen={setIsMobileNavOpen}
      />

      <div className="flex-1 flex flex-col h-full relative md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 border-b border-slate-900 bg-slate-950 z-10">
          <button onClick={() => setIsMobileNavOpen(true)} className="text-slate-400 mr-4">
            <Menu size={24} />
          </button>
          <span className="font-bold text-slate-100">CodeNomad</span>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
