import React from 'react';
import { Text, Card, Grid, AnimatedCard } from '../../../src';

export function Advanced() {
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
        🔧 Configuration Avancée
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Optimisations avancées et fonctionnalités intelligentes
      </Text>

      <Grid columns={3} gap="lg" minWidth="250px" mobileColumns={1}>
        <AnimatedCard variant="premium" animation="fade" hoverEffect="lift">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            🎯 Performance Auto
          </Text>
          <Text color="muted" style={{ marginBottom: '1rem' }}>
            Le composant Body optimise automatiquement selon:
          </Text>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Mémoire de l'appareil</li>
            <li>Type de connexion</li>
            <li>Préférences utilisateur</li>
            <li>Capacités GPU</li>
          </ul>
        </AnimatedCard>

        <AnimatedCard variant="gradient" animation="scale" hoverEffect="glow">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            📱 Responsive Auto
          </Text>
          <Text color="muted" style={{ marginBottom: '1rem' }}>
            Gestion automatique:
          </Text>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Breakpoints responsive</li>
            <li>Optimisation mobile</li>
            <li>Adaptation tactile</li>
            <li>Orientation écran</li>
          </ul>
        </AnimatedCard>

        <AnimatedCard variant="crystal" animation="flip" hoverEffect="tilt">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            ♿ Accessibilité
          </Text>
          <Text color="muted" style={{ marginBottom: '1rem' }}>
            Respect automatique:
          </Text>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>prefers-reduced-motion</li>
            <li>prefers-contrast</li>
            <li>prefers-color-scheme</li>
            <li>Navigation clavier</li>
          </ul>
        </AnimatedCard>
      </Grid>

      <div style={{ marginTop: '4rem' }}>
        <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
          Configuration Personnalisée
        </Text>
        
        <Card variant="premium" padding="lg" style={{ marginBottom: '2rem' }}>
          <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
            Body avec Configuration Complète
          </Text>
          {renderCodeExample(`<Body 
  theme="aurora" 
  autoDark 
  responsive
  config={{
    performance: {
      mode: 'balanced', // 'economy' | 'balanced' | 'high'
      animations: true,
      gpu: 'auto' // 'auto' | 'force' | 'disable'
    },
    accessibility: {
      reduceMotion: 'respect', // 'respect' | 'ignore'
      highContrast: 'auto',
      focusRing: true
    },
    responsive: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      }
    }
  }}
  meta={{
    title: "Mon Site Professionnel",
    description: "Site créé avec Lucent-UI",
    author: "Mon Nom",
    keywords: "react, ui, professionnel",
    ogImage: "/og-image.jpg"
  }}
>
  {/* Votre contenu */}
</Body>`)}
        </Card>

        <Card variant="glass" padding="lg">
          <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
            Thème Personnalisé
          </Text>
          {renderCodeExample(`// Créer un thème personnalisé
const monTheme = {
  name: 'Mon Thème',
  description: 'Thème personnalisé pour ma marque',
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#1F2937',
    muted: '#6B7280',
    border: '#E5E7EB'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    secondary: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }
};

// Utilisation
<Body theme={monTheme}>
  {/* Votre contenu */}
</Body>`)}
        </Card>
      </div>
    </div>
  );
}