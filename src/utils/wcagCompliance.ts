// WCAG 2.1 AA Compliance utilities and testing

interface ColorContrastResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  level: 'fail' | 'AA' | 'AAA';
}

interface AccessibilityIssue {
  type: 'contrast' | 'focus' | 'aria' | 'keyboard' | 'semantic';
  severity: 'error' | 'warning' | 'info';
  element: string;
  message: string;
  recommendation: string;
}

// Convert hex color to RGB
const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};

// Calculate relative luminance
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate color contrast ratio
export const calculateContrastRatio = (color1: string, color2: string): ColorContrastResult => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    return { ratio: 0, AA: false, AAA: false, level: 'fail' };
  }
  
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  
  const AA = ratio >= 4.5;
  const AAA = ratio >= 7;
  
  return {
    ratio,
    AA,
    AAA,
    level: AAA ? 'AAA' : AA ? 'AA' : 'fail'
  };
};

// Audit color contrast for all elements
export const auditColorContrast = (): AccessibilityIssue[] => {
  if (typeof window === 'undefined') return [];
  
  const issues: AccessibilityIssue[] = [];
  
  // Get all text elements
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, button, a, input, label');
  
  textElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    const textColor = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    // Convert RGB to hex (simplified check)
    if (textColor && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
      const elementSelector = `${element.tagName.toLowerCase()}${element.className ? '.' + element.className.split(' ')[0] : ''}[${index}]`;
      
      // For demo purposes, check against common problematic combinations
      const isLightText = textColor.includes('255, 255, 255') || textColor.includes('rgb(255, 255, 255)');
      const isDarkBackground = backgroundColor.includes('0, 0, 0') || backgroundColor.includes('rgb(0, 0, 0)');
      
      if (isLightText && !isDarkBackground) {
        issues.push({
          type: 'contrast',
          severity: 'warning',
          element: elementSelector,
          message: 'Potential low contrast between text and background',
          recommendation: 'Ensure color contrast ratio is at least 4.5:1 for normal text, 3:1 for large text'
        });
      }
    }
  });
  
  return issues;
};

// Audit focus indicators
export const auditFocusIndicators = (): AccessibilityIssue[] => {
  if (typeof window === 'undefined') return [];
  
  const issues: AccessibilityIssue[] = [];
  
  // Check all interactive elements
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  
  interactiveElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    const outline = computedStyle.outline;
    const boxShadow = computedStyle.boxShadow;
    
    // Check if element has visible focus indicator
    if (outline === 'none' && boxShadow === 'none') {
      const elementSelector = `${element.tagName.toLowerCase()}[${index}]`;
      issues.push({
        type: 'focus',
        severity: 'error',
        element: elementSelector,
        message: 'Interactive element lacks visible focus indicator',
        recommendation: 'Add focus:outline or focus:ring styles to ensure keyboard navigation visibility'
      });
    }
  });
  
  return issues;
};

// Audit ARIA attributes
export const auditAriaAttributes = (): AccessibilityIssue[] => {
  if (typeof window === 'undefined') return [];
  
  const issues: AccessibilityIssue[] = [];
  
  // Check buttons without aria-label or text content
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button, index) => {
    const hasAriaLabel = button.hasAttribute('aria-label') || button.hasAttribute('aria-labelledby');
    const hasTextContent = button.textContent?.trim();
    
    if (!hasAriaLabel && !hasTextContent) {
      issues.push({
        type: 'aria',
        severity: 'error',
        element: `button[${index}]`,
        message: 'Button lacks accessible name',
        recommendation: 'Add aria-label, aria-labelledby, or visible text content'
      });
    }
  });
  
  // Check images without alt text
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        type: 'aria',
        severity: 'error',
        element: `img[${index}]`,
        message: 'Image missing alt attribute',
        recommendation: 'Add alt attribute with descriptive text, or alt="" for decorative images'
      });
    }
  });
  
  // Check form inputs without labels
  const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
  inputs.forEach((input, index) => {
    const hasLabel = input.hasAttribute('aria-label') || 
                    input.hasAttribute('aria-labelledby') ||
                    document.querySelector(`label[for="${input.id}"]`);
    
    if (!hasLabel) {
      issues.push({
        type: 'aria',
        severity: 'error',
        element: `${input.tagName.toLowerCase()}[${index}]`,
        message: 'Form control lacks accessible label',
        recommendation: 'Add aria-label, aria-labelledby, or associated <label> element'
      });
    }
  });
  
  return issues;
};

