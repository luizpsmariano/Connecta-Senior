import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, Mail, Phone, MapPin, Hash, CreditCard, ChevronRight, ArrowLeft, Info } from 'lucide-react';
import { Screen, UserProfile } from '../types';

interface AuthProps {
  onLogin: (user: Partial<UserProfile>) => void;
  onScreenChange: (screen: Screen) => void;
  initialMode: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onScreenChange, initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <Login key="login" onLogin={onLogin} onToggleMode={() => setMode('signup')} />
        ) : (
          <SignUp key="signup" onSignUp={onLogin} onToggleMode={() => setMode('login')} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Login: React.FC<{ onLogin: (user: any) => void; onToggleMode: () => void }> = ({ onLogin, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: 'Usuário', email });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex-1 flex flex-col p-8 pt-20"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-4">
          Bem-vindo de <br/><span className="text-brand-primary">Volta!</span>
        </h1>
        <p className="text-brand-muted font-bold">Faça login para continuar sua jornada.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
            <input 
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full bg-white border-2 border-slate-100 rounded-[32px] py-6 pl-16 pr-8 focus:border-brand-primary outline-none font-bold text-xl transition-all shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Senha</label>
          <div className="relative">
            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
            <input 
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-white border-2 border-slate-100 rounded-[32px] py-6 pl-16 pr-8 focus:border-brand-primary outline-none font-bold text-xl transition-all shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-6 bg-brand-primary text-white rounded-[32px] font-black uppercase tracking-widest text-lg shadow-xl shadow-indigo-100 active:scale-95 transition-transform flex items-center justify-center gap-3 mt-8 border-b-4 border-indigo-700"
        >
          Entrar Agora <ChevronRight size={24} />
        </button>
      </form>

      <div className="mt-auto text-center pb-8">
        <p className="text-slate-400 font-bold">Não tem uma conta?</p>
        <button 
          onClick={onToggleMode}
          className="text-brand-primary font-black uppercase tracking-widest text-sm mt-2 hover:underline"
        >
          Criar conta gratuita
        </button>
      </div>
    </motion.div>
  );
};

const SignUp: React.FC<{ onSignUp: (user: any) => void; onToggleMode: () => void }> = ({ onSignUp, onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    addressNumber: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    phone: '',
    cpf: '',
    rg: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp({ ...formData });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-8 pt-12 overflow-y-auto"
    >
      <button 
        onClick={onToggleMode}
        className="self-start p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-8"
      >
        <ArrowLeft size={24} className="text-slate-900" />
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3">
          Crie sua <br/><span className="text-brand-primary">Conta</span>
        </h1>
        <p className="text-brand-muted font-bold">Junte-se à nossa comunidade hoje.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pb-12">
        <AuthInput 
          icon={<User className="text-slate-300" size={24} />} 
          label="Nome Completo" 
          placeholder="Ex: Maria Oliveira"
          value={formData.name}
          onChange={(v) => updateField('name', v)}
        />
        
        <AuthInput 
          icon={<MapPin className="text-slate-300" size={24} />} 
          label="Logradouro" 
          placeholder="Ex: Rua das Flores"
          value={formData.address}
          onChange={(v) => updateField('address', v)}
        />

        <div className="flex gap-4">
          <AuthInput 
            icon={<Hash className="text-slate-300" size={24} />} 
            label="Número" 
            placeholder="123"
            value={formData.addressNumber}
            onChange={(v) => updateField('addressNumber', v)}
            className="flex-1"
          />
          <AuthInput 
            icon={<Info className="text-slate-300" size={24} />} 
            label="Complemento" 
            placeholder="Apto, Bloco, etc"
            value={formData.complement}
            onChange={(v) => updateField('complement', v)}
            className="flex-1"
          />
        </div>

        <div className="flex gap-4">
          <AuthInput 
            icon={<MapPin className="text-slate-300" size={24} />} 
            label="Bairro" 
            placeholder="Ex: Centro"
            value={formData.neighborhood}
            onChange={(v) => updateField('neighborhood', v)}
            className="flex-1"
          />
          <AuthInput 
            icon={<Hash className="text-slate-300" size={24} />} 
            label="CEP" 
            placeholder="00000-000"
            value={formData.cep}
            onChange={(v) => updateField('cep', v)}
            className="flex-1"
          />
        </div>

        <div className="flex gap-4">
          <AuthInput 
            icon={<MapPin className="text-slate-300" size={24} />} 
            label="Cidade" 
            placeholder="Ex: Pinhais"
            value={formData.city}
            onChange={(v) => updateField('city', v)}
            className="flex-1"
          />
          <AuthInput 
            icon={<MapPin className="text-slate-300" size={24} />} 
            label="Estado" 
            placeholder="PR"
            value={formData.state}
            onChange={(v) => updateField('state', v)}
            className="w-1/3"
          />
        </div>

        <AuthInput 
          icon={<Phone className="text-slate-300" size={24} />} 
          label="Telefone" 
          placeholder="(41) 99999-9999"
          value={formData.phone}
          onChange={(v) => updateField('phone', v)}
        />

        <div className="flex gap-4">
          <AuthInput 
            icon={<CreditCard className="text-slate-300" size={24} />} 
            label="CPF" 
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(v) => updateField('cpf', v)}
            className="flex-1"
          />
          <AuthInput 
            icon={<CreditCard className="text-slate-300" size={24} />} 
            label="RG" 
            placeholder="0.000.000-0"
            value={formData.rg}
            onChange={(v) => updateField('rg', v)}
            className="flex-1"
          />
        </div>

        <AuthInput 
          icon={<Mail className="text-slate-300" size={24} />} 
          label="E-mail" 
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(v) => updateField('email', v)}
        />

        <AuthInput 
          icon={<Lock className="text-slate-300" size={24} />} 
          label="Senha" 
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(v) => updateField('password', v)}
        />

        <button 
          type="submit"
          className="w-full py-6 bg-brand-primary text-white rounded-[32px] font-black uppercase tracking-widest text-lg shadow-xl shadow-indigo-100 active:scale-95 transition-transform flex items-center justify-center gap-3 mt-4 border-b-4 border-indigo-700"
        >
          Cadastrar Agora <ChevronRight size={24} />
        </button>
      </form>
    </motion.div>
  );
};

const AuthInput: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  placeholder: string; 
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}> = ({ icon, label, placeholder, value, onChange, type = 'text', className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    <label className="text-sm font-black uppercase tracking-widest text-slate-900 ml-4">{label}</label>
    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 scale-110">{icon}</div>
      <input 
        type={type}
        required
        placeholder={placeholder}
        className="w-full bg-white border-4 border-slate-100 rounded-[32px] py-6 pl-16 pr-8 focus:border-brand-primary outline-none font-bold text-xl transition-all shadow-sm focus:shadow-xl placeholder:text-slate-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);
