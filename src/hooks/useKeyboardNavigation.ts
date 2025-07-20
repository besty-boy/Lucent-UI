import { useEffect, useRef, useCallback } from 'react';

interface KeyboardNavigationOptions {
  enableArrowKeys?: boolean;
  enableHomeEnd?: boolean;
  enableEscape?: boolean;
  onEscape?: () => void;
  orientation?: 'horizontal' | 'vertical' | 'both';
  wrap?: boolean;
  autoFocus?: boolean;
}

export const useKeyboardNavigation = (
  options: KeyboardNavigationOptions = {}
) => {
  const containerRef = useRef<HTMLElement>(null);
  const {
    enableArrowKeys = true,
    enableHomeEnd = true,
    enableEscape = true,
    onEscape,
    orientation = 'both',
    wrap = true,
    autoFocus = false
  } = options;

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
      '[role="menuitem"]:not([disabled])',
      '[role="tab"]:not([disabled])'
    ].join(', ');

    const elements = containerRef.current.querySelectorAll(focusableSelectors);
    return Array.from(elements) as HTMLElement[];
  }, []);

  const moveFocus = useCallback((direction: 'next' | 'previous' | 'first' | 'last') => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    let nextIndex: number;

    switch (direction) {
      case 'next':
        nextIndex = currentIndex + 1;
        if (nextIndex >= focusableElements.length) {
          nextIndex = wrap ? 0 : currentIndex;
        }
        break;
      case 'previous':
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = wrap ? focusableElements.length - 1 : currentIndex;
        }
        break;
      case 'first':
        nextIndex = 0;
        break;
      case 'last':
        nextIndex = focusableElements.length - 1;
        break;
      default:
        return;
    }

    focusableElements[nextIndex]?.focus();
  }, [getFocusableElements, wrap]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enableArrowKeys && !enableHomeEnd && !enableEscape) return;

    const { key, target } = event;
    
    // Only handle keyboard navigation if focus is within our container
    if (!containerRef.current?.contains(target as Node)) return;

    switch (key) {
      case 'ArrowDown':
        if (enableArrowKeys && (orientation === 'vertical' || orientation === 'both')) {
          event.preventDefault();
          moveFocus('next');
        }
        break;
      case 'ArrowUp':
        if (enableArrowKeys && (orientation === 'vertical' || orientation === 'both')) {
          event.preventDefault();
          moveFocus('previous');
        }
        break;
      case 'ArrowRight':
        if (enableArrowKeys && (orientation === 'horizontal' || orientation === 'both')) {
          event.preventDefault();
          moveFocus('next');
        }
        break;
      case 'ArrowLeft':
        if (enableArrowKeys && (orientation === 'horizontal' || orientation === 'both')) {
          event.preventDefault();
          moveFocus('previous');
        }
        break;
      case 'Home':
        if (enableHomeEnd) {
          event.preventDefault();
          moveFocus('first');
        }
        break;
      case 'End':
        if (enableHomeEnd) {
          event.preventDefault();
          moveFocus('last');
        }
        break;
      case 'Escape':
        if (enableEscape) {
          event.preventDefault();
          onEscape?.();
        }
        break;
    }
  }, [enableArrowKeys, enableHomeEnd, enableEscape, orientation, moveFocus, onEscape]);

  useEffect(() => {
    if (autoFocus && containerRef.current) {
      const firstFocusable = getFocusableElements()[0];
      firstFocusable?.focus();
    }
  }, [autoFocus, getFocusableElements]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    containerRef,
    moveFocus,
    getFocusableElements
  };
};

// Focus management utilities
export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus first element initially
    firstElement.focus();

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
};

// Roving tabindex for component groups
export const useRovingTabIndex = (activeIndex: number = 0) => {
  const elementsRef = useRef<HTMLElement[]>([]);

  const setTabIndex = useCallback((index: number) => {
    elementsRef.current.forEach((element, i) => {
      if (element) {
        element.tabIndex = i === index ? 0 : -1;
      }
    });
  }, []);

  useEffect(() => {
    setTabIndex(activeIndex);
  }, [activeIndex, setTabIndex]);

  const registerElement = useCallback((element: HTMLElement | null, index: number) => {
    if (element) {
      elementsRef.current[index] = element;
      element.tabIndex = index === activeIndex ? 0 : -1;
    }
  }, [activeIndex]);

  return {
    registerElement,
    setTabIndex
  };
};