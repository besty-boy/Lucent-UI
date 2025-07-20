import { useEffect } from 'react';
import { DeviceCapabilities } from './useDeviceCapabilities';

export const useGlobalStyles = (capabilities: DeviceCapabilities) => {
  useEffect(() => {
    const styleId = 'lucent-auto-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      existingStyle = document.createElement('style');
      existingStyle.id = styleId;
      document.head.appendChild(existingStyle);
    }

    const autoStyles = `
      :root {
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }
      
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        line-height: 1.6;
      }
      
      ${capabilities.performanceMode === 'high' ? `
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      ` : ''}
      
      ${capabilities.prefersReducedMotion ? `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      ` : ''}
      
      @media (prefers-contrast: high) {
        :root {
          --color-border: #000000;
          --color-borderDark: #ffffff;
        }
      }
      
      @media (prefers-contrast: more) {
        :root {
          --color-background: #ffffff;
          --color-text: #000000;
          --color-border: #000000;
          --text-stroke-width: 0.5px;
          --text-stroke-color: transparent;
        }
        .dark {
          --color-backgroundDark: #0d0d11;
          --color-textDark: #e0e0e0;
          --color-borderDark: #2e2e3a;
          --text-stroke-color: rgba(0,0,0,0.4);
        }
        .high-contrast-text {
          text-shadow: 0 0 4px rgba(0,0,0,0.5);
          -webkit-text-stroke: var(--text-stroke-width) var(--text-stroke-color);
          text-stroke: var(--text-stroke-width) var(--text-stroke-color);
        }
      }
    `;
    
    existingStyle.textContent = autoStyles;
  }, [capabilities.performanceMode, capabilities.prefersReducedMotion]);
};