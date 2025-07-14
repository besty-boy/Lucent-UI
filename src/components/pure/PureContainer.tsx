import React, { CSSProperties } from 'react';

export interface PureContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const PureContainer: React.FC<PureContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'md',
  spacing = 'md',
  align = 'center',
  className = ''
}) => {
  const getContainerStyles = (): CSSProperties => ({
    width: '100%',
    marginLeft: align === 'center' ? 'auto' : align === 'right' ? 'auto' : 0,
    marginRight: align === 'center' ? 'auto' : align === 'left' ? 'auto' : 0,
    ...getMaxWidthStyles(),
    ...getPaddingStyles(),
  });

  const getMaxWidthStyles = (): CSSProperties => {
    const widths = {
      sm: { maxWidth: '640px' },
      md: { maxWidth: '768px' },
      lg: { maxWidth: '1024px' },
      xl: { maxWidth: '1280px' },
      '2xl': { maxWidth: '1536px' },
      full: { maxWidth: '100%' }
    };
    return widths[maxWidth];
  };

  const getPaddingStyles = (): CSSProperties => {
    const paddings = {
      none: { padding: 0 },
      sm: { padding: '1rem' },
      md: { padding: '1.5rem' },
      lg: { padding: '2rem' },
      xl: { padding: '3rem' }
    };
    return paddings[padding];
  };

  const getSpacingStyles = (): CSSProperties => {
    const spacings = {
      none: { gap: 0 },
      sm: { gap: '1rem' },
      md: { gap: '1.5rem' },
      lg: { gap: '2rem' },
      xl: { gap: '3rem' }
    };
    return {
      display: 'flex',
      flexDirection: 'column',
      ...spacings[spacing]
    };
  };

  return (
    <div style={getContainerStyles()} className={className}>
      <div style={getSpacingStyles()}>
        {children}
      </div>
    </div>
  );
};