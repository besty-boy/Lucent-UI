import { useEffect, useState, useCallback, useMemo } from 'react';

export interface ResponsiveBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  [key: string]: number;
}

export interface ResponsiveConfig {
  breakpoints: ResponsiveBreakpoints;
  containerMaxWidths: Record<string, string>;
  fluidTypography: boolean;
  containerQueries: boolean;
  adaptiveImages: boolean;
  touchOptimization: boolean;
  performanceMode: 'economy' | 'balanced' | 'high';
}

interface DeviceCapabilities {
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  orientation: 'portrait' | 'landscape';
  touchSupport: boolean;
  hoverSupport: boolean;
  pointerType: 'mouse' | 'touch' | 'pen' | 'unknown';
  reducedMotion: boolean;
  highContrast: boolean;
  darkMode: boolean;
  bandwidth: 'slow' | 'fast' | 'unknown';
  deviceMemory: number;
  hardwareConcurrency: number;
}

interface ResponsiveState {
  currentBreakpoint: string;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  containerWidth: number;
  fluidFontSize: string;
  deviceCapabilities: DeviceCapabilities;
}

const DEFAULT_BREAKPOINTS: ResponsiveBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

const DEFAULT_CONTAINER_MAX_WIDTHS = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const useAdvancedResponsive = (config: Partial<ResponsiveConfig> = {}) => {
  const {
    breakpoints = DEFAULT_BREAKPOINTS,
    containerMaxWidths = DEFAULT_CONTAINER_MAX_WIDTHS,
    fluidTypography = true,
    containerQueries = true,
    adaptiveImages = true,
    touchOptimization = true,
    performanceMode = 'balanced'
  } = config;

  const [responsiveState, setResponsiveState] = useState<ResponsiveState>(() => {
    if (typeof window === 'undefined') {
      return {
        currentBreakpoint: 'md',
        isXs: false,
        isSm: false,
        isMd: true,
        isLg: false,
        isXl: false,
        is2Xl: false,
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        containerWidth: 768,
        fluidFontSize: '16px',
        deviceCapabilities: {
          screenWidth: 768,
          screenHeight: 1024,
          devicePixelRatio: 1,
          orientation: 'portrait',
          touchSupport: false,
          hoverSupport: true,
          pointerType: 'mouse',
          reducedMotion: false,
          highContrast: false,
          darkMode: false,
          bandwidth: 'fast',
          deviceMemory: 4,
          hardwareConcurrency: 4
        }
      };
    }

    return calculateResponsiveState();
  });

  // Calculate responsive state
  function calculateResponsiveState(): ResponsiveState {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Find current breakpoint
    const currentBreakpoint = Object.entries(breakpoints)
      .reverse()
      .find(([, value]) => width >= value)?.[0] || 'xs';

    // Device capabilities detection
    const deviceCapabilities: DeviceCapabilities = {
      screenWidth: width,
      screenHeight: height,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: width > height ? 'landscape' : 'portrait',
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      hoverSupport: window.matchMedia('(hover: hover)').matches,
      pointerType: window.matchMedia('(pointer: fine)').matches ? 'mouse' : 
                   window.matchMedia('(pointer: coarse)').matches ? 'touch' : 'unknown',
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches,
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      bandwidth: getBandwidth(),
      deviceMemory: (navigator as any).deviceMemory || 4,
      hardwareConcurrency: navigator.hardwareConcurrency || 4
    };

    // Fluid typography calculation
    const fluidFontSize = fluidTypography ? 
      `clamp(14px, ${0.8 + (width / 1920) * 0.4}rem, 18px)` : '16px';

    return {
      currentBreakpoint,
      isXs: width >= breakpoints.xs && width < breakpoints.sm,
      isSm: width >= breakpoints.sm && width < breakpoints.md,
      isMd: width >= breakpoints.md && width < breakpoints.lg,
      isLg: width >= breakpoints.lg && width < breakpoints.xl,
      isXl: width >= breakpoints.xl && width < breakpoints['2xl'],
      is2Xl: width >= breakpoints['2xl'],
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg,
      containerWidth: width,
      fluidFontSize,
      deviceCapabilities
    };
  }

  // Get bandwidth estimation
  function getBandwidth(): 'slow' | 'fast' | 'unknown' {
    const connection = (navigator as any).connection;
    if (!connection) return 'unknown';
    
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'slow';
    }
    return 'fast';
  }

  // Update responsive state
  const updateResponsiveState = useCallback(() => {
    setResponsiveState(calculateResponsiveState());
  }, [breakpoints, fluidTypography]);

  // Setup event listeners
  useEffect(() => {
    const handleResize = () => {
      updateResponsiveState();
    };

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(updateResponsiveState, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Media query listeners for preference changes
    const mediaQueries = [
      '(prefers-reduced-motion: reduce)',
      '(prefers-contrast: high)',
      '(prefers-color-scheme: dark)',
      '(hover: hover)',
      '(pointer: fine)',
      '(pointer: coarse)'
    ];

    const listeners = mediaQueries.map(query => {
      const mq = window.matchMedia(query);
      const listener = () => updateResponsiveState();
      mq.addEventListener('change', listener);
      return { mq, listener };
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      listeners.forEach(({ mq, listener }) => {
        mq.removeEventListener('change', listener);
      });
    };
  }, [updateResponsiveState]);

  // Container query utility - returns proper hook factory to avoid hook rule violations  
  const createContainerQuery = useCallback(() => {
    // This function creates a hook that can be used in components
    return function useContainerQuery(ref: React.RefObject<HTMLElement>) {
      const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

      useEffect(() => {
        if (!containerQueries || !ref.current) return;

        const observer = new ResizeObserver(entries => {
          const entry = entries[0];
          if (entry) {
            setContainerSize({
              width: entry.contentRect.width,
              height: entry.contentRect.height
            });
          }
        });

        observer.observe(ref.current);
        return () => observer.disconnect();
      }, [ref]);

      return containerSize;
    };
  }, [containerQueries]);

  // Responsive value selector
  const getResponsiveValue = useCallback(<T>(values: Partial<Record<keyof ResponsiveBreakpoints, T>>): T | undefined => {
    const { currentBreakpoint } = responsiveState;
    
    // Find the best matching value
    const breakpointKeys = Object.keys(breakpoints).sort((a, b) => breakpoints[b] - breakpoints[a]);
    
    for (const bp of breakpointKeys) {
      if (values[bp as keyof ResponsiveBreakpoints] !== undefined && 
          responsiveState.containerWidth >= breakpoints[bp]) {
        return values[bp as keyof ResponsiveBreakpoints];
      }
    }
    
    return values[currentBreakpoint as keyof ResponsiveBreakpoints];
  }, [responsiveState, breakpoints]);

  // Adaptive image sizing
  const getAdaptiveImageProps = useCallback((src: string, alt: string) => {
    if (!adaptiveImages) return { src, alt };

    const { screenWidth, devicePixelRatio } = responsiveState.deviceCapabilities;
    const adaptiveWidth = Math.round(screenWidth * devicePixelRatio);
    
    return {
      src,
      alt,
      sizes: `(max-width: ${breakpoints.sm}px) 100vw, (max-width: ${breakpoints.md}px) 50vw, 33vw`,
      srcSet: `${src}?w=${adaptiveWidth}&q=75 1x, ${src}?w=${adaptiveWidth * 2}&q=60 2x`,
      loading: 'lazy' as const,
      decoding: 'async' as const
    };
  }, [adaptiveImages, responsiveState.deviceCapabilities, breakpoints]);

  // Touch optimization
  const getTouchOptimizedProps = useCallback(() => {
    if (!touchOptimization || !responsiveState.deviceCapabilities.touchSupport) {
      return {};
    }

    return {
      style: {
        minHeight: '44px', // Minimum touch target size
        minWidth: '44px',
        touchAction: 'manipulation', // Prevent zoom on double tap
        userSelect: 'none' as const,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }
    };
  }, [touchOptimization, responsiveState.deviceCapabilities]);

  // Generate responsive CSS
  const generateResponsiveCSS = useCallback(() => {
    const breakpointEntries = Object.entries(breakpoints);
    
    return breakpointEntries.map(([name, value]) => {
      const minWidth = value === 0 ? '' : `@media (min-width: ${value}px)`;
      const containerMaxWidth = (containerMaxWidths as any)[name] || '100%';
      
      return `
        ${minWidth} {
          .container-${name} {
            max-width: ${containerMaxWidth};
            margin: 0 auto;
            padding: 0 1rem;
          }
        }
      `;
    }).join('\n');
  }, [breakpoints, containerMaxWidths]);

  // Performance optimized styles
  const getPerformanceOptimizedStyles = useCallback(() => {
    const { deviceCapabilities } = responsiveState;
    const baseStyles = {
      willChange: 'auto' as const,
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
      transform: 'translateZ(0)'
    };

    switch (performanceMode) {
      case 'economy':
        return {
          ...baseStyles,
          transition: 'none',
          animation: 'none',
          filter: 'none',
          backdropFilter: 'none',
          boxShadow: 'none'
        };
      case 'balanced':
        return {
          ...baseStyles,
          transition: deviceCapabilities.reducedMotion ? 'none' : 'all 0.2s ease-out',
          animation: deviceCapabilities.reducedMotion ? 'none' : 'inherit'
        };
      case 'high':
        return {
          ...baseStyles,
          transition: deviceCapabilities.reducedMotion ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: deviceCapabilities.reducedMotion ? 'none' : 'inherit'
        };
      default:
        return baseStyles;
    }
  }, [responsiveState, performanceMode]);

  // Responsive grid system
  const getResponsiveGrid = useCallback((columns: Partial<Record<keyof ResponsiveBreakpoints, number>>) => {
    const currentColumns = getResponsiveValue(columns) || 1;
    
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
      gap: responsiveState.isMobile ? '1rem' : '2rem'
    };
  }, [getResponsiveValue, responsiveState.isMobile]);

  // Memoized computed values
  const memoizedValues = useMemo(() => ({
    currentBreakpoint: responsiveState.currentBreakpoint,
    isMobile: responsiveState.isMobile,
    isTablet: responsiveState.isTablet,
    isDesktop: responsiveState.isDesktop,
    deviceCapabilities: responsiveState.deviceCapabilities,
    fluidFontSize: responsiveState.fluidFontSize,
    containerMaxWidth: (containerMaxWidths as any)[responsiveState.currentBreakpoint] || '100%'
  }), [responsiveState, containerMaxWidths]);

  return {
    ...responsiveState,
    ...memoizedValues,
    createContainerQuery,
    getResponsiveValue,
    getAdaptiveImageProps,
    getTouchOptimizedProps,
    generateResponsiveCSS,
    getPerformanceOptimizedStyles,
    getResponsiveGrid,
    breakpoints,
    updateResponsiveState
  };
};