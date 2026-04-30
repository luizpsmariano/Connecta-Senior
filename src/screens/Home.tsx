import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';

import { Activity, Screen, HistoryItem } from '../types';
import { CheckInButton } from '../components/CheckInButton';
import { MonthlyCalendar } from '../components/MonthlyCalendar';
import { useRecommendations } from '../hooks/useRecommendations';

interface HomeProps {
  activities: Activity[];
  history: HistoryItem[];
  interests: string[];
  onScreenChange: (screen: Screen) => void;
  onToggleJoin: (id: string) => void;
  onCheckIn: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  activities, 
  history, 
  interests, 
  onScreenChange, 
  onToggleJoin, 
  onCheckIn 
}) => {
  const recommendations = useRecommendations(activities, history, interests);
  const joinedActivities = activities.filter(a => a.isJoined);

  return (
    <div className="space-y-8 pb-32">
      {/* Primary Actions Grid for Seniors */}
      <section className="grid grid-cols-2 gap-4 pt-2">
        <NavActionButton 
          color="bg-rose-500" 
          icon="❤️" 
          label="Minha Saúde" 
          sublabel="Remédios e Mais"
          onClick={() => onScreenChange('health')} 
        />
        <NavActionButton 
          color="bg-amber-500" 
          icon="🚨" 
          label="Emergência" 
          sublabel="Pedir Ajuda"
          onClick={() => {}} // Integration for SOS
        />
      </section>

      {/* Recommendations Card - Premium Feel */}
      {recommendations.length > 0 && (
        <section aria-labelledby="recommendations-heading" className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 text-brand-primary flex items-center justify-center rounded-2xl shadow-sm">
                <Sparkles size={24} />
              </div>
              <h3 id="recommendations-heading" className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Para Você</h3>
            </div>
            <button 
              onClick={() => onScreenChange('activities')}
              className="px-5 py-2 bg-indigo-50 text-brand-primary font-black uppercase tracking-widest text-[11px] rounded-full shadow-sm active:scale-95 transition-all"
            >
              Ver Tudo
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide no-scrollbar snap-x snap-mandatory">
            {recommendations.map((activity, index) => (
              <motion.div 
                key={activity.id}
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onScreenChange(activity.type === 'class' ? 'classes' : 'activities')}
                className="flex-shrink-0 w-72 bg-white border-4 border-slate-50 rounded-[44px] p-6 shadow-xl active:scale-95 transition-transform cursor-pointer focus-visible:ring-4 focus-visible:ring-brand-primary outline-none snap-center"
              >
                <div className="relative h-44 w-full rounded-[32px] overflow-hidden mb-5">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{activity.category}</p>
                  </div>
                </div>
                <h4 className="font-black text-slate-900 text-xl uppercase tracking-tight mb-2 leading-tight">{activity.title}</h4>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  <MapPin size={14} className="text-brand-primary" />
                  <span className="truncate">{activity.location}</span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i + index * 10}`} alt="Amigo" />
                      </div>
                    ))}
                  </div>
                  <span className="px-4 py-1 bg-brand-primary/10 text-brand-primary font-black uppercase tracking-widest text-[9px] rounded-full">
                    Sugerido
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Info / Vitals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter px-2">Resumo do Dia</h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 rounded-[48px] p-8 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-400 block mb-1">Passos Hoje</span>
              <p className="text-4xl font-black tracking-tighter">4.280 <span className="text-lg opacity-40 font-medium italic">passos</span></p>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl">
              👣
            </div>
          </div>
          
          <div className="flex justify-between items-end relative z-10 border-t border-white/10 pt-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-rose-400 block mb-1">Batimentos</span>
              <p className="text-4xl font-black tracking-tighter">72 <span className="text-lg opacity-40 font-medium italic">bpm</span></p>
            </div>
            <div className="w-28 h-12 flex items-end justify-between px-1" aria-hidden="true">
              {[40, 70, 45, 90, 60, 80].map((h, i) => (
                <div key={i} className="w-2.5 bg-indigo-500 rounded-full" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          
          <div className="absolute top-1/2 -right-20 w-64 h-64 bg-brand-primary rounded-full blur-[100px] opacity-20" />
        </motion.div>
      </section>

      <section className="bg-amber-50 rounded-[48px] p-8 border-4 border-amber-100 relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-sm">
            🏊‍♂️
          </div>
          <h3 className="text-2xl font-black text-amber-950 uppercase tracking-tight mb-2">Vagas para Hidroginástica!</h3>
          <p className="text-amber-800 font-bold text-lg mb-6 leading-snug">
            Novas turmas abertas para o Centro de Pinhais. Venha se exercitar com a gente!
          </p>
          <button 
            onClick={() => onScreenChange('classes')}
            className="bg-amber-500 text-white py-4 px-8 rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
          >
            Quero Participar
          </button>
        </div>
        <div className="absolute -bottom-8 -right-8 text-8xl opacity-10 grayscale">🌊</div>
      </section>

      {/* Classes Quick Menu */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Menu de Aulas</h2>
          <button 
            onClick={() => onScreenChange('classes')}
            className="text-[10px] font-black text-brand-primary uppercase tracking-widest"
          >
            Ver Todas
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <QuickClassLink 
            icon="🧘‍♀️" 
            label="Yoga" 
            onClick={() => onScreenChange('classes')} 
            color="bg-sky-50 text-sky-700 border-sky-100"
          />
          <QuickClassLink 
            icon="🏊‍♀️" 
            label="Natação" 
            onClick={() => onScreenChange('classes')} 
            color="bg-blue-50 text-blue-700 border-blue-100"
          />
          <QuickClassLink 
            icon="🏐" 
            label="Esportes" 
            onClick={() => onScreenChange('classes')} 
            color="bg-orange-50 text-orange-700 border-orange-100"
          />
          <QuickClassLink 
            icon="💪" 
            label="Ginástica" 
            onClick={() => onScreenChange('classes')} 
            color="bg-emerald-50 text-emerald-700 border-emerald-100"
          />
        </div>
      </section>
    </div>
  );
};

const QuickClassLink: React.FC<{ icon: string, label: string, onClick: () => void, color: string }> = ({ icon, label, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`${color} border-4 rounded-[40px] p-6 text-center shadow-lg active:scale-95 transition-all outline-none focus-visible:ring-4 focus-visible:ring-slate-900`}
  >
    <div className="text-5xl mb-2">{icon}</div>
    <p className="font-black uppercase tracking-tight text-xl">{label}</p>
  </button>
);

// Simplified action buttons for senior layout
const NavActionButton: React.FC<{ color: string, icon: string, label: string, sublabel: string, onClick: () => void }> = ({ color, icon, label, sublabel, onClick }) => (
  <button 
    onClick={onClick}
    className={`${color} p-6 rounded-[44px] flex flex-col items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform text-white border-b-8 border-black/20 text-center min-h-[160px]`}
  >
    <span className="text-6xl mb-1">{icon}</span>
    <div>
      <span className="font-black uppercase tracking-tight text-xl block leading-none">{label}</span>
      <span className="font-bold text-[9px] uppercase tracking-widest opacity-80 mt-1 block">{sublabel}</span>
    </div>
  </button>
);

const NavSectionButton: React.FC<{ icon: string, label: string, sublabel: string, onClick: () => void, color: string }> = ({ icon, label, sublabel, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`${color} border-4 rounded-[44px] p-6 text-center shadow-lg active:scale-95 transition-all flex flex-col items-center justify-center min-h-[160px]`}
  >
    <div className="text-5xl mb-3">{icon}</div>
    <p className="font-black uppercase tracking-tight text-xl leading-none">{label}</p>
    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">{sublabel}</p>
  </button>
);
