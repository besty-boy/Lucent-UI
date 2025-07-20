import { useState, useEffect, useCallback } from 'react';
import { useAccessibilityPreferences } from './useAccessibility';
import { applyHighContrastTheme, getHighContrastColors } from '../utils/colorContrast';

interface HighContrastOptions {
  enableAutoDetection?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  intensity?: 'normal' | 'enhanced' | 'maximum';
  persistPreference?: boolean;
}

interface ContrastState {
  enabled: boolean;
  theme: 'light' | 'dark';
  intensity: 'normal' | 'enhanced' | 'maximum';
  colors: Record<string, string>;
}

const HIGH_CONTRAST_STORAGE_KEY = 'lucent-ui-high-contrast';

export const useHighContrast = (options: HighContrastOptions = {}) => {
  const {
    enableAutoDetection = true,
    theme = 'auto',
    intensity = 'normal',
    persistPreference = true
  } = options;

  const preferences = useAccessibilityPreferences();
  
  const [contrastState, setContrastState] = useState<ContrastState>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined' && persistPreference) {
      const stored = localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // Fallback to default
        }
      }
    }

    const resolvedTheme = theme === 'auto' 
      ? (preferences.prefersColorScheme === 'dark' ? 'dark' : 'light')
      : theme;
    
    return {
      enabled: enableAutoDetection ? preferences.prefersHighContrast : false,
      theme: resolvedTheme,
      intensity,
      colors: getHighContrastColors(resolvedTheme)
    };
  });

  // Update contrast state when preferences change
  useEffect(() => {
    if (enableAutoDetection) {
      const resolvedTheme = theme === 'auto' 
        ? (preferences.prefersColorScheme === 'dark' ? 'dark' : 'light')
        : theme;

      setContrastState(prev => ({
        ...prev,
        enabled: preferences.prefersHighContrast,
        theme: resolvedTheme,
        colors: getHighContrastColors(resolvedTheme)
      }));
    }
  }, [preferences.prefersHighContrast, preferences.prefersColorScheme, enableAutoDetection, theme]);

  // Apply contrast theme to document
  const applyContrastTheme = useCallback(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    if (contrastState.enabled) {
      applyHighContrastTheme(true, contrastState.theme);
      
      // Apply intensity-specific adjustments
      root.setAttribute('data-contrast-intensity', contrastState.intensity);
      
      // Enhanced intensity adjustments
      if (contrastState.intensity === 'enhanced') {
        root.style.setProperty('--contrast-multiplier', '1.2');
        root.style.setProperty('--text-shadow', '0 0 1px currentColor');
      } else if (contrastState.intensity === 'maximum') {
        root.style.setProperty('--contrast-multiplier', '1.5');
        root.style.setProperty('--text-shadow', '0 0 2px currentColor');
        root.style.setProperty('--border-width-multiplier', '2');
      } else {
        root.style.setProperty('--contrast-multiplier', '1');
        root.style.removeProperty('--text-shadow');
        root.style.removeProperty('--border-width-multiplier');
      }

      // Force focus indicators to be more visible
      root.style.setProperty('--focus-ring-width', '3px');
      root.style.setProperty('--focus-ring-color', contrastState.colors.focus);
      
    } else {
      applyHighContrastTheme(false);
      root.removeAttribute('data-contrast-intensity');
      root.style.removeProperty('--contrast-multiplier');
      root.style.removeProperty('--text-shadow');
      root.style.removeProperty('--border-width-multiplier');
      root.style.removeProperty('--focus-ring-width');
      root.style.removeProperty('--focus-ring-color');
    }
  }, [contrastState]);

  // Apply theme on state changes
  useEffect(() => {
    applyContrastTheme();
    
    // Persist preference
    if (persistPreference && typeof window !== 'undefined') {
      localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, JSON.stringify(contrastState));
    }
  }, [contrastState, applyContrastTheme, persistPreference]);

  // Toggle high contrast mode
  const toggleHighContrast = useCallback((enabled?: boolean) => {
    setContrastState(prev => ({
      ...prev,
      enabled: enabled !== undefined ? enabled : !prev.enabled
    }));
  }, []);

  // Change contrast theme
  const setContrastTheme = useCallback((newTheme: 'light' | 'dark') => {
    setContrastState(prev => ({
      ...prev,
      theme: newTheme,
      colors: getHighContrastColors(newTheme)
    }));
  }, []);

  // Change contrast intensity
  const setContrastIntensity = useCallback((newIntensity: 'normal' | 'enhanced' | 'maximum') => {
    setContrastState(prev => ({
      ...prev,
      intensity: newIntensity
    }));
  }, []);

  // Get contrast-safe colors for components
  const getContrastColors = useCallback(() => {
    if (!contrastState.enabled) return null;
    return contrastState.colors;
  }, [contrastState.enabled, contrastState.colors]);

  // Check if current colors meet high contrast requirements
  const validateContrast = useCallback((_foreground: string, _background: string) => {
    if (typeof window === 'undefined') return true;
    
    // This would integrate with the color contrast utilities
    // For now, return true if high contrast is enabled
    return contrastState.enabled;
  }, [contrastState.enabled]);

  return {
    enabled: contrastState.enabled,
    theme: contrastState.theme,
    intensity: contrastState.intensity,
    colors: contrastState.colors,
    toggleHighContrast,
    setContrastTheme,
    setContrastIntensity,
    getContrastColors,
    validateContrast,
    applyContrastTheme
  };
};

