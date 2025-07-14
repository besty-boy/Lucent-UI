import { useEffect, useRef } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
}

export const useAnimation = (options: AnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationClass = 'animate-fade-in'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, animationClass]);

  return ref;
};
