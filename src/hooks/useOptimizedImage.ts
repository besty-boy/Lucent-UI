import { useState, useEffect } from 'react';

interface ImageOptions {
  src: string;
  placeholder?: string;
  quality?: number;
}

export const useOptimizedImage = ({ src, placeholder }: ImageOptions) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };
  }, [src]);

  return { src: imageSrc, loading };
};
