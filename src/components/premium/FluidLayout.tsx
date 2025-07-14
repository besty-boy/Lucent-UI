import React, { useEffect, useRef, useState } from 'react';
import { useDevice } from '../../hooks';

export interface FluidLayoutProps {
  children: React.ReactNode;
  mode?: 'adaptive' | 'masonry' | 'grid' | 'flow' | 'magnetic';
  columns?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  responsive?: boolean;
  className?: string;
}

interface LayoutItem {
  element: React.ReactElement;
  id: string;
  height?: number;
  width?: number;
  position?: { x: number; y: number };
}

export const FluidLayout: React.FC<FluidLayoutProps> = ({
  children,
  mode = 'adaptive',
  columns = 'auto',
  gap = 'md',
  animate = true,
  responsive = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<LayoutItem[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const device = useDevice();

  useEffect(() => {
    if (!containerRef.current) return;

    const updateLayout = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.offsetWidth);
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(containerRef.current);

    updateLayout();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    const layoutItems: LayoutItem[] = childArray.map((child, index) => ({
      element: child,
      id: `item-${index}`,
    }));
    setItems(layoutItems);
  }, [children]);

  const getGapSize = () => {
    const gaps = {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32
    };
    return gaps[gap];
  };

  const getAdaptiveColumns = () => {
    if (columns !== 'auto') return columns;
    
    if (!responsive) return 3;

    if (device.isMobile) return 1;
    if (device.isTablet) return 2;
    if (containerWidth < 768) return 1;
    if (containerWidth < 1024) return 2;
    if (containerWidth < 1280) return 3;
    return 4;
  };

  const calculateMasonryLayout = () => {
    const colCount = getAdaptiveColumns();
    const gapSize = getGapSize();
    const colWidth = (containerWidth - (gapSize * (colCount - 1))) / colCount;
    
    const columnHeights = new Array(colCount).fill(0);
    
    return items.map((item) => {
      const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));
      const x = shortestCol * (colWidth + gapSize);
      const y = columnHeights[shortestCol];
      
      // Estimate height (would be measured in real implementation)
      const estimatedHeight = 200 + Math.random() * 100;
      columnHeights[shortestCol] += estimatedHeight + gapSize;
      
      return {
        ...item,
        position: { x, y },
        width: colWidth,
        height: estimatedHeight
      };
    });
  };

  const calculateMagneticLayout = () => {
    const gapSize = getGapSize();
    const itemWidth = 250;
    const itemHeight = 200;
    
    return items.map((item, index) => {
      const baseX = (index % 3) * (itemWidth + gapSize);
      const baseY = Math.floor(index / 3) * (itemHeight + gapSize);
      
      // Add some magnetic offset
      const magneticOffset = {
        x: Math.sin(index * 0.5) * 20,
        y: Math.cos(index * 0.3) * 15
      };
      
      return {
        ...item,
        position: { 
          x: baseX + magneticOffset.x, 
          y: baseY + magneticOffset.y 
        },
        width: itemWidth,
        height: itemHeight
      };
    });
  };

  const getLayoutItems = () => {
    switch (mode) {
      case 'masonry':
        return calculateMasonryLayout();
      case 'magnetic':
        return calculateMagneticLayout();
      default:
        return items;
    }
  };

  const getLayoutClasses = () => {
    const gapClass = `gap-${gap}`;
    
    const modeClasses = {
      adaptive: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${getAdaptiveColumns()} ${gapClass}`,
      grid: `grid grid-cols-${getAdaptiveColumns()} ${gapClass}`,
      flow: 'flex flex-wrap',
      masonry: 'relative',
      magnetic: 'relative overflow-hidden'
    };

    const animateClass = animate ? 'transition-all duration-500 ease-out' : '';
    
    return `${modeClasses[mode]} ${animateClass}`;
  };

  const layoutItems = getLayoutItems();

  if (mode === 'masonry' || mode === 'magnetic') {
    const maxHeight = Math.max(...layoutItems.map(item => 
      (item.position?.y || 0) + (item.height || 200)
    ));

    return (
      <div 
        ref={containerRef}
        className={`${getLayoutClasses()} ${className}`}
        style={{ height: maxHeight }}
      >
        {layoutItems.map((item) => (
          <div
            key={item.id}
            className={animate ? 'transition-all duration-700 ease-out' : ''}
            style={{
              position: 'absolute',
              left: item.position?.x || 0,
              top: item.position?.y || 0,
              width: item.width,
              height: mode === 'magnetic' ? item.height : 'auto',
              transform: animate ? 'translateZ(0)' : 'none',
            }}
          >
            {item.element}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${getLayoutClasses()} ${className}`}>
      {layoutItems.map((item) => (
        <div
          key={item.id}
          className={animate ? 'animate-fadeInUp' : ''}
          style={{ animationDelay: `${items.indexOf(item) * 100}ms` }}
        >
          {item.element}
        </div>
      ))}
    </div>
  );
};

// Utility component for creating magnetic interaction zones
export const MagneticZone: React.FC<{
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}> = ({ children, intensity = 20, className = '' }) => {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoneRef.current) return;

    const rect = zoneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    const moveX = deltaX * intensity;
    const moveY = deltaY * intensity;
    
    setTransform(`translate(${moveX}px, ${moveY}px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('translate(0px, 0px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={zoneRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ 
        transform,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};