import { useState, useEffect } from 'react';
import { ExtendedNavigator } from '../types';

export interface DeviceCapabilities {
  prefersReducedMotion: boolean;
  deviceMemory: number;
  connectionType: string;
  darkModeSupported: boolean;
  performanceMode: 'high' | 'balanced' | 'economy';
}

export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    prefersReducedMotion: false,
    deviceMemory: 4,
    connectionType: '4g',
    darkModeSupported: true,
    performanceMode: 'balanced'
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Device capabilities detection
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const deviceMemory = (navigator as ExtendedNavigator).deviceMemory || 4;
      const connectionType = (navigator as ExtendedNavigator).connection?.effectiveType || '4g';
      const darkModeSupported = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Performance mode calculation
      let performanceMode: 'high' | 'balanced' | 'economy' = 'balanced';
      if (deviceMemory < 2 || connectionType === 'slow-2g' || connectionType === '2g') {
        performanceMode = 'economy';
      } else if (deviceMemory >= 8 && connectionType === '4g') {
        performanceMode = 'high';
      }

      setCapabilities({
        prefersReducedMotion,
        deviceMemory,
        connectionType,
        darkModeSupported,
        performanceMode
      });
    };

    detectCapabilities();

    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => detectCapabilities();

    motionQuery.addEventListener('change', handleChange);
    darkQuery.addEventListener('change', handleChange);

    return () => {
      motionQuery.removeEventListener('change', handleChange);
      darkQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return capabilities;
};