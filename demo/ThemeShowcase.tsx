import React, { useState } from 'react';
import { Body, Card, Button, Navbar } from '../src';
import { getThemeNames, LUCENT_THEMES } from '../src/themes';

export function ThemeShowcase() {
  const [currentTheme, setCurrentTheme] = useState('velora');
  const themeNames = getThemeNames();

  return (
    <Body 
      theme={currentTheme as any}
      autoDark 
      responsive
      meta={{
        title: `Lucent-UI - ${LUCENT_THEMES[currentTheme]?.name} Theme`,
        description: "Showcase of all Lucent-UI premium themes",
      }}
    >
      <Navbar logo={`🎨 ${LUCENT_THEMES[currentTheme]?.name || 'Lucent'}-UI`} variant="glass">
        <div className="flex gap-2 overflow-x-auto">
          {themeNames.map((theme) => (
            <Button
              key={theme}
              variant={currentTheme === theme ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setCurrentTheme(theme)}
              className="whitespace-nowrap"
            >
              {LUCENT_THEMES[theme].name}
            </Button>
          ))}
        </div>
      </Navbar>

      <div className="container mx-auto p-6 space-y-8">
        {/* Theme Info Header */}
        <Card variant="premium" size="lg" className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            {LUCENT_THEMES[currentTheme].name} Theme
          </h1>
          <p className="text-lg opacity-80 mb-6">
            {LUCENT_THEMES[currentTheme].description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg">Primary Action</Button>
            <Button variant="secondary" size="lg">Secondary</Button>
            <Button variant="outline" size="lg">Outline</Button>
            <Button variant="ghost" size="lg">Ghost</Button>
          </div>
        </Card>

        {/* Component Showcase Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Default Cards */}
          <Card variant="default">
            <h3 className="font-bold mb-3">Default Card</h3>
            <p className="text-sm opacity-80 mb-4">
              Standard card with theme colors
            </p>
            <Button variant="primary" className="w-full">Action</Button>
          </Card>

          {/* Premium Cards */}
          <Card variant="premium">
            <h3 className="font-bold mb-3">Premium Card</h3>
            <p className="text-sm opacity-80 mb-4">
              Enhanced surface with subtle styling
            </p>
            <Button variant="secondary" className="w-full">Premium</Button>
          </Card>

          {/* Glass Cards */}
          <Card variant="glass">
            <h3 className="font-bold mb-3">Glass Card</h3>
            <p className="text-sm opacity-80 mb-4">
              Glassmorphism effect with backdrop blur
            </p>
            <Button variant="outline" className="w-full">Glass</Button>
          </Card>

          {/* Gradient Cards */}
          <Card variant="gradient">
            <h3 className="font-bold mb-3">Gradient Card</h3>
            <p className="text-sm opacity-80 mb-4">
              Theme-based gradient background
            </p>
            <Button variant="ghost" className="w-full">Gradient</Button>
          </Card>

          {/* Size Showcase */}
          <Card variant="default" className="md:col-span-2">
            <h3 className="font-bold mb-4">Card Sizes</h3>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <Card variant="premium" size="sm">
                <p className="text-xs font-medium">Small</p>
              </Card>
              <Card variant="premium" size="md">
                <p className="text-sm font-medium">Medium</p>
              </Card>
              <Card variant="premium" size="lg">
                <p className="text-base font-medium">Large</p>
              </Card>
              <Card variant="premium" size="xl">
                <p className="text-lg font-medium">XL</p>
              </Card>
            </div>
          </Card>
        </div>

        {/* Button Sizes */}
        <Card>
          <h3 className="text-xl font-bold mb-4">Button Sizes & States</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="primary" size="xs">XS</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="xl">Extra Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" loading>Loading</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button variant="outline" fullWidth>Full Width</Button>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card>
          <h3 className="text-xl font-bold mb-4">Theme Color Palette</h3>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              <p className="text-xs font-medium">Primary</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              />
              <p className="text-xs font-medium">Secondary</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <p className="text-xs font-medium">Accent</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--color-success)' }}
              />
              <p className="text-xs font-medium">Success</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--color-warning)' }}
              />
              <p className="text-xs font-medium">Warning</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-[var(--color-border)]"
                style={{ backgroundColor: 'var(--color-error)' }}
              />
              <p className="text-xs font-medium">Error</p>
            </div>
          </div>
        </Card>

        {/* Zero Tailwind Message */}
        <Card variant="glass" className="text-center">
          <h3 className="text-xl font-bold mb-4">🚀 Zero Tailwind Knowledge Required</h3>
          <p className="opacity-90">
            All these beautiful designs are automatically generated from just{' '}
            <code className="px-2 py-1 bg-black/10 dark:bg-white/10 rounded">
              theme="{currentTheme}"
            </code>
            {' '}- no CSS classes needed!
          </p>
        </Card>
      </div>
    </Body>
  );
}