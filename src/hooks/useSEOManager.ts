import { useEffect } from 'react';
import { LucentTheme } from '../themes';

interface MetaInfo {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  siteName?: string;
}

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useSEOManager = (
  meta: MetaInfo | undefined,
  theme: LucentTheme | null,
  device: DeviceInfo,
  responsive: boolean
) => {
  useEffect(() => {
    const updateMetaTags = () => {
      // Standard meta tags
      if (meta?.title) {
        document.title = meta.title;
      }
      
      const metaTags = [
        { name: 'description', content: meta?.description },
        { name: 'keywords', content: meta?.keywords },
        { name: 'author', content: meta?.author || 'Lucent-UI' },
        { name: 'robots', content: meta?.robots || 'index,follow' },
        { name: 'theme-color', content: theme?.colors.primary },
        { name: 'color-scheme', content: theme?.mode === 'dark' ? 'dark' : theme?.mode === 'light' ? 'light' : 'dark light' },
        
        // Open Graph
        { property: 'og:title', content: meta?.title },
        { property: 'og:description', content: meta?.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: meta?.siteName || 'Lucent-UI' },
        
        // Twitter Card
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

      // Viewport with advanced responsive settings
      if (responsive) {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
          viewport = document.createElement('meta');
          viewport.setAttribute('name', 'viewport');
          document.head.appendChild(viewport);
        }
        
        const viewportContent = device.isMobile 
          ? 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
          : 'width=device-width, initial-scale=1.0';
        
        viewport.setAttribute('content', viewportContent);
      }

      // Performance hints
      const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      preconnectLinks.forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = href;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    };

    updateMetaTags();
  }, [meta, responsive, theme, device]);
};