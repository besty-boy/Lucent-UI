import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = '1200px',
  className,
  style
}) => {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        margin: '0 auto',
        width: '100%',
        ...style
      }}
    >
      {children}
    </div>
  );
};

Container.displayName = 'Container';