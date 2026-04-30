import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, Calendar, Heart, MessageSquare, Newspaper, LogOut } from 'lucide-react';
import { Screen, NotificationPreferences } from '../types';

interface SettingsProps {
  preferences: NotificationPreferences;
  onPreferenceChange: (key: keyof NotificationPreferences, value: boolean) => void;
  onScreenChange: (screen: Screen) => void;
  onLogout?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  preferences, 
  onPreferenceChange, 
  onScreenChange,
  onLogout
}) => {
  return (
    <div className="space-y-6">
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
          Preferências
        </h2>
      </div>

      <div className="bg-white rounded-[40px] p-8 shadow-sm border-2 border-slate-50 space-y-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-50 text-brand-primary rounded-2xl">
            <Bell size={24} />
          </div>
          <div>
            <h3 className="font-black text-xl uppercase tracking-tight">Notificações</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Escolha o que quer receber</p>
          </div>
        </div>

        <div className="space-y-6">
          <ToggleItem 
            icon={<Calendar size={20} />}
            label="Lembretes de Eventos"
            description="Receba avisos antes das atividades que você se inscreveu"
            isEnabled={preferences.eventReminders}
            onToggle={() => onPreferenceChange('eventReminders', !preferences.eventReminders)}
          />
          
          <ToggleItem 
            icon={<Heart size={20} />}
            label="Dicas de Saúde"
            description="Receba sugestões de saúde e bem-estar diaramente"
            isEnabled={preferences.healthTips}
            onToggle={() => onPreferenceChange('healthTips', !preferences.healthTips)}
          />

          <ToggleItem 
            icon={<MessageSquare size={20} />}
            label="Mensagens"
            description="Avisar quando alguém te enviar uma mensagem no chat"
            isEnabled={preferences.newMessages}
            onToggle={() => onPreferenceChange('newMessages', !preferences.newMessages)}
          />

          <ToggleItem 
            icon={<Newspaper size={20} />}
            label="Novidades de Pinhais"
            description="Fique por dentro de novos eventos e notícias da cidade"
            isEnabled={preferences.communityNews}
            onToggle={() => onPreferenceChange('communityNews', !preferences.communityNews)}
          />
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 italic">
        <p className="text-sm text-amber-800 font-bold leading-relaxed">
          Dica: Manter os lembretes ligados ajuda você a não esquecer os horários dos seus remédios e eventos!
        </p>
      </div>

      {onLogout && (
        <button 
          onClick={onLogout}
          className="w-full py-6 mt-4 bg-white border-2 border-rose-100 rounded-[32px] text-rose-500 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 active:bg-rose-50 transition-colors shadow-sm"
        >
          <LogOut size={20} /> Encerrar Sessão
        </button>
      )}
    </div>
  );
};

interface ToggleItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ icon, label, description, isEnabled, onToggle }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-black text-slate-900 leading-tight">{label}</h4>
        <p className="text-xs font-bold text-slate-400 leading-tight mt-1">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        role="switch"
        aria-checked={isEnabled}
        aria-label={label}
        className={`w-14 h-8 rounded-full relative transition-colors duration-300 outline-none focus-visible:ring-4 focus-visible:ring-brand-primary ${isEnabled ? 'bg-brand-primary' : 'bg-slate-300'}`}
      >
        <motion.div 
          animate={{ x: isEnabled ? 24 : 4 }}
          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
};
