import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Clock, Calendar, CheckCircle2, Info, User, Phone as PhoneIcon, Sparkles } from 'lucide-react';
import { Activity } from '../types';
import { CheckInButton } from './CheckInButton';
import { MapWithRoute } from './MapWithRoute';
import { getActivitySmartInsight } from '../services/geminiService';

interface ActivityDetailsProps {
  activity: Activity;
  onClose: () => void;
  onJoin: () => void;
  onCheckIn: () => void;
}

export const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity, onClose, onJoin, onCheckIn }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    async function fetchInsight() {
      setLoadingInsight(true);
      const insight = await getActivitySmartInsight(activity.title, activity.description);
      setAiInsight(insight);
      setLoadingInsight(false);
    }
    fetchInsight();
  }, [activity.title, activity.description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onJoin();
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <motion.div 
      layoutId={`activity-${activity.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
      className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden"
    >
      {/* Header with Image */}
      <div className="relative h-72 flex-shrink-0">
        <img 
          src={activity.image} 
          alt={`Foto ilustrativa de ${activity.title}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button 
          onClick={onClose}
          aria-label="Fechar detalhes da atividade"
          className="absolute top-12 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white active:scale-95 transition-transform focus-visible:ring-4 focus-visible:ring-white outline-none"
        >
          <X size={28} />
        </button>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-brand-primary text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest w-fit mb-3">
            {activity.category}
          </div>
          <h2 id="activity-title" className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-2">{activity.title}</h2>
          
          {/* AI Badge */}
          <div className="flex items-center gap-2 text-white/90 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} className="text-amber-400" />
            Sugestão da Connecta IA
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8" role="document">
        {/* Gemini Smart Insight */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-primary/5 border-2 border-brand-primary/20 rounded-[32px] p-6 relative overflow-hidden"
        >
          <div className="absolute -top-4 -right-4 opacity-10">
            <Sparkles size={120} className="text-brand-primary" />
          </div>
          <div className="relative z-10">
            <h4 className="text-brand-primary font-black uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
              <Sparkles size={14} /> Por que participar?
            </h4>
            {loadingInsight ? (
              <div className="h-6 w-3/4 bg-slate-200 animate-pulse rounded-lg" />
            ) : (
              <p className="text-slate-800 font-bold text-lg leading-snug italic">
                "{aiInsight}"
              </p>
            )}
          </div>
        </motion.div>

        {/* Check-in Section (Only if joined) */}
        {activity.isJoined && (
          <div className="bg-amber-50 border-2 border-amber-100 rounded-[32px] p-6 space-y-4 shadow-lg shadow-amber-50/50">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-amber-500 text-white rounded-xl shadow-md">
                 <MapPin size={24} />
               </div>
               <div>
                  <h4 className="text-lg font-black text-amber-950 uppercase tracking-tight">Você chegou?</h4>
                  <p className="text-xs font-bold text-amber-700/80 uppercase">Confirme sua presença pelo GPS</p>
               </div>
            </div>
            <CheckInButton 
              targetLat={activity.lat} 
              targetLng={activity.lng} 
              isCheckedIn={!!activity.isCheckedIn} 
              onSuccess={onCheckIn} 
            />
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4 bg-slate-50 p-6 rounded-[32px]">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data</p>
              <p className="text-lg font-black text-slate-900">{new Date(activity.date).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Horário</p>
              <p className="text-lg font-black text-slate-900">{activity.time}h</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Local</p>
              <p className="text-lg font-black text-slate-900">{activity.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
              <User size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Vagas</p>
                <p className="text-sm font-black text-slate-900">{activity.currentParticipants} de {activity.maxParticipants}</p>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }}
                   className={`h-full ${activity.currentParticipants >= activity.maxParticipants ? 'bg-rose-500' : 'bg-brand-primary'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Info size={24} className="text-brand-primary" />
            Sobre o Evento
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            {activity.description}
          </p>
        </div>

        {/* Map Preview */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <MapPin size={24} className="text-brand-primary" />
            Como Chegar
          </h3>
          <MapWithRoute 
            targetLat={activity.lat} 
            targetLng={activity.lng} 
            targetName={activity.title} 
          />
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${activity.lat},${activity.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest active:scale-95 transition-transform"
          >
            <MapPin size={18} />
            Abrir Navegação no Google
          </a>
        </div>

        {/* Tips */}
        {activity.tips && activity.tips.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Dicas Úteis</h3>
            <div className="space-y-3">
              {activity.tips.map((tip, i) => (
                <div key={i} className="flex gap-4 items-start bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                  <div className="text-2xl mt-0.5">💡</div>
                  <p className="text-indigo-900 font-bold text-base leading-snug">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-white border-t border-slate-100 pb-10">
        {!activity.isJoined && !isSuccess && (
          <button 
            onClick={() => setShowForm(true)}
            disabled={activity.currentParticipants >= activity.maxParticipants}
            className="w-full py-5 bg-brand-primary text-white rounded-[32px] font-black text-xl uppercase tracking-tighter shadow-xl shadow-indigo-100 active:scale-95 transition-transform disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            {activity.currentParticipants >= activity.maxParticipants ? 'Vagas Esgotadas' : 'Quero me Inscrever'}
          </button>
        )}
        {activity.isJoined && (
          <div className="w-full py-5 bg-emerald-500 text-white rounded-[40px] font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3">
            <CheckCircle2 size={28} />
            Inscrição Confirmada
          </div>
        )}
      </div>

      {/* Registration Form Overlay */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 id="registration-title" className="text-2xl font-black uppercase tracking-tight">Inscrição</h3>
              <button 
                onClick={() => setShowForm(false)} 
                aria-label="Voltar para detalhes"
                className="p-2 bg-slate-100 rounded-full focus-visible:ring-4 focus-visible:ring-brand-primary outline-none"
              >
                <X size={24} />
              </button>
            </div>

            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6" role="alert" aria-live="assertive">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={64} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Sucesso!</h4>
                  <p className="text-lg text-slate-600 font-bold mt-2 font-display">Sua vaga está garantida para o evento.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 space-y-6" aria-labelledby="registration-title">
                <p className="text-slate-600 font-bold text-lg mb-4">Por favor, confirme seus dados para garantir sua participação no evento: <span className="text-brand-primary">"{activity.title}"</span></p>
                
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-sm font-black uppercase tracking-widest text-slate-400">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={24} aria-hidden="true" />
                    <input 
                      id="full-name"
                      required
                      type="text" 
                      autoComplete="name"
                      placeholder="Ex: Dona Maria Silva"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 pl-14 pr-6 focus:border-brand-primary outline-none font-bold text-xl"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone-number" className="text-sm font-black uppercase tracking-widest text-slate-400">Celular de Contato</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={24} aria-hidden="true" />
                    <input 
                      id="phone-number"
                      required
                      type="tel" 
                      autoComplete="tel"
                      placeholder="(41) 99999-9999"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-5 pl-14 pr-6 focus:border-brand-primary outline-none font-bold text-xl"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-brand-primary text-white rounded-[32px] font-black text-2xl uppercase tracking-tighter shadow-2xl shadow-indigo-100 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? 'Confirmando...' : 'Confirmar Presença'}
                  </button>
                  <p className="text-center text-slate-400 text-sm mt-6 italic">Ao clicar, você confirma que participará do evento.</p>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
