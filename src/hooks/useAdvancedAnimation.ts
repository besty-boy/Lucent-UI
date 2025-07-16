import { useEffect, useRef, useState } from 'react';

export type AnimationType = 
  | 'fade' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight'
  | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
  | 'scale' | 'scaleUp' | 'scaleDown' | 'scaleX' | 'scaleY'
  | 'rotate' | 'rotateX' | 'rotateY' | 'rotateZ'
  | 'flip' | 'flipX' | 'flipY'
  | 'bounce' | 'elastic' | 'spring'
  | 'morphism' | 'parallax' | 'glow' | 'pulse'
  | 'magnetic' | 'liquid' | 'particles';

export type EasingType = 
  | 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  | 'cubic-bezier' | 'spring' | 'bounce' | 'elastic'
  | 'back' | 'circ' | 'expo' | 'quad' | 'quart' | 'quint';

export interface AdvancedAnimationOptions {
  type: AnimationType;
  duration?: number;
  delay?: number;
  easing?: EasingType;
  infinite?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  trigger?: 'intersection' | 'scroll' | 'hover' | 'focus' | 'manual';
  threshold?: number;
  rootMargin?: string;
  stagger?: number;
  spring?: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  parallax?: {
    speed: number;
    direction: 'vertical' | 'horizontal';
  };
  onStart?: () => void;
  onComplete?: () => void;
}

