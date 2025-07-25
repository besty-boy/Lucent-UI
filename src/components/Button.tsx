import React, { forwardRef } from 'react';
import { ComponentProps } from '../types';
import { cn } from '../utils';
import { Loader2 } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

interface ButtonProps extends ComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  pressed?: boolean;
  expanded?: boolean;
  controls?: string;
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
  ariaLabel,
  ariaDescribedBy,
  hasPopup,
  pressed,
  expanded,
  controls,
  ...props
}, ref) => {
  const [styles, setStyles] = React.useState<React.CSSProperties>({});
  const { ariaUtils, announce, preferences } = useAccessibility();
  
  // Generate accessible button label
  const buttonLabel = ariaLabel || (typeof children === 'string' ? children : 'Button');
  
  // Get ARIA attributes
  const ariaAttributes = ariaUtils.getButtonAttributes(buttonLabel, {
    disabled: disabled || loading,
    pressed,
    expanded,
    hasPopup,
    controls,
    describedBy: ariaDescribedBy
  });

  React.useEffect(() => {
    const newStyles: React.CSSProperties = {};

    if (corner !== undefined) {
      newStyles.borderRadius = typeof corner === 'number' ? `${corner}px` : corner;
    } else {
      newStyles.borderRadius = 'var(--border-radius)';
    }

    setStyles(newStyles);
  }, [corner]);

  const getShadow = () => {
    if (shadow === 'none') return '';
    if (shadow === 'glow') return 'shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)]';
    return `shadow-[var(--shadow-${shadow})] hover:shadow-[var(--shadow-${shadow === 'xl' ? 'xl' : 'lg'})]`;
  };

  const getGlow = () => {
    if (!glow) return '';
    const glowColorVar = variant === 'secondary' ? 'var(--color-secondary-rgb)' : 'var(--color-primary-rgb)';
    return `drop-shadow-[0_0_12px_rgba(${glowColorVar},0.3)] hover:drop-shadow-[0_0_20px_rgba(${glowColorVar},0.5)]`;
  };

  // Handle button click with announcement
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    
    // Announce state changes for screen readers
    if (pressed !== undefined) {
      announce(`Button ${pressed ? 'pressed' : 'not pressed'}`);
    }
    
    props.onClick?.(event);
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-md
    transition-all duration-[var(--animation-duration)] ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
    active:scale-95
    ${getShadow()} ${getGlow()}
    ${preferences.prefersReducedMotion ? 'transition-none transform-none' : ''}
  `;

  const variants = {
    primary: `
      bg-[var(--color-primary)] text-white
      hover:bg-[var(--color-primaryDark)] focus:ring-[var(--color-primary)]
    `,
    secondary: `
      bg-[var(--color-secondary)] text-white
      hover:bg-[var(--color-secondaryDark)] focus:ring-[var(--color-secondary)]
    `,
    outline: `
      border-2 border-[var(--current-border)]
      text-[var(--current-text)]
      hover:border-[var(--color-primary)] hover:bg-[var(--current-surface)]
      focus:ring-[var(--color-primary)]
    `,
    ghost: `
      bg-transparent text-[var(--current-text)]
      hover:bg-[var(--current-surface)]
      focus:ring-[var(--color-primary)]
    `,
    gradient: `
      bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]
      text-white focus:ring-[var(--color-primary)]
    `,
    glass: `
      bg-white/10 backdrop-blur-md border border-white/20 text-white
      hover:bg-white/20 focus:ring-white/50
    `,
    success: `
      bg-green-500 text-white hover:bg-green-600 focus:ring-green-400
    `,
    warning: `
      bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-yellow-300
    `,
    destructive: `
      bg-red-500 text-white hover:bg-red-600 focus:ring-red-400
    `,
  };

  const sizes = {
    xs: 'text-xs px-3 py-1.5',
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
    xl: 'text-base px-7 py-3.5'
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
      onClick={handleClick}
      {...ariaAttributes}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
