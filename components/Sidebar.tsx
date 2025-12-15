import React from 'react';
import { ViewState } from '../types';
import { 
  Layout, 
  Book, 
  AlertTriangle, 
  Code2, 
  BrainCircuit, 
  Briefcase, 
  Wifi, 
  WifiOff 
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOnline: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onChangeView, 
  isOnline,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const menuItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layout size={20} /> },
    { id: 'docs', label: 'Offline Docs', icon: <Book size={20} /> },
    { id: 'error-solver', label: 'Error Solver', icon: <AlertTriangle size={20} /> },
    { id: 'snippets', label: 'Snippet Vault', icon: <Code2 size={20} /> },
    { id: 'practice', label: 'Practice Arena', icon: <BrainCircuit size={20} /> },
    { id: 'interview', label: 'Interview Prep', icon: <Briefcase size={20} /> },
  ];

  const handleNav = (id: ViewState) => {
    onChangeView(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h1 className="text-xl font-bold text-brand-500 tracking-wider">CodeNomad</h1>
          </div>

          <div className="flex-1 py-6 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150
                  ${currentView === item.id 
                    ? 'text-brand-500 bg-slate-800/50 border-r-4 border-brand-500' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-slate-800">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold 
              ${isOnline ? 'bg-emerald-900/30 text-emerald-400' : 'bg-rose-900/30 text-rose-400'}`}>
              {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span>{isOnline ? 'Online Mode' : 'Offline Mode'}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500 text-center">
              v1.0.0 &bull; Local First
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
