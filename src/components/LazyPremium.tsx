import React, { Suspense, lazy } from 'react';

// Lazy loaded premium components for better initial bundle size
const LazyAnimatedCard = lazy(() => import('./premium/AnimatedCard').then(module => ({ default: module.AnimatedCard })));
const LazyMagicButton = lazy(() => import('./premium/MagicButton').then(module => ({ default: module.MagicButton })));
const LazyFluidLayout = lazy(() => import('./premium/FluidLayout').then(module => ({ default: module.FluidLayout })));
const LazySmartContainer = lazy(() => import('./premium/SmartContainer').then(module => ({ default: module.SmartContainer })));
const LazyUltraPerformantButton = lazy(() => import('./premium/UltraPerformantButton').then(module => ({ default: module.UltraPerformantButton })));
const LazyPerformanceMonitor = lazy(() => import('./premium/PerformanceMonitor').then(module => ({ default: module.PerformanceMonitor })));
const LazyUltraAnimatedCard = lazy(() => import('./premium/UltraAnimatedCard').then(module => ({ default: module.UltraAnimatedCard })));

// Loading fallback component
const PremiumLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
    style={{
      minHeight: '2.5rem',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite'
    }}
  >
    <style>
      {`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}
    </style>
  </div>
);

// Wrapper for lazy premium components with optimized loading
export const createLazyPremiumComponent = <T extends Record<string, any>>(
  LazyComponent: React.LazyExoticComponent<React.ComponentType<T>>
) => {
  return React.forwardRef<any, T & { fallback?: React.ReactNode }>((props, ref) => {
    const { fallback, ...componentProps } = props;
    
    return (
      <Suspense fallback={fallback || <PremiumLoader className={(props as any).className} />}>
        <LazyComponent ref={ref} {...(componentProps as any)} />
      </Suspense>
    );
  });
};

// Export lazy premium components with optimized loading
export const AnimatedCard = createLazyPremiumComponent(LazyAnimatedCard as any);
export const MagicButton = createLazyPremiumComponent(LazyMagicButton as any);
export const FluidLayout = createLazyPremiumComponent(LazyFluidLayout as any);
export const SmartContainer = createLazyPremiumComponent(LazySmartContainer as any);
export const UltraPerformantButton = createLazyPremiumComponent(LazyUltraPerformantButton as any);
export const PerformanceMonitor = createLazyPremiumComponent(LazyPerformanceMonitor as any);
export const UltraAnimatedCard = createLazyPremiumComponent(LazyUltraAnimatedCard as any);

// Preload premium components when user is likely to need them
export const preloadPremiumComponents = () => {
  // Use requestIdleCallback for non-blocking preloading
  const preload = () => {
    // Modern bundlers will understand these dynamic imports for preloading
    import('./premium/AnimatedCard');
    import('./premium/MagicButton');
    import('./premium/FluidLayout');
    import('./premium/SmartContainer');
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload);
  } else {
    setTimeout(preload, 2000); // Fallback for older browsers
  }
};

// Hook to trigger preloading on user interaction
export const usePremiumPreload = () => {
  React.useEffect(() => {
    const handleInteraction = () => {
      preloadPremiumComponents();
      // Remove listeners after first interaction
      window.removeEventListener('mouseover', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };

    // Preload on first user interaction
    window.addEventListener('mouseover', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('mouseover', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, []);
};