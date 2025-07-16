import React from 'react';
import { Text, Card, Grid, AnimatedCard } from '../../../src';

export function Installation() {
  const codeExample = `import React from 'react';
import { Body, Card, Button } from 'lucent-ui';

function App() {
  return (
    <Body theme="velora">
      <Card>
        <h1>Mon Premier Site</h1>
        <Button variant="primary">Cliquez ici</Button>
      </Card>
    </Body>
  );
}`;

  const renderCodeExample = (code: string) => (
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
        {code}
      </pre>
    </Card>
  );

  return (
    <div>
      <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '2rem' }}>
        🚀 Installation & Configuration
      </Text>
      
      <AnimatedCard variant="glass" animation="fade" style={{ marginBottom: '2rem' }}>
        <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Installation du Package
        </Text>
        <Card variant="outline" padding="md" style={{ backgroundColor: 'var(--color-backgroundDark)', color: 'var(--color-textDark)' }}>
          <pre style={{ margin: 0 }}>npm install lucent-ui</pre>
        </Card>
      </AnimatedCard>

      <AnimatedCard variant="premium" animation="slide" style={{ marginBottom: '2rem' }}>
        <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Configuration Minimum
        </Text>
        {renderCodeExample(codeExample)}
      </AnimatedCard>

      <Grid columns={3} gap="lg" minWidth="250px" mobileColumns={1}>
        <AnimatedCard variant="gradient" animation="scale" hoverEffect="lift">
          <Text as="h4" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            ✅ Auto-Setup
          </Text>
          <Text color="muted">
            Thèmes, mode sombre, SEO, responsive - tout automatique
          </Text>
        </AnimatedCard>
        
        <AnimatedCard variant="crystal" animation="fade" hoverEffect="glow">
          <Text as="h4" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            ⚡ Zero Config
          </Text>
          <Text color="muted">
            Aucune configuration requise - fonctionne immédiatement
          </Text>
        </AnimatedCard>

        <AnimatedCard variant="neon" animation="pulse" hoverEffect="tilt">
          <Text as="h4" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            🎨 25 Thèmes
          </Text>
          <Text color="muted">
            Thèmes premium inclus - changez en 1 prop
          </Text>
        </AnimatedCard>
      </Grid>

      <div style={{ marginTop: '3rem' }}>
        <Text as="h3" size="2xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Étapes Suivantes
        </Text>
        <Grid columns={2} gap="lg" minWidth="250px" mobileColumns={1}>
          <Card variant="outline" padding="lg">
            <Text as="h4" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              1. Explorez les Composants
            </Text>
            <Text color="muted">
              Découvrez Button, Card, Input, Grid et tous les composants de base
            </Text>
          </Card>
          
          <Card variant="outline" padding="lg">
            <Text as="h4" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              2. Testez les Thèmes
            </Text>
            <Text color="muted">
              Changez simplement la prop theme pour transformer votre site
            </Text>
          </Card>
        </Grid>
      </div>
    </div>
  );
}