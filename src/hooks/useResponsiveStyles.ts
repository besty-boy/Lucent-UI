import { useMemo } from 'react';
import { DeviceCapabilities } from './useDeviceCapabilities';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useResponsiveStyles = (
  responsive: boolean,
  device: DeviceInfo,
  capabilities: DeviceCapabilities,
  className: string = ''
) => {
  const responsiveClasses = useMemo(() => {
    if (!responsive) return className;
    
    const baseClasses = 'min-h-screen w-full';
    const scrollClasses = device.isMobile ? 'overflow-x-hidden overflow-y-auto' : 'overflow-x-hidden';
    const performanceClasses = capabilities.performanceMode === 'high' ? 'will-change-transform' : '';
    
    return `${baseClasses} ${scrollClasses} ${performanceClasses}`;
  }, [responsive, device.isMobile, capabilities.performanceMode]);

  const containerClasses = useMemo(() => {
    return `
      ${responsiveClasses}
      text-[var(--current-text)]
      transition-all duration-[var(--animation-duration)]
      ${capabilities.performanceMode === 'economy' ? '' : 'transform-gpu'}
      ${className}
    `.trim();
  }, [responsiveClasses, capabilities.performanceMode, className]);

  const containerStyle = useMemo(() => ({
    background: 'var(--current-gradient-background)',
  }), []);

  return {
    containerClasses,
    containerStyle,
    dataAttributes: {
      'data-performance': capabilities.performanceMode,
      'data-device': device.isMobile ? 'mobile' : device.isTablet ? 'tablet' : 'desktop'
    }
  };
};