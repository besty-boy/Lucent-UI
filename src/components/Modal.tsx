import React, { useEffect } from 'react';
import { ModalProps } from '../types';
import { X } from 'lucide-react';
import { Button } from './Button';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className,
  blur = true,
  corner = 16,
}) => {
  // Gérer le corner radius personnalisé
  const getCornerRadius = () => {
    if (corner !== undefined) {
      return typeof corner === 'number' ? `${corner}px` : corner;
    }
    return 'var(--border-radius)';
  };

  // Gérer les tailles de modal
  const getMaxWidth = () => {
    const sizeMap = {
      sm: '24rem',      // 384px
      md: '32rem',      // 512px  
      lg: '48rem',      // 768px
      xl: '64rem',      // 1024px
      full: '95vw'
    };
    return sizeMap[size];
  };

  // Fermer la modal avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          transition: 'opacity 300ms',
          backdropFilter: blur ? 'blur(4px)' : undefined
        }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: getMaxWidth(),
          margin: '0 1rem',
          maxHeight: '90vh',
          overflow: 'hidden',
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-border)',
          borderRadius: getCornerRadius(),
          boxShadow: 'var(--shadow-xl)',
          transform: 'scale(1)',
          opacity: 1,
          transition: 'all 300ms ease-out',
          ...className as any
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-border)'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--color-text)',
              margin: 0
            }}>
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              corner="50%"
              style={{ padding: '0.5rem' }}
            >
              <X size={16} />
            </Button>
          </div>
        )}

        {/* Body */}
        <div style={{
          padding: '1.5rem',
          overflowY: 'auto',
          maxHeight: size === 'full' ? '100%' : 'calc(90vh - 8rem)'
        }}>
          {children}
        </div>
      </div>

    </div>
  );
};

Modal.displayName = 'Modal';