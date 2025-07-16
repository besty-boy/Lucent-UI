import React, { useState } from 'react';
import { Text, Card, Grid, Button, Flex } from '../../../src';
import { UltraAnimatedCard } from '../../../src/components/premium/UltraAnimatedCard';

export function Animations() {
  const [selectedAnimation, setSelectedAnimation] = useState<string>('fadeUp');
  const [isTriggered, setIsTriggered] = useState(false);

  const animationTypes = [
    { name: 'fade', label: 'Fade' },
    { name: 'fadeUp', label: 'Fade Up' },
    { name: 'fadeDown', label: 'Fade Down' },
    { name: 'fadeLeft', label: 'Fade Left' },
    { name: 'fadeRight', label: 'Fade Right' },
    { name: 'slideUp', label: 'Slide Up' },
    { name: 'slideDown', label: 'Slide Down' },
    { name: 'slideLeft', label: 'Slide Left' },
    { name: 'slideRight', label: 'Slide Right' },
    { name: 'scale', label: 'Scale' },
    { name: 'scaleUp', label: 'Scale Up' },
    { name: 'scaleDown', label: 'Scale Down' },
    { name: 'rotate', label: 'Rotate' },
    { name: 'rotateX', label: 'Rotate X' },
    { name: 'rotateY', label: 'Rotate Y' },
    { name: 'flip', label: 'Flip' },
    { name: 'bounce', label: 'Bounce' },
    { name: 'elastic', label: 'Elastic' },
    { name: 'spring', label: 'Spring' },
    { name: 'morphism', label: 'Morphism' },
    { name: 'glow', label: 'Glow' },
    { name: 'pulse', label: 'Pulse' },
    { name: 'magnetic', label: 'Magnetic' },
    { name: 'liquid', label: 'Liquid' },
    { name: 'particles', label: 'Particles' }
  ];

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
        🎬 Système d'Animation Avancé
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        25+ types d'animations avec optimisation de performance et adaptation aux préférences utilisateur
      </Text>

      {/* Animation Showcase */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎯 Démo Interactive
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          {/* Animation Selector */}
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Sélectionnez une animation:
            </Text>
            <Grid columns={3} gap="0.5rem" minWidth="120px" mobileColumns={2}>
              {animationTypes.map((anim) => (
                <Button
                  key={anim.name}
                  variant={selectedAnimation === anim.name ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedAnimation(anim.name)}
                  style={{ fontSize: '0.75rem' }}
                >
                  {anim.label}
                </Button>
              ))}
            </Grid>
          </div>

          {/* Animation Preview */}
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Aperçu:
            </Text>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <UltraAnimatedCard
                animation={selectedAnimation as any}
                animationTrigger="manual"
                animationDuration={600}
                animationDelay={0}
                hoverScale={1.05}
                hoverGlow={true}
                glowColor="#3B82F6"
                padding="lg"
                variant="glass"
                corner={16}
                style={{ 
                  width: '200px', 
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <Text size="lg" weight="bold">
                  Animation: {selectedAnimation}
                </Text>
              </UltraAnimatedCard>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Button
                variant="primary"
                onClick={() => setIsTriggered(!isTriggered)}
                corner={8}
              >
                Déclencher Animation
              </Button>
            </div>
          </div>
        </Grid>
      </Card>

      {/* Hook useAdvancedAnimation */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🔧 Hook useAdvancedAnimation
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Hook puissant pour créer des animations complexes avec optimisation de performance
        </Text>

        {renderCodeExample(`import { useAdvancedAnimation } from 'lucent-ui';

function MonComposant() {
  const animation = useAdvancedAnimation({
    type: 'fadeUp',
    duration: 600,
    delay: 0,
    easing: 'cubic-bezier',
    trigger: 'intersection', // 'intersection' | 'scroll' | 'hover' | 'focus' | 'manual'
    threshold: 0.1,
    rootMargin: '0px',
    stagger: 100, // Délai entre les éléments
    onStart: () => console.log('Animation démarrée'),
    onComplete: () => console.log('Animation terminée')
  });

  return (
    <div ref={animation.ref}>
      {animation.isVisible && 'Élément visible!'}
      {animation.isAnimating && 'Animation en cours...'}
    </div>
  );
}`)}
      </Card>

      {/* Types d'animations */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📚 Types d'Animation
        </Text>
        
        <Grid columns={3} gap="1.5rem" minWidth="200px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🎭 Fade
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>fade</li>
              <li>fadeUp</li>
              <li>fadeDown</li>
              <li>fadeLeft</li>
              <li>fadeRight</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🚀 Slide
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>slideUp</li>
              <li>slideDown</li>
              <li>slideLeft</li>
              <li>slideRight</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🔄 Rotate
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>rotate</li>
              <li>rotateX</li>
              <li>rotateY</li>
              <li>rotateZ</li>
              <li>flip</li>
              <li>flipX</li>
              <li>flipY</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              📏 Scale
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>scale</li>
              <li>scaleUp</li>
              <li>scaleDown</li>
              <li>scaleX</li>
              <li>scaleY</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🎪 Physique
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>bounce</li>
              <li>elastic</li>
              <li>spring</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ✨ Effets
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>morphism</li>
              <li>glow</li>
              <li>pulse</li>
              <li>magnetic</li>
              <li>liquid</li>
              <li>particles</li>
            </ul>
          </Card>
        </Grid>
      </Card>

      {/* Options d'easing */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📈 Courbes d'Easing
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Standard:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li><code>linear</code></li>
              <li><code>ease</code></li>
              <li><code>ease-in</code></li>
              <li><code>ease-out</code></li>
              <li><code>ease-in-out</code></li>
            </ul>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Avancé:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li><code>cubic-bezier</code></li>
              <li><code>spring</code></li>
              <li><code>bounce</code></li>
              <li><code>elastic</code></li>
              <li><code>back</code></li>
              <li><code>circ</code></li>
              <li><code>expo</code></li>
            </ul>
          </div>
        </Grid>
      </Card>

      {/* Performance */}
      <Card variant="crystal" padding="lg">
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          ⚡ Optimisation de Performance
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Le système d'animation s'adapte automatiquement aux capacités de l'appareil
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Adaptations automatiques:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Désactivation sur <code>prefers-reduced-motion</code></li>
              <li>Réduction de la complexité sur appareils faibles</li>
              <li>Optimisation GPU avec <code>transform3d</code></li>
              <li>Gestion intelligente du <code>will-change</code></li>
            </ul>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Triggers disponibles:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>intersection</code> - Visible à l'écran</li>
              <li><code>scroll</code> - Basé sur le scroll</li>
              <li><code>hover</code> - Au survol</li>
              <li><code>focus</code> - Au focus</li>
              <li><code>manual</code> - Contrôle manuel</li>
            </ul>
          </div>
        </Grid>
      </Card>
    </div>
  );
}