// Hook for component-level high contrast support
export const useContrastAware = () => {
  const { enabled, colors, intensity } = useHighContrast();

  const getContrastStyles = useCallback((baseStyles: React.CSSProperties = {}): React.CSSProperties => {
    if (!enabled || !colors) return baseStyles;

    const contrastStyles: React.CSSProperties = {
      ...baseStyles,
    };

    // Apply high contrast color overrides
    if (baseStyles.color === undefined) {
      contrastStyles.color = colors.text;
    }
    
    if (baseStyles.backgroundColor === undefined) {
      contrastStyles.backgroundColor = colors.background;
    }

    // Enhanced border visibility
    if (intensity === 'enhanced' || intensity === 'maximum') {
      contrastStyles.borderWidth = baseStyles.borderWidth ? 
        `calc(${baseStyles.borderWidth} * var(--border-width-multiplier, 1))` : 
        '2px';
      contrastStyles.borderColor = colors.border;
    }

    // Text shadow for maximum contrast
    if (intensity === 'maximum') {
      contrastStyles.textShadow = 'var(--text-shadow)';
    }

    return contrastStyles;
  }, [enabled, colors, intensity]);

  const getContrastClasses = useCallback((baseClasses: string = ''): string => {
    if (!enabled) return baseClasses;

    const contrastClasses = [
      baseClasses,
      'high-contrast',
      `contrast-${intensity}`,
      `contrast-theme-${colors ? (colors.background === '#000000' ? 'dark' : 'light') : 'light'}`
    ].filter(Boolean).join(' ');

    return contrastClasses;
  }, [enabled, intensity, colors]);

  return {
    enabled,
    intensity,
    getContrastStyles,
    getContrastClasses
  };
};

// CSS-in-JS helper for high contrast styles
export const createHighContrastStyles = () => {
  return `
    /* High Contrast Base Styles */
    [data-high-contrast="true"] {
      --animation-duration: 0s !important;
      --transition-duration: 0s !important;
    }

    [data-high-contrast="true"] * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }

    /* Enhanced contrast adjustments */
    [data-contrast-intensity="enhanced"] {
      --shadow-intensity: 2;
      --border-intensity: 1.5;
    }

    [data-contrast-intensity="maximum"] {
      --shadow-intensity: 3;
      --border-intensity: 2;
      --font-weight-boost: 100;
    }

    /* High contrast focus styles */
    [data-high-contrast="true"] *:focus {
      outline: var(--focus-ring-width, 3px) solid var(--focus-ring-color, #00ffff) !important;
      outline-offset: 2px !important;
    }

    /* High contrast button styles */
    [data-high-contrast="true"] button {
      border: 2px solid var(--hc-border) !important;
      font-weight: 600 !important;
    }

    /* High contrast link styles */
    [data-high-contrast="true"] a {
      text-decoration: underline !important;
      text-decoration-thickness: 2px !important;
    }

    /* High contrast form styles */
    [data-high-contrast="true"] input,
    [data-high-contrast="true"] select,
    [data-high-contrast="true"] textarea {
      border: 2px solid var(--hc-border) !important;
      background: var(--hc-background) !important;
      color: var(--hc-text) !important;
    }
  `;
};