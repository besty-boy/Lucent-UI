import React from 'react';
import { cn } from '../utils';

interface NavbarProps {
  logo?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
  variant?: 'default' | 'glass' | 'solid';
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  children,
  className = '',
  sticky = true,
  transparent = false,
  variant = 'default',
}) => {
  const baseClasses = 'w-full px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20',
    glass: 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20',
    solid: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
  };

  const stickyClasses = sticky ? 'sticky top-0 z-50' : '';
  const transparentClasses = transparent ? 'bg-transparent border-none' : '';

  const navbarClasses = cn(
    baseClasses,
    stickyClasses,
    transparent ? transparentClasses : variantClasses[variant],
    className
  );

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {typeof logo === 'string' ? (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {logo}
            </span>
          ) : (
            logo
          )}
        </div>

        {/* Navigation content */}
        <div className="flex items-center space-x-6">
          {children}
        </div>
      </div>
    </nav>
  );
};