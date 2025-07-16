import React, { useRef, useEffect, useState } from 'react';
import { useAdvancedAnimation, useMicroInteractions, useAdvancedResponsive, usePerformanceOptimization, AnimationType, EasingType } from '../../hooks';
import { Card } from '../Card';
import { CardProps } from '../../types';

export interface UltraAnimatedCardProps extends Omit<CardProps, 'className'> {
  // Animation props
  animation?: AnimationType;
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: EasingType;
  animationTrigger?: 'intersection' | 'scroll' | 'hover' | 'focus' | 'manual';
  animationInfinite?: boolean;
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  
  // Micro-interaction props
  hoverScale?: number;
  hoverRotate?: number;
  hoverGlow?: boolean;
  hoverBrightness?: number;
  activeScale?: number;
  rippleEffect?: boolean;
  rippleColor?: string;
  magneticEffect?: boolean;
  magneticStrength?: number;
  tiltEffect?: boolean;
  tiltMaxAngle?: number;
  
  // Performance props
  enableVirtualization?: boolean;
  lazyLoad?: boolean;
  optimizeImages?: boolean;
  reducedMotion?: boolean;
  
  // Responsive props
  responsiveAnimation?: boolean;
  mobileOptimized?: boolean;
  
  // Advanced props
  className?: string;
  stagger?: number;
  parallaxSpeed?: number;
  glowColor?: string;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
  onHover?: (isHovered: boolean) => void;
  onActive?: (isActive: boolean) => void;
}

