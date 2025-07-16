import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  connection: string;
  deviceMemory: number;
  hardwareConcurrency: number;
  performanceMode: 'economy' | 'balanced' | 'high';
}

interface OptimizationOptions {
  enableVirtualization?: boolean;
  enableLazyLoading?: boolean;
  enableImageOptimization?: boolean;
  enableCodeSplitting?: boolean;
  enablePreloading?: boolean;
  enableMemoization?: boolean;
  performanceThreshold?: number;
  memoryThreshold?: number;
}

export const usePerformanceOptimization = (options: OptimizationOptions = {}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    connection: '4g',
    deviceMemory: 4,
    hardwareConcurrency: 4,
    performanceMode: 'balanced'
  });

  const [isOptimized] = useState(false);
  const frameCountRef = useRef(0);
  const fpsRef = useRef(60);
  const lastTimeRef = useRef(performance.now());

  const {
    enableVirtualization = true,
    enableLazyLoading = true,
    enableImageOptimization = true,
    enableCodeSplitting = true,
    enablePreloading = true,
    enableMemoization = true,
    performanceThreshold = 30,
    memoryThreshold = 50
  } = options;

  // Measure performance metrics
  const measurePerformance = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    
    if (delta >= 1000) {
      fpsRef.current = Math.round((frameCountRef.current * 1000) / delta);
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
    
    frameCountRef.current++;

    // Get memory info
    const memoryInfo = (performance as any).memory;
    const memory = memoryInfo ? 
      Math.round((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100) : 0;

    // Get connection info
    const connection = (navigator as any).connection;
    const connectionType = connection ? connection.effectiveType : '4g';

    // Get device capabilities
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // Determine performance mode
    let performanceMode: 'economy' | 'balanced' | 'high' = 'balanced';
    if (fpsRef.current < performanceThreshold || memory > memoryThreshold || deviceMemory < 2) {
      performanceMode = 'economy';
    } else if (fpsRef.current > 50 && memory < 30 && deviceMemory >= 8) {
      performanceMode = 'high';
    }

    setMetrics({
      fps: fpsRef.current,
      memory,
      connection: connectionType,
      deviceMemory,
      hardwareConcurrency,
      performanceMode
    });

    requestAnimationFrame(measurePerformance);
  }, [performanceThreshold, memoryThreshold]);

  // Start performance monitoring
  useEffect(() => {
    requestAnimationFrame(measurePerformance);
  }, [measurePerformance]);

  // Lazy loading hook
  const useLazyLoading = useCallback((threshold = 0.1) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      if (!enableLazyLoading || !ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        },
        { threshold }
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [threshold]);

    return { ref, isIntersecting };
  }, [enableLazyLoading]);

  // Image optimization
  const optimizeImage = useCallback((src: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
    lazy?: boolean;
  } = {}) => {
    if (!enableImageOptimization) return { src, loading: false };

    const { width, height, quality = 80, format = 'webp' } = options;
    const [optimizedSrc, setOptimizedSrc] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const optimized = canvas.toDataURL(
            format === 'webp' ? 'image/webp' : 
            format === 'jpeg' ? 'image/jpeg' : 'image/png',
            quality / 100
          );
          
          setOptimizedSrc(optimized);
          setLoading(false);
        }
      };

      img.src = src;
    }, [src, width, height, quality, format]);

    return { src: optimizedSrc || src, loading };
  }, [enableImageOptimization]);

  // Virtual scrolling
  const useVirtualScrolling = useCallback((items: any[], itemHeight: number, containerHeight: number) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [visibleItems, setVisibleItems] = useState<any[]>([]);

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    useEffect(() => {
      if (!enableVirtualization) {
        setVisibleItems(items);
        return;
      }

      setVisibleItems(items.slice(startIndex, endIndex));
    }, [items, startIndex, endIndex, enableVirtualization]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    };

    return {
      visibleItems,
      handleScroll,
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }, [enableVirtualization]);

  // Code splitting
  const lazyImport = useCallback((importFunc: () => Promise<any>) => {
    if (!enableCodeSplitting) {
      return importFunc();
    }

    return importFunc();
  }, [enableCodeSplitting]);

  // Preloading
  const preloadResource = useCallback((url: string, type: 'script' | 'style' | 'image' | 'font' = 'script') => {
    if (!enablePreloading) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    switch (type) {
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
      case 'image':
        link.as = 'image';
        break;
      case 'font':
        link.as = 'font';
        link.crossOrigin = 'anonymous';
        break;
    }

    document.head.appendChild(link);
  }, [enablePreloading]);

  // Memoization helpers
  const memoizedCallback = useCallback((fn: (...args: any[]) => any, deps: any[]) => {
    if (!enableMemoization) return fn;
    return useCallback(fn, deps);
  }, [enableMemoization]);

  const memoizedValue = useCallback((fn: () => any, deps: any[]) => {
    if (!enableMemoization) return fn();
    return useMemo(fn, deps);
  }, [enableMemoization]);

  // Adaptive performance mode
  const getAdaptiveStyles = useCallback(() => {
    const { performanceMode } = metrics;

    const baseStyles = {
      willChange: 'auto',
      backfaceVisibility: 'hidden' as const,
      perspective: '1000px'
    };

    switch (performanceMode) {
      case 'economy':
        return {
          ...baseStyles,
          transform: 'translateZ(0)', // Force GPU acceleration
          animationDuration: '0.2s',
          transition: 'none'
        };
      case 'balanced':
        return {
          ...baseStyles,
          animationDuration: '0.3s',
          transition: 'all 0.2s ease-out'
        };
      case 'high':
        return {
          ...baseStyles,
          animationDuration: '0.5s',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: 'blur(0px)', // Enable advanced filters
          backdropFilter: 'blur(10px)'
        };
      default:
        return baseStyles;
    }
  }, [metrics]);

  // Optimize animations based on performance
  const getOptimizedAnimationConfig = useCallback(() => {
    const { performanceMode } = metrics;

    switch (performanceMode) {
      case 'economy':
        return {
          duration: 150,
          easing: 'ease-out',
          reduceMotion: true,
          enableGPU: true,
          enableBlur: false,
          enableShadows: false
        };
      case 'balanced':
        return {
          duration: 300,
          easing: 'ease-in-out',
          reduceMotion: false,
          enableGPU: true,
          enableBlur: true,
          enableShadows: true
        };
      case 'high':
        return {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          reduceMotion: false,
          enableGPU: true,
          enableBlur: true,
          enableShadows: true,
          enableSpring: true
        };
      default:
        return {
          duration: 300,
          easing: 'ease-in-out',
          reduceMotion: false,
          enableGPU: true,
          enableBlur: true,
          enableShadows: true
        };
    }
  }, [metrics]);

  // Check if device supports advanced features
  const supportsAdvancedFeatures = useMemo(() => {
    return {
      webp: (() => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      })(),
      intersection: 'IntersectionObserver' in window,
      resize: 'ResizeObserver' in window,
      webgl: (() => {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      })(),
      webworker: 'Worker' in window,
      serviceworker: 'serviceWorker' in navigator
    };
  }, []);

  return {
    metrics,
    isOptimized,
    useLazyLoading,
    optimizeImage,
    useVirtualScrolling,
    lazyImport,
    preloadResource,
    memoizedCallback,
    memoizedValue,
    getAdaptiveStyles,
    getOptimizedAnimationConfig,
    supportsAdvancedFeatures
  };
};