export const useAdvancedAnimation = (options: AdvancedAnimationOptions) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<Animation | null>(null);

  const {
    type,
    duration = 600,
    delay = 0,
    easing = 'ease-out',
    infinite = false,
    direction = 'normal',
    fillMode = 'forwards',
    trigger = 'intersection',
    threshold = 0.1,
    rootMargin = '0px',
    stagger = 0,
    // spring,
    parallax,
    onStart,
    onComplete
  } = options;

  // Easing curves
  const easingCurves = {
    'linear': 'linear',
    'ease': 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    'cubic-bezier': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'circ': 'cubic-bezier(0.55, 0, 1, 0.45)',
    'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
    'quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'quart': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'quint': 'cubic-bezier(0.23, 1, 0.320, 1)'
  };

  // Animation keyframes
  const getKeyframes = (animationType: AnimationType) => {
    const keyframes: Record<AnimationType, Keyframe[]> = {
      fade: [
        { opacity: 0 },
        { opacity: 1 }
      ],
      fadeUp: [
        { opacity: 0, transform: 'translateY(30px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      fadeDown: [
        { opacity: 0, transform: 'translateY(-30px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      fadeLeft: [
        { opacity: 0, transform: 'translateX(30px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],
      fadeRight: [
        { opacity: 0, transform: 'translateX(-30px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],
      slideUp: [
        { transform: 'translateY(100%)' },
        { transform: 'translateY(0)' }
      ],
      slideDown: [
        { transform: 'translateY(-100%)' },
        { transform: 'translateY(0)' }
      ],
      slideLeft: [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0)' }
      ],
      slideRight: [
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(0)' }
      ],
      scale: [
        { transform: 'scale(0.8)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      scaleUp: [
        { transform: 'scale(0.8)' },
        { transform: 'scale(1)' }
      ],
      scaleDown: [
        { transform: 'scale(1.2)' },
        { transform: 'scale(1)' }
      ],
      scaleX: [
        { transform: 'scaleX(0)' },
        { transform: 'scaleX(1)' }
      ],
      scaleY: [
        { transform: 'scaleY(0)' },
        { transform: 'scaleY(1)' }
      ],
      rotate: [
        { transform: 'rotate(-10deg)', opacity: 0 },
        { transform: 'rotate(0deg)', opacity: 1 }
      ],
      rotateX: [
        { transform: 'rotateX(-90deg)', opacity: 0 },
        { transform: 'rotateX(0deg)', opacity: 1 }
      ],
      rotateY: [
        { transform: 'rotateY(-90deg)', opacity: 0 },
        { transform: 'rotateY(0deg)', opacity: 1 }
      ],
      rotateZ: [
        { transform: 'rotateZ(-180deg)', opacity: 0 },
        { transform: 'rotateZ(0deg)', opacity: 1 }
      ],
      flip: [
        { transform: 'rotateY(-180deg)' },
        { transform: 'rotateY(0deg)' }
      ],
      flipX: [
        { transform: 'rotateX(-180deg)' },
        { transform: 'rotateX(0deg)' }
      ],
      flipY: [
        { transform: 'rotateY(-180deg)' },
        { transform: 'rotateY(0deg)' }
      ],
      bounce: [
        { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
        { transform: 'translateY(-30px)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' }
      ],
      elastic: [
        { transform: 'scale(1)' },
        { transform: 'scale(1.25)' },
        { transform: 'scale(0.75)' },
        { transform: 'scale(1.15)' },
        { transform: 'scale(0.95)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ],
      spring: [
        { transform: 'scale(0)', opacity: 0 },
        { transform: 'scale(1.2)', opacity: 0.7 },
        { transform: 'scale(0.9)', opacity: 0.9 },
        { transform: 'scale(1.1)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      morphism: [
        { 
          transform: 'scale(0.8) rotate(-5deg)', 
          opacity: 0,
          filter: 'blur(10px) brightness(0.5)',
          borderRadius: '50%'
        },
        { 
          transform: 'scale(1.05) rotate(2deg)', 
          opacity: 0.8,
          filter: 'blur(2px) brightness(0.8)',
          borderRadius: '25%'
        },
        { 
          transform: 'scale(1) rotate(0deg)', 
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          borderRadius: '0%'
        }
      ],
      parallax: [
        { transform: 'translateY(0px)' },
        { transform: `translateY(${parallax?.speed || 0.5}px)` }
      ],
      glow: [
        { 
          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
          filter: 'brightness(1)'
        },
        { 
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)',
          filter: 'brightness(1.1)'
        },
        { 
          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
          filter: 'brightness(1)'
        }
      ],
      pulse: [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.05)', opacity: 0.8 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      magnetic: [
        { transform: 'translate(0, 0)' },
        { transform: 'translate(2px, -2px)' },
        { transform: 'translate(-2px, 2px)' },
        { transform: 'translate(0, 0)' }
      ],
      liquid: [
        { 
          transform: 'scale(1) skew(0deg)',
          borderRadius: '10px'
        },
        { 
          transform: 'scale(1.02) skew(0.5deg)',
          borderRadius: '15px'
        },
        { 
          transform: 'scale(1.01) skew(-0.5deg)',
          borderRadius: '8px'
        },
        { 
          transform: 'scale(1) skew(0deg)',
          borderRadius: '10px'
        }
      ],
      particles: [
        { 
          transform: 'translateY(0)',
          opacity: 1,
          filter: 'blur(0px)'
        },
        { 
          transform: 'translateY(-100px)',
          opacity: 0,
          filter: 'blur(5px)'
        }
      ]
    };

    return keyframes[animationType] || keyframes.fade;
  };

  // Start animation
  const startAnimation = () => {
    if (!ref.current || isAnimating) return;

    setIsAnimating(true);
    onStart?.();

    const keyframes = getKeyframes(type);
    const timingOptions: KeyframeAnimationOptions = {
      duration: duration + (stagger || 0),
      delay,
      easing: easingCurves[easing],
      iterations: infinite ? Infinity : 1,
      direction,
      fill: fillMode
    };

    animationRef.current = ref.current.animate(keyframes, timingOptions);

    animationRef.current.onfinish = () => {
      setIsAnimating(false);
      onComplete?.();
    };
  };

  // Handle intersection observer
  useEffect(() => {
    if (trigger !== 'intersection' || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            startAnimation();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger, threshold, rootMargin, isVisible]);

  // Handle scroll-triggered animations
  useEffect(() => {
    if (trigger !== 'scroll' || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      
      if (parallax) {
        const translateY = scrollProgress * parallax.speed;
        ref.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trigger, parallax]);

  // Manual trigger
  const triggerAnimation = () => {
    if (trigger === 'manual') {
      startAnimation();
    }
  };

  // Stop animation
  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.cancel();
      setIsAnimating(false);
    }
  };

  return {
    ref,
    isVisible,
    isAnimating,
    triggerAnimation,
    stopAnimation
  };
};