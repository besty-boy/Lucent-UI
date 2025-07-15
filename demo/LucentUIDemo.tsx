import { useState, useEffect } from 'react';
import { ThemeShowcase } from './ThemeShowcase';
import { Documentation } from './Documentation';

export type PageType = 'showcase' | 'documentation';

export interface LucentUIDemoProps {
  initialPage?: PageType;
  onPageChange?: (page: PageType) => void;
  enableTransitions?: boolean;
  showDebugInfo?: boolean;
}

export function LucentUIDemo({ 
  initialPage = 'showcase', 
  onPageChange,
  enableTransitions = true,
  showDebugInfo = false
}: LucentUIDemoProps = {}) {
  const [currentPage, setCurrentPage] = useState<PageType>(initialPage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  
  useEffect(() => {
    if (initialPage !== currentPage) {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  const handlePageChange = async (page: PageType) => {
    if (page === currentPage) return;
    
    if (enableTransitions) {
      setIsTransitioning(true);
      
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    setCurrentPage(page);
    onPageChange?.(page);
    
    if (enableTransitions) {
      setIsTransitioning(false);
    }
  };

  const navigateToDocumentation = () => {
    handlePageChange('documentation');
  };

  const navigateToShowcase = () => {
    handlePageChange('showcase');
  };

  const containerStyle = {
    transition: enableTransitions ? 'opacity 0.15s ease-in-out' : 'none',
    opacity: isTransitioning ? 0.7 : 1,
  };

  return (
    <div style={containerStyle}>
      {/* Debug Info */}
      {showDebugInfo && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontFamily: 'monospace',
          pointerEvents: 'none'
        }}>
          🔍 Page: {currentPage} {isTransitioning && '(transition...)'}
        </div>
      )}

      {/* Render current page */}
      {currentPage === 'showcase' && (
        <ThemeShowcase onNavigateToDocumentation={navigateToDocumentation} />
      )}
      
      {currentPage === 'documentation' && (
        <Documentation onNavigateToShowcase={navigateToShowcase} />
      )}
    </div>
  );
}

export default LucentUIDemo;