import React from 'react';
import { cn } from '../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
  variant?: 'default' | 'premium' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({ 
  hover = true, 
  glass = false, 
  gradient = false,
  variant = 'default',
  size = 'md',
  className, 
  children, 
  ...props 
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  // Variant classes (override glass/gradient props if variant is set)
  const variantClasses = {
    default: `
      bg-[var(--color-background)] dark:bg-[var(--color-backgroundDark)]
      shadow-[var(--shadow-md)] border border-[var(--color-border)] dark:border-[var(--color-borderDark)]
    `,
    premium: `
      bg-[var(--color-surface)] dark:bg-[var(--color-surfaceDark)]
      shadow-[var(--shadow-xl)] border border-[var(--color-border)]/50 dark:border-[var(--color-borderDark)]/50
    `,
    glass: `
      bg-white/10 dark:bg-black/20 backdrop-blur-lg
      border border-white/20 dark:border-white/10 shadow-[var(--shadow-lg)]
    `,
    gradient: `
      shadow-[var(--shadow-xl)] border border-[var(--color-border)]/50 dark:border-[var(--color-borderDark)]/50
    `,
  };

  // Determine final variant
  const finalVariant = glass ? 'glass' : gradient ? 'gradient' : variant;

  return (
    <div
      className={cn(
        'transition-all duration-[var(--animation-duration)] rounded-[var(--border-radius)]',
        sizeClasses[size],
        variantClasses[finalVariant],
        hover && 'hover:shadow-[var(--shadow-xl)] hover:-translate-y-1 hover:scale-[1.02]',
        className
      )}
      style={{
        background: finalVariant === 'gradient' ? 'var(--gradient-primary)' : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
