import React, { useState, useEffect } from 'react';

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
  className = '',
  style,
  minWidth = '250px',
  mobileColumns = 1
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getGridTemplateColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    return `repeat(${columns}, minmax(${minWidth}, 1fr))`;
  };

  const getMobileGridTemplateColumns = () => {
    return `repeat(${mobileColumns}, 1fr)`;
  };

  return (
    <div
      className={`grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? getMobileGridTemplateColumns() : getGridTemplateColumns(),
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        width: '100%',
        ...style
      }}
    >
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';