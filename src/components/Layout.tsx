import React from 'react';
import { motion } from 'motion/react';
import { Home, Calendar, MessageSquare, Heart, User, Bell } from 'lucide-react';
import { Screen } from '../types';
import { useNotifications } from './NotificationManager';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  setScreen: (screen: Screen) => void;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeScreen, setScreen, title }) => {
  const { unreadCount } = useNotifications();

  return (
    <div className="flex flex-col h-screen bg-white relative overflow-hidden font-sans">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-4 flex justify-between items-center z-10 border-b-2 border-slate-50">
        <div className="flex-1">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Bom dia,</p>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button 
            onClick={() => setScreen('notifications')}
            aria-label={`Ver ${unreadCount} notificações`}
            className="relative w-12 h-12 rounded-2xl bg-white border-2 border-slate-50 shadow-sm flex items-center justify-center active:scale-95 transition-transform"
          >
            <Bell size={24} className={unreadCount > 0 ? 'text-brand-primary' : 'text-slate-400'} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white ring-4 ring-rose-500/10">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4 pb-32" id="main-content">
        {children}
      </main>

      {/* Bottom Navigation - Accessible for Seniors */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-slate-100 flex justify-around items-center h-32 px-2 pb-10 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]" aria-label="Navegação principal">
        <NavItem 
          icon="🏠" 
          label="Início" 
          active={activeScreen === 'home'} 
          onClick={() => setScreen('home')} 
        />
        <NavItem 
          icon="🗓️" 
          label="Eventos" 
          active={activeScreen === 'activities'} 
          onClick={() => setScreen('activities')} 
        />
        <NavItem 
          icon="🎓" 
          label="Aulas" 
          active={activeScreen === 'classes'} 
          onClick={() => setScreen('classes')} 
        />
        <NavItem 
          icon="💬" 
          label="Chat" 
          active={activeScreen === 'chat'} 
          onClick={() => setScreen('chat')} 
        />
        <NavItem 
          icon="👤" 
          label="Perfil" 
          active={activeScreen === 'profile'} 
          onClick={() => setScreen('profile')} 
        />
      </nav>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-2 bg-slate-200 rounded-full z-30" />
    </div>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`flex flex-col items-center justify-center gap-2 w-full h-full relative transition-all outline-none focus-visible:ring-4 focus-visible:ring-brand-primary rounded-3xl ${active ? 'text-brand-primary bg-indigo-50/50' : 'text-slate-400'}`}
    >
      <span role="img" aria-hidden="true" className={`text-4xl mb-0.5 transition-transform ${active ? 'scale-110' : 'grayscale opacity-70'}`}>
        {icon}
      </span>
      <span className={`text-xs font-black uppercase tracking-widest ${active ? 'text-brand-primary' : 'text-slate-600'}`}>{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute bottom-0 w-12 h-1.5 bg-brand-primary rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </button>
  );
};
