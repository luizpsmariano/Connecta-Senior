import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Pill, Activity as ActivityIcon } from 'lucide-react';
import { MOCK_MEDICATIONS } from '../constants';

export const Health: React.FC = () => {
  return (
    <div className="space-y-6">
      <section aria-labelledby="health-status-heading">
        <h2 id="health-status-heading" className="sr-only">Status do Dia</h2>
        <div className="bg-brand-primary p-6 rounded-[32px] text-white shadow-xl shadow-indigo-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
            <ActivityIcon size={120} />
          </div>
          <h3 className="text-2xl font-black mb-1">Status de Hoje</h3>
          <p className="text-white/80 text-sm mb-4 font-bold">Você está indo muito bem!</p>
          <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-md w-fit" aria-label="85 por cento concluído">
            <span className="text-3xl font-black" aria-hidden="true">85%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest pl-2" aria-hidden="true">Concluído</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="medications-heading">
        <div className="flex justify-between items-center px-1 mb-4">
          <h3 id="medications-heading" className="text-xl font-black flex items-center space-x-2 uppercase tracking-tight text-slate-900">
            <span>Medicamentos</span>
          </h3>
          <button className="text-brand-primary font-black text-xs uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
            Adicionar
          </button>
        </div>

        <div className="space-y-3" role="list">
          {MOCK_MEDICATIONS.map((med, i) => (
            <motion.div 
              key={med.id}
              role="listitem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-[32px] border-2 flex items-center justify-between shadow-sm transition-all ${med.taken ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}
            >
              <div className="flex items-center space-x-4">
                <div 
                  role="img"
                  aria-label={med.taken ? "Medicamento tomado" : "Medicamento pendente"}
                  className={`p-4 rounded-2xl shadow-lg ${med.taken ? 'bg-emerald-700 text-white' : 'bg-rose-700 text-white'}`}
                >
                  <Pill size={24} />
                </div>
                <div>
                  <h4 className={`font-black text-lg leading-tight ${med.taken ? 'text-emerald-950' : 'text-rose-950'}`}>{med.name}</h4>
                  <span className={`text-xs font-bold uppercase tracking-wide ${med.taken ? 'text-emerald-800' : 'text-rose-800'}`}>Horário: {med.time}</span>
                </div>
              </div>
              <button 
                onClick={() => {}} 
                aria-label={med.taken ? `Marcar ${med.name} como não tomado` : `Marcar ${med.name} como tomado`}
                className={`${med.taken ? 'text-emerald-600' : 'text-rose-400'} active:scale-95 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-current rounded-full`}
              >
                {med.taken ? <CheckCircle2 size={40} strokeWidth={3} /> : <Circle size={40} strokeWidth={3} />}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section aria-labelledby="hydration-heading">
        <div className="bg-emerald-50 border-2 border-emerald-100 p-6 rounded-[32px] shadow-sm">
          <h3 id="hydration-heading" className="text-lg font-black text-emerald-950 uppercase tracking-tight mb-4">Hidratação Diária</h3>
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-emerald-100 shadow-inner">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg"
                aria-label="Contagem de copos: 5"
              >
                5
              </div>
              <span className="font-black text-emerald-900 uppercase text-sm tracking-widest">Copos de 8</span>
            </div>
            <button 
              aria-label="Adicionar um copo de água"
              className="bg-emerald-700 text-white p-3 rounded-2xl active:scale-90 transition-transform shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-emerald-900"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)
