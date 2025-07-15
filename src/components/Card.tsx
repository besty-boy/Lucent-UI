import React from 'react';
import { cn } from '../utils';
import { CardProps } from '../types';

export const Card: React.FC<CardProps> = ({ 
  variant = 'default',
  padding = 'md',
  corner,
  shadow = 'md',
  glow = false,
  className, 
  children, 
  ...props 
}) => {
  // Gérer le corner radius personnalisé
  const getCornerRadius = () => {
    if (corner !== undefined) {
      const radius = typeof corner === 'number' ? `${corner}px` : corner;
      return `rounded-[${radius}]`;
    }
    return 'rounded-[var(--border-radius)]';
  };

  // Gérer les ombres personnalisées
  const getShadow = () => {
    if (shadow === 'none') return '';
    if (shadow === 'glow') return 'shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)]';
    return `shadow-[var(--shadow-${shadow})] hover:shadow-[var(--shadow-${shadow === 'xl' ? 'xl' : 'lg'})]`;
  };

  // Gérer l'effet glow
  const getGlow = () => {
    if (!glow) return '';
    return 'drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)] hover:drop-shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.5)]';
  };

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  // Variant classes
  const variantClasses = {
    default: `
      bg-[var(--color-background)] dark:bg-[var(--color-backgroundDark)]
      border border-[var(--color-border)] dark:border-[var(--color-borderDark)]
    `,
    glass: `
      bg-white/10 dark:bg-black/20 backdrop-blur-lg
      border border-white/20 dark:border-white/10
    `,
    gradient: `
      border border-[var(--color-border)]/50 dark:border-[var(--color-borderDark)]/50
    `,
    outline: `
      bg-transparent border-2 border-[var(--color-border)] dark:border-[var(--color-borderDark)]
      hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surfaceDark)]
    `,
    elevated: `
      bg-[var(--color-surface)] dark:bg-[var(--color-surfaceDark)]
      border border-[var(--color-border)]/50 dark:border-[var(--color-borderDark)]/50
    `,
  };

  return (
    <div
      className={cn(
        'transition-all duration-[var(--animation-duration)]',
        getCornerRadius(),
        getShadow(),
        getGlow(),
        paddingClasses[padding],
        variantClasses[variant],
        'hover:-translate-y-1 hover:scale-[1.02]',
        className
      )}
      style={{
        background: variant === 'gradient' ? 'var(--gradient-primary)' : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
