import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAdvancedResponsive } from './useAdvancedResponsive';
import { usePerformanceOptimization } from './usePerformanceOptimization';

export interface DynamicThemeConfig {
  adaptToTime?: boolean;
  adaptToWeather?: boolean;
  adaptToLocation?: boolean;
  adaptToUserActivity?: boolean;
  adaptToSystemTheme?: boolean;
  adaptToAmbientLight?: boolean;
  smoothTransitions?: boolean;
  cacheThemes?: boolean;
  performanceMode?: 'economy' | 'balanced' | 'high';
}

export interface ThemeContext {
  timeOfDay: 'morning' | 'day' | 'evening' | 'night';
  weather?: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  location?: 'indoor' | 'outdoor';
  userActivity?: 'working' | 'gaming' | 'reading' | 'relaxing';
  systemTheme: 'light' | 'dark';
  ambientLight?: 'bright' | 'dim' | 'dark';
  batteryLevel?: number;
  isCharging?: boolean;
}

export interface AdaptiveThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface DynamicTheme {
  colors: AdaptiveThemeColors;
  typography: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animation: {
    duration: string;
    easing: string;
    reducedMotion: boolean;
  };
  effects: {
    blur: string;
    shadow: string;
    brightness: string;
    contrast: string;
  };
}

