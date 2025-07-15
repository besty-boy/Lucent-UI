import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'surface' | 'gradient';
  textAlign?: 'left' | 'center' | 'right';
  minHeight?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  style,
  padding = 'lg',
  background = 'transparent',
  textAlign = 'left',
  minHeight
}) => {
  const getPadding = () => {
    const paddingMap = {
      none: '0',
      sm: '2rem',
      md: '3rem',
      lg: '4rem',
      xl: '6rem'
    };
    return paddingMap[padding];
  };

  const getBackground = () => {
    switch (background) {
      case 'surface':
        return 'var(--color-surface)';
      case 'gradient':
        return 'var(--gradient-background)';
      default:
        return 'transparent';
    }
  };

  return (
    <section
      className={className}
      style={{
        padding: `${getPadding()} 2rem`,
        textAlign,
        backgroundColor: getBackground(),
        minHeight,
        ...style
      }}
    >
      {children}
    </section>
  );
};

Section.displayName = 'Section';