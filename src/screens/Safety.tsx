import React from 'react';
import { motion } from 'motion/react';
import { Shield, Phone, AlertTriangle, Lock, ChevronRight, ExternalLink } from 'lucide-react';

export const Safety: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
      <header className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Segurança</h2>
        <p className="text-brand-muted font-bold">Dicas e contatos para cuidar de você.</p>
      </header>

      {/* Emergency Contacts Section */}
      <section className="bg-red-50 border-2 border-red-100 rounded-[40px] p-6 shadow-lg shadow-red-50/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-600 text-white rounded-2xl">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-red-900 uppercase tracking-tight">Contatos de Emergência</h3>
            <p className="text-xs font-bold text-red-700 uppercase tracking-widest">Ligue imediatamente se precisar</p>
          </div>
        </div>

        <div className="space-y-3">
          <EmergencyContact 
            number="192" 
            label="SAMU" 
            description="Emergências Médicas" 
          />
          <EmergencyContact 
            number="190" 
            label="Polícia Militar" 
            description="Segurança Pública" 
          />
          <EmergencyContact 
            number="193" 
            label="Bombeiros" 
            description="Fogo ou Acidentes" 
          />
        </div>
      </section>

      {/* Fall Prevention Section */}
      <section className="bg-white border-2 border-slate-50 rounded-[40px] p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Prevenção de Quedas</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mantenha sua casa segura</p>
          </div>
        </div>

        <div className="space-y-4">
          <SafetyTip 
            title="Iluminação é tudo" 
            text="Mantenha corredores e banheiros sempre bem iluminados, especialmente à noite."
          />
          <SafetyTip 
            title="Cuidado com tapetes" 
            text="Evite tapetes soltos. Se usar, certifique-se de que tenham antiderrapante."
          />
          <SafetyTip 
            title="Calçados firmes" 
            text="Prefira calçados com solado de borracha e que fiquem bem presos aos pés."
          />
          <SafetyTip 
            title="Barras de apoio" 
            text="Considere instalar barras de apoio no box do chuveiro e perto do vaso sanitário."
          />
        </div>
      </section>

      {/* Online Safety Section */}
      <section className="bg-indigo-50 border-2 border-indigo-100 rounded-[40px] p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl">
            <Lock size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-indigo-900 uppercase tracking-tight">Segurança Digital</h3>
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Proteja-se na internet</p>
          </div>
        </div>

        <div className="space-y-4">
          <SafetyTip 
            title="Desconfie de prêmios" 
            text="Se receber mensagens sobre prêmios que você não ganhou, não clique em links."
            theme="indigo"
          />
          <SafetyTip 
            title="Senhas fortes" 
            text="Não use a mesma senha para tudo e evite datas de aniversário óbvias."
            theme="indigo"
          />
          <SafetyTip 
            title="Dados bancários" 
            text="O banco nunca pede sua senha por telefone ou WhatsApp. Nunca a forneça."
            theme="indigo"
          />
        </div>
      </section>

      {/* Helpful Links */}
      <div className="bg-slate-900 text-white p-8 rounded-[40px] space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="text-brand-primary" size={24} />
          <h4 className="text-sm font-black uppercase tracking-widest italic">Guia do Idoso Pinhais</h4>
        </div>
        <p className="text-slate-400 font-bold leading-relaxed">
          Para informações detalhadas sobre serviços municipais e seus direitos, acesse o portal oficial.
        </p>
        <button className="w-full py-4 bg-brand-primary rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs active:scale-95 transition-transform outline-none focus-visible:ring-4 focus-visible:ring-indigo-400">
          Acessar Portal <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

const EmergencyContact: React.FC<{ number: string; label: string; description: string }> = ({ number, label, description }) => (
  <button 
    onClick={() => window.open(`tel:${number}`)}
    className="w-full bg-white p-4 rounded-3xl flex items-center justify-between border-2 border-transparent active:border-red-200 transition-all group"
  >
    <div className="flex items-center gap-4">
      <div className="text-2xl font-black text-red-600 w-12">{number}</div>
      <div className="text-left">
        <h4 className="font-black text-slate-900 uppercase tracking-tight leading-none">{label}</h4>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{description}</p>
      </div>
    </div>
    <ChevronRight className="text-slate-300 group-active:text-red-600 transition-colors" size={20} />
  </button>
);

const SafetyTip: React.FC<{ title: string; text: string; theme?: 'amber' | 'indigo' }> = ({ title, text, theme = 'amber' }) => (
  <div className="flex gap-4">
    <div className={`w-1.5 rounded-full flex-shrink-0 ${theme === 'amber' ? 'bg-amber-400' : 'bg-indigo-400'}`} />
    <div>
      <h5 className="font-black text-slate-900 text-sm uppercase tracking-tight">{title}</h5>
      <p className="text-slate-600 font-bold text-xs mt-1 leading-relaxed">{text}</p>
    </div>
  </div>
);
