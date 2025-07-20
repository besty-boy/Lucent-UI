import React, { useState, useEffect } from 'react';
import { cn } from '../utils';
import { Menu, X } from 'lucide-react';
import { ComponentProps } from '../types';
import { useAccessibility } from '../hooks/useAccessibility';
import { useKeyboardNavigation, useFocusTrap } from '../hooks/useKeyboardNavigation';

type NavbarVariant = 'default' | 'glass' | 'solid';

interface NavbarProps extends Omit<ComponentProps, 'variant'> {
  logo?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
  variant?: NavbarVariant;
  ariaLabel?: string;
  logoHref?: string;
  onMenuToggle?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  children,
  className = '',
  sticky = true,
  variant = 'default',
  corner,
  shadow,
  ariaLabel = 'Main navigation',
  logoHref = '/',
  onMenuToggle,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Accessibility hooks
  const { ariaUtils, announce, preferences } = useAccessibility();
  const { containerRef } = useKeyboardNavigation({
    enableArrowKeys: true,
    orientation: 'horizontal',
    onEscape: () => handleMenuToggle(false)
  });
  const focusTrapRef = useFocusTrap(menuOpen);
  
  // Generate unique IDs for ARIA
  const menuId = ariaUtils.generateId('navbar-menu');
  const menuButtonId = ariaUtils.generateId('navbar-menu-button');

  // Handle menu toggle with accessibility announcements
  const handleMenuToggle = (open?: boolean) => {
    const newMenuOpen = open !== undefined ? open : !menuOpen;
    setMenuOpen(newMenuOpen);
    onMenuToggle?.(newMenuOpen);
    announce(`Menu ${newMenuOpen ? 'opened' : 'closed'}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        handleMenuToggle(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  const baseClasses = 'w-full px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300 ease-in-out';

  const variantClasses = {
    default: `border-b border-transparent ${isScrolled ? 'bg-[var(--current-surface)]/80 backdrop-blur-md border-[var(--current-border)]/20' : ''}`,
    glass: 'border-b border-white/10 backdrop-blur-xl',
    solid: 'bg-[var(--current-surface)] border-b border-[var(--current-border)]',
  };

  const stickyClasses = sticky ? 'sticky top-0 z-50' : '';

  const navbarClasses = cn(
    baseClasses,
    stickyClasses,
    variantClasses[variant],
    shadow && `shadow-[var(--shadow-${shadow})]`,
    corner ? `rounded-[var(--border-radius-${corner})]` : '',
    className
  );

  return (
    <header className={navbarClasses}>
      <nav 
        ref={containerRef}
        className="max-w-7xl mx-auto flex items-center justify-between"
        role="navigation"
        aria-label={ariaLabel}
      >
        {/* Logo */}
        <div className="flex items-center">
          {typeof logo === 'string' ? (
            <a 
              href={logoHref}
              className="text-xl font-bold text-[var(--current-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded"
              aria-label="Home"
            >
              {logo}
            </a>
          ) : (
            <a 
              href={logoHref}
              className="focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded"
              aria-label="Home"
            >
              {logo}
            </a>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8" role="menubar">
          {children}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            id={menuButtonId}
            onClick={() => handleMenuToggle()}
            className={cn(
              "text-[var(--current-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded p-2",
              preferences.prefersReducedMotion ? 'transition-none' : 'transition-colors duration-200'
            )}
            aria-label="Toggle navigation menu"
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        id={menuId}
        ref={focusTrapRef as React.RefObject<HTMLDivElement>}
        className={cn(
          'md:hidden overflow-hidden',
          preferences.prefersReducedMotion ? '' : 'transition-all duration-500 ease-in-out',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
        role="menu"
        aria-labelledby={menuButtonId}
        aria-hidden={!menuOpen}
      >
        <div className="mt-4 space-y-4 px-4 pb-4" role="none">
          {children}
        </div>
      </div>
    </header>
  );
};
