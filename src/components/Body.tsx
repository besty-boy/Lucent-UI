import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '../providers';
import { BodyProps } from '../types';
import { getTheme, applyThemeToDocument } from '../themes';
import { useDevice } from '../hooks';

interface AutoFeatures {
  prefersReducedMotion: boolean;
  deviceMemory: number;
  connectionType: string;
  darkModeSupported: boolean;
}

export const Body: React.FC<BodyProps> = ({
  children,
  theme = 'velora',
  autoDark = true,
  responsive = true,
  className = '',
  config,
  meta,
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [autoFeatures, setAutoFeatures] = useState<AutoFeatures>({
    prefersReducedMotion: false,
    deviceMemory: 4,
    connectionType: '4g',
    darkModeSupported: true
  });
  const [performanceMode, setPerformanceMode] = useState<'high' | 'balanced' | 'economy'>('balanced');
  const device = useDevice();

  // Get the selected theme
  const selectedTheme = theme !== 'custom' ? getTheme(theme) : null;

  // Auto-detect device capabilities and user preferences
  useEffect(() => {
    const detectFeatures = () => {
      const features: AutoFeatures = {
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        deviceMemory: (navigator as any).deviceMemory || 4,
        connectionType: (navigator as any).connection?.effectiveType || '4g',
        darkModeSupported: window.matchMedia('(prefers-color-scheme: dark)').matches
      };
      
      setAutoFeatures(features);

      // Auto-adjust performance based on device capabilities
      if (features.deviceMemory < 2 || features.connectionType === 'slow-2g' || features.connectionType === '2g') {
        setPerformanceMode('economy');
      } else if (features.deviceMemory >= 8 && features.connectionType === '4g') {
        setPerformanceMode('high');
      } else {
        setPerformanceMode('balanced');
      }
    };

    detectFeatures();

    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleMotionChange = () => detectFeatures();
    const handleDarkChange = () => detectFeatures();

    motionQuery.addEventListener('change', handleMotionChange);
    darkQuery.addEventListener('change', handleDarkChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      darkQuery.removeEventListener('change', handleDarkChange);
    };
  }, []);

  // Enhanced SEO and meta tag management
  useEffect(() => {
    const updateMetaTags = () => {
      // Standard meta tags
      if (meta?.title) {
        document.title = meta.title;
      }
      
      const metaTags = [
        { name: 'description', content: meta?.description },
        { name: 'keywords', content: meta?.keywords },
        { name: 'author', content: meta?.author || 'Lucent-UI' },
        { name: 'robots', content: meta?.robots || 'index,follow' },
        { name: 'theme-color', content: selectedTheme?.colors.primary },
        { name: 'color-scheme', content: selectedTheme?.mode === 'dark' ? 'dark' : selectedTheme?.mode === 'light' ? 'light' : 'dark light' },
        
        // Open Graph
        { property: 'og:title', content: meta?.title },
        { property: 'og:description', content: meta?.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: meta?.siteName || 'Lucent-UI' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: meta?.title },
        { name: 'twitter:description', content: meta?.description },
      ];

      metaTags.forEach(({ name, property, content }) => {
        if (!content) return;
        
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        let metaEl = document.querySelector(selector);
        
        if (!metaEl) {
          metaEl = document.createElement('meta');
          if (name) metaEl.setAttribute('name', name);
          if (property) metaEl.setAttribute('property', property);
          document.head.appendChild(metaEl);
        }
        
        metaEl.setAttribute('content', content);
      });

      // Viewport with advanced responsive settings
      if (responsive) {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
          viewport = document.createElement('meta');
          viewport.setAttribute('name', 'viewport');
          document.head.appendChild(viewport);
        }
        
        const viewportContent = device.isMobile 
          ? 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
          : 'width=device-width, initial-scale=1.0';
        
        viewport.setAttribute('content', viewportContent);
      }

      // Performance hints
      const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      preconnectLinks.forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = href;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    };

    updateMetaTags();
  }, [meta, responsive, selectedTheme, device]);

  // Apply theme with performance optimizations
  useEffect(() => {
    if (selectedTheme) {
      applyThemeToDocument(selectedTheme);
      
      // Add CSS custom properties for better performance
      const root = document.documentElement;
      
      // Performance-based animation settings
      if (autoFeatures.prefersReducedMotion || performanceMode === 'economy') {
        root.style.setProperty('--animation-duration', '0ms');
      } else {
        const animationDuration = performanceMode === 'high' ? '400ms' : '250ms';
        root.style.setProperty('--animation-duration', animationDuration);
      }
      
      // GPU acceleration hints
      if (performanceMode === 'high') {
        root.style.setProperty('--gpu-acceleration', 'translateZ(0)');
      } else {
        root.style.setProperty('--gpu-acceleration', 'none');
      }
    }
  }, [selectedTheme, autoFeatures, performanceMode]);

  // Enhanced theme configuration
  const themeConfig = config || (selectedTheme ? {
    mode: selectedTheme.mode,
    primaryColor: selectedTheme.colors.primary,
    secondaryColor: selectedTheme.colors.secondary,
    borderRadius: selectedTheme.borderRadius,
    animation: autoFeatures.prefersReducedMotion ? 'none' as const : selectedTheme.animation,
  } : {
    mode: autoDark ? 'auto' as const : 'light' as const,
    animation: autoFeatures.prefersReducedMotion ? 'none' as const : 'smooth' as const,
    borderRadius: 'lg' as const,
  });

  // Intelligent responsive classes
  const getResponsiveClasses = () => {
    if (!responsive) return '';
    
    const baseClasses = 'min-h-screen w-full';
    const scrollClasses = device.isMobile ? 'overflow-x-hidden overflow-y-auto' : 'overflow-x-hidden';
    const performanceClasses = performanceMode === 'high' ? 'will-change-transform' : '';
    
    return `${baseClasses} ${scrollClasses} ${performanceClasses}`;
  };

  // Dynamic container classes with performance optimizations
  const containerClasses = `
    ${getResponsiveClasses()}
    bg-[var(--color-background)] dark:bg-[var(--color-backgroundDark)]
    text-[var(--color-text)] dark:text-[var(--color-textDark)]
    transition-all duration-[var(--animation-duration)]
    ${performanceMode === 'economy' ? '' : 'transform-gpu'}
    ${className}
  `.trim();

  // Auto-inject global styles for enhanced experience
  useEffect(() => {
    const styleId = 'lucent-auto-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      existingStyle = document.createElement('style');
      existingStyle.id = styleId;
      document.head.appendChild(existingStyle);
    }

    const autoStyles = `
      :root {
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }
      
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        line-height: 1.6;
      }
      
      ${performanceMode === 'high' ? `
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      ` : ''}
      
      ${autoFeatures.prefersReducedMotion ? `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      ` : ''}
      
      @media (prefers-contrast: high) {
        :root {
          --color-border: #000000;
          --color-borderDark: #ffffff;
        }
      }
      
      @media (prefers-contrast: more) {
        :root {
          --color-background: #ffffff;
          --color-text: #000000;
          --color-border: #000000;
          --text-stroke-width: 0.5px;
          --text-stroke-color: transparent;
        }
        .dark {
          --color-backgroundDark: #0d0d11;
          --color-textDark: #e0e0e0;
          --color-borderDark: #2e2e3a;

          --text-stroke-color: rgba(0,0,0,0.4);
        }
        .high-contrast-text {
          text-shadow: 0 0 4px rgba(0,0,0,0.5);
          -webkit-text-stroke: var(--text-stroke-width) var(--text-stroke-color);
          text-stroke: var(--text-stroke-width) var(--text-stroke-color);
        }
      }
    `;
    
    existingStyle.textContent = autoStyles;
  }, [performanceMode, autoFeatures]);

  return (
    <ThemeProvider config={themeConfig}>
      <div 
        ref={bodyRef}
        className={containerClasses} 
        style={{
          background: selectedTheme?.gradients.background,
        }}
        data-theme={theme}
        data-performance={performanceMode}
        data-device={device.isMobile ? 'mobile' : device.isTablet ? 'tablet' : 'desktop'}
      >
        {children}
        
        {/* Development mode performance monitor */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50">
            Performance: {performanceMode} | Device: {autoFeatures.deviceMemory}GB | Connection: {autoFeatures.connectionType}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};