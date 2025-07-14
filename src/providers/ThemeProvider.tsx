import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig } from '../types';

const ThemeContext = createContext<{
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  toggleDarkMode: () => void;
}>({
  theme: { mode: 'auto', animation: 'smooth', borderRadius: 'lg' },
  setTheme: () => {},
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode; config?: ThemeConfig }> = ({ 
  children, 
  config = { mode: 'auto', animation: 'smooth', borderRadius: 'lg' } 
}) => {
  const [theme, setTheme] = useState<ThemeConfig>(config);

  const toggleDarkMode = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'dark' ? 'light' : 'dark'
    }));
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Auto-detect system theme
    if (theme.mode === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      root.classList.toggle('dark', theme.mode === 'dark');
    }

    // Apply CSS variables for premium theming
    if (theme.primaryColor) {
      root.style.setProperty('--primary-color', theme.primaryColor);
    }
    if (theme.secondaryColor) {
      root.style.setProperty('--secondary-color', theme.secondaryColor);
    }

    // Apply border radius
    if (theme.borderRadius) {
      const radiusMap = {
        none: '0px',
        sm: '0.125rem',
        md: '0.375rem', 
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      };
      root.style.setProperty('--border-radius', radiusMap[theme.borderRadius || 'lg']);
    }

    // Apply animation duration
    if (theme.animation) {
      const animationMap = {
        none: '0ms',
        subtle: '150ms',
        smooth: '300ms',
        energetic: '500ms',
      };
      root.style.setProperty('--animation-duration', animationMap[theme.animation]);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
