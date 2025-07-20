// Advanced color contrast utilities for accessibility

interface ColorInfo {
  hex: string;
  rgb: [number, number, number];
  luminance: number;
  name?: string;
}

interface ContrastEnhancement {
  original: ColorInfo;
  enhanced: ColorInfo;
  ratio: number;
  improvement: number;
}

// Convert hex to RGB
export const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};

// Convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Calculate relative luminance according to WCAG
export const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio between two colors
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

// Check if contrast ratio meets WCAG standards
export const meetsWCAGStandard = (ratio: number, level: 'AA' | 'AAA' = 'AA', large: boolean = false): boolean => {
  const threshold = level === 'AAA' ? (large ? 4.5 : 7) : (large ? 3 : 4.5);
  return ratio >= threshold;
};

// Enhance color for better contrast
export const enhanceColorContrast = (
  foreground: string, 
  background: string, 
  targetRatio: number = 4.5
): ContrastEnhancement | null => {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  
  if (!fgRgb || !bgRgb) return null;
  
  const originalRatio = getContrastRatio(foreground, background);
  
  if (originalRatio >= targetRatio) {
    return {
      original: {
        hex: foreground,
        rgb: fgRgb,
        luminance: getLuminance(...fgRgb)
      },
      enhanced: {
        hex: foreground,
        rgb: fgRgb,
        luminance: getLuminance(...fgRgb)
      },
      ratio: originalRatio,
      improvement: 0
    };
  }
  
  const bgLuminance = getLuminance(...bgRgb);
  
  // Calculate target luminance for foreground
  let targetLuminance: number;
  if (bgLuminance > 0.5) {
    // Light background - make foreground darker
    targetLuminance = (bgLuminance + 0.05) / targetRatio - 0.05;
  } else {
    // Dark background - make foreground lighter
    targetLuminance = (bgLuminance + 0.05) * targetRatio - 0.05;
  }
  
  targetLuminance = Math.max(0, Math.min(1, targetLuminance));
  
  // Convert target luminance back to RGB (simplified approach)
  const enhancedRgb = adjustRgbForLuminance(fgRgb, targetLuminance);
  const enhancedHex = rgbToHex(...enhancedRgb);
  const enhancedRatio = getContrastRatio(enhancedHex, background);
  
  return {
    original: {
      hex: foreground,
      rgb: fgRgb,
      luminance: getLuminance(...fgRgb)
    },
    enhanced: {
      hex: enhancedHex,
      rgb: enhancedRgb,
      luminance: getLuminance(...enhancedRgb)
    },
    ratio: enhancedRatio,
    improvement: enhancedRatio - originalRatio
  };
};

// Adjust RGB values to achieve target luminance
const adjustRgbForLuminance = (rgb: [number, number, number], targetLuminance: number): [number, number, number] => {
  const [r, g, b] = rgb;
  const currentLuminance = getLuminance(r, g, b);
  
  if (Math.abs(currentLuminance - targetLuminance) < 0.01) {
    return rgb;
  }
  
  // Simple adjustment - scale all components equally
  const factor = targetLuminance > currentLuminance ? 1.2 : 0.8;
  
  let newR = Math.round(r * factor);
  let newG = Math.round(g * factor);
  let newB = Math.round(b * factor);
  
  // Clamp values
  newR = Math.max(0, Math.min(255, newR));
  newG = Math.max(0, Math.min(255, newG));
  newB = Math.max(0, Math.min(255, newB));
  
  return [newR, newG, newB];
};

// Generate accessible color palette
export const generateAccessiblePalette = (baseColor: string, background: string = '#ffffff'): {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
} => {
  const baseRgb = hexToRgb(baseColor);
  if (!baseRgb) throw new Error('Invalid base color');
  
  const isLightBackground = getLuminance(...hexToRgb(background)!) > 0.5;
  
  return {
    primary: enhanceColorContrast(baseColor, background, 4.5)?.enhanced.hex || baseColor,
    secondary: enhanceColorContrast(adjustHue(baseColor, 30), background, 4.5)?.enhanced.hex || baseColor,
    accent: enhanceColorContrast(adjustHue(baseColor, -30), background, 4.5)?.enhanced.hex || baseColor,
    text: isLightBackground ? '#1a1a1a' : '#f5f5f5',
    textSecondary: isLightBackground ? '#666666' : '#cccccc',
    success: enhanceColorContrast('#059669', background, 4.5)?.enhanced.hex || '#059669',
    warning: enhanceColorContrast('#d97706', background, 4.5)?.enhanced.hex || '#d97706',
    error: enhanceColorContrast('#dc2626', background, 4.5)?.enhanced.hex || '#dc2626'
  };
};

// Adjust hue of a color
const adjustHue = (color: string, degrees: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const [r, g, b] = rgb.map(c => c / 255);
  
  // Convert to HSV
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff) % 6;
    else if (max === g) h = (b - r) / diff + 2;
    else h = (r - g) / diff + 4;
  }
  h = (h * 60 + degrees + 360) % 360;
  
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  // Convert back to RGB
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  
  let [rNew, gNew, bNew] = [0, 0, 0];
  
  if (h < 60) [rNew, gNew, bNew] = [c, x, 0];
  else if (h < 120) [rNew, gNew, bNew] = [x, c, 0];
  else if (h < 180) [rNew, gNew, bNew] = [0, c, x];
  else if (h < 240) [rNew, gNew, bNew] = [0, x, c];
  else if (h < 300) [rNew, gNew, bNew] = [x, 0, c];
  else [rNew, gNew, bNew] = [c, 0, x];
  
  return rgbToHex(
    Math.round((rNew + m) * 255),
    Math.round((gNew + m) * 255),
    Math.round((bNew + m) * 255)
  );
};

// High contrast mode color adjustments
export const getHighContrastColors = (theme: 'light' | 'dark' = 'light') => {
  if (theme === 'dark') {
    return {
      background: '#000000',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#e0e0e0',
      primary: '#00ff00',
      secondary: '#00ffff',
      accent: '#ffff00',
      border: '#ffffff',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
      focus: '#00ffff'
    };
  }
  
  return {
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    textSecondary: '#404040',
    primary: '#0000ff',
    secondary: '#800080',
    accent: '#ff6600',
    border: '#000000',
    success: '#008000',
    warning: '#ff8c00',
    error: '#ff0000',
    focus: '#0000ff'
  };
};

// Apply high contrast theme
export const applyHighContrastTheme = (enable: boolean = true, theme: 'light' | 'dark' = 'light') => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (enable) {
    const colors = getHighContrastColors(theme);
    
    // Apply high contrast colors
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--hc-${key}`, value);
    });
    
    root.setAttribute('data-high-contrast', 'true');
    root.setAttribute('data-hc-theme', theme);
  } else {
    root.removeAttribute('data-high-contrast');
    root.removeAttribute('data-hc-theme');
    
    // Remove high contrast custom properties
    const styles = getComputedStyle(root);
    Array.from(styles).forEach(property => {
      if (property.startsWith('--hc-')) {
        root.style.removeProperty(property);
      }
    });
  }
};