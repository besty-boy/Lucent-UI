/**
 * Main entry point for Lucent-UI Demo
 * This is the recommended way to use the demo components
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { LucentUIDemo } from './LucentUIDemo';
import '../src/styles/globals.css';

// Mount the demo app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LucentUIDemo />
  </React.StrictMode>
);

// Export the main demo component as default
export default LucentUIDemo;

// Also export it as named export
export { LucentUIDemo };

// Export all other components for advanced usage
export { ThemeShowcase } from './ThemeShowcase';
export { Documentation } from './Documentation';
export { PureShowcase } from './PureShowcase';

// Export types
export type { PageType, LucentUIDemoProps } from './LucentUIDemo';
export type { ThemeShowcaseProps } from './ThemeShowcase';
export type { DocumentationProps } from './Documentation';

// Convenience exports for common use cases
export const LucentUIDemoWithDebug = () => (
  <LucentUIDemo showDebugInfo={true} />
);

export const LucentUIDemoStartWithDocs = () => (
  <LucentUIDemo initialPage="documentation" />
);

export const LucentUIDemoNoTransitions = () => (
  <LucentUIDemo enableTransitions={false} />
);