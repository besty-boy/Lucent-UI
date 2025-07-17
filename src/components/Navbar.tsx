import React, { useState, useEffect } from 'react';
import { cn } from '../utils';
import { Menu, X } from 'lucide-react';
import { ComponentProps } from '../types';

type NavbarVariant = 'default' | 'glass' | 'solid';

interface NavbarProps extends Omit<ComponentProps, 'variant'> {
  logo?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
  variant?: NavbarVariant;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  children,
  className = '',
  sticky = true,
  variant = 'default',
  corner,
  shadow,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {typeof logo === 'string' ? (
            <span className="text-xl font-bold text-[var(--current-text)]">
              {logo}
            </span>
          ) : (
            logo
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {children}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[var(--current-text-secondary)] focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-500 ease-in-out',
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="mt-4 space-y-4 px-4 pb-4">
          {children}
        </div>
      </div>
    </header>
  );
};
