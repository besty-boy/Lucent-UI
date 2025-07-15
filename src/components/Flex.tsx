import React from 'react';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
  mobileDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  mobileAlign?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  mobileJustify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap = 0,
  className,
  style,
  mobileDirection = 'column',
  mobileAlign,
  mobileJustify
}) => {
  const getAlignItems = (alignment: string) => {
    const alignMap: Record<string, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline'
    };
    return alignMap[alignment] || 'flex-start';
  };

  const getJustifyContent = (justification: string) => {
    const justifyMap: Record<string, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly'
    };
    return justifyMap[justification] || 'flex-start';
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: isMobile ? mobileDirection : direction,
        alignItems: getAlignItems(isMobile ? mobileAlign || align : align),
        justifyContent: getJustifyContent(isMobile ? mobileJustify || justify : justify),
        flexWrap: wrap,
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        ...style
      }}
    >
      {children}
    </div>
  );
};

Flex.displayName = 'Flex';