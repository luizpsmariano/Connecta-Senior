import React from 'react';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-primary p-8 text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl overflow-hidden">
           <img 
            src="https://picsum.photos/seed/connecta/200/200" 
            alt="Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <h1 className="font-display text-4xl font-bold mb-4 tracking-tight">Connecta Senior</h1>
        <p className="text-white/80 text-lg mb-12 leading-relaxed">
          Viva melhor, conectado com sua comunidade e amigos em Pinhais.
        </p>

        <button 
          onClick={onStart}
          className="w-full bg-white text-brand-primary py-7 px-10 rounded-[40px] font-black uppercase tracking-widest text-xl flex items-center justify-center space-x-4 shadow-2xl active:scale-95 transition-transform border-b-8 border-indigo-100 active:border-b-0 active:translate-y-2"
        >
          <span>Acessar o Connecta</span>
          <LogIn size={32} strokeWidth={3} />
        </button>

        <p className="mt-8 text-white/60 text-sm italic">
          Feito com carinho para a Melhor Idade
        </p>
      </motion.div>
    </div>
  );
};
