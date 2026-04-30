import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, MessageSquare, Heart, CheckCircle, Clock } from 'lucide-react';
import { useNotifications } from '../components/NotificationManager';

export const Notifications: React.FC = () => {
  const { notifications, markAsRead } = useNotifications();

  useEffect(() => {
    // Mark all as read when opening the screen
    notifications.forEach(n => {
      if (!n.read) markAsRead(n.id);
    });
  }, [notifications, markAsRead]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1 mb-2">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Alertas Recentes</h2>
        <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Total: {notifications.length}
        </span>
      </div>

      <div className="space-y-3" role="list">
        {notifications.length > 0 ? (
          notifications.map((n, i) => (
            <motion.div
              key={n.id}
              role="listitem"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-5 rounded-[32px] border-2 transition-all flex gap-4 ${
                n.read ? 'bg-white border-slate-50 opacity-70' : 'bg-indigo-50 border-indigo-100 shadow-lg shadow-indigo-50/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-white ${
                n.type === 'event' ? 'bg-indigo-600' : 
                n.type === 'message' ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {n.type === 'event' ? <Bell size={24} /> : 
                 n.type === 'message' ? <MessageSquare size={24} /> : <Heart size={24} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-black text-lg text-slate-900 leading-tight uppercase tracking-tight line-clamp-1">{n.title}</h3>
                  {!n.read && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse mt-1.5" aria-label="Nova!" />}
                </div>
                <p className="text-slate-600 font-bold text-sm leading-tight mb-2">{n.body}</p>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Clock size={12} />
                  {n.time}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto">
              <Bell size={40} />
            </div>
            <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Nenhuma notificação</p>
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-[40px] p-6 text-white text-center mt-8">
        <p className="text-sm font-bold opacity-80 mb-4">Mantenha seu Bluetooth ligado para melhor conexão com dispositivos de saúde.</p>
        <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-transform">
          Configurações
        </button>
      </div>
    </div>
  );
};
