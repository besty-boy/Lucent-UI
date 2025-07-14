import React from 'react';
import { cn } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar, header, className }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {header && (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          {header}
        </header>
      )}
      <div className="flex">
        {sidebar && (
          <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-64px)]">
            {sidebar}
          </aside>
        )}
        <main className={cn('flex-1 p-6', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};
