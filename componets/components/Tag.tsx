interface TagProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
}

export function Tag({ children, variant = 'primary' }: TagProps) {
  const variants = {
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary-main)]',
    secondary: 'bg-[var(--color-secondary-light)] text-[var(--color-secondary-main)]',
    accent: 'bg-[var(--color-accent-light)] text-[var(--color-accent-main)]'
  };

  return (
    <span className={`
      inline-block px-3 py-1.5 rounded-full text-[var(--text-caption)]
      ${variants[variant]}
    `}>
      {children}
    </span>
  );
}
