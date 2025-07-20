import { useEffect, useRef } from 'react';
import { preloadResource, preconnectDomain, addResourceHints, optimizeForWebVitals } from '../utils/performance';

interface CriticalResourcesConfig {
  preloadFonts?: string[];
  preloadImages?: string[];
  preconnectDomains?: string[];
  enableWebVitalsOptimization?: boolean;
  criticalCSS?: string;
}

export const useCriticalResources = (config: CriticalResourcesConfig = {}) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || typeof window === 'undefined') return;
    hasInitialized.current = true;

    // Add default resource hints
    addResourceHints();

    // Preconnect to additional domains
    if (config.preconnectDomains?.length) {
      config.preconnectDomains.forEach(preconnectDomain);
    }

    // Preload critical fonts
    if (config.preloadFonts?.length) {
      config.preloadFonts.forEach(font => {
        preloadResource(font, 'font', true);
      });
    }

    // Preload critical images (LCP candidates)
    if (config.preloadImages?.length) {
      config.preloadImages.forEach(image => {
        preloadResource(image, 'image');
      });
    }

    // Apply Web Vitals optimizations
    if (config.enableWebVitalsOptimization !== false) {
      // Run after DOM is ready
      const timeoutId = setTimeout(optimizeForWebVitals, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [config]);

  return {
    preloadResource,
    preconnectDomain,
  };
};