// Audit keyboard navigation
export const auditKeyboardNavigation = (): AccessibilityIssue[] => {
  if (typeof window === 'undefined') return [];
  
  const issues: AccessibilityIssue[] = [];
  
  // Check for keyboard traps
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  
  interactiveElements.forEach((element, index) => {
    const tabIndex = element.getAttribute('tabindex');
    
    // Warn about positive tabindex values
    if (tabIndex && parseInt(tabIndex) > 0) {
      issues.push({
        type: 'keyboard',
        severity: 'warning',
        element: `${element.tagName.toLowerCase()}[${index}]`,
        message: 'Positive tabindex disrupts natural tab order',
        recommendation: 'Use tabindex="0" or remove tabindex to maintain natural tab order'
      });
    }
  });
  
  // Check for missing skip links
  const skipLink = document.querySelector('a[href^="#main"], a[href^="#content"]');
  if (!skipLink) {
    issues.push({
      type: 'keyboard',
      severity: 'warning',
      element: 'document',
      message: 'Missing skip link for keyboard users',
      recommendation: 'Add a "Skip to main content" link as the first focusable element'
    });
  }
  
  return issues;
};

// Audit semantic HTML
export const auditSemanticHTML = (): AccessibilityIssue[] => {
  if (typeof window === 'undefined') return [];
  
  const issues: AccessibilityIssue[] = [];
  
  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    
    if (index === 0 && level !== 1) {
      issues.push({
        type: 'semantic',
        severity: 'warning',
        element: `${heading.tagName.toLowerCase()}[${index}]`,
        message: 'Page should start with h1',
        recommendation: 'Use h1 for the main page heading'
      });
    }
    
    if (level > previousLevel + 1) {
      issues.push({
        type: 'semantic',
        severity: 'warning',
        element: `${heading.tagName.toLowerCase()}[${index}]`,
        message: 'Heading levels skip hierarchy',
        recommendation: 'Use sequential heading levels (h1, h2, h3...)'
      });
    }
    
    previousLevel = level;
  });
  
  // Check for landmark roles
  const main = document.querySelector('main, [role="main"]');
  if (!main) {
    issues.push({
      type: 'semantic',
      severity: 'warning',
      element: 'document',
      message: 'Missing main landmark',
      recommendation: 'Add <main> element or role="main" to identify main content area'
    });
  }
  
  return issues;
};

// Run comprehensive WCAG audit
export const runWCAGAudit = (): {
  issues: AccessibilityIssue[];
  summary: {
    total: number;
    errors: number;
    warnings: number;
    info: number;
  };
} => {
  const allIssues = [
    ...auditColorContrast(),
    ...auditFocusIndicators(),
    ...auditAriaAttributes(),
    ...auditKeyboardNavigation(),
    ...auditSemanticHTML()
  ];
  
  const summary = {
    total: allIssues.length,
    errors: allIssues.filter(i => i.severity === 'error').length,
    warnings: allIssues.filter(i => i.severity === 'warning').length,
    info: allIssues.filter(i => i.severity === 'info').length
  };
  
  return { issues: allIssues, summary };
};

// Generate accessibility report
export const generateAccessibilityReport = (): string => {
  const { issues, summary } = runWCAGAudit();
  
  let report = `
# Accessibility Audit Report

## Summary
- Total Issues: ${summary.total}
- Errors: ${summary.errors}
- Warnings: ${summary.warnings}
- Info: ${summary.info}

## Issues Found
`;
  
  issues.forEach((issue, index) => {
    report += `
### ${index + 1}. ${issue.type.toUpperCase()} - ${issue.severity.toUpperCase()}
- **Element:** ${issue.element}
- **Message:** ${issue.message}
- **Recommendation:** ${issue.recommendation}
`;
  });
  
  return report;
};