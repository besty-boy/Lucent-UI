import React, { forwardRef } from 'react';
import { ComponentProps } from '../types';
import { cn } from '../utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  corner,
  shadow = 'md',
  glow = false,
  className,
  children,
  ...props
}, ref) => {
  // Gérer le corner radius personnalisé
  const getCornerRadius = () => {
    if (corner !== undefined) {
      // Si c'est un nombre, ajouter 'px', sinon utiliser tel quel
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
    return 'drop-shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:drop-shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.6)]';
  };

  const baseStyles = `inline-flex items-center justify-center font-medium transition-all duration-[var(--animation-duration)] focus:outline-none focus:ring-2 focus:ring-offset-2 ${getCornerRadius()} ${getShadow()} ${getGlow()}`;
  
  const variants = {
    primary: `
      bg-[var(--color-primary)] hover:bg-[var(--color-primaryDark)]
      text-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
      focus:ring-[var(--color-primary)] hover:scale-105 active:scale-95
    `,
    secondary: `
      bg-[var(--color-secondary)] hover:bg-[var(--color-secondaryDark)]
      text-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
      focus:ring-[var(--color-secondary)] hover:scale-105 active:scale-95
    `,
    ghost: `
      hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surfaceDark)]
      text-[var(--color-text)] dark:text-[var(--color-textDark)]
      focus:ring-[var(--color-primary)] border border-transparent
      hover:border-[var(--color-border)] dark:hover:border-[var(--color-borderDark)]
    `,
    outline: `
      border-2 border-[var(--color-border)] dark:border-[var(--color-borderDark)]
      hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surfaceDark)]
      text-[var(--color-text)] dark:text-[var(--color-textDark)]
      hover:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
    `
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-base'
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
