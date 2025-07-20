import { useCallback, useEffect, useRef, useState } from 'react';

interface AccessibilityOptions {
  announceChanges?: boolean;
  enableReducedMotion?: boolean;
  enableHighContrast?: boolean;
  enableFocusVisible?: boolean;
}

// Screen reader announcements
export const useScreenReader = () => {
  const announceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only lucent-screen-reader';
    liveRegion.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    
    document.body.appendChild(liveRegion);
    announceRef.current = liveRegion;

    return () => {
      if (announceRef.current && document.body.contains(announceRef.current)) {
        document.body.removeChild(announceRef.current);
      }
    };
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!announceRef.current) return;

    announceRef.current.setAttribute('aria-live', priority);
    announceRef.current.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (announceRef.current) {
        announceRef.current.textContent = '';
      }
    }, 1000);
  }, []);

  return { announce };
};

// ARIA attributes generator
export const useAriaAttributes = () => {
  const generateId = useCallback((prefix: string = 'lucent') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const getButtonAttributes = useCallback((
    label: string,
    options: {
      disabled?: boolean;
      pressed?: boolean;
      expanded?: boolean;
      hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
      controls?: string;
      describedBy?: string;
    } = {}
  ) => {
    const attributes: Record<string, any> = {
      'aria-label': label,
      role: 'button',
      tabIndex: options.disabled ? -1 : 0
    };

    if (options.disabled) attributes['aria-disabled'] = true;
    if (options.pressed !== undefined) attributes['aria-pressed'] = options.pressed;
    if (options.expanded !== undefined) attributes['aria-expanded'] = options.expanded;
    if (options.hasPopup) attributes['aria-haspopup'] = options.hasPopup;
    if (options.controls) attributes['aria-controls'] = options.controls;
    if (options.describedBy) attributes['aria-describedby'] = options.describedBy;

    return attributes;
  }, []);

  const getInputAttributes = useCallback((
    label: string,
    options: {
      required?: boolean;
      invalid?: boolean;
      describedBy?: string;
      placeholder?: string;
      autoComplete?: string;
    } = {}
  ) => {
    const attributes: Record<string, any> = {
      'aria-label': label
    };

    if (options.required) attributes['aria-required'] = true;
    if (options.invalid) attributes['aria-invalid'] = true;
    if (options.describedBy) attributes['aria-describedby'] = options.describedBy;
    if (options.autoComplete) attributes.autoComplete = options.autoComplete;

    return attributes;
  }, []);

  const getRegionAttributes = useCallback((
    label: string,
    options: {
      role?: 'main' | 'navigation' | 'banner' | 'contentinfo' | 'complementary' | 'region';
      labelledBy?: string;
      describedBy?: string;
    } = {}
  ) => {
    const attributes: Record<string, any> = {
      'aria-label': label
    };

    if (options.role) attributes.role = options.role;
    if (options.labelledBy) attributes['aria-labelledby'] = options.labelledBy;
    if (options.describedBy) attributes['aria-describedby'] = options.describedBy;

    return attributes;
  }, []);

  return {
    generateId,
    getButtonAttributes,
    getInputAttributes,
    getRegionAttributes
  };
};

// Accessibility preferences detection
export const useAccessibilityPreferences = () => {
  const [preferences, setPreferences] = useState({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersColorScheme: 'light' as 'light' | 'dark' | 'no-preference'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
        prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : window.matchMedia('(prefers-color-scheme: light)').matches 
            ? 'light' 
            : 'no-preference'
      });
    };

    updatePreferences();

    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(prefers-color-scheme: light)')
    ];

    mediaQueries.forEach(mq => mq.addEventListener('change', updatePreferences));

    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', updatePreferences));
    };
  }, []);

  return preferences;
};

// Focus management
export const useFocusManagement = () => {
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    let isMouseDown = false;

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleFocus = () => {
      if (!isMouseDown) {
        setFocusVisible(true);
      }
    };

    const handleBlur = () => {
      setFocusVisible(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  return { focusVisible };
};

// Main accessibility hook
export const useAccessibility = (options: AccessibilityOptions = {}) => {
  const { announce } = useScreenReader();
  const ariaUtils = useAriaAttributes();
  const preferences = useAccessibilityPreferences();
  const { focusVisible } = useFocusManagement();

  const {
    announceChanges = true,
    enableReducedMotion = true,
    enableHighContrast = true,
    enableFocusVisible = true
  } = options;

  // Apply accessibility styles based on preferences
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    if (enableReducedMotion && preferences.prefersReducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    }

    if (enableHighContrast && preferences.prefersHighContrast) {
      root.setAttribute('data-high-contrast', 'true');
    } else {
      root.removeAttribute('data-high-contrast');
    }

    if (enableFocusVisible) {
      if (focusVisible) {
        root.setAttribute('data-focus-visible', 'true');
      } else {
        root.removeAttribute('data-focus-visible');
      }
    }
  }, [preferences, focusVisible, enableReducedMotion, enableHighContrast, enableFocusVisible]);

  return {
    announce: announceChanges ? announce : () => {},
    ariaUtils,
    preferences,
    focusVisible
  };
};