import React, { useState } from 'react';
import { Body, Card, Button, Navbar, Input, Modal, Grid, Section, Container, Text, Flex } from './src';
import { getThemeNames, LUCENT_THEMES } from './src/themes';

export function ThemeShowcase() {
  const [currentTheme, setCurrentTheme] = useState('velora');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const themeNames = getThemeNames();

  const features = [
    {
      title: "🚀 One-Click Setup",
      description: "Complete React initialization with themes, dark mode, and SEO. No configuration needed."
    },
    {
      title: "🎨 25 Premium Themes",
      description: "From mystical Velora to electric Neon. Professional themes for every brand and style."
    },
    {
      title: "📱 100% Responsive",
      description: "Automatically adapts to any screen size. Mobile-first design philosophy."
    },
    {
      title: "⚡ Performance Optimized",
      description: "Adapts to device capabilities. Respects user preferences for motion and contrast."
    },
    {
      title: "🌙 Auto Dark Mode",
      description: "Detects system preferences and switches themes automatically."
    },
    {
      title: "♿ Accessibility First",
      description: "Built with accessibility in mind. WCAG compliant components."
    }
  ];

  const codeExample = `import { Body, Card, Button } from 'lucent-ui';

function App() {
  return (
    <Body theme="velora">
      <Card variant="glass" padding="lg" corner={20} glow>
        <h1>Hello World</h1>
        <Button corner={16} shadow="glow" glow variant="primary">
          Get Started
        </Button>
      </Card>
    </Body>
  );
}`;

  return (
    <Body 
      theme={currentTheme as any} 
      autoDark 
      responsive
      meta={{
        title: "Lucent-UI - Ultra-Simplified React UI Library",
        description: "Build professional websites with just 2-3 components. Premium themes, zero config, 100% responsive.",
        keywords: "react, ui, library, themes, responsive, components, typescript"
      }}
    >
      {/* Header */}
      <Navbar logo="✨ Lucent-UI" variant="glass" sticky>
        <Flex gap="1rem" align="center">
          <Button variant="ghost" size="sm">Documentation</Button>
          <Button variant="ghost" size="sm">Themes</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </Flex>
      </Navbar>

      {/* Hero Section */}
      <Section 
        background="gradient" 
        textAlign="center" 
        minHeight="60vh"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Text 
          as="h1" 
          size="5xl" 
          weight="bold" 
          gradient
          style={{ marginBottom: '1rem' }}
        >
          Build Professional Sites with 2-3 Components
        </Text>
        <Text 
          size="xl" 
          color="muted"
          style={{ 
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}
        >
          Ultra-simplified React UI library. 25 premium themes, zero config, 100% responsive. 
          Personnalisation avancée avec 2-3 props seulement.
        </Text>
        <Flex gap="1rem" justify="center" wrap="wrap" mobileDirection="column" mobileAlign="center">
          <Button size="lg" variant="primary" corner={12}>
            npm install lucent-ui
          </Button>
          <Button size="lg" variant="outline" corner={12}>
            View Documentation
          </Button>
        </Flex>
      </Section>

      {/* Live Code Example */}
      <Section background="surface">
        <Container>
          <Text 
            as="h2" 
            size="3xl" 
            weight="bold" 
            align="center"
            style={{ marginBottom: '3rem' }}
          >
            See It In Action
          </Text>
          <Grid gap="2rem" minWidth="280px" mobileColumns={1}>
            <Card padding="lg">
              <Text 
                as="h3" 
                size="xl" 
                weight="bold"
                style={{ marginBottom: '1rem' }}
              >
                Code
              </Text>
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
                <pre style={{ margin: 0, fontSize: '0.8rem' }}>
                  {codeExample}
                </pre>
              </Card>
            </Card>
            <Card padding="lg">
              <Text 
                as="h3" 
                size="xl" 
                weight="bold"
                style={{ marginBottom: '1rem' }}
              >
                Result
              </Text>
              <Card 
                variant="glass" 
                padding="lg" 
                corner={20} 
                glow
                style={{ 
                  border: '2px dashed var(--color-border)',
                  textAlign: 'center'
                }}
              >
                <Text as="h4" size="lg" style={{ marginBottom: '1rem' }}>Hello World</Text>
                <Button corner={16} shadow="glow" glow variant="primary">
                  Get Started
                </Button>
              </Card>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section>
        <Container>
          <Text 
            as="h2" 
            size="3xl" 
            weight="bold" 
            align="center"
            style={{ marginBottom: '3rem' }}
          >
            Why Choose Lucent-UI?
          </Text>
          <Grid gap="2rem" minWidth="280px" mobileColumns={1}>
            {features.map((feature, index) => (
              <Card key={index} padding="lg" style={{ textAlign: 'center' }}>
                <Text 
                  as="h3" 
                  size="xl" 
                  weight="bold"
                  style={{ marginBottom: '1rem' }}
                >
                  {feature.title}
                </Text>
                <Text 
                  color="muted"
                  style={{ lineHeight: '1.6' }}
                >
                  {feature.description}
                </Text>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Theme Showcase */}
      <Section background="surface">
        <Container>
          <Text 
            as="h2" 
            size="3xl" 
            weight="bold" 
            align="center"
            style={{ marginBottom: '1rem' }}
          >
            25 Premium Themes
          </Text>
          <Text 
            size="lg" 
            color="muted" 
            align="center"
            style={{ marginBottom: '3rem' }}
          >
            Click on any theme to see it in action
          </Text>
          
          <Grid gap="1rem" minWidth="180px" mobileColumns={2} style={{ marginBottom: '3rem' }}>
            {themeNames.map((theme) => (
              <Button
                key={theme}
                variant={currentTheme === theme ? "primary" : "outline"}
                onClick={() => setCurrentTheme(theme)}
                style={{ 
                  padding: '1rem',
                  textTransform: 'capitalize',
                  fontSize: '0.9rem'
                }}
              >
                {LUCENT_THEMES[theme]?.name || theme}
              </Button>
            ))}
          </Grid>

          <Card padding="lg" style={{ textAlign: 'center' }}>
            <Text 
              as="h3" 
              size="xl" 
              weight="bold"
              style={{ 
                marginBottom: '1rem',
                textTransform: 'capitalize'
              }}
            >
              {LUCENT_THEMES[currentTheme]?.name || currentTheme} Theme
            </Text>
            <Text 
              color="muted"
              style={{ marginBottom: '2rem' }}
            >
              {LUCENT_THEMES[currentTheme]?.description}
            </Text>
            <Flex gap="1rem" justify="center" wrap="wrap" mobileDirection="column" mobileAlign="center" style={{ marginBottom: '2rem' }}>
              <Button variant="primary" corner={8} shadow="lg">Primary</Button>
              <Button variant="secondary" corner={16} glow>Secondary</Button>
              <Button variant="outline" corner={24} shadow="md">Outline</Button>
              <Button variant="ghost" corner={32} shadow="sm">Ghost</Button>
            </Flex>
            
            <Flex gap="1rem" justify="center" wrap="wrap" mobileDirection="column" mobileAlign="center">
              <Card variant="glass" padding="sm" corner={12} style={{ minWidth: '120px', textAlign: 'center' }}>
                <Text size="sm">Glass Card</Text>
              </Card>
              <Card variant="gradient" padding="sm" corner={16} style={{ minWidth: '120px', textAlign: 'center' }}>
                <Text size="sm">Gradient</Text>
              </Card>
              <Card variant="outline" padding="sm" corner={20} glow style={{ minWidth: '120px', textAlign: 'center' }}>
                <Text size="sm">Outline Glow</Text>
              </Card>
              <Button onClick={() => setIsModalOpen(true)} variant="primary" corner={8} shadow="glow">
                Open Modal
              </Button>
            </Flex>
          </Card>
        </Container>
      </Section>

      {/* Personnalisation Showcase */}
      <Section>
        <Container>
          <Text 
            as="h2" 
            size="3xl" 
            weight="bold" 
            align="center"
            style={{ marginBottom: '3rem' }}
          >
            Personnalisation Ultra-Simple
          </Text>
          
          <Grid gap="2rem" minWidth="280px" mobileColumns={1} style={{ marginBottom: '4rem' }}>
            <Card variant="glass" padding="lg" corner={16} shadow="lg">
              <Text 
                as="h3" 
                size="xl" 
                weight="bold"
                style={{ marginBottom: '1rem' }}
              >
                Boutons Avancés
              </Text>
              <Flex direction="column" gap="1rem">
                <Button corner={0} shadow="none">Corner 0</Button>
                <Button corner={16} shadow="md">Corner 16</Button>
                <Button corner={32} shadow="lg">Corner 32</Button>
                <Button corner="50%" shadow="glow" glow>Glow Effect</Button>
              </Flex>
            </Card>

            <Card variant="gradient" padding="lg" corner={24} shadow="xl">
              <Text 
                as="h3" 
                size="xl" 
                weight="bold"
                style={{ marginBottom: '1rem' }}
              >
                Cards Personnalisées
              </Text>
              <Flex direction="column" gap="1rem">
                <Card variant="glass" padding="sm" corner={8} style={{ textAlign: 'center' }}>
                  <Text>Glass Effect</Text>
                </Card>
                <Card variant="outline" padding="sm" corner={16} style={{ textAlign: 'center' }}>
                  <Text>Outline Style</Text>
                </Card>
                <Card variant="elevated" padding="sm" corner={24} shadow="xl" style={{ textAlign: 'center' }}>
                  <Text>Elevated Shadow</Text>
                </Card>
              </Flex>
            </Card>

            <Card variant="outline" padding="lg" corner={12} shadow="md">
              <Text 
                as="h3" 
                size="xl" 
                weight="bold"
                style={{ marginBottom: '1rem' }}
              >
                Modal Interactive
              </Text>
              <Text 
                color="muted"
                style={{ marginBottom: '1rem' }}
              >
                Modals avec personnalisation complète
              </Text>
              <Button 
                variant="primary" 
                corner={8} 
                shadow="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Ouvrir Modal
              </Button>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Getting Started */}
      <Section>
        <Container maxWidth="800px" style={{ textAlign: 'center' }}>
          <Text 
            as="h2" 
            size="3xl" 
            weight="bold"
            style={{ marginBottom: '2rem' }}
          >
            Ready to Get Started?
          </Text>
          <Text 
            size="lg" 
            color="muted"
            style={{ marginBottom: '3rem' }}
          >
            Join thousands of developers building beautiful UIs with Lucent-UI
          </Text>
          
          <Card padding="lg">
            <div style={{ marginBottom: '2rem' }}>
              <Text 
                as="h3" 
                size="xl" 
                weight="bold"
                style={{ marginBottom: '1rem' }}
              >
                Get Updates
              </Text>
              <Text 
                color="muted"
                style={{ marginBottom: '1rem' }}
              >
                Be the first to know about new themes and features
              </Text>
            </div>
            
            <Flex 
              gap="1rem" 
              justify="center" 
              wrap="wrap"
              mobileDirection="column"
              mobileAlign="center"
              style={{ maxWidth: '400px', margin: '0 auto' }}
            >
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: '1', minWidth: '200px' }}
              />
              <Button variant="primary" corner={8}>
                Subscribe
              </Button>
            </Flex>
          </Card>
        </Container>
      </Section>

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
          Made with ❤️ using Lucent-UI
        </Text>
        <Flex gap="2rem" justify="center" wrap="wrap" mobileDirection="column" mobileAlign="center">
          <Button variant="ghost" size="sm">GitHub</Button>
          <Button variant="ghost" size="sm">Documentation</Button>
          <Button variant="ghost" size="sm">Examples</Button>
          <Button variant="ghost" size="sm">Support</Button>
        </Flex>
      </Section>

      {/* Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal Demo"
        size="md"
        corner={16}
        blur
      >
        <div style={{ textAlign: 'center' }}>
          <Text 
            as="h3" 
            size="lg" 
            weight="bold"
            style={{ marginBottom: '1rem' }}
          >
            This is a modal with the {LUCENT_THEMES[currentTheme]?.name || currentTheme} theme!
          </Text>
          <Text 
            color="muted"
            style={{ marginBottom: '2rem' }}
          >
            You can customize modals with size, corner radius, and blur effects.
          </Text>
          <Flex gap="1rem" justify="center" wrap="wrap" mobileDirection="column" mobileAlign="center">
            <Button variant="primary" corner={8} onClick={() => setIsModalOpen(false)}>
              Close Modal
            </Button>
            <Button variant="outline" corner={8} onClick={() => setCurrentTheme('neon')}>
              Switch to Neon
            </Button>
          </Flex>
        </div>
      </Modal>
    </Body>
  );
}