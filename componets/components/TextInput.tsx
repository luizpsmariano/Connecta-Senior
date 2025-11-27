import { InputHTMLAttributes, forwardRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-[var(--color-neutral-900)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full min-h-[56px] px-4 rounded-[var(--radius-m)]
            bg-[var(--input-background)] text-[var(--color-neutral-900)]
            border-2 ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-neutral-300)]'}
            focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30
            focus:border-[var(--color-primary-main)]
            disabled:bg-[var(--color-neutral-200)] disabled:text-[var(--color-neutral-700)]
            transition-all duration-300
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-[var(--color-error)] text-[var(--text-caption)]">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-[var(--color-neutral-700)] text-[var(--text-caption)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
