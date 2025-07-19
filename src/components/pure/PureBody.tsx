import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { BodyProps } from '../../types';
import { getTheme, applyThemeToDocument } from '../../themes';
import { createGlobalStyles } from '../../styles/core';

export const PureBody: React.FC<BodyProps> = ({
  children,
  theme = 'velora',
  autoDark = true,
  responsive = true,
  className = '',
  config,
  meta,
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const selectedTheme = theme !== 'custom' ? getTheme(theme) : null;

  // Inject global styles
  useEffect(() => {
    setMounted(true);
    
    // Remove any existing Lucent styles
    const existingStyles = document.querySelectorAll('style[data-lucent]');
    existingStyles.forEach(style => style.remove());

    // Create and inject our pure CSS styles
    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-lucent', 'true');
    styleElement.textContent = createGlobalStyles(theme);
    document.head.appendChild(styleElement);

    // Apply theme
    if (selectedTheme) {
      applyThemeToDocument(selectedTheme);
    }

    // Enhanced meta tags
    if (meta?.title) {
      document.title = meta.title;
    }

    const metaTags = [
      { name: 'description', content: meta?.description },
      { name: 'keywords', content: meta?.keywords },
      { name: 'author', content: meta?.author || 'Lucent-UI' },
      { name: 'robots', content: meta?.robots || 'index,follow' },
      { name: 'theme-color', content: selectedTheme?.colors.primary },
      { name: 'viewport', content: responsive ? 'width=device-width, initial-scale=1.0' : undefined },
      
      // Open Graph
      { property: 'og:title', content: meta?.title },
      { property: 'og:description', content: meta?.description },
      { property: 'og:type', content: 'website' },
      
      // Twitter
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

    return () => {
      const lucentStyles = document.querySelectorAll('style[data-lucent]');
      lucentStyles.forEach(style => style.remove());
    };
  }, [theme, selectedTheme, meta, responsive]);

  const getBodyStyles = (): React.CSSProperties => ({
    minHeight: responsive ? '100vh' : 'auto',
    width: '100%',
    backgroundColor: 'var(--color-background)',
    color: 'var(--current-text)',
    fontFamily: 'var(--font-sans)',
    lineHeight: 1.6,
    transition: 'all var(--transition-normal)',
    position: 'relative',
    overflow: responsive ? 'hidden auto' : 'visible',
    ...(selectedTheme?.gradients.background && {
      background: selectedTheme.gradients.background,
    }),
  });

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  // Enhanced theme configuration
  const themeConfig = config || (selectedTheme ? {
    mode: selectedTheme.mode,
    primaryColor: selectedTheme.colors.primary,
    secondaryColor: selectedTheme.colors.secondary,
    borderRadius: selectedTheme.borderRadius,
    animation: selectedTheme.animation,
  } : {
    mode: autoDark ? 'auto' as const : 'light' as const,
    animation: 'smooth' as const,
    borderRadius: 'lg' as const,
  });

  return (
    <ThemeProvider config={themeConfig}>
      <div
        ref={bodyRef}
        style={getBodyStyles()}
        className={className}
        data-theme={theme}
        data-lucent-body="true"
      >
        {children}
      </div>
    </ThemeProvider>
  );
};