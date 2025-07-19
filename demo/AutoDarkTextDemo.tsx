import React, { useState } from 'react';
import { Body, Button, Card, Text } from '../src';

export const AutoDarkTextDemo: React.FC = () => {
  const [theme, setTheme] = useState<string>('velora');
  const [manualDark, setManualDark] = useState(false);

  const themes = [
    'velora', 'aurora', 'neon', 'crystal', 'obsidian', 
    'glacial', 'military', 'apple', 'ocean', 'sunset'
  ] as const;

  // Toggle system theme simulation
  const toggleSystemTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    root.classList.toggle('dark', !isDark);
    setManualDark(!isDark);
  };

  return (
    <Body theme={theme} autoDark={true}>
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Card style={{ marginBottom: '2rem', padding: '2rem' }}>
          <Text as="h1" size="3xl" weight="bold" style={{ marginBottom: '1rem' }}>
            Improved Text Contrast Test  
          </Text>
          
          <Text style={{ marginBottom: '2rem', color: 'var(--current-text)' }}>
            This demo tests the improved contrast functionality. All text colors now meet 
            WCAG AA standards (4.5:1 contrast ratio) for better accessibility and readability.
          </Text>

          <div style={{ marginBottom: '2rem' }}>
            <Text as="h3" weight="semibold" style={{ marginBottom: '1rem' }}>
              Theme Selection:
            </Text>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {themes.map((themeName) => (
                <Button
                  key={themeName}
                  variant={theme === themeName ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme(themeName)}
                >
                  {themeName}
                </Button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <Button onClick={toggleSystemTheme}>
              {manualDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1rem' 
          }}>
            <Card style={{ padding: '1rem' }}>
              <Text as="h4" weight="semibold" style={{ marginBottom: '0.5rem' }}>
                Current Variables:
              </Text>
              <Text size="sm" style={{ 
                fontFamily: 'monospace',
                background: 'var(--current-surface)',
                padding: '0.5rem',
                borderRadius: '4px'
              }}>
                --current-text: var(--current-text)<br/>
                --color-text: var(--color-text)
              </Text>
            </Card>

            <Card style={{ padding: '1rem' }}>
              <Text as="h4" weight="semibold" style={{ marginBottom: '0.5rem' }}>
                Text Examples:
              </Text>
              <Text style={{ marginBottom: '0.5rem' }}>
                Normal text (should adapt to theme)
              </Text>
              <Text color="muted" style={{ marginBottom: '0.5rem' }}>
                Muted text (secondary color)
              </Text>
              <Text color="primary">
                Primary colored text
              </Text>
            </Card>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--current-border)', borderRadius: '8px' }}>
            <Text as="h4" weight="semibold" style={{ marginBottom: '0.5rem' }}>
              Accessibility Improvements:
            </Text>
            <Text size="sm">
              ✅ All text colors now meet WCAG AA contrast standards (4.5:1 ratio)<br/>
              ✅ Improved readability in both light and dark modes<br/>
              ✅ Better contrast for users with visual impairments<br/>
              ✅ Auto-dark functionality works with high contrast colors<br/>
              ✅ Secondary text maintains good readability
            </Text>
          </div>
        </Card>
      </div>
    </Body>
  );
};

export default AutoDarkTextDemo;