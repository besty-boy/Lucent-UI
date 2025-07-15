import React, { useState } from 'react';
import { 
  Body, Card, Button, Navbar, Container, Grid,
  lucent, pure, getThemeNames, LUCENT_THEMES
} from './src/pure';

export function PureShowcase() {
  const [currentTheme, setCurrentTheme] = useState('crystal');
  const [dslMode, setDslMode] = useState(false);
  const themeNames = getThemeNames();

  // Pure DSL demonstration
  if (dslMode) {
    return lucent()
      .theme(currentTheme)
      .navbar('✨ Pure DSL Mode')
      .end()
      .container('xl', 'xl')
      .card('premium', 'xl')
      .heading('🚀 Zero Tailwind', 1)
      .text('Cette interface est construite entièrement avec Lucent-UI pur, sans aucune dépendance Tailwind.')
      .button('gradient', 'Incroyable!', () => setDslMode(false))
      .end()
      .grid('auto', 'lg')
      .card('glass').heading('Performance', 3).text('Styles CSS purs optimisés').end()
      .card('elevated').heading('Clean Code', 3).text('Zéro classe CSS externe').end()
      .card('premium').heading('Professional', 3).text('Qualité production ready').end()
      .end()
      .end()
      .render();
  }

  return (
    <Body 
      theme={currentTheme as any}
      autoDark 
      responsive
      meta={{
        title: `Lucent-UI Pure - ${LUCENT_THEMES[currentTheme]?.name} Edition`,
        description: "Interface ultra-professionnelle construite sans Tailwind, styles CSS purs intégrés",
        author: "Lucent-UI Pure Team",
        keywords: "React, UI, pure CSS, professional, clean, no tailwind"
      }}
    >
      <Navbar 
        logo={`💎 ${LUCENT_THEMES[currentTheme]?.name} Pure`} 
        variant="glass"
      >
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {themeNames.map((theme) => (
            <Button
              key={theme}
              variant={currentTheme === theme ? 'gradient' : 'ghost'}
              size="sm"
              onClick={() => setCurrentTheme(theme)}
            >
              {LUCENT_THEMES[theme].name}
            </Button>
          ))}
        </div>
      </Navbar>

      <Container maxWidth="2xl" padding="xl" spacing="xl">
        {/* Hero Section */}
        <Card variant="premium" size="xl" padding="xl">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: 'var(--text-6xl)', 
              fontWeight: 800, 
              marginBottom: 'var(--space-6)',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {LUCENT_THEMES[currentTheme].name} Pure
            </h1>
            <p style={{ 
              fontSize: 'var(--text-2xl)', 
              opacity: 0.9,
              marginBottom: 'var(--space-8)',
              maxWidth: '600px',
              margin: '0 auto var(--space-8)'
            }}>
              {LUCENT_THEMES[currentTheme].description}
            </p>
            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-6)', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button variant="gradient" size="xl">
                ✨ Ultra Professional
              </Button>
              <Button variant="glass" size="xl">
                🎨 Zero Tailwind
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => setDslMode(true)}
              >
                🚀 Pure DSL
              </Button>
            </div>
          </div>
        </Card>

        {/* No Tailwind Message */}
        <Card variant="glass" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)', 
              fontWeight: 700, 
              marginBottom: 'var(--space-4)',
              color: 'var(--color-primary)'
            }}>
              🚫 Zero Tailwind Dependencies
            </h2>
            <p style={{ 
              fontSize: 'var(--text-lg)', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Cette interface entière est construite avec des styles CSS purs intégrés. 
              Aucune classe Tailwind, aucune dépendance externe - juste du CSS moderne et optimisé.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <Grid columns="auto" gap="lg">
          <Card variant="elevated" padding="lg" interactive>
            <h3 style={{ 
              fontSize: 'var(--text-xl)', 
              fontWeight: 600, 
              marginBottom: 'var(--space-4)',
              color: 'var(--color-primary)'
            }}>
              🎯 Ultra Clean
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', opacity: 0.8 }}>
              Styles CSS purs générés automatiquement avec le thème
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Découvrir
            </Button>
          </Card>

          <Card variant="glass" padding="lg" interactive>
            <h3 style={{ 
              fontSize: 'var(--text-xl)', 
              fontWeight: 600, 
              marginBottom: 'var(--space-4)',
              color: 'var(--color-secondary)'
            }}>
              ⚡ Performance
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', opacity: 0.8 }}>
              Bundle ultra-léger, styles optimisés par le navigateur
            </p>
            <Button variant="ghost" size="sm" fullWidth>
              Benchmarks
            </Button>
          </Card>

          <Card variant="premium" padding="lg" interactive>
            <h3 style={{ 
              fontSize: 'var(--text-xl)', 
              fontWeight: 600, 
              marginBottom: 'var(--space-4)',
              color: 'var(--color-accent)'
            }}>
              💎 Professional
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', opacity: 0.8 }}>
              Qualité production avec animations et interactions fluides
            </p>
            <Button variant="gradient" size="sm" fullWidth>
              Essayer
            </Button>
          </Card>
        </Grid>

        {/* Code Examples */}
        <Card variant="minimal" padding="lg">
          <h2 style={{ 
            fontSize: 'var(--text-3xl)', 
            fontWeight: 700, 
            marginBottom: 'var(--space-6)',
            textAlign: 'center'
          }}>
            💻 API Ultra-Simplifiée
          </h2>
          
          <Grid columns={2} gap="lg">
            <div>
              <h3 style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 600, 
                marginBottom: 'var(--space-4)'
              }}>
                Composants React Purs:
              </h3>
              <pre style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                fontSize: 'var(--text-sm)',
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)'
              }}>
{`<Body theme="${currentTheme}">
  <Card variant="premium">
    <h1>Professional UI</h1>
    <Button variant="gradient">
      Zero Tailwind
    </Button>
  </Card>
</Body>`}
              </pre>
            </div>
            
            <div>
              <h3 style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 600, 
                marginBottom: 'var(--space-4)'
              }}>
                DSL Ultra-Clean:
              </h3>
              <pre style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                fontSize: 'var(--text-sm)',
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)'
              }}>
{`lucent()
  .theme('${currentTheme}')
  .card('premium')
  .heading('Professional UI')
  .button('gradient', 'Zero Tailwind')
  .render()`}
              </pre>
            </div>
          </Grid>
        </Card>

        {/* Theme Colors */}
        <Card padding="lg">
          <h3 style={{ 
            fontSize: 'var(--text-2xl)', 
            fontWeight: 700, 
            marginBottom: 'var(--space-6)',
            textAlign: 'center'
          }}>
            🎨 Palette {LUCENT_THEMES[currentTheme].name}
          </h3>
          <Grid columns="auto" gap="md">
            {Object.entries(LUCENT_THEMES[currentTheme].colors).map(([name, color]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: 'var(--radius-xl)',
                  margin: '0 auto var(--space-2)',
                  border: '2px solid var(--color-border)',
                  boxShadow: 'var(--shadow-lg)',
                  backgroundColor: color,
                  transition: 'transform var(--transition-fast)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                />
                <p style={{ 
                  fontSize: 'var(--text-xs)', 
                  fontWeight: 600, 
                  textTransform: 'capitalize',
                  marginBottom: 'var(--space-1)'
                }}>
                  {name}
                </p>
                <p style={{ 
                  fontSize: 'var(--text-xs)', 
                  opacity: 0.6,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {color}
                </p>
              </div>
            ))}
          </Grid>
        </Card>

        {/* Benefits */}
        <Card variant="gradient" padding="xl">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: 'var(--text-4xl)', 
              fontWeight: 800, 
              marginBottom: 'var(--space-6)',
              color: 'white'
            }}>
              🚀 Pourquoi Lucent-UI Pure?
            </h2>
            <Grid columns={3} gap="lg">
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
                  🎯
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  Zero Config
                </h3>
                <p style={{ opacity: 0.9, fontSize: 'var(--text-sm)' }}>
                  Aucune configuration CSS nécessaire
                </p>
              </div>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
                  ⚡
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  Ultra Léger
                </h3>
                <p style={{ opacity: 0.9, fontSize: 'var(--text-sm)' }}>
                  Bundle minimal, styles intégrés
                </p>
              </div>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
                  💎
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  Pro Quality
                </h3>
                <p style={{ opacity: 0.9, fontSize: 'var(--text-sm)' }}>
                  Design et animations premium
                </p>
              </div>
            </Grid>
          </div>
        </Card>
      </Container>
    </Body>
  );
}

export default PureShowcase;