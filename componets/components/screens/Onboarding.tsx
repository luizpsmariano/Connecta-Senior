import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Heart, Calendar, Users } from 'lucide-react';
import { ButtonPrimary } from '../ButtonPrimary';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Heart,
    title: 'Bem-vindo ao CONNECTA SENIOR',
    description: 'Seu novo companheiro para descobrir atividades, eventos e informações da sua cidade.',
    color: 'var(--color-primary-main)'
  },
  {
    icon: Calendar,
    title: 'Descubra Eventos',
    description: 'Encontre facilmente atividades físicas, culturais e sociais próximas a você.',
    color: 'var(--color-secondary-main)'
  },
  {
    icon: Users,
    title: 'Conecte-se',
    description: 'Participe de grupos, faça novos amigos e mantenha-se ativo na comunidade.',
    color: 'var(--color-accent-main)'
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };
  
  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-primary-light)] to-white flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <button
          onClick={handleSkip}
          className="text-[var(--color-primary-main)] min-h-[48px] px-4 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30 rounded-[var(--radius-s)]"
        >
          Pular
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="w-32 h-32 rounded-full flex items-center justify-center mb-8"
              style={{ backgroundColor: slide.color + '20' }}
            >
              <Icon className="w-16 h-16" style={{ color: slide.color }} />
            </motion.div>

            {/* Title */}
            <h1 className="mb-6 text-[var(--color-neutral-900)] max-w-md">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-[var(--color-neutral-700)] max-w-md text-[var(--text-body-large)]">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex gap-3 mt-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`
                h-3 rounded-full transition-all duration-300
                ${index === currentSlide 
                  ? 'w-8 bg-[var(--color-primary-main)]' 
                  : 'w-3 bg-[var(--color-neutral-300)]'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Bottom button */}
      <div className="p-6">
        <ButtonPrimary onClick={handleNext} fullWidth>
          <span className="flex items-center justify-center gap-2">
            {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
            <ChevronRight className="w-6 h-6" />
          </span>
        </ButtonPrimary>
      </div>
    </div>
  );
}
