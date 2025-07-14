import React, { useEffect, useRef, useState } from 'react';

export interface AnimatedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'premium' | 'glass' | 'gradient' | 'neon' | 'crystal';
  animation?: 'none' | 'fade' | 'slide' | 'scale' | 'rotate' | 'flip' | 'morphism';
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'tilt' | 'float' | 'pulse';
  autoAnimate?: boolean;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  variant = 'default',
  animation = 'fade',
  hoverEffect = 'lift',
  autoAnimate = true,
  delay = 0,
  className = '',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoAnimate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [autoAnimate, delay]);

  const getVariantClasses = () => {
    const base = `
      backdrop-blur-sm border transition-all duration-[var(--animation-duration)]
      rounded-[var(--border-radius)] overflow-hidden relative
    `;

    const variants = {
      default: `
        bg-[var(--color-surface)]/80 dark:bg-[var(--color-surfaceDark)]/80
        border-[var(--color-border)]/30 dark:border-[var(--color-borderDark)]/30
        shadow-[var(--shadow-md)]
      `,
      premium: `
        bg-gradient-to-br from-[var(--color-surface)]/90 to-[var(--color-background)]/70
        dark:from-[var(--color-surfaceDark)]/90 dark:to-[var(--color-backgroundDark)]/70
        border-[var(--color-primary)]/20 shadow-[var(--shadow-lg)]
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-[var(--color-primary)]/5 before:to-transparent
      `,
      glass: `
        bg-white/10 dark:bg-black/10 backdrop-blur-md
        border-white/20 dark:border-white/10
        shadow-2xl shadow-[var(--color-primary)]/10
      `,
      gradient: `
        bg-gradient-to-br from-[var(--color-primary)]/20 via-[var(--color-secondary)]/10 to-[var(--color-accent)]/15
        border-[var(--color-primary)]/30 shadow-[var(--shadow-xl)]
      `,
      neon: `
        bg-black/80 border-[var(--color-primary)] shadow-[var(--shadow-lg)]
        shadow-[var(--color-primary)]/50 
        before:absolute before:inset-0 before:bg-[var(--color-primary)]/5 before:blur-sm
      `,
      crystal: `
        bg-gradient-to-br from-white/60 to-white/20 dark:from-black/60 dark:to-black/20
        border-white/30 dark:border-white/10 backdrop-blur-xl
        shadow-inner shadow-white/20 dark:shadow-black/20
      `
    };

    return base + variants[variant];
  };

  const getAnimationClasses = () => {
    if (!isVisible && autoAnimate) {
      const animations = {
        none: '',
        fade: 'opacity-0',
        slide: 'opacity-0 translate-y-8',
        scale: 'opacity-0 scale-95',
        rotate: 'opacity-0 rotate-3',
        flip: 'opacity-0 rotateY-180',
        morphism: 'opacity-0 scale-110 blur-sm'
      };
      return animations[animation];
    }

    return 'opacity-100 translate-y-0 scale-100 rotate-0 blur-0';
  };

  const getHoverClasses = () => {
    if (!isHovered) return '';

    const effects = {
      lift: 'transform translate-y-[-8px] shadow-[var(--shadow-xl)]',
      glow: 'shadow-[var(--shadow-xl)] shadow-[var(--color-primary)]/30',
      scale: 'transform scale-105',
      tilt: 'transform rotate-1 scale-105',
      float: 'transform translate-y-[-4px] translate-x-1',
      pulse: 'animate-pulse'
    };

    return effects[hoverEffect];
  };

  const combinedClasses = `
    ${getVariantClasses()}
    ${getAnimationClasses()}
    ${getHoverClasses()}
    ${className}
    cursor-pointer group
  `.trim();

  return (
    <div
      ref={cardRef}
      className={combinedClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        transform: isHovered ? 'translateZ(0)' : 'none',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* Shimmer effect for premium cards */}
      {variant === 'premium' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      
      {/* Particle effects for neon cards */}
      {variant === 'neon' && isHovered && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-primary)] rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};