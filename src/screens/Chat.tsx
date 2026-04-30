import React from 'react';
import { motion } from 'motion/react';
import { Search, Plus } from 'lucide-react';
import { MOCK_MESSAGES } from '../constants';

export const Chat: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <label htmlFor="contact-search" className="sr-only">Procurar contatos</label>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={20} aria-hidden="true" />
        <input 
          id="contact-search"
          type="text" 
          placeholder="Procurar contatos..." 
          className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-primary outline-none text-lg shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">Conversas Recentes</h3>
        <div role="list" className="space-y-3">
          {MOCK_MESSAGES.map((msg, index) => (
            <motion.button 
              key={msg.id}
              role="listitem"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              aria-label={`Conversa com ${msg.senderName}. Última mensagem: ${msg.lastMessage}`}
              className="w-full bg-white p-4 rounded-[32px] flex items-center space-x-4 border border-gray-100 shadow-sm active:bg-gray-50 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <div className="relative">
                <img 
                  src={msg.senderAvatar} 
                  alt="" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-primary/10"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" 
                  aria-label="Online"
                  role="status"
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-lg text-slate-900 tracking-tight">{msg.senderName}</h4>
                  <span className="text-xs text-slate-500 font-bold">{msg.time}</span>
                </div>
                <p className="text-slate-600 text-sm truncate font-medium">{msg.lastMessage}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <button 
        aria-label="Iniciar nova conversa"
        className="fixed bottom-28 right-8 w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform z-30 outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30"
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
};
