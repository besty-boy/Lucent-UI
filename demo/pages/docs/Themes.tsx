import React, { useState } from 'react';
import { Text, Card, Grid, Button, AnimatedCard, getThemeNames, LUCENT_THEMES } from '../../../src';

export function Themes() {
  const [currentTheme, setCurrentTheme] = useState('velora');
  const themeNames = getThemeNames();

  return (
    <div>
      <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '2rem' }}>
        🌈 Système de Thèmes
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        25 thèmes premium inclus - changez le style de votre site en 1 prop
      </Text>

      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Sélecteur de Thème
        </Text>
        <Grid columns={5} gap="1rem" minWidth="150px" mobileColumns={2}>
          {themeNames.map((theme) => (
            <Button
              key={theme}
              variant={currentTheme === theme ? "primary" : "outline"}
              onClick={() => setCurrentTheme(theme)}
              style={{ 
                padding: '1rem',
                textTransform: 'capitalize',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
            >
              {LUCENT_THEMES[theme]?.name || theme}
            </Button>
          ))}
        </Grid>
      </Card>

      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Thème Actuel: {LUCENT_THEMES[currentTheme]?.name || currentTheme}
        </Text>
        <Text color="muted" style={{ marginBottom: '2rem' }}>
          {LUCENT_THEMES[currentTheme]?.description}
        </Text>
        
        <Grid columns={2} gap="lg" minWidth="200px" mobileColumns={1}>
          <div>
            <Text size="sm" weight="medium" style={{ marginBottom: '1rem' }}>
              Couleurs:
            </Text>
            <Grid columns={4} gap="md" minWidth="80px" mobileColumns={3}>
              {Object.entries(LUCENT_THEMES[currentTheme]?.colors || {}).slice(0, 8).map(([name, color]) => (
                <div key={name} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '8px',
                    margin: '0 auto 0.5rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: color as string,
                  }} />
                  <Text size="xs" style={{ textTransform: 'capitalize' }}>
                    {name}
                  </Text>
                </div>
              ))}
            </Grid>
          </div>
          
          <div>
            <Text size="sm" weight="medium" style={{ marginBottom: '1rem' }}>
              Exemples:
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Button variant="primary" style={{ width: '100%' }}>Bouton Principal</Button>
              <Button variant="secondary" style={{ width: '100%' }}>Bouton Secondaire</Button>
              <Card variant="glass" padding="sm">
                <Text size="sm">Carte avec effet glass</Text>
              </Card>
            </div>
          </div>
        </Grid>
      </Card>

      <div>
        <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
          Usage des Thèmes
        </Text>
        
        <Card variant="outline" padding="lg">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            Changer de Thème
          </Text>
          <Card 
            variant="outline" 
            padding="md"
            style={{ 
              backgroundColor: 'var(--color-backgroundDark)', 
              color: 'var(--color-textDark)',
              fontSize: '0.9rem',
              overflow: 'auto',
              overflowX: 'auto',
              maxWidth: '100%'
            }}
          >
            <pre style={{ 
              margin: 0, 
              fontSize: '0.85rem', 
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
{`// Changez simplement la prop theme
<Body theme="velora">  {/* Thème mystique */}
<Body theme="neon">    {/* Thème cyberpunk */}
<Body theme="aurora">  {/* Thème nordique */}
<Body theme="crystal"> {/* Thème cristallin */}

// Mode sombre automatique
<Body theme="velora" autoDark>
  {/* S'adapte automatiquement aux préférences système */}
</Body>`}
            </pre>
          </Card>
        </Card>
      </div>
    </div>
  );
}