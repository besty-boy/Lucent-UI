import { useEffect } from 'react';
import { LucentTheme, applyThemeToDocument } from '../themes';
import { DeviceCapabilities } from './useDeviceCapabilities';

export const useThemeApplication = (
  theme: LucentTheme | null,
  autoDark: boolean,
  capabilities: DeviceCapabilities
) => {
  useEffect(() => {
    if (!theme) return;

    // Create theme with current auto mode configuration
    const themeToApply = {
      ...theme,
      mode: autoDark ? 'auto' as const : theme.mode,
    };
    
    applyThemeToDocument(themeToApply);
    
    // Listen for system theme changes if auto mode
    if (autoDark) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Re-apply the theme to update CSS variables
        applyThemeToDocument(themeToApply);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    // Add CSS custom properties for better performance
    const root = document.documentElement;
    
    // Performance-based animation settings
    if (capabilities.prefersReducedMotion || capabilities.performanceMode === 'economy') {
      root.style.setProperty('--animation-duration', '0ms');
    } else {
      const animationDuration = capabilities.performanceMode === 'high' ? '400ms' : '250ms';
      root.style.setProperty('--animation-duration', animationDuration);
    }
    
    // GPU acceleration hints
    if (capabilities.performanceMode === 'high') {
      root.style.setProperty('--gpu-acceleration', 'translateZ(0)');
    } else {
      root.style.setProperty('--gpu-acceleration', 'none');
    }
  }, [theme, autoDark, capabilities]);

  return {
    performanceMode: capabilities.performanceMode,
    reducedMotion: capabilities.prefersReducedMotion
  };
};