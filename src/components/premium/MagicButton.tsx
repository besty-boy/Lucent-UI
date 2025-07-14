import React, { useState, useRef } from 'react';

export interface MagicButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'magic' | 'neon' | 'holographic';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  effect?: 'ripple' | 'glow' | 'shimmer' | 'particle' | 'morphism' | 'aurora';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

export const MagicButton: React.FC<MagicButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  effect = 'ripple',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);

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

  const getSizeClasses = () => {
    const sizes = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    };
    return sizes[size];
  };

  const getVariantClasses = () => {
    const base = `
      rounded-[var(--border-radius)] font-medium transition-all duration-[var(--animation-duration)]
      focus:outline-none focus:ring-2 focus:ring-offset-2 
      transform active:scale-95 relative overflow-hidden
    `;

    const variants = {
      primary: `
        bg-[var(--color-primary)] hover:bg-[var(--color-primaryDark)]
        text-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
        focus:ring-[var(--color-primary)]/50
      `,
      secondary: `
        bg-[var(--color-secondary)] hover:bg-[var(--color-secondaryDark)]
        text-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
        focus:ring-[var(--color-secondary)]/50
      `,
      ghost: `
        bg-transparent hover:bg-[var(--color-primary)]/10
        text-[var(--color-primary)] hover:text-[var(--color-primaryDark)]
        focus:ring-[var(--color-primary)]/30
      `,
      outline: `
        bg-transparent border-2 border-[var(--color-primary)]
        text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white
        focus:ring-[var(--color-primary)]/50
      `,
      magic: `
        bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]
        text-white shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)]
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
      `,
      neon: `
        bg-transparent border-2 border-[var(--color-primary)]
        text-[var(--color-primary)] shadow-[0_0_20px_var(--color-primary)]
        hover:shadow-[0_0_30px_var(--color-primary)] hover:bg-[var(--color-primary)]/10
      `,
      holographic: `
        bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
        text-white relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000
      `
    };

    return base + variants[variant];
  };

  const getEffectElements = () => {
    switch (effect) {
      case 'particle':
        return isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        );
      
      case 'aurora':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-0 hover:opacity-20 transition-opacity duration-500" />
        );
      
      case 'morphism':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm" />
        );
      
      default:
        return null;
    }
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed transform-none' : '';
  const loadingClasses = loading ? 'cursor-wait' : '';
  const fullWidthClasses = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={buttonRef}
      className={`
        ${getSizeClasses()}
        ${getVariantClasses()}
        ${disabledClasses}
        ${loadingClasses}
        ${fullWidthClasses}
        ${className}
      `.trim()}
      disabled={disabled || loading}
      onClick={createRipple}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ripple Effects */}
      {effect === 'ripple' && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {/* Special Effects */}
      {getEffectElements()}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Button Content */}
      <span className={`relative z-10 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>

      {/* Shimmer Effect */}
      {(effect === 'shimmer' || variant === 'magic') && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </button>
  );
};