export const useDynamicTheme = (config: DynamicThemeConfig = {}) => {
  const {
    adaptToTime = true,
    adaptToSystemTheme = true,
    adaptToAmbientLight = false,
    smoothTransitions = true,
    cacheThemes = true,
    performanceMode = 'balanced'
  } = config;

  const responsive = useAdvancedResponsive();
  const performance = usePerformanceOptimization();

  const [themeContext, setThemeContext] = useState<ThemeContext>({
    timeOfDay: 'day',
    systemTheme: 'light',
    batteryLevel: 100,
    isCharging: true
  });

  const [dynamicTheme, setDynamicTheme] = useState<DynamicTheme | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Theme cache for performance
  const themeCache = useMemo(() => new Map<string, DynamicTheme>(), []);

  // Base theme configurations
  const baseThemes = useMemo(() => ({
    light: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#F59E0B',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: '#1F2937',
        muted: '#6B7280',
        border: '#E5E7EB',
        error: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981',
        info: '#3B82F6'
      }
    },
    dark: {
      colors: {
        primary: '#60A5FA',
        secondary: '#A78BFA',
        accent: '#FBBF24',
        background: '#111827',
        surface: '#1F2937',
        text: '#F9FAFB',
        muted: '#9CA3AF',
        border: '#374151',
        error: '#F87171',
        warning: '#FBBF24',
        success: '#34D399',
        info: '#60A5FA'
      }
    }
  }), []);

  // Get time of day
  const getTimeOfDay = useCallback((): 'morning' | 'day' | 'evening' | 'night' => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'day';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }, []);

  // Get system theme
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Get battery information
  const getBatteryInfo = useCallback(async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return {
          level: battery.level * 100,
          charging: battery.charging
        };
      } catch (error) {
        console.warn('Battery API not available');
      }
    }
    return { level: 100, charging: true };
  }, []);

  // Get ambient light information
  const getAmbientLight = useCallback((): Promise<'bright' | 'dim' | 'dark'> => {
    return new Promise((resolve) => {
      if ('AmbientLightSensor' in window) {
        try {
          const sensor = new (window as any).AmbientLightSensor();
          sensor.onreading = () => {
            const lux = sensor.illuminance;
            if (lux > 40) resolve('bright');
            else if (lux > 10) resolve('dim');
            else resolve('dark');
          };
          sensor.start();
        } catch (error) {
          console.warn('Ambient Light Sensor not available');
          resolve('bright');
        }
      } else {
        resolve('bright');
      }
    });
  }, []);

  // Update theme context
  const updateThemeContext = useCallback(async () => {
    const newContext: ThemeContext = {
      timeOfDay: adaptToTime ? getTimeOfDay() : 'day',
      systemTheme: adaptToSystemTheme ? getSystemTheme() : 'light'
    };

    if (adaptToAmbientLight) {
      newContext.ambientLight = await getAmbientLight();
    }

    const batteryInfo = await getBatteryInfo();
    newContext.batteryLevel = batteryInfo.level;
    newContext.isCharging = batteryInfo.charging;

    setThemeContext(newContext);
  }, [adaptToTime, adaptToSystemTheme, adaptToAmbientLight, getTimeOfDay, getSystemTheme, getAmbientLight, getBatteryInfo]);

  // Generate cache key
  const getCacheKey = useCallback((context: ThemeContext) => {
    return JSON.stringify({
      timeOfDay: context.timeOfDay,
      systemTheme: context.systemTheme,
      ambientLight: context.ambientLight,
      batteryLevel: context.batteryLevel ? Math.round(context.batteryLevel / 10) * 10 : 100,
      deviceType: responsive.isMobile ? 'mobile' : responsive.isTablet ? 'tablet' : 'desktop',
      performanceMode
    });
  }, [responsive.isMobile, responsive.isTablet, performanceMode]);

  // Generate adaptive theme
  const generateAdaptiveTheme = useCallback((context: ThemeContext): DynamicTheme => {
    const cacheKey = getCacheKey(context);
    
    if (cacheThemes && themeCache.has(cacheKey)) {
      return themeCache.get(cacheKey)!;
    }

    const baseTheme = baseThemes[context.systemTheme];
    let adaptedColors = { ...baseTheme.colors };

    // Time-based adaptations
    if (adaptToTime) {
      switch (context.timeOfDay) {
        case 'morning':
          adaptedColors = {
            ...adaptedColors,
            primary: '#10B981', // Green for freshness
            accent: '#F59E0B'
          };
          break;
        case 'day':
          adaptedColors = {
            ...adaptedColors,
            primary: '#3B82F6', // Blue for productivity
            accent: '#8B5CF6'
          };
          break;
        case 'evening':
          adaptedColors = {
            ...adaptedColors,
            primary: '#F59E0B', // Warm orange
            accent: '#EF4444'
          };
          break;
        case 'night':
          adaptedColors = {
            ...adaptedColors,
            primary: '#6366F1', // Purple for relaxation
            accent: '#8B5CF6',
            background: context.systemTheme === 'light' ? '#F3F4F6' : '#0F172A'
          };
          break;
      }
    }

    // Ambient light adaptations
    if (adaptToAmbientLight && context.ambientLight) {
      switch (context.ambientLight) {
        case 'bright':
          adaptedColors = {
            ...adaptedColors,
            text: context.systemTheme === 'light' ? '#000000' : '#FFFFFF'
          };
          break;
        case 'dim':
          adaptedColors = {
            ...adaptedColors,
            text: context.systemTheme === 'light' ? '#374151' : '#D1D5DB'
          };
          break;
        case 'dark':
          adaptedColors = {
            ...adaptedColors,
            text: context.systemTheme === 'light' ? '#6B7280' : '#9CA3AF',
            background: context.systemTheme === 'light' ? '#F9FAFB' : '#0F172A'
          };
          break;
      }
    }

    // Battery level adaptations
    if (context.batteryLevel !== undefined && context.batteryLevel < 20 && !context.isCharging) {
      // Reduce visual complexity for battery saving
      adaptedColors = {
        ...adaptedColors,
        background: context.systemTheme === 'light' ? '#FFFFFF' : '#000000',
        surface: context.systemTheme === 'light' ? '#FFFFFF' : '#111111'
      };
    }

    // Performance-based adaptations
    const animationConfig = performance.getOptimizedAnimationConfig();
    
    const theme: DynamicTheme = {
      colors: adaptedColors,
      typography: {
        fontSize: responsive.fluidFontSize,
        lineHeight: responsive.isMobile ? '1.5' : '1.6',
        fontWeight: '400',
        letterSpacing: '0em'
      },
      spacing: {
        xs: responsive.isMobile ? '0.5rem' : '0.75rem',
        sm: responsive.isMobile ? '0.75rem' : '1rem',
        md: responsive.isMobile ? '1rem' : '1.5rem',
        lg: responsive.isMobile ? '1.5rem' : '2rem',
        xl: responsive.isMobile ? '2rem' : '3rem'
      },
      animation: {
        duration: `${animationConfig.duration}ms`,
        easing: animationConfig.easing,
        reducedMotion: animationConfig.reduceMotion
      },
      effects: {
        blur: animationConfig.enableBlur ? '10px' : '0px',
        shadow: animationConfig.enableShadows ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        brightness: context.ambientLight === 'bright' ? '1.1' : '1',
        contrast: context.ambientLight === 'dim' ? '1.1' : '1'
      }
    };

    if (cacheThemes) {
      themeCache.set(cacheKey, theme);
    }

    return theme;
  }, [
    getCacheKey,
    cacheThemes,
    themeCache,
    baseThemes,
    adaptToTime,
    adaptToAmbientLight,
    performance,
    responsive
  ]);

  // Apply theme to document
  const applyThemeToDocument = useCallback((theme: DynamicTheme) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const { colors, typography, spacing, animation, effects } = theme;

    // Apply CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(typography).forEach(([key, value]) => {
      root.style.setProperty(`--typography-${key}`, value);
    });

    Object.entries(spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    Object.entries(animation).forEach(([key, value]) => {
      root.style.setProperty(`--animation-${key}`, value.toString());
    });

    Object.entries(effects).forEach(([key, value]) => {
      root.style.setProperty(`--effect-${key}`, value);
    });

    // Apply smooth transitions
    if (smoothTransitions && !theme.animation.reducedMotion) {
      root.style.transition = 'all 0.3s ease-in-out';
    }
  }, [smoothTransitions]);

  // Theme transition
  const transitionToTheme = useCallback(async (newTheme: DynamicTheme) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (smoothTransitions && !newTheme.animation.reducedMotion) {
      // Fade out
      document.documentElement.style.opacity = '0.7';
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    applyThemeToDocument(newTheme);
    setDynamicTheme(newTheme);

    if (smoothTransitions && !newTheme.animation.reducedMotion) {
      // Fade in
      document.documentElement.style.opacity = '1';
    }

    setIsTransitioning(false);
  }, [isTransitioning, smoothTransitions, applyThemeToDocument]);

  // Update theme when context changes
  useEffect(() => {
    const newTheme = generateAdaptiveTheme(themeContext);
    transitionToTheme(newTheme);
  }, [themeContext, generateAdaptiveTheme, transitionToTheme]);

  // Set up periodic context updates
  useEffect(() => {
    updateThemeContext();

    const interval = setInterval(updateThemeContext, 60000); // Update every minute

    // System theme change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => updateThemeContext();
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [updateThemeContext]);

  // Manual theme override
  const overrideTheme = useCallback((overrides: Partial<DynamicTheme>) => {
    if (!dynamicTheme) return;

    const newTheme = {
      ...dynamicTheme,
      ...overrides,
      colors: {
        ...dynamicTheme.colors,
        ...overrides.colors
      }
    };

    transitionToTheme(newTheme);
  }, [dynamicTheme, transitionToTheme]);

  // Force theme update
  const forceUpdate = useCallback(() => {
    updateThemeContext();
  }, [updateThemeContext]);

  return {
    theme: dynamicTheme,
    themeContext,
    isTransitioning,
    overrideTheme,
    forceUpdate,
    cacheSize: themeCache.size
  };
};