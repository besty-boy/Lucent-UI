import { useState } from 'react';
import { Body, Card, Button, Navbar, Grid, Section, Text, Flex, AnimatedCard, MagicButton, FluidLayout, SmartContainer, MagneticZone } from '../src';
import { getThemeNames, LUCENT_THEMES } from '../src/themes';

export interface DocumentationProps {
  onNavigateToShowcase?: () => void;
}

export function Documentation(props: DocumentationProps = {}) {
  const { onNavigateToShowcase = () => console.warn('⚠️ Documentation: Utilisez LucentUIDemo pour la navigation automatique ou fournissez onNavigateToShowcase') } = props;
  const [currentTheme, setCurrentTheme] = useState('velora');
  const [activeSection, setActiveSection] = useState('installation');
  const [codeExample, setCodeExample] = useState('basic');
  const themeNames = getThemeNames();

  const navigationItems = [
    { id: 'installation', label: '🚀 Installation', icon: '📦' },
    { id: 'components', label: '🎨 Composants', icon: '🧩' },
    { id: 'premium', label: '⭐ Premium', icon: '✨' },
    { id: 'themes', label: '🌈 Thèmes', icon: '🎭' },
    { id: 'examples', label: '💡 Exemples', icon: '🔍' },
    { id: 'advanced', label: '🔧 Avancé', icon: '⚙️' }
  ];

  const codeExamples = {
    basic: `import React from 'react';
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
}`,
    
    premium: `import React from 'react';
import { Body, AnimatedCard, MagicButton, FluidLayout } from 'lucent-ui';

function PremiumExample() {
  return (
    <Body theme="aurora">
      <FluidLayout mode="adaptive" columns="auto" gap="lg">
        <AnimatedCard variant="glass" animation="fade" hoverEffect="lift">
          <h2>Animation Card</h2>
          <MagicButton variant="magic" effect="shimmer">
            Magic Button
          </MagicButton>
        </AnimatedCard>
      </FluidLayout>
    </Body>
  );
}`,

    advanced: `import React from 'react';
import { Body, SmartContainer, MagneticZone } from 'lucent-ui';

function AdvancedExample() {
  return (
    <Body theme="neon" autoDark responsive>
      <SmartContainer mode="adaptive" maxWidth="xl">
        <MagneticZone intensity={30}>
          <Card variant="neon">
            Suit votre curseur !
          </Card>
        </MagneticZone>
      </SmartContainer>
    </Body>
  );
}`
  };

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

  const premiumComponents = [
    {
      name: 'AnimatedCard',
      description: 'Cartes avec animations avancées et effets visuels',
      props: 'variant, animation, hoverEffect, autoAnimate',
      variants: ['default', 'premium', 'glass', 'gradient', 'neon', 'crystal'],
      example: '<AnimatedCard variant="premium" animation="fade" hoverEffect="lift">'
    },
    {
      name: 'MagicButton',
      description: 'Boutons avec effets magiques et interactifs',
      props: 'variant, effect, size, loading, disabled',
      variants: ['primary', 'magic', 'neon', 'holographic'],
      example: '<MagicButton variant="magic" effect="shimmer" size="lg">'
    },
    {
      name: 'FluidLayout',
      description: 'Layouts adaptatifs avec positionnement intelligent',
      props: 'mode, columns, gap, animate, responsive',
      variants: ['adaptive', 'masonry', 'grid', 'flow', 'magnetic'],
      example: '<FluidLayout mode="masonry" columns="auto" animate>'
    },
    {
      name: 'SmartContainer',
      description: 'Conteneur intelligent avec optimisation automatique',
      props: 'mode, maxWidth, padding, spacing, behavior',
      variants: ['auto', 'fixed', 'fluid', 'responsive', 'adaptive'],
      example: '<SmartContainer mode="adaptive" maxWidth="xl">'
    }
  ];

  const renderCodeExample = (code: string) => (
    <Card 
      variant="outline" 
      padding="md"
      style={{ 
        backgroundColor: 'var(--color-backgroundDark)', 
        color: 'var(--color-textDark)',
        fontSize: '0.9rem',
        overflow: 'auto'
      }}
    >
      <pre style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.5' }}>
        {code}
      </pre>
    </Card>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'installation':
        return (
          <div>
            <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
              🚀 Installation & Configuration
            </Text>
            
            <AnimatedCard variant="glass" animation="fade" className="mb-8">
              <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
                Installation du Package
              </Text>
              <Card variant="outline" padding="md" style={{ backgroundColor: 'var(--color-backgroundDark)', color: 'var(--color-textDark)' }}>
                <pre style={{ margin: 0 }}>npm install lucent-ui</pre>
              </Card>
            </AnimatedCard>

            <AnimatedCard variant="premium" animation="slide" className="mb-8">
              <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
                Configuration Minimum
              </Text>
              {renderCodeExample(codeExamples.basic)}
            </AnimatedCard>

            <Grid columns={3} gap="lg" minWidth="300px">
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
            </Grid>
          </div>
        );

      case 'components':
        return (
          <div>
            <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
              🎨 Composants Principaux
            </Text>
            
            <Grid columns={3} gap="lg" minWidth="300px">
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
                    <pre style={{ margin: 0, fontSize: '0.8rem' }}>
                      {component.example}
                    </pre>
                  </Card>
                </AnimatedCard>
              ))}
            </Grid>
          </div>
        );

      case 'premium':
        return (
          <div>
            <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '1rem' }}>
              ⭐ Composants Premium
            </Text>
            <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
              Composants avancés avec animations, effets visuels et intelligence artificielle
            </Text>

            <Flex gap="1rem" wrap="wrap" style={{ marginBottom: '2rem' }}>
              <MagicButton 
                variant="magic" 
                effect="shimmer" 
                onClick={() => setCodeExample('premium')}
                className={codeExample === 'premium' ? 'opacity-100' : 'opacity-70'}
              >
                Voir Exemple Premium
              </MagicButton>
              <MagicButton 
                variant="neon" 
                effect="glow"
                onClick={() => setCodeExample('advanced')}
                className={codeExample === 'advanced' ? 'opacity-100' : 'opacity-70'}
              >
                Exemple Avancé
              </MagicButton>
            </Flex>

            <AnimatedCard variant="premium" animation="morphism" className="mb-8">
              <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
                Code Exemple Premium
              </Text>
              {renderCodeExample(codeExamples[codeExample as keyof typeof codeExamples])}
            </AnimatedCard>

            <FluidLayout mode="adaptive" columns="auto" gap="lg" animate>
              {premiumComponents.map((component, index) => (
                <AnimatedCard 
                  key={component.name} 
                  variant="premium" 
                  animation="fade" 
                  hoverEffect="lift"
                  delay={index * 150}
                >
                  <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '0.5rem' }}>
                    {component.name}
                  </Text>
                  <Text color="muted" style={{ marginBottom: '1rem' }}>
                    {component.description}
                  </Text>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <Text size="sm" weight="medium" style={{ marginBottom: '0.5rem' }}>
                      Variants disponibles:
                    </Text>
                    <Flex gap="0.5rem" wrap="wrap">
                      {component.variants.map((variant) => (
                        <Card 
                          key={variant}
                          variant="outline" 
                          padding="sm" 
                          className="text-xs capitalize"
                        >
                          {variant}
                        </Card>
                      ))}
                    </Flex>
                  </div>

                  <Card variant="outline" padding="sm" style={{ backgroundColor: 'var(--color-backgroundDark)', color: 'var(--color-textDark)' }}>
                    <pre style={{ margin: 0, fontSize: '0.8rem' }}>
                      {component.example}
                    </pre>
                  </Card>
                </AnimatedCard>
              ))}
            </FluidLayout>

            <AnimatedCard variant="neon" animation="fade" className="mt-8">
              <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
                🎯 Démonstration Interactive
              </Text>
              <Text color="muted" style={{ marginBottom: '2rem' }}>
                Testez les composants premium en temps réel
              </Text>
              
              <FluidLayout mode="magnetic" gap="xl" animate>
                <MagneticZone intensity={25}>
                  <AnimatedCard variant="glass" animation="scale" hoverEffect="float">
                    <Text>Carte Magnétique</Text>
                    <Text size="sm" color="muted">Suivez votre curseur !</Text>
                  </AnimatedCard>
                </MagneticZone>
                
                <AnimatedCard variant="crystal" animation="flip" hoverEffect="tilt">
                  <Text>Animation Flip</Text>
                  <MagicButton variant="holographic" effect="aurora" size="sm">
                    Holographique
                  </MagicButton>
                </AnimatedCard>
                
                <AnimatedCard variant="neon" animation="morphism" hoverEffect="pulse">
                  <Text>Effet Néon</Text>
                  <MagicButton variant="neon" effect="particle" size="sm">
                    Particules
                  </MagicButton>
                </AnimatedCard>
              </FluidLayout>
            </AnimatedCard>
          </div>
        );

      case 'themes':
        return (
          <div>
            <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '1rem' }}>
              🌈 Thèmes Premium
            </Text>
            <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
              25 thèmes professionnels avec mode sombre automatique
            </Text>

            <Grid columns="auto" gap="md" minWidth="160px" style={{ marginBottom: '2rem' }}>
              {themeNames.map((theme) => (
                <MagicButton
                  key={theme}
                  variant={currentTheme === theme ? "primary" : "outline"}
                  effect="ripple"
                  onClick={() => setCurrentTheme(theme)}
                  className="capitalize text-sm"
                >
                  {LUCENT_THEMES[theme]?.name || theme}
                </MagicButton>
              ))}
            </Grid>

            <AnimatedCard variant="premium" animation="fade" className="mb-8">
              <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
                Thème Actuel: {LUCENT_THEMES[currentTheme]?.name || currentTheme}
              </Text>
              <Text color="muted" style={{ marginBottom: '2rem' }}>
                {LUCENT_THEMES[currentTheme]?.description}
              </Text>
              
              <Grid columns={2} gap="lg" minWidth="200px">
                <div>
                  <Text size="sm" weight="medium" style={{ marginBottom: '1rem' }}>
                    Boutons:
                  </Text>
                  <Flex direction="column" gap="0.5rem">
                    <Button variant="primary" corner={8}>Primary</Button>
                    <Button variant="secondary" corner={12}>Secondary</Button>
                    <Button variant="outline" corner={16}>Outline</Button>
                    <Button variant="ghost" corner={20}>Ghost</Button>
                  </Flex>
                </div>
                
                <div>
                  <Text size="sm" weight="medium" style={{ marginBottom: '1rem' }}>
                    Cards:
                  </Text>
                  <Flex direction="column" gap="0.5rem">
                    <Card variant="glass" padding="sm" corner={8}>
                      <Text size="sm">Glass</Text>
                    </Card>
                    <Card variant="gradient" padding="sm" corner={12}>
                      <Text size="sm">Gradient</Text>
                    </Card>
                    <Card variant="outline" padding="sm" corner={16}>
                      <Text size="sm">Outline</Text>
                    </Card>
                  </Flex>
                </div>
              </Grid>
            </AnimatedCard>

            <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
              Code d'Utilisation
            </Text>
            {renderCodeExample(`import { Body, Card, Button } from 'lucent-ui';

function App() {
  return (
    <Body theme="${currentTheme}">
      <Card variant="glass" padding="lg">
        <h1>Thème ${LUCENT_THEMES[currentTheme]?.name || currentTheme}</h1>
        <Button variant="primary" corner={16}>
          Bouton Stylé
        </Button>
      </Card>
    </Body>
  );
}`)}
          </div>
        );

      case 'examples':
        return (
          <div>
            <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
              💡 Exemples Pratiques
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
                  🌿 Site Écologique
                </Text>
                {renderCodeExample(`<Body theme="forest">
  <Grid columns="auto" gap="lg">
    <Card variant="glass" padding="lg">
      <h2>Planète Verte</h2>
      <Button variant="secondary" corner={8}>
        Agir Maintenant
      </Button>
    </Card>
  </Grid>
</Body>`)}
              </AnimatedCard>
            </FluidLayout>
          </div>
        );

      case 'advanced':
        return (
          <div>
            <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
              🔧 Personnalisation Avancée
            </Text>
            
            <AnimatedCard variant="premium" animation="fade" className="mb-8">
              <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
                Thème Custom
              </Text>
              {renderCodeExample(`import { Body, ThemeProvider } from 'lucent-ui';

const customTheme = {
  mode: 'auto' as const,
  primaryColor: '#ff6b6b',
  secondaryColor: '#4ecdc4',
  borderRadius: 'xl' as const,
  animation: 'smooth' as const,
};

function App() {
  return (
    <Body theme="custom" config={customTheme}>
      {/* Votre contenu */}
    </Body>
  );
}`)}
            </AnimatedCard>

            <Grid columns={3} gap="lg" minWidth="300px">
              <AnimatedCard variant="glass" animation="slide" hoverEffect="lift">
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Body 
      theme={currentTheme as any} 
      autoDark 
      responsive
      meta={{
        title: "Lucent-UI Documentation - Guide Complet",
        description: "Documentation complète pour Lucent-UI. Apprenez à créer des sites web professionnels avec 2-3 composants.",
        keywords: "lucent-ui, documentation, react, ui, components, themes, premium"
      }}
    >
      {/* Header */}
      <Navbar logo="📚 Lucent-UI Docs" variant="glass" sticky>
        <Flex gap="1rem" align="center">
          <Button variant="ghost" size="sm">GitHub</Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onNavigateToShowcase}
          >
            Showcase
          </Button>
          <Button variant="primary" size="sm">Démarrer</Button>
        </Flex>
      </Navbar>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar Navigation */}
        <aside style={{ 
          width: '280px', 
          backgroundColor: 'var(--color-surface)', 
          borderRight: '1px solid var(--color-border)',
          padding: '2rem 1rem',
          position: 'sticky',
          top: '80px',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}>
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            Navigation
          </Text>
          <nav>
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "primary" : "ghost"}
                onClick={() => setActiveSection(item.id)}
                style={{ 
                  width: '100%',
                  justifyContent: 'flex-start',
                  marginBottom: '0.5rem',
                  padding: '0.75rem'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </nav>

          <div style={{ marginTop: '2rem' }}>
            <Text as="h4" size="md" weight="bold" style={{ marginBottom: '1rem' }}>
              Thème Actuel
            </Text>
            <Card variant="outline" padding="sm">
              <Text size="sm" weight="medium" style={{ textTransform: 'capitalize' }}>
                {LUCENT_THEMES[currentTheme]?.name || currentTheme}
              </Text>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          <SmartContainer mode="adaptive" maxWidth="2xl">
            {renderSection()}
          </SmartContainer>
        </main>
      </div>

      {/* Footer */}
      <Section 
        padding="md" 
        background="surface" 
        textAlign="center"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <Text 
          color="muted"
          style={{ marginBottom: '1rem' }}
        >
          Documentation créée avec ❤️ pour Lucent-UI
        </Text>
        <Flex gap="2rem" justify="center" wrap="wrap">
          <Button variant="ghost" size="sm">GitHub</Button>
          <Button variant="ghost" size="sm">NPM</Button>
          <Button variant="ghost" size="sm">Support</Button>
          <Button variant="ghost" size="sm">Contribuer</Button>
        </Flex>
      </Section>
    </Body>
  );
}