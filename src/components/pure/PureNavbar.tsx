import React, { useState, useEffect, CSSProperties } from 'react';

export interface PureNavbarProps {
  children?: React.ReactNode;
  logo?: string | React.ReactNode;
  variant?: 'default' | 'glass' | 'solid' | 'minimal' | 'floating';
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

export const PureNavbar: React.FC<PureNavbarProps> = ({
  children,
  logo,
  variant = 'default',
  sticky = true,
  transparent = false,
  className = ''
}) => {
  // const theme = useTheme(); // Réservé pour usage futur
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (sticky) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sticky]);

  const getBaseStyles = (): CSSProperties => ({
    position: sticky ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    width: '100%',
    padding: '0.75rem 1.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...getVariantStyles(),
  });

  const getVariantStyles = (): CSSProperties => {
    const baseTransparent = transparent && !isScrolled;
    
    const variants = {
      default: {
        backgroundColor: baseTransparent ? 'transparent' : 'var(--color-surface)',
        borderBottom: baseTransparent ? 'none' : '1px solid var(--color-border)',
        boxShadow: baseTransparent ? 'none' : '0 1px 8px rgba(0, 0, 0, 0.1)',
      },
      glass: {
        backgroundColor: baseTransparent ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: baseTransparent ? 'none' : 'blur(20px)',
        borderBottom: baseTransparent ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: baseTransparent ? 'none' : '0 4px 24px rgba(0, 0, 0, 0.1)',
      },
      solid: {
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
      },
      minimal: {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
      },
      floating: {
        backgroundColor: baseTransparent ? 'transparent' : 'var(--color-surface)',
        margin: '1rem',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: baseTransparent ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: baseTransparent ? 'none' : '1px solid var(--color-border)',
        width: 'calc(100% - 2rem)',
      }
    };
    
    return variants[variant];
  };

  const getContainerStyles = (): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  });

  const getLogoStyles = (): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: variant === 'solid' ? 'white' : 'var(--current-text)',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  });

  const getContentStyles = (): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  });

  return (
    <nav
      style={getBaseStyles()}
      className={className}
    >
      <div style={getContainerStyles()}>
        {/* Logo */}
        {logo && (
          <div style={getLogoStyles()}>
            {typeof logo === 'string' ? (
              <span>{logo}</span>
            ) : (
              logo
            )}
          </div>
        )}

        {/* Navigation Content */}
        {children && (
          <div style={getContentStyles()}>
            {children}
          </div>
        )}
      </div>

      {/* Animated underline for solid variant */}
      {variant === 'solid' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: isScrolled ? '100%' : '0%',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          transform: 'translateX(-50%)',
          transition: 'width 0.3s ease',
        }} />
      )}
    </nav>
  );
};