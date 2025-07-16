/**
 * Main entry point for Lucent-UI Demo
 * This is the recommended way to use the demo components
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '../src/styles/globals.css';

// Mount the demo app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Export the main demo app as default
export { App as default };

// Also export it as named export
export { App };

// Export all other components for advanced usage
export { ThemeShowcase } from './ThemeShowcase';
export { PureShowcase } from './PureShowcase';

// Export pages
export { Home } from './pages/Home';
export { DocsLayout } from './pages/DocsLayout';

// Export types
export type { ThemeShowcaseProps } from './ThemeShowcase';