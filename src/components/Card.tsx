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
  // Responsive padding
  const responsivePadding = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6 md:p-8',
    lg: 'p-6 sm:p-8 md:p-10 lg:p-12',
    xl: 'p-8 sm:p-10 md:p-12 lg:p-16',
  };

  const getCornerRadius = () => {
    if (corner !== undefined) {
      const radius = typeof corner === 'number' ? `${corner}px` : corner;
      return `rounded-[${radius}]`;
    }
    return 'rounded-xl sm:rounded-2xl';
  };

  const getShadow = () => {
    if (shadow === 'none') return '';
    if (shadow === 'glow') return 'shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl';
    return `shadow-${shadow} md:hover:shadow-${shadow === 'xl' ? 'xl' : 'lg'}`;
  };

  const getGlow = () => {
    if (!glow) return '';
    return `
      drop-shadow-sm md:drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.25)]
      md:hover:drop-shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.45)]
    `;
  };

  const variantClasses = {
    default: `
      bg-[var(--color-background)] dark:bg-[var(--color-backgroundDark)]
      border border-[var(--color-border)] dark:border-[var(--color-borderDark)]
    `,
    glass: `
      bg-white/10 dark:bg-black/20 backdrop-blur-md md:backdrop-blur-lg
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
        responsivePadding[padding],
        variantClasses[variant],
        'md:hover:-translate-y-1 md:hover:scale-[1.02]',
        'w-full max-w-full sm:max-w-[90%] md:max-w-[720px] xl:max-w-[960px]',
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
