export interface StyleConfig {
  theme: string;
  variant?: string;
  size?: string;
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled';
}

export const generateStyles = (_config: StyleConfig): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFeatureSettings: '"cv11", "ss01"',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
  };

  return baseStyles;
};

export const createGlobalStyles = (_themeName: string) => {
  return `
    :root {
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      
      /* Typography Scale */
      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.25rem;
      --text-2xl: 1.5rem;
      --text-3xl: 1.875rem;
      --text-4xl: 2.25rem;
      --text-5xl: 3rem;
      --text-6xl: 3.75rem;
      
      /* Spacing Scale */
      --space-0: 0;
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-5: 1.25rem;
      --space-6: 1.5rem;
      --space-8: 2rem;
      --space-10: 2.5rem;
      --space-12: 3rem;
      --space-16: 4rem;
      --space-20: 5rem;
      --space-24: 6rem;
      --space-32: 8rem;
      
      /* Border Radius */
      --radius-sm: 0.125rem;
      --radius-md: 0.375rem;
      --radius-lg: 0.5rem;
      --radius-xl: 0.75rem;
      --radius-2xl: 1rem;
      --radius-full: 9999px;
      
      /* Transitions */
      --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
      --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
      --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
      
      /* Shadows */
      --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html {
      font-size: 16px;
      line-height: 1.5;
      -webkit-text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    body {
      font-family: var(--font-sans);
      font-feature-settings: "cv11", "ss01";
      background-color: var(--color-background);
      color: var(--color-text);
      transition: background-color var(--transition-normal), color var(--transition-normal);
    }
    
    /* Focus styles */
    *:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    *:focus:not(:focus-visible) {
      outline: none;
    }
    
    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
    
    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
      
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
};