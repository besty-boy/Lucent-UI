// Performance utilities for critical resource optimization

// Preload critical resources
export const preloadResource = (href: string, as: 'script' | 'style' | 'font' | 'image', crossorigin?: boolean) => {
  if (typeof window === 'undefined') return;

  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (crossorigin) {
    link.crossOrigin = 'anonymous';
  }
  
  // Add to head
  document.head.appendChild(link);
};

// Preconnect to external domains
export const preconnectDomain = (domain: string) => {
  if (typeof window === 'undefined') return;

  const existingLink = document.querySelector(`link[href="${domain}"]`);
  if (existingLink) return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  link.crossOrigin = 'anonymous';
  
  document.head.appendChild(link);
};

// Critical CSS inlining
export const inlineCriticalCSS = (css: string) => {
  if (typeof window === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  
  // Insert at the beginning of head for highest priority
  const firstChild = document.head.firstChild;
  if (firstChild) {
    document.head.insertBefore(style, firstChild);
  } else {
    document.head.appendChild(style);
  }
};

// Lazy load non-critical resources
export const lazyLoadResource = (href: string, as: 'script' | 'style') => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    const element = as === 'script' 
      ? document.createElement('script')
      : document.createElement('link');

    if (as === 'script') {
      (element as HTMLScriptElement).src = href;
      (element as HTMLScriptElement).async = true;
      (element as HTMLScriptElement).defer = true;
    } else {
      (element as HTMLLinkElement).rel = 'stylesheet';
      (element as HTMLLinkElement).href = href;
    }

    element.onload = () => resolve();
    element.onerror = () => reject(new Error(`Failed to load ${href}`));
    
    document.head.appendChild(element);
  });
};

// Resource hints for improved loading
export const addResourceHints = () => {
  // Preconnect to critical domains
  const criticalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  criticalDomains.forEach(preconnectDomain);
};

// Web Vitals optimization helpers
export const optimizeForWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Reduce layout shift by setting dimensions
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach((img) => {
    if (img instanceof HTMLImageElement && !img.complete) {
      img.style.aspectRatio = '16/9'; // Default aspect ratio
    }
  });

  // Optimize third-party scripts
  const scripts = document.querySelectorAll('script[src*="analytics"], script[src*="tracking"]');
  scripts.forEach((script) => {
    if (script instanceof HTMLScriptElement) {
      script.defer = true;
    }
  });
};