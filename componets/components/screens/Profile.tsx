import { ChevronRight, Settings, HelpCircle, Bell, Shield, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  onAccessibilityClick: () => void;
  onSupportClick: () => void;
}

export function Profile({ onAccessibilityClick, onSupportClick }: ProfileProps) {
  const menuItems = [
    {
      icon: Settings,
      label: 'Configurações de Acessibilidade',
      onClick: onAccessibilityClick,
      color: 'var(--color-primary-main)'
    },
    {
      icon: Bell,
      label: 'Notificações',
      onClick: () => {},
      color: 'var(--color-accent-main)'
    },
    {
      icon: Shield,
      label: 'Privacidade e Segurança',
      onClick: () => {},
      color: 'var(--color-secondary-main)'
    },
    {
      icon: HelpCircle,
      label: 'Ajuda e Suporte',
      onClick: onSupportClick,
      color: 'var(--color-primary-main)'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[var(--color-primary-main)] to-[var(--color-primary-dark)] text-white">
        <div className="max-w-lg mx-auto p-6 pt-12 pb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4 overflow-hidden">
              <span className="text-5xl">👤</span>
            </div>
            <h2 className="mb-2">Maria da Silva</h2>
            <p className="text-white/80">maria.silva@email.com</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-lg mx-auto px-6 -mt-6 mb-6">
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-2)] p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[var(--color-primary-main)] text-[28px] mb-1">12</p>
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">Eventos</p>
            </div>
            <div className="border-l-2 border-r-2 border-[var(--color-neutral-200)]">
              <p className="text-[var(--color-primary-main)] text-[28px] mb-1">8</p>
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">Participados</p>
            </div>
            <div>
              <p className="text-[var(--color-primary-main)] text-[28px] mb-1">4</p>
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">Próximos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="max-w-lg mx-auto px-6">
        <h3 className="mb-4 text-[var(--color-neutral-900)]">Configurações</h3>
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                onClick={item.onClick}
                className={`
                  w-full flex items-center gap-4 p-4 text-left
                  hover:bg-[var(--color-neutral-50)] transition-colors
                  focus:outline-none focus:bg-[var(--color-primary-light)]
                  ${index !== menuItems.length - 1 ? 'border-b-2 border-[var(--color-neutral-100)]' : ''}
                `}
              >
                <div 
                  className="p-3 rounded-[var(--radius-s)]"
                  style={{ backgroundColor: item.color + '20' }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <span className="flex-1 text-[var(--color-neutral-900)]">{item.label}</span>
                <ChevronRight className="w-6 h-6 text-[var(--color-neutral-700)]" />
              </motion.button>
            );
          })}
        </div>

        {/* Logout button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 mt-6 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] text-[var(--color-error)] hover:bg-[var(--color-error-light)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--color-error)]/30"
        >
          <LogOut className="w-6 h-6" />
          <span>Sair da Conta</span>
        </motion.button>

        {/* App info */}
        <div className="text-center mt-8 text-[var(--color-neutral-700)] text-[var(--text-caption)]">
          <p>CONNECTA SENIOR v1.0.0</p>
          <p className="mt-1">Prefeitura Municipal</p>
        </div>
      </div>
    </div>
  );
}
