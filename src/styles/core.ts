export interface StyleConfig {
  theme: string;
  variant?: string;
  size?: string;
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled';
}

export const generateStyles = (_config: StyleConfig): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
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
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;

      /* Typography */
      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.25rem;
      --text-2xl: 1.5rem;
      --text-3xl: 1.875rem;
      --text-4xl: 2.25rem;
      --text-5xl: 3rem;

      /* Spacing */
      --space-0: 0;
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-5: 1.25rem;
      --space-6: 1.5rem;
      --space-8: 2rem;
      --space-12: 3rem;
      --space-16: 4rem;
      --space-24: 6rem;
      --space-32: 8rem;

      /* Radius */
      --radius-sm: 0.125rem;
      --radius-md: 0.375rem;
      --radius-lg: 0.5rem;
      --radius-xl: 0.75rem;
      --radius-2xl: 1rem;
      --radius-full: 9999px;

      /* Shadows */
      --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.03);
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.08);
      --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
      --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
      --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.2);

      /* Transitions */
      --transition-fast: 150ms ease;
      --transition-normal: 250ms ease;
      --transition-slow: 350ms ease;

      /* Light theme (default) */
      --color-background: #ffffff;
      --color-surface: #f8f9fa;
      --color-text: #1a1a1a;
      --color-muted: #6b7280;
      --color-border: #e5e7eb;
      --color-primary: #3b82f6; /* blue-500 */
      --color-secondary: #f472b6; /* pink-400 */
    }

    [data-theme="dark"] {
      --color-background: #0f1117;
      --color-surface: #1a1d24;
      --color-text: #f3f4f6;
      --color-muted: #9ca3af;
      --color-border: #2c313c;
      --color-primary: #60a5fa; /* blue-400 */
      --color-secondary: #f472b6; /* stays pink-400 but on dark = contrast ok */
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 16px;
      line-height: 1.5;
      scroll-behavior: smooth;
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

    a {
      color: var(--color-primary);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    *:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    *:focus:not(:focus-visible) {
      outline: none;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
};
