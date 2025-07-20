import React, { useRef, useMemo } from 'react';
import { ThemeProvider } from '../providers';
import { BodyProps } from '../types';
import { getTheme } from '../themes';
import { useDevice } from '../hooks';

// New specialized hooks
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';
import { useSEOManager } from '../hooks/useSEOManager';
import { useThemeApplication } from '../hooks/useThemeApplication';
import { useResponsiveStyles } from '../hooks/useResponsiveStyles';
import { useGlobalStyles } from '../hooks/useGlobalStyles';
import { useLCPOptimization, autoOptimizeLCP } from '../hooks/useLCPOptimization';
import { useCriticalResources } from '../hooks/useCriticalResources';
import { useTypography } from '../hooks/useTypography';
import { useHighContrast } from '../hooks/useHighContrast';

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
  
  // Specialized hooks for different responsibilities
  const device = useDevice();
  const capabilities = useDeviceCapabilities();
  const selectedTheme = theme !== 'custom' ? getTheme(theme) : null;
  
  // Apply SEO and meta tags
  useSEOManager(meta, selectedTheme, device, responsive);
  
  // Apply theme with performance optimizations
  useThemeApplication(selectedTheme, autoDark, capabilities);
  
  // Generate responsive styles
  const { containerClasses, containerStyle, dataAttributes } = useResponsiveStyles(
    responsive, 
    device, 
    capabilities, 
    className
  );
  
  // Inject global styles
  useGlobalStyles(capabilities);

  // Optimize LCP (Largest Contentful Paint)
  useLCPOptimization({
    enableLCPTracking: process.env.NODE_ENV === 'development',
    criticalImages: meta?.images || [],
    criticalFonts: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ],
    onLCPMeasure: (value) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`LCP: ${value.toFixed(2)}ms`);
      }
    }
  });

  // Critical resources preloading
  useCriticalResources({
    preloadFonts: [
      'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2'
    ],
    preloadImages: meta?.images || [],
    preconnectDomains: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
    enableWebVitalsOptimization: true
  });

  // Auto-optimize LCP elements after render
  React.useEffect(() => {
    const timeoutId = setTimeout(autoOptimizeLCP, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Initialize typography optimization
  useTypography({
    enableDynamicScaling: true,
    enableOptimalLineHeight: true,
    enableReadabilityMode: capabilities.prefersReducedMotion,
    baseFontSize: 16,
    maxFontSize: 24,
    minFontSize: 14
  });

  // Initialize high contrast mode
  const { enabled: highContrastEnabled, intensity: contrastIntensity } = useHighContrast({
    enableAutoDetection: true,
    theme: 'auto',
    intensity: 'normal',
    persistPreference: true
  });

  // Enhanced theme configuration with memoization
  const themeConfig = useMemo(() => {
    return config || (selectedTheme ? {
      mode: selectedTheme.mode,
      primaryColor: selectedTheme.colors.primary,
      secondaryColor: selectedTheme.colors.secondary,
      borderRadius: selectedTheme.borderRadius,
      animation: capabilities.prefersReducedMotion ? 'none' as const : selectedTheme.animation,
    } : {
      mode: autoDark ? 'auto' as const : 'light' as const,
      animation: capabilities.prefersReducedMotion ? 'none' as const : 'smooth' as const,
      borderRadius: 'lg' as const,
    });
  }, [config, selectedTheme, capabilities.prefersReducedMotion, autoDark]);

  return (
    <ThemeProvider config={themeConfig}>
      <div 
        ref={bodyRef}
        className={containerClasses}
        style={containerStyle}
        data-theme={theme}
        {...dataAttributes}
      >
        {children}
        
        {/* Development mode performance monitor */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50 space-y-1">
            <div>Performance: {capabilities.performanceMode} | Device: {capabilities.deviceMemory}GB</div>
            <div>Connection: {capabilities.connectionType}</div>
            <div>High Contrast: {highContrastEnabled ? `Yes (${contrastIntensity})` : 'No'}</div>
            <div>Reduced Motion: {capabilities.prefersReducedMotion ? 'Yes' : 'No'}</div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};