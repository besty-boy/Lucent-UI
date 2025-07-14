import React, { useEffect, useRef, useState } from 'react';
import { useDevice } from '../../hooks';

export interface SmartContainerProps {
  children: React.ReactNode;
  mode?: 'auto' | 'fixed' | 'fluid' | 'responsive' | 'adaptive';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'compact' | 'normal' | 'relaxed' | 'loose';
  alignment?: 'left' | 'center' | 'right';
  behavior?: 'scroll' | 'paginate' | 'infinite' | 'virtual';
  className?: string;
}

export const SmartContainer: React.FC<SmartContainerProps> = ({
  children,
  mode = 'auto',
  maxWidth = 'xl',
  padding = 'md',
  spacing = 'normal',
  alignment = 'center',
  behavior = 'scroll',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [contentOverflow, setContentOverflow] = useState({ x: false, y: false });
  const device = useDevice();

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = containerRef.current;
      
      setContainerDimensions({ width: offsetWidth, height: offsetHeight });
      setContentOverflow({
        x: scrollWidth > offsetWidth,
        y: scrollHeight > offsetHeight
      });
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    updateDimensions();

    return () => resizeObserver.disconnect();
  }, [children]);

  const getMaxWidthClass = () => {
    if (mode === 'fluid') return 'w-full';
    
    const widths = {
      sm: 'max-w-sm',
      md: 'max-w-md', 
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      '2xl': 'max-w-7xl',
      full: 'max-w-full'
    };
    
    return widths[maxWidth];
  };

  const getPaddingClass = () => {
    const paddings = {
      none: 'p-0',
      sm: 'p-2 md:p-4',
      md: 'p-4 md:p-6',
      lg: 'p-6 md:p-8',
      xl: 'p-8 md:p-12'
    };
    
    return paddings[padding];
  };

  const getSpacingClass = () => {
    const spacings = {
      compact: 'space-y-2',
      normal: 'space-y-4',
      relaxed: 'space-y-6',
      loose: 'space-y-8'
    };
    
    return spacings[spacing];
  };

  const getAlignmentClass = () => {
    const alignments = {
      left: 'mx-0',
      center: 'mx-auto',
      right: 'ml-auto mr-0'
    };
    
    return alignments[alignment];
  };

  const getModeClasses = () => {
    const base = 'transition-all duration-300';
    
    const modes = {
      auto: `${base} ${getMaxWidthClass()} ${getAlignmentClass()}`,
      fixed: `${base} w-full max-w-none`,
      fluid: `${base} w-full min-h-screen`,
      responsive: `${base} ${getMaxWidthClass()} ${getAlignmentClass()} ${device.isMobile ? 'px-4' : 'px-8'}`,
      adaptive: `${base} ${device.isMobile ? 'max-w-full px-2' : device.isTablet ? 'max-w-4xl px-6' : 'max-w-6xl px-8'} ${getAlignmentClass()}`
    };
    
    return modes[mode];
  };

  const getBehaviorClasses = () => {
    const behaviors = {
      scroll: contentOverflow.y ? 'overflow-y-auto' : 'overflow-hidden',
      paginate: 'overflow-hidden',
      infinite: 'overflow-hidden',
      virtual: 'overflow-hidden relative'
    };
    
    return behaviors[behavior];
  };

  const containerClasses = `
    ${getModeClasses()}
    ${getPaddingClass()}
    ${getBehaviorClasses()}
    ${className}
  `.trim();

  // Auto-adjust layout based on content and screen size
  const shouldUseCompactLayout = device.isMobile || containerDimensions.width < 640;

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      data-mode={mode}
      data-overflow-x={contentOverflow.x}
      data-overflow-y={contentOverflow.y}
    >
      <div className={`${getSpacingClass()} ${shouldUseCompactLayout ? 'text-sm' : ''}`}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;

          // Auto-inject responsive props for known components
          const enhancedProps: any = {};

          if (shouldUseCompactLayout) {
            if (child.type && typeof child.type === 'function') {
              const componentName = child.type.name;
              
              if (componentName?.includes('Button')) {
                enhancedProps.size = 'sm';
              }
              
              if (componentName?.includes('Card')) {
                enhancedProps.size = 'sm';
              }
            }
          }

          return React.cloneElement(child, {
            ...enhancedProps,
            key: child.key || index
          });
        })}
      </div>

      {/* Scroll indicators */}
      {contentOverflow.y && behavior === 'scroll' && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gray-300 dark:bg-gray-600 rounded-full opacity-50">
          <div 
            className="w-full bg-blue-500 rounded-full transition-all duration-200"
            style={{
              height: `${Math.min(100, (containerDimensions.height / (containerRef.current?.scrollHeight || 1)) * 100)}%`
            }}
          />
        </div>
      )}
    </div>
  );
};