import React from 'react';
import { Text, Card, Grid, AnimatedCard } from '../../../src';

export function Components() {
  const components = [
    {
      name: 'Body',
      description: 'Composant racine intelligent avec auto-setup',
      props: 'theme, autoDark, responsive, meta',
      example: '<Body theme="velora" autoDark responsive>'
    },
    {
      name: 'Button',
      description: 'Boutons stylisés avec variants avancés',
      props: 'variant, size, corner, shadow, glow',
      example: '<Button variant="primary" corner={16} glow>'
    },
    {
      name: 'Card',
      description: 'Conteneur élégant avec effets visuels',
      props: 'variant, padding, corner, shadow, glow',
      example: '<Card variant="glass" padding="lg" corner={20}>'
    },
    {
      name: 'Input',
      description: 'Champs de saisie personnalisables',
      props: 'variant, size, corner, iconLeft, iconRight',
      example: '<Input variant="primary" corner={12} iconLeft={<Icon />}>'
    },
    {
      name: 'Grid',
      description: 'Système de grille responsive',
      props: 'columns, gap, minWidth, mobileColumns',
      example: '<Grid columns={3} gap="lg" minWidth="200px">'
    },
    {
      name: 'Flex',
      description: 'Flexbox simplifié et responsive',
      props: 'direction, align, justify, gap, wrap',
      example: '<Flex direction="row" align="center" gap="1rem">'
    }
  ];

  return (
    <div>
      <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '2rem' }}>
        🎨 Composants Principaux
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Découvrez tous les composants de base pour créer des interfaces modernes
      </Text>

      <Grid columns={3} gap="lg" minWidth="250px" mobileColumns={1}>
        {components.map((component, index) => (
          <AnimatedCard 
            key={component.name} 
            variant="glass" 
            animation="fade" 
            hoverEffect="lift"
            delay={index * 100}
          >
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '0.5rem' }}>
              {component.name}
            </Text>
            <Text color="muted" style={{ marginBottom: '1rem' }}>
              {component.description}
            </Text>
            <Text size="sm" weight="medium" style={{ marginBottom: '1rem' }}>
              Props: {component.props}
            </Text>
            <Card variant="outline" padding="sm" style={{ backgroundColor: 'var(--color-backgroundDark)', color: 'var(--color-textDark)' }}>
              <pre style={{ 
                margin: 0, 
                fontSize: '0.75rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {component.example}
              </pre>
            </Card>
          </AnimatedCard>
        ))}
      </Grid>

      <div style={{ marginTop: '4rem' }}>
        <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
          Exemple d'Utilisation
        </Text>
        
        <Card variant="premium" padding="lg">
          <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
            Site Complet en 10 lignes
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
{`import { Body, Navbar, Card, Button, Grid, Text } from 'lucent-ui';

function App() {
  return (
    <Body theme="aurora" autoDark responsive>
      <Navbar logo="Mon Site" variant="glass" />
      <Grid columns={3} gap="lg">
        <Card variant="glass" padding="lg">
          <Text as="h2">Service 1</Text>
          <Button variant="primary">En savoir plus</Button>
        </Card>
        <Card variant="glass" padding="lg">
          <Text as="h2">Service 2</Text>
          <Button variant="primary">En savoir plus</Button>
        </Card>
        <Card variant="glass" padding="lg">
          <Text as="h2">Service 3</Text>
          <Button variant="primary">En savoir plus</Button>
        </Card>
      </Grid>
    </Body>
  );
}`}
            </pre>
          </Card>
        </Card>
      </div>
    </div>
  );
}