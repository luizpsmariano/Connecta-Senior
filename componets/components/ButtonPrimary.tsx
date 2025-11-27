import { ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export function ButtonPrimary({ 
  children, 
  fullWidth = false, 
  loading = false,
  disabled,
  className = '',
  ...props 
}: ButtonPrimaryProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.2 }}
      disabled={disabled || loading}
      className={`
        min-h-[56px] px-6 rounded-[var(--radius-m)]
        bg-[var(--color-primary-main)] text-white
        hover:bg-[var(--color-primary-dark)]
        active:bg-[var(--color-primary-dark)]
        disabled:bg-[var(--color-neutral-300)] disabled:text-[var(--color-neutral-700)]
        shadow-[var(--elevation-1)]
        transition-colors duration-300
        focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
          Carregando...
        </span>
      ) : children}
    </motion.button>
  );
}
