import { useEffect, useCallback } from 'react';
import { useAccessibilityPreferences } from './useAccessibility';

interface TypographyOptions {
  enableDynamicScaling?: boolean;
  enableOptimalLineHeight?: boolean;
  enableReadabilityMode?: boolean;
  baseFontSize?: number;
  maxFontSize?: number;
  minFontSize?: number;
}

interface TypographySettings {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight: number;
  contrast: 'normal' | 'high' | 'maximum';
}

// Optimal typography ratios based on research
const TYPOGRAPHY_RATIOS = {
  lineHeight: {
    body: 1.6,
    heading: 1.2,
    caption: 1.4
  },
  letterSpacing: {
    body: '0.01em',
    heading: '-0.02em',
    caption: '0.02em'
  },
  fontWeight: {
    body: 400,
    heading: 600,
    bold: 700
  }
};

// Reading comfort font sizes based on viewing distance
const READING_COMFORT_SIZES = {
  mobile: { min: 16, ideal: 18, max: 24 },
  tablet: { min: 16, ideal: 20, max: 28 },
  desktop: { min: 16, ideal: 18, max: 24 }
};

export const useTypography = (options: TypographyOptions = {}) => {
  const {
    enableDynamicScaling = true,
    enableOptimalLineHeight = true,
    enableReadabilityMode = false,
    baseFontSize = 16,
    maxFontSize = 24,
    minFontSize = 14
  } = options;

  const preferences = useAccessibilityPreferences();

  // Get optimal font size based on device and user preferences
  const getOptimalFontSize = useCallback((elementType: 'body' | 'heading' | 'caption' = 'body'): number => {
    if (typeof window === 'undefined') return baseFontSize;

    const screenWidth = window.innerWidth;
    const deviceType = screenWidth < 768 ? 'mobile' : screenWidth < 1024 ? 'tablet' : 'desktop';
    const sizeRange = READING_COMFORT_SIZES[deviceType];

    let optimalSize = sizeRange.ideal;

    // Adjust for element type
    if (elementType === 'heading') {
      optimalSize *= 1.25;
    } else if (elementType === 'caption') {
      optimalSize *= 0.875;
    }

    // Respect user's font size preferences (browser zoom)
    const userFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const scaleFactor = userFontSize / 16;
    optimalSize *= scaleFactor;

    // Apply high contrast adjustments
    if (preferences.prefersHighContrast) {
      optimalSize *= 1.1; // Slightly larger for high contrast
    }

    return Math.max(minFontSize, Math.min(maxFontSize, optimalSize));
  }, [baseFontSize, maxFontSize, minFontSize, preferences.prefersHighContrast]);

  // Calculate optimal line height based on font size and content width
  const getOptimalLineHeight = useCallback((fontSize: number, contentWidth?: number): number => {
    // Base line height ratio
    let lineHeight = TYPOGRAPHY_RATIOS.lineHeight.body;

    // Adjust for font size
    if (fontSize > 20) {
      lineHeight *= 0.95; // Slightly tighter for larger text
    } else if (fontSize < 16) {
      lineHeight *= 1.05; // Slightly looser for smaller text
    }

    // Adjust for content width (optimal reading measure)
    if (contentWidth) {
      const charactersPerLine = contentWidth / (fontSize * 0.6); // Approximate characters per line
      
      if (charactersPerLine > 75) {
        lineHeight *= 1.1; // Increase line height for long lines
      } else if (charactersPerLine < 45) {
        lineHeight *= 0.95; // Decrease line height for short lines
      }
    }

    return lineHeight;
  }, []);

  // Get optimal letter spacing
  const getOptimalLetterSpacing = useCallback((fontSize: number, fontWeight: number): string => {
    let spacing = 0;

    // Base spacing adjustment for font size
    if (fontSize > 20) {
      spacing = -0.02; // Tighter for larger text
    } else if (fontSize < 16) {
      spacing = 0.01; // Looser for smaller text
    }

    // Adjust for font weight
    if (fontWeight >= 700) {
      spacing += 0.01; // Looser for bold text
    }

    // High contrast mode adjustment
    if (preferences.prefersHighContrast) {
      spacing += 0.005;
    }

    return `${spacing}em`;
  }, [preferences.prefersHighContrast]);

  // Generate complete typography settings
  const generateTypographySettings = useCallback((
    elementType: 'body' | 'heading' | 'caption' = 'body',
    contentWidth?: number
  ): TypographySettings => {
    const fontSize = enableDynamicScaling ? getOptimalFontSize(elementType) : baseFontSize;
    const lineHeight = enableOptimalLineHeight ? getOptimalLineHeight(fontSize, contentWidth) : TYPOGRAPHY_RATIOS.lineHeight[elementType];
    const fontWeight = TYPOGRAPHY_RATIOS.fontWeight[elementType === 'heading' ? 'heading' : 'body'];
    const letterSpacing = getOptimalLetterSpacing(fontSize, fontWeight);

    let contrast: 'normal' | 'high' | 'maximum' = 'normal';
    if (preferences.prefersHighContrast) {
      contrast = enableReadabilityMode ? 'maximum' : 'high';
    }

    return {
      fontSize,
      lineHeight,
      letterSpacing: parseFloat(letterSpacing),
      fontWeight,
      contrast
    };
  }, [
    enableDynamicScaling,
    enableOptimalLineHeight,
    enableReadabilityMode,
    getOptimalFontSize,
    getOptimalLineHeight,
    getOptimalLetterSpacing,
    baseFontSize,
    preferences.prefersHighContrast
  ]);

  // Apply typography settings to document
  const applyTypographyToDocument = useCallback(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const bodySettings = generateTypographySettings('body');
    const headingSettings = generateTypographySettings('heading');

    // Apply CSS custom properties
    root.style.setProperty('--font-size-base', `${bodySettings.fontSize}px`);
    root.style.setProperty('--line-height-base', bodySettings.lineHeight.toString());
    root.style.setProperty('--letter-spacing-base', `${bodySettings.letterSpacing}em`);
    root.style.setProperty('--font-weight-base', bodySettings.fontWeight.toString());

    root.style.setProperty('--font-size-heading', `${headingSettings.fontSize}px`);
    root.style.setProperty('--line-height-heading', headingSettings.lineHeight.toString());
    root.style.setProperty('--letter-spacing-heading', `${headingSettings.letterSpacing}em`);
    root.style.setProperty('--font-weight-heading', headingSettings.fontWeight.toString());

    // Apply readability enhancements
    if (enableReadabilityMode || preferences.prefersHighContrast) {
      root.style.setProperty('--text-rendering', 'optimizeLegibility');
      root.style.setProperty('--font-smoothing', 'antialiased');
      root.style.setProperty('--webkit-font-smoothing', 'antialiased');
      root.style.setProperty('--moz-osx-font-smoothing', 'grayscale');
    }

    // Set contrast level attribute
    root.setAttribute('data-typography-contrast', bodySettings.contrast);
  }, [generateTypographySettings, enableReadabilityMode, preferences.prefersHighContrast]);

  // Apply settings on mount and preference changes
  useEffect(() => {
    applyTypographyToDocument();

    // Re-apply on window resize for responsive scaling
    const handleResize = () => {
      if (enableDynamicScaling) {
        applyTypographyToDocument();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyTypographyToDocument, enableDynamicScaling]);

  return {
    generateTypographySettings,
    getOptimalFontSize,
    getOptimalLineHeight,
    getOptimalLetterSpacing,
    applyTypographyToDocument
  };
};

// Hook for individual component typography
export const useComponentTypography = (
  elementType: 'body' | 'heading' | 'caption' = 'body',
  options: TypographyOptions = {}
) => {
  const { generateTypographySettings } = useTypography(options);
  
  const getTypographyStyles = useCallback((contentWidth?: number): React.CSSProperties => {
    const settings = generateTypographySettings(elementType, contentWidth);
    
    return {
      fontSize: `${settings.fontSize}px`,
      lineHeight: settings.lineHeight,
      letterSpacing: `${settings.letterSpacing}em`,
      fontWeight: settings.fontWeight,
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    };
  }, [generateTypographySettings, elementType]);

  return { getTypographyStyles };
};

// Utility to check text readability
export const analyzeTextReadability = (text: string): {
  score: number;
  level: 'poor' | 'fair' | 'good' | 'excellent';
  recommendations: string[];
} => {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const syllables = countSyllables(text);

  // Flesch Reading Ease Score
  const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
  
  let level: 'poor' | 'fair' | 'good' | 'excellent';
  const recommendations: string[] = [];

  if (fleschScore >= 90) {
    level = 'excellent';
  } else if (fleschScore >= 70) {
    level = 'good';
  } else if (fleschScore >= 50) {
    level = 'fair';
    recommendations.push('Consider shorter sentences and simpler words');
  } else {
    level = 'poor';
    recommendations.push('Simplify language and sentence structure');
    recommendations.push('Break up long paragraphs');
    recommendations.push('Use active voice where possible');
  }

  // Additional checks
  const avgWordsPerSentence = words / sentences;
  if (avgWordsPerSentence > 20) {
    recommendations.push('Reduce average sentence length (aim for 15-20 words)');
  }

  const avgSyllablesPerWord = syllables / words;
  if (avgSyllablesPerWord > 2) {
    recommendations.push('Use simpler vocabulary when possible');
  }

  return {
    score: Math.round(fleschScore),
    level,
    recommendations
  };
};

// Simple syllable counter
const countSyllables = (text: string): number => {
  return text.toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/[aeiouy]+/g, 'a')
    .replace(/a$/, '')
    .length || 1;
};