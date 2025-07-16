import React from 'react';
import { Text, Card, Grid, AnimatedCard, MagicButton, FluidLayout } from '../../../src';
import { UltraAnimatedCard } from '../../../src/components/premium/UltraAnimatedCard';

export function Premium() {
  const premiumComponents = [
    {
      name: 'UltraAnimatedCard',
      description: 'Cartes ultra-optimisées avec 25+ animations et micro-interactions',
      props: 'animation, hoverScale, magneticEffect, tiltEffect, rippleEffect',
      variants: ['premium', 'glass', 'gradient', 'crystal', 'neon'],
      example: '<UltraAnimatedCard animation="morphism" hoverScale={1.05} magneticEffect>'
    },
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
    }
  ];

  return (
    <div>
      <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '2rem' }}>
        ⭐ Composants Premium
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Composants avancés avec animations, effets visuels et intelligence artificielle
      </Text>

      <AnimatedCard variant="premium" animation="morphism" style={{ marginBottom: '3rem' }}>
        <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Démonstration Interactive
        </Text>
        <Grid columns={3} gap="lg" minWidth="200px" mobileColumns={1}>
          <div>
            <MagicButton variant="magic" effect="shimmer" style={{ width: '100%', marginBottom: '1rem' }}>
              Magic Button
            </MagicButton>
            <Text size="sm" color="muted" style={{ textAlign: 'center' }}>
              Effet shimmer automatique
            </Text>
          </div>
          <div>
            <MagicButton variant="neon" effect="glow" style={{ width: '100%', marginBottom: '1rem' }}>
              Neon Effect
            </MagicButton>
            <Text size="sm" color="muted" style={{ textAlign: 'center' }}>
              Lueur néon interactive
            </Text>
          </div>
          <div>
            <MagicButton variant="holographic" effect="particle" style={{ width: '100%', marginBottom: '1rem' }}>
              Holographic
            </MagicButton>
            <Text size="sm" color="muted" style={{ textAlign: 'center' }}>
              Effet holographique
            </Text>
          </div>
        </Grid>
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
                Props: {component.props}
              </Text>
              <Text size="sm" weight="medium">
                Variants: {component.variants.join(', ')}
              </Text>
            </div>
            
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
      </FluidLayout>

      <div style={{ marginTop: '4rem' }}>
        <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '2rem' }}>
          Exemple Premium Complet
        </Text>
        
        <Card variant="gradient" padding="lg">
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
{`import { Body, FluidLayout, AnimatedCard, MagicButton } from 'lucent-ui';

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
}`}
            </pre>
          </Card>
        </Card>
      </div>
    </div>
  );
}