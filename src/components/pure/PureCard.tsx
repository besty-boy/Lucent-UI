import React, { useState, CSSProperties } from 'react';

export interface PureCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'minimal' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const PureCard: React.FC<PureCardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  padding = 'md',
  interactive = false,
  className = '',
  onClick
}) => {
  // const theme = useTheme(); // Réservé pour usage futur
  const [isHovered, setIsHovered] = useState(false);

  const getBaseStyles = (): CSSProperties => ({
    position: 'relative',
    borderRadius: 'var(--radius-xl)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: interactive ? 'pointer' : 'default',
    overflow: 'hidden',
    ...getSizeStyles(),
    ...getPaddingStyles(),
    ...getVariantStyles(),
    ...(interactive && getInteractiveStyles()),
  });

  const getSizeStyles = (): CSSProperties => {
    const sizes = {
      sm: { maxWidth: '20rem' },
      md: { maxWidth: '28rem' },
      lg: { maxWidth: '36rem' },
      xl: { maxWidth: '48rem' }
    };
    return sizes[size];
  };

  const getPaddingStyles = (): CSSProperties => {
    const paddings = {
      none: { padding: 0 },
      sm: { padding: '1rem' },
      md: { padding: '1.5rem' },
      lg: { padding: '2rem' },
      xl: { padding: '3rem' }
    };
    return paddings[padding];
  };

  const getVariantStyles = (): CSSProperties => {
    const variants = {
      default: {
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      elevated: {
        backgroundColor: 'var(--color-surface)',
        border: 'none',
        boxShadow: isHovered 
          ? '0 20px 40px -8px rgba(0, 0, 0, 0.2)' 
          : '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isHovered 
          ? '0 12px 32px rgba(0, 0, 0, 0.3)' 
          : '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
      gradient: {
        background: 'var(--gradient-background)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      minimal: {
        backgroundColor: 'transparent',
        border: '1px solid var(--color-border)',
        boxShadow: 'none',
      },
      premium: {
        backgroundColor: 'var(--color-surface)',
        border: '2px solid var(--color-primary)',
        boxShadow: isHovered 
          ? '0 16px 48px -8px var(--color-primary)' 
          : '0 8px 24px -4px rgba(0, 0, 0, 0.1)',
        backgroundImage: 'linear-gradient(145deg, var(--color-surface) 0%, rgba(255,255,255,0.05) 100%)',
      }
    };
    return variants[variant];
  };

  const getInteractiveStyles = (): CSSProperties => ({
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  });

  return (
    <div
      style={getBaseStyles()}
      className={className}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onClick={onClick}
    >
      {/* Premium variant shine effect */}
      {variant === 'premium' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-50%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: isHovered ? 'translateX(300%)' : 'translateX(0)',
          transition: 'transform 0.8s ease',
          pointerEvents: 'none',
        }} />
      )}

      {/* Glass variant particles */}
      {variant === 'glass' && isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animation: `float 2s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

// Add floating animation
const addFloatAnimation = () => {
  if (!document.querySelector('#lucent-float-animation')) {
    const style = document.createElement('style');
    style.id = 'lucent-float-animation';
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(120deg); }
        66% { transform: translateY(5px) rotate(240deg); }
      }
    `;
    document.head.appendChild(style);
  }
};

addFloatAnimation();