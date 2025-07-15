import React from 'react';

interface TextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'secondary';
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
  gradient?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  as = 'p',
  size = 'md',
  weight = 'normal',
  color = 'default',
  align = 'left',
  className,
  style,
  gradient = false
}) => {
  const Component = as;

  const getFontSize = () => {
    const sizeMap = {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': 'clamp(2.5rem, 5vw, 4rem)'
    };
    return sizeMap[size];
  };

  const getFontWeight = () => {
    const weightMap = {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    };
    return weightMap[weight];
  };

  const getColor = () => {
    if (gradient) {
      return 'transparent';
    }
    
    const colorMap = {
      default: 'var(--color-text)',
      muted: 'var(--color-textSecondary)',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)'
    };
    return colorMap[color];
  };

  const getBackground = () => {
    if (gradient) {
      return 'var(--gradient-primary)';
    }
    return undefined;
  };

  return (
    <Component
      className={className}
      style={{
        fontSize: getFontSize(),
        fontWeight: getFontWeight(),
        color: getColor(),
        textAlign: align,
        background: getBackground(),
        WebkitBackgroundClip: gradient ? 'text' : undefined,
        WebkitTextFillColor: gradient ? 'transparent' : undefined,
        backgroundClip: gradient ? 'text' : undefined,
        margin: 0,
        ...style
      }}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';