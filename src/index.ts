// Core Components (always included)
export { Body } from './components/Body';
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Container } from './components/Container';
export { Input } from './components/Input';
export { Layout } from './components/Layout';
export { Navbar } from './components/Navbar';
export { Modal } from './components/Modal';
export { OptimizedImage } from './components/OptimizedImage';
export { AccessibilityTester, AccessibilityDevTools } from './components/AccessibilityTester';

// Grid & Layout
export { Grid } from './components/Grid';
export { Flex } from './components/Flex';
export { Section } from './components/Section';
export { Text } from './components/Text';

// Core Hooks
export { useDevice } from './hooks/useDevice';
export { useAnimation } from './hooks/useAnimation';
export { useOptimizedImage } from './hooks/useOptimizedImage';
export { useLCPOptimization } from './hooks/useLCPOptimization';
export { useCriticalResources } from './hooks/useCriticalResources';
export { useAccessibility, useScreenReader, useAriaAttributes } from './hooks/useAccessibility';
export { useKeyboardNavigation, useFocusTrap, useRovingTabIndex } from './hooks/useKeyboardNavigation';
export { useTypography, useComponentTypography, analyzeTextReadability } from './hooks/useTypography';
export { useHighContrast, useContrastAware, createHighContrastStyles } from './hooks/useHighContrast';

// Core Providers & Types
export * from './providers';
export * from './types';

// Theme System (optimized)
export { getTheme, getThemeNames, applyThemeToDocument, LUCENT_THEMES } from './themes';

// Premium Components (lazy-loaded)
export { AnimatedCard } from './components/premium/AnimatedCard';
export { MagicButton } from './components/premium/MagicButton';
export { FluidLayout } from './components/premium/FluidLayout';
export { SmartContainer } from './components/premium/SmartContainer';
export { UltraPerformantButton } from './components/premium/UltraPerformantButton';
export { PerformanceMonitor } from './components/premium/PerformanceMonitor';
export { UltraAnimatedCard } from './components/premium/UltraAnimatedCard';

// Advanced Hooks (separate import recommended)
export { useAdvancedAnimation } from './hooks/useAdvancedAnimation';
export { useAdvancedResponsive } from './hooks/useAdvancedResponsive';
export { useDynamicTheme } from './hooks/useDynamicTheme';
export { useMicroInteractions } from './hooks/useMicroInteractions';
export { useOptimizedState } from './hooks/useOptimizedState';
export { usePerformanceOptimization } from './hooks/usePerformanceOptimization';
export { useSimpleAnimation } from './hooks/useSimpleAnimation';

// DSL (optional import)
export * as DSL from './dsl';

// Pure API (Zero Tailwind) - Recommended for production
export * as Pure from './pure';

// Utilities
export * from './utils';
export * from './utils/wcagCompliance';
export * from './utils/colorContrast';