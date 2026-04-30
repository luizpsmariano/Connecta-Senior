import React from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, ArrowLeft, CheckCircle2, UserPlus, XCircle, Calendar } from 'lucide-react';
import { HistoryItem, Screen } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  onScreenChange: (screen: Screen) => void;
}

export const History: React.FC<HistoryProps> = ({ history, onScreenChange }) => {
  // Sort history by timestamp (most recent first)
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getActionDetails = (action: HistoryItem['action']) => {
    switch (action) {
      case 'joined':
        return {
          icon: <UserPlus size={16} className="text-brand-primary" />,
          label: 'Inscrito',
          bg: 'bg-indigo-50',
          borderColor: 'border-brand-primary/20'
        };
      case 'checked-in':
        return {
          icon: <CheckCircle2 size={16} className="text-emerald-500" />,
          label: 'Participou',
          bg: 'bg-emerald-50',
          borderColor: 'border-emerald-200'
        };
      case 'cancelled':
        return {
          icon: <XCircle size={16} className="text-rose-500" />,
          label: 'Cancelado',
          bg: 'bg-rose-50',
          borderColor: 'border-rose-200'
        };
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onScreenChange('profile')}
          aria-label="Voltar para perfil"
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-50 active:scale-95 transition-transform focus-visible:ring-4 focus-visible:ring-brand-primary outline-none"
        >
          <ArrowLeft size={24} className="text-slate-900" />
        </button>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
          Histórico
        </h2>
      </div>

      <div className="space-y-4">
        {sortedHistory.length > 0 ? (
          sortedHistory.map((item, index) => {
            const details = getActionDetails(item.action);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-5 rounded-[32px] border-2 bg-white flex items-center gap-4 ${details.borderColor}`}
              >
                <div className={`p-4 rounded-2xl ${details.bg}`}>
                  {details.icon}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-black text-slate-900 leading-tight mb-1">{item.activityTitle}</h4>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <Calendar size={12} />
                    {item.date} • {new Date(item.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest ${
                    item.action === 'checked-in' ? 'bg-emerald-500 text-white' :
                    item.action === 'cancelled' ? 'bg-rose-500 text-white' :
                    'bg-brand-primary text-white'
                  }`}>
                    {details.label}
                  </span>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <HistoryIcon size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Nenhuma atividade encontrada</p>
            <button 
              onClick={() => onScreenChange('activities')}
              className="mt-6 font-black text-brand-primary uppercase tracking-widest text-xs py-3 px-6 bg-indigo-50 rounded-full active:scale-95 transition-transform"
            >
              Explorar Atividades
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
