import React, { useState, useRef, useEffect, CSSProperties } from 'react';

export interface PureButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
}

export const PureButton: React.FC<PureButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick
}) => {
  // const theme = useTheme(); // Réservé pour usage futur
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent) => {
    if (!buttonRef.current || disabled || loading) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now().toString();

    setRipples(prev => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);

    onClick?.();
  };

  const getBaseStyles = (): CSSProperties => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'inherit',
    fontWeight: 500,
    textDecoration: 'none',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    borderRadius: 'var(--radius-lg)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    userSelect: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    ...getSizeStyles(),
    ...getVariantStyles(),
  });

  const getSizeStyles = (): CSSProperties => {
    const sizes = {
      xs: { padding: '0.375rem 0.75rem', fontSize: '0.75rem', minHeight: '1.75rem' },
      sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', minHeight: '2rem' },
      md: { padding: '0.625rem 1.25rem', fontSize: '0.875rem', minHeight: '2.5rem' },
      lg: { padding: '0.75rem 1.5rem', fontSize: '1rem', minHeight: '3rem' },
      xl: { padding: '1rem 2rem', fontSize: '1.125rem', minHeight: '3.5rem' }
    };
    return sizes[size];
  };

  const getVariantStyles = (): CSSProperties => {
    const variants = {
      primary: {
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        boxShadow: isHovered 
          ? '0 8px 25px -8px var(--color-primary), 0 0 0 1px var(--color-primary)' 
          : '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
      secondary: {
        backgroundColor: 'var(--color-secondary)',
        color: 'white',
        boxShadow: isHovered 
          ? '0 8px 25px -8px var(--color-secondary)' 
          : '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      },
      ghost: {
        backgroundColor: isHovered ? 'var(--color-surface)' : 'transparent',
        color: 'var(--color-text)',
        border: 'none',
      },
      outline: {
        backgroundColor: isHovered ? 'var(--color-primary)' : 'transparent',
        color: isHovered ? 'white' : 'var(--color-primary)',
        border: '2px solid var(--color-primary)',
      },
      gradient: {
        background: 'var(--gradient-primary)',
        color: 'white',
        boxShadow: isHovered 
          ? '0 12px 40px -8px var(--color-primary)' 
          : '0 4px 14px -2px rgba(0, 0, 0, 0.2)',
      },
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'var(--color-text)',
        boxShadow: isHovered 
          ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
          : '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    };
    return variants[variant];
  };

  const rippleStyles = (ripple: { x: number; y: number }): CSSProperties => ({
    position: 'absolute',
    left: ripple.x - 10,
    top: ripple.y - 10,
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    animation: 'ripple 0.6s ease-out forwards',
    pointerEvents: 'none',
  });

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      style={getBaseStyles()}
      className={className}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={createRipple}
    >
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <span key={ripple.id} style={rippleStyles(ripple)} />
      ))}

      {/* Loading Spinner */}
      {loading && (
        <div style={{
          position: 'absolute',
          width: '1rem',
          height: '1rem',
          border: '2px solid transparent',
          borderTop: '2px solid currentColor',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}

      {/* Content */}
      <span style={{ 
        opacity: loading ? 0 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>

      {/* Subtle shine effect */}
      {(variant === 'primary' || variant === 'gradient') && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: isHovered ? 'translateX(200%)' : 'translateX(0)',
          transition: 'transform 0.6s ease',
        }} />
      )}
    </button>
  );
};

// Add global spinner animation
const addSpinnerAnimation = () => {
  if (!document.querySelector('#lucent-spinner-animation')) {
    const style = document.createElement('style');
    style.id = 'lucent-spinner-animation';
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
};

// Call this when component mounts
addSpinnerAnimation();