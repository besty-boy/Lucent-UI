import React, { CSSProperties } from 'react';

export interface PureGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  className?: string;
}

export const PureGrid: React.FC<PureGridProps> = ({
  children,
  columns = 'auto',
  gap = 'md',
  responsive = true,
  align = 'stretch',
  justify = 'start',
  className = ''
}) => {
  const getGridStyles = (): CSSProperties => {
    const gapSizes = {
      none: '0',
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    };

    const alignItems = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch'
    };

    const justifyContent = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around'
    };

    let gridTemplateColumns: string;
    
    if (columns === 'auto') {
      gridTemplateColumns = responsive 
        ? 'repeat(auto-fit, minmax(250px, 1fr))'
        : 'repeat(auto-fit, minmax(200px, 1fr))';
    } else {
      if (responsive) {
        // Responsive breakpoints
        const responsiveColumns = {
          1: '1fr',
          2: 'repeat(1, 1fr)', // Mobile: 1 col, Tablet+: 2 cols
          3: 'repeat(1, 1fr)', // Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols
          4: 'repeat(1, 1fr)', // Progressive scaling
          5: 'repeat(1, 1fr)',
          6: 'repeat(1, 1fr)'
        };
        gridTemplateColumns = responsiveColumns[columns];
      } else {
        gridTemplateColumns = `repeat(${columns}, 1fr)`;
      }
    }

    return {
      display: 'grid',
      gridTemplateColumns,
      gap: gapSizes[gap],
      alignItems: alignItems[align],
      justifyContent: justifyContent[justify],
      width: '100%',
    };
  };

  // Responsive styles are handled via CSS injection instead of inline styles

  return (
    <div 
      style={{
        ...getGridStyles(),
        // Responsive styles need to be handled differently in inline styles
        // Using CSS-in-JS approach for better responsiveness
      }}
      className={className}
    >
      {/* Inject responsive styles */}
      <style>{`
        @media (min-width: 640px) {
          .lucent-grid-${columns} {
            grid-template-columns: ${responsive && typeof columns === 'number' && columns >= 2 ? 'repeat(2, 1fr)' : '1fr'};
          }
        }
        @media (min-width: 768px) {
          .lucent-grid-${columns} {
            grid-template-columns: ${responsive && typeof columns === 'number' && columns >= 3 ? 'repeat(3, 1fr)' : `repeat(${typeof columns === 'number' ? Math.min(columns, 2) : 2}, 1fr)`};
          }
        }
        @media (min-width: 1024px) {
          .lucent-grid-${columns} {
            grid-template-columns: ${typeof columns === 'number' ? `repeat(${columns}, 1fr)` : 'repeat(auto-fit, minmax(250px, 1fr))'};
          }
        }
      `}</style>
      
      <div className={`lucent-grid-${columns}`} style={getGridStyles()}>
        {children}
      </div>
    </div>
  );
};