// Basic hooks
export { useAnimation } from './useAnimation';
export { useOptimizedImage } from './useOptimizedImage';
export { useDevice } from './useDevice';

// Core Body hooks (new refactored)
export { useDeviceCapabilities } from './useDeviceCapabilities';
export { useSEOManager } from './useSEOManager';
export { useThemeApplication } from './useThemeApplication';
export { useResponsiveStyles } from './useResponsiveStyles';
export { useGlobalStyles } from './useGlobalStyles';

// Advanced hooks
export { useAdvancedAnimation } from './useAdvancedAnimation';
export { useMicroInteractions } from './useMicroInteractions';
export { usePerformanceOptimization } from './usePerformanceOptimization';
export { useAdvancedResponsive } from './useAdvancedResponsive';
export { useOptimizedState } from './useOptimizedState';
export { useDynamicTheme } from './useDynamicTheme';

// Export types
export type { AnimationType, EasingType, AdvancedAnimationOptions } from './useAdvancedAnimation';
export type { MicroInteractionOptions } from './useMicroInteractions';
export type { ResponsiveBreakpoints, ResponsiveConfig } from './useAdvancedResponsive';
export type { DynamicThemeConfig, ThemeContext, DynamicTheme } from './useDynamicTheme';
export type { DeviceCapabilities } from './useDeviceCapabilities';
