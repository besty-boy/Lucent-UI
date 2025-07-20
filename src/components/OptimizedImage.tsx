import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  quality = 75,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters view
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Preload critical images
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (sizes) link.sizes = sizes;
      document.head.appendChild(link);
    }
  }, [src, priority, sizes]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const shouldShowPlaceholder = placeholder === 'blur' && !isLoaded && blurDataURL;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {shouldShowPlaceholder && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          {...props}
        />
      )}
      
      {/* Empty placeholder */}
      {!isInView && placeholder === 'empty' && (
        <div 
          ref={imgRef}
          className="w-full h-full bg-gray-200 animate-pulse"
          style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : '16/9' }}
        />
      )}
    </div>
  );
};

// Hook for optimized image preloading
export const useImagePreload = (sources: string[]) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preloadImages = () => {
      sources.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    // Preload after a delay to not block initial render
    const timeoutId = setTimeout(preloadImages, 1000);
    return () => clearTimeout(timeoutId);
  }, [sources]);
};