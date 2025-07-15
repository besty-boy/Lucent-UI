import React, { forwardRef } from 'react';
import { ComponentProps } from '../types';
import { cn } from '../utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  const [styles, setStyles] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    const newStyles: React.CSSProperties = {};

    // Gérer le corner radius personnalisé
    if (corner !== undefined) {
      newStyles.borderRadius = typeof corner === 'number' ? `${corner}px` : corner;
    } else {
      newStyles.borderRadius = 'var(--border-radius)';
    }

    setStyles(newStyles);
  }, [corner]);

  // Gérer les ombres personnalisées
  const getShadow = () => {
    if (shadow === 'none') return '';
    if (shadow === 'glow') return 'shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)]';
    return `shadow-[var(--shadow-${shadow})] hover:shadow-[var(--shadow-${shadow === 'xl' ? 'xl' : 'lg'})]`;
  };

  // Gérer l'effet glow
  const getGlow = () => {
    if (!glow) return '';
    const glowColorVar = variant === 'secondary' ? 'var(--color-secondary-rgb)' : 'var(--color-primary-rgb)';
    return `drop-shadow-[0_0_15px_rgba(${glowColorVar},0.3)] hover:drop-shadow-[0_0_25px_rgba(${glowColorVar},0.5)]`;
  };

  const baseStyles = `inline-flex items-center justify-center font-medium transition-all duration-[var(--animation-duration)] focus:outline-none focus:ring-2 focus:ring-offset-2 ${getShadow()} ${getGlow()}`;
  
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
    `,
    gradient: `
      bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]
      text-white shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)]
      focus:ring-[var(--color-primary)] hover:scale-105 active:scale-95
    `,
    glass: `
      bg-white/10 backdrop-blur-md border border-white/20
      text-white
      shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)]
      focus:ring-white/50 hover:bg-white/20
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
      style={styles}
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
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
