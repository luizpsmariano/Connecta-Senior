import { ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface ButtonSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function ButtonSecondary({ 
  children, 
  fullWidth = false, 
  disabled,
  className = '',
  ...props 
}: ButtonSecondaryProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.2 }}
      disabled={disabled}
      className={`
        min-h-[56px] px-6 rounded-[var(--radius-m)]
        bg-[var(--color-secondary-light)] text-[var(--color-primary-main)]
        border-2 border-[var(--color-primary-main)]
        hover:bg-[var(--color-primary-light)]
        active:bg-[var(--color-primary-light)]
        disabled:bg-[var(--color-neutral-200)] disabled:text-[var(--color-neutral-700)] disabled:border-[var(--color-neutral-300)]
        transition-colors duration-300
        focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
