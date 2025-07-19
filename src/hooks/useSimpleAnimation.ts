import { useRef, useCallback, useState } from 'react';

export type SimpleAnimationType = 'scale' | 'fade' | 'slideUp' | 'bounce' | 'elastic';

export interface SimpleAnimationOptions {
  duration?: number;
  easing?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

export const useSimpleAnimation = () => {
  const ref = useRef<HTMLElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<Animation | null>(null);

  const getKeyframes = (type: SimpleAnimationType) => {
    const keyframes: Record<SimpleAnimationType, Keyframe[]> = {
      scale: [
        { transform: 'scale(0.8) translateZ(0)', opacity: 0 },
        { transform: 'scale(1.1) translateZ(0)', opacity: 0.8, offset: 0.7 },
        { transform: 'scale(1) translateZ(0)', opacity: 1 }
      ],
      fade: [
        { opacity: 0, transform: 'translateZ(0)' },
        { opacity: 1, transform: 'translateZ(0)' }
      ],
      slideUp: [
        { transform: 'translateY(50px) translateZ(0)', opacity: 0 },
        { transform: 'translateY(0) translateZ(0)', opacity: 1 }
      ],
      bounce: [
        { transform: 'translateY(0) translateZ(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
        { transform: 'translateY(-30px) translateZ(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)', offset: 0.4 },
        { transform: 'translateY(0) translateZ(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)', offset: 0.6 },
        { transform: 'translateY(-15px) translateZ(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)', offset: 0.8 },
        { transform: 'translateY(0) translateZ(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' }
      ],
      elastic: [
        { transform: 'scale(0) translateZ(0)', opacity: 0 },
        { transform: 'scale(1.25) translateZ(0)', opacity: 0.8, offset: 0.3 },
        { transform: 'scale(0.85) translateZ(0)', opacity: 0.9, offset: 0.5 },
        { transform: 'scale(1.1) translateZ(0)', opacity: 1, offset: 0.7 },
        { transform: 'scale(0.95) translateZ(0)', opacity: 1, offset: 0.85 },
        { transform: 'scale(1) translateZ(0)', opacity: 1 }
      ]
    };
    return keyframes[type] || keyframes.scale;
  };

  const animate = useCallback((
    type: SimpleAnimationType, 
    options: SimpleAnimationOptions = {}
  ) => {
    if (!ref.current || isAnimating) return;

    const {
      duration = 600,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
      onStart,
      onComplete,
      onProgress
    } = options;

    setIsAnimating(true);
    setAnimationProgress(0);
    onStart?.();

    // GPU optimization
    if (ref.current) {
      ref.current.style.willChange = 'transform, opacity';
      ref.current.style.backfaceVisibility = 'hidden';
    }

    const keyframes = getKeyframes(type);
    
    try {
      animationRef.current = ref.current.animate(keyframes, {
        duration,
        easing,
        fill: 'forwards'
      });

      // Progress tracking
      const startTime = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setAnimationProgress(progress);
        onProgress?.(progress);
        
        if (progress < 1 && animationRef.current?.playState === 'running') {
          requestAnimationFrame(updateProgress);
        }
      };
      
      if (onProgress) {
        requestAnimationFrame(updateProgress);
      }

      animationRef.current.onfinish = () => {
        setIsAnimating(false);
        setAnimationProgress(1);
        
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
        
        onComplete?.();
      };

      animationRef.current.oncancel = () => {
        setIsAnimating(false);
        setAnimationProgress(0);
        
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
      };

    } catch (error) {
      console.warn('Animation failed:', error);
      setIsAnimating(false);
      setAnimationProgress(0);
    }
  }, [isAnimating]);

  const cancel = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.cancel();
    }
  }, []);

  return {
    ref,
    animate,
    cancel,
    isAnimating,
    animationProgress
  };
};

export default useSimpleAnimation;