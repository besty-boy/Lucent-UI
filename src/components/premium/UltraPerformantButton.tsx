import React, { memo, forwardRef, useMemo } from 'react';
import { useAdvancedAnimation } from '../../hooks/useAdvancedAnimation';
import { useMicroInteractions } from '../../hooks/useMicroInteractions';
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization';
import { ButtonProps } from '../../types';

export interface UltraPerformantButtonProps extends ButtonProps {
  enableAdvancedAnimations?: boolean;
  enableMicroInteractions?: boolean;
  performanceMode?: 'auto' | 'high' | 'balanced' | 'economy';
  enableGPU?: boolean;
  animationType?: 'scale' | 'fade' | 'slideUp' | 'bounce' | 'elastic';
}

export const UltraPerformantButton = memo(forwardRef<HTMLButtonElement, UltraPerformantButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  enableAdvancedAnimations = true,
  enableMicroInteractions = true,
  performanceMode = 'auto',
  enableGPU = true,
  animationType = 'scale',
  ...props
}, ref) => {
  // Performance optimization
  const { 
    metrics,
    getAdaptiveStyles,
    getOptimizedAnimationConfig,
    supportsAdvancedFeatures
  } = usePerformanceOptimization({
    enableMemoization: true,
    performanceThreshold: 30
  });

  // Advanced animations
  const animationConfig = useMemo(() => 
    getOptimizedAnimationConfig(), [getOptimizedAnimationConfig]
  );

  const {
    ref: animationRef,
    triggerAnimation,
    isAnimating,
    effectivePerformance,
    shouldReduceMotion
  } = useAdvancedAnimation({
    type: animationType,
    duration: animationConfig.duration,
    easing: 'ease-out',
    trigger: 'manual',
    gpu: enableGPU && animationConfig.enableGPU,
    performance: performanceMode,
    onStart: () => {
      if (supportsAdvancedFeatures.webworker) {
        // Offload heavy computations to web worker if available
      }
    }
  });

  // Micro interactions
  const {
    ref: interactionRef,
    handlers,
    isHovered,
    isFocused,
    isActive
  } = useMicroInteractions({
    gpu: enableGPU,
    performance: performanceMode,
    hover: {
      scale: effectivePerformance === 'economy' ? 1.01 : 1.02,
      translateY: effectivePerformance === 'economy' ? -1 : -2,
      brightness: effectivePerformance === 'economy' ? 1.05 : 1.1,
      duration: animationConfig.duration * 0.5
    },
    focus: {
      scale: effectivePerformance === 'economy' ? 1.01 : 1.02,
      glow: animationConfig.enableShadows,
      glowColor: variant === 'primary' ? '#3b82f6' : '#10b981'
    },
    active: {
      scale: 0.98,
      duration: animationConfig.duration * 0.3,
      feedback: supportsAdvancedFeatures.webworker ? 'haptic' : 'visual'
    },
    ripple: {
      color: 'rgba(255, 255, 255, 0.3)',
      duration: animationConfig.duration * 1.5
    },
    tilt: effectivePerformance === 'high' ? {
      maxTilt: 2,
      scale: 1.01,
      speed: animationConfig.duration
    } : undefined
  });

  // Combine refs
  const combinedRef = useMemo(() => (node: HTMLButtonElement) => {
    if (ref) {
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    }
    // Use type assertion to bypass readonly restriction
    (animationRef as any).current = node;
    (interactionRef as any).current = node;
  }, [ref, animationRef, interactionRef]);

  // Optimized styles
  const adaptiveStyles = useMemo(() => 
    getAdaptiveStyles(), [getAdaptiveStyles]
  );

  const buttonStyles = useMemo(() => {
    const baseStyles = {
      position: 'relative' as const,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontFamily: 'inherit',
      fontWeight: 500,
      textDecoration: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      userSelect: 'none' as const,
      outline: 'none',
      overflow: 'hidden',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
      ...adaptiveStyles
    };

    // Size variants
    const sizeVariants = {
      xs: { padding: '0.375rem 0.75rem', fontSize: '0.75rem', minHeight: '1.75rem' },
      sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', minHeight: '2rem' },
      md: { padding: '0.625rem 1.25rem', fontSize: '0.875rem', minHeight: '2.5rem' },
      lg: { padding: '0.75rem 1.5rem', fontSize: '1rem', minHeight: '3rem' },
      xl: { padding: '1rem 2rem', fontSize: '1.125rem', minHeight: '3.5rem' }
    };
    const sizeStyles = sizeVariants[size] || sizeVariants.md;

    // Variant styles with performance-aware gradients
    const variantStyles = (() => {
      const enableGradients = effectivePerformance !== 'economy';
      
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            boxShadow: isHovered && animationConfig.enableShadows ? 
              '0 8px 25px -8px var(--color-primary)' : 
              '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            background: enableGradients ? 
              'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primaryLight) 100%)' : 
              'var(--color-primary)'
          };
        case 'secondary':
          return {
            backgroundColor: 'var(--color-secondary)',
            color: 'white',
            boxShadow: isHovered && animationConfig.enableShadows ? 
              '0 8px 25px -8px var(--color-secondary)' : 
              '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
          };
        case 'ghost':
          return {
            backgroundColor: isHovered ? 'var(--current-surface)' : 'transparent',
            color: 'var(--current-text)',
            border: 'none'
          };
        case 'outline':
          return {
            backgroundColor: isHovered ? 'var(--color-primary)' : 'transparent',
            color: isHovered ? 'white' : 'var(--color-primary)',
            border: '2px solid var(--color-primary)'
          };
        default:
          return {
            backgroundColor: 'var(--color-primary)',
            color: 'white'
          };
      }
    })();

    return {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles
    };
  }, [
    disabled, loading, fullWidth, size, variant, adaptiveStyles, 
    isHovered, animationConfig, effectivePerformance
  ]);

  // Handle click with performance optimizations
  const handleClick = useMemo(() => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    // Trigger advanced animation if enabled
    if (enableAdvancedAnimations && !shouldReduceMotion) {
      triggerAnimation();
    }
    
    // Call micro interaction handler
    if (enableMicroInteractions) {
      handlers.onClick(e);
    }
    
    // Call user-provided onClick
    onClick?.(e);
    
    // Performance monitoring for click interactions
    if (process.env.NODE_ENV === 'development') {
      console.log('Button interaction metrics:', {
        performanceMode: effectivePerformance,
        fps: metrics.fps,
        memory: metrics.memory,
        animating: isAnimating
      });
    }
  }, [
    disabled, loading, enableAdvancedAnimations, shouldReduceMotion,
    enableMicroInteractions, triggerAnimation, handlers.onClick, onClick,
    effectivePerformance, metrics, isAnimating
  ]);

  return (
    <button
      ref={combinedRef}
      style={buttonStyles}
      className={className}
      disabled={disabled || loading}
      onClick={handleClick}
      {...(enableMicroInteractions ? {
        onMouseEnter: handlers.onMouseEnter,
        onMouseLeave: handlers.onMouseLeave,
        onFocus: handlers.onFocus,
        onBlur: handlers.onBlur,
        onMouseDown: handlers.onMouseDown,
        onMouseUp: handlers.onMouseUp
      } : {})}
      {...props}
    >
      {/* Loading spinner with performance optimization */}
      {loading && (
        <div 
          style={{
            position: 'absolute',
            width: '1rem',
            height: '1rem',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: shouldReduceMotion ? 'none' : 'spin 1s linear infinite',
            ...adaptiveStyles
          }}
        />
      )}

      {/* Content with optimized rendering */}
      <span 
        style={{ 
          opacity: loading ? 0 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: shouldReduceMotion ? 'none' : `opacity ${animationConfig.duration}ms ease`
        }}
      >
        {children}
      </span>

      {/* Advanced glow effect for high performance mode */}
      {effectivePerformance === 'high' && (isFocused || isActive) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            borderRadius: 'inherit',
            opacity: 0.5,
            animation: 'glow-pulse 2s ease-in-out infinite alternate',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Performance indicator in development */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'absolute',
            top: '-0.5rem',
            right: '-0.5rem',
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            backgroundColor: 
              effectivePerformance === 'high' ? '#10b981' :
              effectivePerformance === 'balanced' ? '#f59e0b' : '#ef4444',
            fontSize: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
          title={`Performance: ${effectivePerformance} | FPS: ${metrics.fps} | Memory: ${metrics.memory}%`}
        />
      )}
    </button>
  );
}));

UltraPerformantButton.displayName = 'UltraPerformantButton';

// Add global keyframes for animations
const addGlobalKeyframes = () => {
  if (!document.querySelector('#ultra-button-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ultra-button-keyframes';
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes glow-pulse {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 0.7; transform: scale(1.02); }
      }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize keyframes
addGlobalKeyframes();

export default UltraPerformantButton;