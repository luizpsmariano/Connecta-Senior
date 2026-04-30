import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Info, MessageSquare, Heart } from 'lucide-react';
import { AppNotification } from '../types';
import { MOCK_NOTIFICATIONS } from '../constants';

interface NotificationContextType {
  notifications: AppNotification[];
  addNotification: (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [pushQueue, setPushQueue] = useState<AppNotification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    const newNotification: AppNotification = {
      ...n,
      id: Date.now().toString(),
      time: 'Agora',
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    setPushQueue(prev => [...prev, newNotification]);

    // Request browser notification if possible
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(newNotification.title, { body: newNotification.body });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Automatically remove push alert after 5 seconds
  useEffect(() => {
    if (pushQueue.length > 0) {
      const timer = setTimeout(() => {
        setPushQueue(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pushQueue]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
      {children}
      
      {/* Push Notification Overlay (Simulated) */}
      <div className="fixed top-12 left-0 right-0 z-[100] pointer-events-none px-6" role="log" aria-live="polite">
        <AnimatePresence>
          {pushQueue.map((n) => (
            <motion.div
              key={n.id}
              role="status"
              initial={{ opacity: 0, y: -100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="bg-white/95 backdrop-blur-xl border-2 border-brand-primary/20 shadow-2xl rounded-[32px] p-5 flex items-center gap-4 pointer-events-auto max-w-sm mx-auto mb-4"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                n.type === 'event' ? 'bg-indigo-600' : 
                n.type === 'message' ? 'bg-emerald-600' : 'bg-rose-600'
              }`} aria-hidden="true">
                {n.type === 'event' ? <Bell size={28} /> : 
                 n.type === 'message' ? <MessageSquare size={28} /> : <Heart size={28} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter leading-none mb-1 line-clamp-1">{n.title}</p>
                <p className="text-xs font-bold text-slate-600 leading-tight line-clamp-2">{n.body}</p>
              </div>
              <button 
                onClick={() => setPushQueue(prev => prev.filter(p => p.id !== n.id))}
                aria-label="Dispensar notificação"
                className="p-2 bg-slate-100 rounded-full text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
