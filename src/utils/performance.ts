import React from 'react';

export const lazyLoad = (importFunc: () => Promise<any>) => {
  return React.lazy(importFunc);
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const optimizeRender = (Component: React.ComponentType<any>) => {
  return React.memo(Component);
};
