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
          <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50">
            Performance: {capabilities.performanceMode} | Device: {capabilities.deviceMemory}GB | Connection: {capabilities.connectionType}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};