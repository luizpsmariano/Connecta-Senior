import { Home, Calendar, Newspaper, User } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeTab: 'home' | 'calendar' | 'news' | 'profile';
  onTabChange: (tab: 'home' | 'calendar' | 'news' | 'profile') => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Início' },
    { id: 'calendar' as const, icon: Calendar, label: 'Agenda' },
    { id: 'news' as const, icon: Newspaper, label: 'Notícias' },
    { id: 'profile' as const, icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[var(--color-neutral-200)] shadow-[var(--elevation-3)] z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-20 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-[var(--radius-s)]
                min-w-[72px] min-h-[56px]
                transition-colors duration-300
                focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30
                ${isActive 
                  ? 'text-[var(--color-primary-main)] bg-[var(--color-primary-light)]' 
                  : 'text-[var(--color-neutral-700)]'
                }
              `}
            >
              <Icon className="w-7 h-7" />
              <span className="text-[14px]">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
