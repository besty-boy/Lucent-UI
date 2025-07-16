import React from 'react';
import { Text, Card, Grid, AnimatedCard, FluidLayout } from '../../../src';

export function Examples() {
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
        💡 Exemples Pratiques
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Découvrez comment créer différents types de sites avec Lucent-UI
      </Text>

      <FluidLayout mode="adaptive" columns="auto" gap="lg" animate>
        <AnimatedCard variant="glass" animation="fade" hoverEffect="lift">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            🏢 Site d'Entreprise
          </Text>
          {renderCodeExample(`<Body theme="apple">
  <Navbar logo="MonEntreprise" variant="glass" />
  <Card variant="glass" padding="lg">
    <h1>Solutions Professionnelles</h1>
    <Button variant="primary" size="lg">
      Nos Services
    </Button>
  </Card>
</Body>`)}
        </AnimatedCard>

        <AnimatedCard variant="premium" animation="scale" hoverEffect="glow">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            🎨 Portfolio Créatif
          </Text>
          {renderCodeExample(`<Body theme="aurora">
  <FluidLayout mode="masonry" animate>
    <AnimatedCard variant="glass" animation="fade">
      <h2>Mes Projets</h2>
      <MagicButton variant="holographic">
        Voir Plus
      </MagicButton>
    </AnimatedCard>
  </FluidLayout>
</Body>`)}
        </AnimatedCard>

        <AnimatedCard variant="neon" animation="flip" hoverEffect="pulse">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            🎮 Site Gaming
          </Text>
          {renderCodeExample(`<Body theme="neon">
  <SmartContainer mode="adaptive">
    <AnimatedCard variant="neon" animation="glow">
      <h1>Gaming Zone</h1>
      <MagicButton variant="neon" effect="particle">
        Jouer Maintenant
      </MagicButton>
    </AnimatedCard>
  </SmartContainer>
</Body>`)}
        </AnimatedCard>

        <AnimatedCard variant="crystal" animation="morphism" hoverEffect="tilt">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            🛒 E-Commerce
          </Text>
          {renderCodeExample(`<Body theme="crystal">
  <Grid columns={3} gap="lg">
    <Card variant="elevated" padding="lg">
      <h3>Produit 1</h3>
      <Text>Prix: 29€</Text>
      <Button variant="primary">Acheter</Button>
    </Card>
  </Grid>
</Body>`)}
        </AnimatedCard>

        <AnimatedCard variant="gradient" animation="pulse" hoverEffect="lift">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            📱 Landing Page
          </Text>
          {renderCodeExample(`<Body theme="gradient">
  <Section background="gradient" textAlign="center">
    <h1>Révolutionnez votre Business</h1>
    <Button variant="primary" size="xl">
      Commencer Gratuitement
    </Button>
  </Section>
</Body>`)}
        </AnimatedCard>

        <AnimatedCard variant="elevated" animation="fade" hoverEffect="scale">
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            📝 Blog Personnel
          </Text>
          {renderCodeExample(`<Body theme="minimal">
  <Container maxWidth="lg">
    <Card variant="minimal" padding="xl">
      <h1>Mon Blog</h1>
      <Text size="lg" color="muted">
        Mes réflexions sur la tech
      </Text>
    </Card>
  </Container>
</Body>`)}
        </AnimatedCard>
      </FluidLayout>

      <div style={{ marginTop: '4rem' }}>
        <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
          Template Complet
        </Text>
        
        <Card variant="premium" padding="lg">
          <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
            Site Professionnel en 30 lignes
          </Text>
          {renderCodeExample(`import { Body, Navbar, Section, Container, Grid, Card, Button, Text } from 'lucent-ui';

function App() {
  return (
    <Body theme="aurora" autoDark responsive>
      <Navbar logo="Mon Entreprise" variant="glass" sticky>
        <Button variant="ghost">Accueil</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="primary">Contact</Button>
      </Navbar>
      
      <Section background="gradient" textAlign="center" minHeight="60vh">
        <Container>
          <Text as="h1" size="5xl" weight="bold" gradient>
            Bienvenue sur Notre Site
          </Text>
          <Text size="xl" color="muted" style={{ marginBottom: '2rem' }}>
            Solutions innovantes pour votre entreprise
          </Text>
          <Button variant="primary" size="lg">
            Découvrir nos services
          </Button>
        </Container>
      </Section>
      
      <Section>
        <Container>
          <Grid columns={3} gap="lg">
            <Card variant="glass" padding="lg">
              <Text as="h3" size="xl" weight="bold">Service 1</Text>
              <Text color="muted">Description du service</Text>
              <Button variant="outline">En savoir plus</Button>
            </Card>
            <Card variant="glass" padding="lg">
              <Text as="h3" size="xl" weight="bold">Service 2</Text>
              <Text color="muted">Description du service</Text>
              <Button variant="outline">En savoir plus</Button>
            </Card>
            <Card variant="glass" padding="lg">
              <Text as="h3" size="xl" weight="bold">Service 3</Text>
              <Text color="muted">Description du service</Text>
              <Button variant="outline">En savoir plus</Button>
            </Card>
          </Grid>
        </Container>
      </Section>
    </Body>
  );
}`)}
        </Card>
      </div>
    </div>
  );
}