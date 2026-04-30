import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Shield, HelpCircle, LogOut, ChevronRight, History as HistoryIcon, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { Screen, UserProfile, HistoryItem } from '../types';

interface ProfileProps {
  onScreenChange: (screen: Screen) => void;
  user: UserProfile;
  history: HistoryItem[];
  onLogout?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onScreenChange, user, history, onLogout }) => {
  const stats = {
    joined: history.filter(h => h.action === 'joined').length,
    participated: history.filter(h => h.action === 'checked-in').length,
    cancelled: history.filter(h => h.action === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button 
            onClick={() => onScreenChange('settings')}
            className="absolute bottom-0 right-0 bg-brand-primary text-white p-2 rounded-full shadow-lg border-2 border-white"
          >
            <Settings size={20} />
          </button>
        </div>
        <h2 className="text-2xl font-black mt-4">{user.name}, {user.age} anos</h2>
        <p className="text-brand-muted font-bold">{user.city}</p>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-[32px] border-2 border-slate-50 flex flex-col items-center text-center">
          <div className="p-2 bg-indigo-50 text-brand-primary rounded-xl mb-2">
            <Calendar size={20} />
          </div>
          <span className="text-xl font-black">{stats.joined}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inscrito</span>
        </div>
        <div className="bg-white p-4 rounded-[32px] border-2 border-slate-50 flex flex-col items-center text-center">
          <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl mb-2">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-xl font-black">{stats.participated}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Participou</span>
        </div>
        <div className="bg-white p-4 rounded-[32px] border-2 border-slate-50 flex flex-col items-center text-center">
          <div className="p-2 bg-rose-50 text-rose-500 rounded-xl mb-2">
            <XCircle size={20} />
          </div>
          <span className="text-xl font-black">{stats.cancelled}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cancelou</span>
        </div>
      </div>

      <div className="space-y-3">
        <ProfileMenuItem 
          icon={<User size={24} />} 
          label="Meus Dados" 
        />
        <ProfileMenuItem 
          icon={<HistoryIcon size={24} />} 
          label="Meu Histórico" 
          onClick={() => onScreenChange('history')}
        />
        <ProfileMenuItem 
          icon={<Settings size={20} />} 
          label="Notificações" 
          onClick={() => onScreenChange('settings')}
        />
        <ProfileMenuItem 
          icon={<Shield size={24} />} 
          label="Contatos de Emergência" 
        />
        <ProfileMenuItem 
          icon={<HelpCircle size={24} />} 
          label="Central de Ajuda" 
        />
        <button 
          onClick={onLogout}
          className="w-full bg-white p-5 rounded-3xl flex items-center justify-between text-red-500 shadow-sm border border-red-50 mt-4 active:bg-red-50 transition-colors"
        >
          <div className="flex items-center space-x-4 font-bold">
            <LogOut size={24} />
            <span>Encerrar Sessão</span>
          </div>
        </button>
      </div>

      <div className="bg-brand-secondary/10 p-6 rounded-3xl border border-brand-secondary/20 mt-8">
        <h4 className="font-bold text-brand-primary mb-2 italic">Você sabia?</h4>
        <p className="text-sm text-brand-primary/80 leading-relaxed">
          {stats.participated >= 10 
            ? "Parabéns! Você é um membro muito ativo da nossa comunidade!" 
            : `Você já participou de ${stats.participated} atividades. Continue assim para manter sua saúde em dia!`}
        </p>
      </div>
    </div>
  );
};

const ProfileMenuItem: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void }> = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-gray-50 active:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="text-brand-primary">{icon}</div>
        <span className="font-bold text-lg">{label}</span>
      </div>
      <ChevronRight className="text-gray-300" />
    </button>
  );
};