export const UltraAnimatedCard: React.FC<UltraAnimatedCardProps> = ({
  children,
  animation = 'fadeUp',
  animationDuration = 600,
  animationDelay = 0,
  animationEasing = 'ease-out',
  animationTrigger = 'intersection',
  animationInfinite = false,
  animationDirection = 'normal',
  hoverScale = 1.02,
  hoverRotate = 0,
  hoverGlow = false,
  hoverBrightness = 1.1,
  activeScale = 0.98,
  rippleEffect = false,
  rippleColor = 'rgba(255, 255, 255, 0.6)',
  magneticEffect = false,
  magneticStrength = 0.3,
  tiltEffect = false,
  tiltMaxAngle = 5,
  enableVirtualization = true,
  lazyLoad = true,
  optimizeImages = true,
  reducedMotion = false,
  responsiveAnimation = true,
  mobileOptimized = true,
  className = '',
  stagger = 0,
  parallaxSpeed = 0.5,
  glowColor = '#3B82F6',
  onAnimationStart,
  onAnimationComplete,
  onHover,
  onActive,
  ...cardProps
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Performance optimization
  const performance = usePerformanceOptimization({
    enableVirtualization,
    enableLazyLoading: lazyLoad,
    enableImageOptimization: optimizeImages
  });

  // Responsive configuration
  const responsive = useAdvancedResponsive({
    fluidTypography: true,
    containerQueries: true,
    adaptiveImages: optimizeImages,
    touchOptimization: mobileOptimized,
    performanceMode: performance.metrics.performanceMode
  });

  // Adapt animation based on performance and device
  const adaptedAnimation = React.useMemo(() => {
    const config = performance.getOptimizedAnimationConfig();
    
    // Disable complex animations on low-end devices
    if (config.reduceMotion || reducedMotion) {
      return 'fade';
    }
    
    // Simplify animations on mobile for better performance
    if (responsive.isMobile && mobileOptimized) {
      const simpleAnimations: AnimationType[] = ['fade', 'fadeUp', 'scale'];
      return simpleAnimations.includes(animation) ? animation : 'fade';
    }
    
    return animation;
  }, [animation, performance, responsive.isMobile, mobileOptimized, reducedMotion]);

  // Adapt duration based on performance
  const adaptedDuration = React.useMemo(() => {
    const config = performance.getOptimizedAnimationConfig();
    
    if (config.reduceMotion || reducedMotion) {
      return 0;
    }
    
    return responsiveAnimation ? config.duration : animationDuration;
  }, [animationDuration, performance, responsiveAnimation, reducedMotion]);

  // Advanced animation hook
  const animationHook = useAdvancedAnimation({
    type: adaptedAnimation,
    duration: adaptedDuration,
    delay: animationDelay + stagger,
    easing: animationEasing,
    infinite: animationInfinite,
    direction: animationDirection,
    trigger: animationTrigger,
    threshold: 0.1,
    rootMargin: '0px',
    stagger,
    parallax: parallaxSpeed > 0 ? { speed: parallaxSpeed, direction: 'vertical' } : undefined,
    onStart: onAnimationStart,
    onComplete: onAnimationComplete
  });

  // Micro-interactions hook
  const microInteractions = useMicroInteractions({
    hover: {
      scale: hoverScale,
      rotate: hoverRotate,
      brightness: hoverBrightness,
      duration: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    focus: {
      scale: 1.01,
      glow: hoverGlow,
      glowColor: glowColor,
      duration: 200
    },
    active: {
      scale: activeScale,
      duration: 100,
      feedback: responsive.deviceCapabilities.touchSupport ? 'haptic' : 'visual'
    },
    ripple: rippleEffect ? {
      color: rippleColor,
      duration: 600,
      scale: 2
    } : undefined,
    magnetic: magneticEffect ? {
      strength: magneticStrength,
      distance: 100
    } : undefined,
    tilt: tiltEffect ? {
      maxTilt: tiltMaxAngle,
      scale: 1.01,
      speed: 400
    } : undefined
  });

  // Lazy loading
  const lazyLoadHook = performance.useLazyLoading(0.1);

  // Combine refs
  const combinedRef = React.useCallback((node: HTMLDivElement | null) => {
    // Set our ref
    cardRef.current = node;
    // Note: The other refs are managed by their respective hooks
  }, []);

  // Handle intersection
  useEffect(() => {
    if (lazyLoadHook.isIntersecting && !isLoaded) {
      setIsLoaded(true);
    }
  }, [lazyLoadHook.isIntersecting, isLoaded]);

  // Handle hover events
  useEffect(() => {
    if (onHover) {
      onHover(microInteractions.isHovered);
    }
  }, [microInteractions.isHovered, onHover]);

  // Handle active events
  useEffect(() => {
    if (onActive) {
      onActive(microInteractions.isActive);
    }
  }, [microInteractions.isActive, onActive]);

  // Performance optimized styles
  const performanceStyles = performance.getAdaptiveStyles();
  const responsiveStyles = responsive.getPerformanceOptimizedStyles();

  // Combined styles
  const combinedStyles = React.useMemo(() => ({
    ...performanceStyles,
    ...responsiveStyles,
    // Ensure smooth animations
    transformStyle: 'preserve-3d' as const,
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
    // Optimize for animations
    willChange: animationHook.isAnimating ? 'transform, opacity' : 'auto',
    // Responsive positioning
    position: 'relative' as const,
    overflow: 'hidden' as const,
    // Touch optimization
    ...(responsive.deviceCapabilities.touchSupport ? {
      minHeight: '44px',
      minWidth: '44px',
      touchAction: 'manipulation' as const,
      userSelect: 'none' as const,
      WebkitTouchCallout: 'none' as const,
      WebkitUserSelect: 'none' as const,
      MozUserSelect: 'none' as const,
      msUserSelect: 'none' as const
    } : {})
  }), [
    performanceStyles,
    responsiveStyles,
    animationHook.isAnimating,
    responsive
  ]);

  // Glow effect styles
  const glowStyles = React.useMemo(() => {
    if (!hoverGlow || !microInteractions.isHovered) return {};
    
    return {
      boxShadow: `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20, 0 0 60px ${glowColor}10`,
      filter: `brightness(${hoverBrightness})`
    };
  }, [hoverGlow, microInteractions.isHovered, glowColor, hoverBrightness]);

  // Don't render until loaded if lazy loading is enabled
  if (lazyLoad && !isLoaded) {
    return (
      <div
        ref={combinedRef}
        style={{
          height: '200px', // Placeholder height
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Optional loading skeleton */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: performance.metrics.performanceMode === 'high' ? 'shimmer 2s infinite' : 'none'
        }} />
      </div>
    );
  }

  return (
    <div
      ref={combinedRef}
      className={`ultra-animated-card ${className}`}
      style={{
        ...combinedStyles,
        ...glowStyles
      }}
      {...microInteractions.handlers}
    >
      <Card
        {...cardProps}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none'
        }}
      >
      {children}
      
      {/* Add shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .ultra-animated-card {
          transition: all ${adaptedDuration}ms ${animationEasing};
        }
        
        .ultra-animated-card:hover {
          transform: scale(${hoverScale}) rotate(${hoverRotate}deg);
        }
        
        .ultra-animated-card:active {
          transform: scale(${activeScale});
        }
        
        @media (prefers-reduced-motion: reduce) {
          .ultra-animated-card {
            animation: none !important;
            transition: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .ultra-animated-card {
            transform: ${mobileOptimized ? 'translateZ(0)' : 'none'};
          }
        }
      `}</style>
      </Card>
    </div>
  );
};