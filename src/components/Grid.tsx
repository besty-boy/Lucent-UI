import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: number | 'auto-fit' | 'auto-fill';
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
  minWidth?: string;
  mobileColumns?: number;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 'auto-fit',
  gap = '1rem',
  className,
  style,
  minWidth = '300px',
  mobileColumns = 1
}) => {
  const getGridTemplateColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    return `repeat(${columns}, minmax(${minWidth}, 1fr))`;
  };

  const getMobileGridTemplateColumns = () => {
    return `repeat(${mobileColumns}, 1fr)`;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? getMobileGridTemplateColumns() : getGridTemplateColumns(),
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        ...style
      }}
    >
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';