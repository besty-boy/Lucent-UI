import { useEffect, useRef } from 'react';

interface LCPOptimizationConfig {
  enableLCPTracking?: boolean;
  criticalImages?: string[];
  criticalFonts?: string[];
  onLCPMeasure?: (value: number) => void;
}

export const useLCPOptimization = (config: LCPOptimizationConfig = {}) => {
  const lcpValue = useRef<number>(0);
  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !config.enableLCPTracking) return;

    // Track LCP with Performance Observer
    if ('PerformanceObserver' in window) {
      observerRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEventTiming;
        
        if (lastEntry) {
          lcpValue.current = lastEntry.startTime;
          config.onLCPMeasure?.(lastEntry.startTime);
        }
      });

      observerRef.current.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [config.enableLCPTracking, config.onLCPMeasure]);

  // Preload critical resources for LCP optimization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preloadCriticalResources = () => {
      // Preload critical images
      config.criticalImages?.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });

      // Preload critical fonts
      config.criticalFonts?.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = src;
        link.crossOrigin = 'anonymous';
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });
    };

    // Preload immediately for LCP optimization
    preloadCriticalResources();
  }, [config.criticalImages, config.criticalFonts]);

  return {
    getLCPValue: () => lcpValue.current,
  };
};

// Utility function to identify potential LCP elements
export const identifyLCPCandidates = (): Element[] => {
  if (typeof window === 'undefined') return [];

  const candidates: Element[] = [];
  
  // Look for large images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.width > 200 && rect.height > 200 && rect.top < window.innerHeight) {
      candidates.push(img);
    }
  });

  // Look for large text blocks
  const textElements = document.querySelectorAll('h1, h2, p, div');
  textElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width > 300 && rect.height > 100 && rect.top < window.innerHeight) {
      const textContent = el.textContent || '';
      if (textContent.length > 50) {
        candidates.push(el);
      }
    }
  });

  return candidates.slice(0, 5); // Return top 5 candidates
};

// Auto-optimize LCP elements
export const autoOptimizeLCP = () => {
  if (typeof window === 'undefined') return;

  // Run after DOM is ready
  const optimize = () => {
    const candidates = identifyLCPCandidates();
    
    candidates.forEach(element => {
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        // Add high priority loading
        img.loading = 'eager';
        img.fetchPriority = 'high';
        
        // Ensure dimensions are set to prevent layout shift
        if (!img.width || !img.height) {
          const rect = img.getBoundingClientRect();
          if (rect.width && rect.height) {
            img.style.aspectRatio = `${rect.width}/${rect.height}`;
          }
        }
      } else {
        // Optimize text rendering
        const textEl = element as HTMLElement;
        (textEl.style as any).fontDisplay = 'swap';
        
        // Ensure text is visible during font load
        if (!textEl.style.fontFamily.includes('system-ui')) {
          textEl.style.fontFamily = `${textEl.style.fontFamily}, system-ui, sans-serif`;
        }
      }
    });
  };

  // Run optimization after a short delay
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimize);
  } else {
    setTimeout(optimize, 50);
  }
};