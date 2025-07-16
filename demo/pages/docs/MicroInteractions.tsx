import React, { useState } from 'react';
import { Text, Card, Grid, Button, Flex } from '../../../src';

export function MicroInteractions() {
  const [demoMode, setDemoMode] = useState<'hover' | 'focus' | 'active' | 'ripple' | 'magnetic' | 'tilt'>('hover');

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
        ✨ Micro-Interactions
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Interactions subtiles et engageantes pour une expérience utilisateur premium
      </Text>

      {/* Micro-Interactions Overview */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎯 Vue d'Ensemble
        </Text>
        
        <Grid columns={3} gap="2rem" minWidth="250px" mobileColumns={1}>
          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              👆 Hover Effects
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Effets de survol avec scale, rotation, luminosité et saturation
            </Text>
          </Card>

          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🎪 Focus States
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              États de focus avec glow, bordures et indicateurs visuels
            </Text>
          </Card>

          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🎮 Active States
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Feedback tactile avec vibrations et animations d'activation
            </Text>
          </Card>
        </Grid>
      </Card>

      {/* Interactive Demo */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎮 Démo Interactive
        </Text>
        
        <Flex gap="1rem" wrap="wrap" mobileDirection="column" style={{ marginBottom: '2rem' }}>
          <Button
            variant={demoMode === 'hover' ? 'primary' : 'outline'}
            onClick={() => setDemoMode('hover')}
            size="sm"
          >
            👆 Hover
          </Button>
          <Button
            variant={demoMode === 'focus' ? 'primary' : 'outline'}
            onClick={() => setDemoMode('focus')}
            size="sm"
          >
            🎯 Focus
          </Button>
          <Button
            variant={demoMode === 'active' ? 'primary' : 'outline'}
            onClick={() => setDemoMode('active')}
            size="sm"
          >
            🎪 Active
          </Button>
          <Button
            variant={demoMode === 'ripple' ? 'primary' : 'outline'}
            onClick={() => setDemoMode('ripple')}
            size="sm"
          >
            🌊 Ripple
          </Button>
          <Button
            variant={demoMode === 'magnetic' ? 'primary' : 'outline'}
            onClick={() => setDemoMode('magnetic')}
            size="sm"
          >
            🧲 Magnetic
          </Button>
          <Button
            variant={demoMode === 'tilt' ? 'primary' : 'outline'}
            onClick={() => setDemoMode('tilt')}
            size="sm"
          >
            📐 Tilt
          </Button>
        </Flex>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Configuration actuelle:
            </Text>
            <Card variant="outline" padding="md">
              <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '0.5rem' }}>
                {demoMode === 'hover' && '👆 Hover Effects'}
                {demoMode === 'focus' && '🎯 Focus States'}
                {demoMode === 'active' && '🎪 Active States'}
                {demoMode === 'ripple' && '🌊 Ripple Effect'}
                {demoMode === 'magnetic' && '🧲 Magnetic Effect'}
                {demoMode === 'tilt' && '📐 Tilt Effect'}
              </Text>
              <Text color="muted" style={{ lineHeight: '1.6' }}>
                {demoMode === 'hover' && 'Survol avec scale, rotation et effets de luminosité'}
                {demoMode === 'focus' && 'Focus avec glow et bordures animées'}
                {demoMode === 'active' && 'Activation avec feedback tactile et animation'}
                {demoMode === 'ripple' && 'Onde expansive lors du clic'}
                {demoMode === 'magnetic' && 'Attraction magnétique vers le curseur'}
                {demoMode === 'tilt' && 'Inclinaison 3D suivant le curseur'}
              </Text>
            </Card>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Zone de test:
            </Text>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '150px',
              border: '2px dashed var(--color-border)',
              borderRadius: '12px',
              backgroundColor: 'var(--color-surface)'
            }}>
              <Card
                variant="glass"
                padding="lg"
                style={{ 
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <Text size="lg" weight="bold">
                  Testez l'effet {demoMode}
                </Text>
              </Card>
            </div>
          </div>
        </Grid>
      </Card>

      {/* Hook useMicroInteractions */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🔧 Hook useMicroInteractions
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Hook complet pour créer des micro-interactions engageantes
        </Text>

        {renderCodeExample(`import { useMicroInteractions } from 'lucent-ui';

function MonComposant() {
  const interactions = useMicroInteractions({
    hover: {
      scale: 1.05,
      rotate: 2,
      translateY: -2,
      brightness: 1.1,
      saturate: 1.2,
      blur: 0,
      duration: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    focus: {
      scale: 1.02,
      glow: true,
      glowColor: '#3B82F6',
      borderScale: 1.1,
      duration: 200
    },
    active: {
      scale: 0.95,
      rotate: 0,
      duration: 100,
      feedback: 'both' // 'haptic' | 'visual' | 'both'
    },
    ripple: {
      color: 'rgba(255, 255, 255, 0.6)',
      duration: 600,
      scale: 2
    },
    magnetic: {
      strength: 0.5,
      distance: 100
    },
    tilt: {
      maxTilt: 10,
      scale: 1.02,
      speed: 400
    }
  });

  return (
    <div
      ref={interactions.ref}
      {...interactions.handlers}
      style={{
        transform: interactions.isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease'
      }}
    >
      <p>Élément interactif</p>
      <p>Hover: {interactions.isHovered ? '✅' : '❌'}</p>
      <p>Focus: {interactions.isFocused ? '✅' : '❌'}</p>
      <p>Active: {interactions.isActive ? '✅' : '❌'}</p>
    </div>
  );
}`)}
      </Card>

      {/* Hover Effects */}
      <Card variant="crystal" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          👆 Effets de Survol
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Transformations visuelles sophistiquées lors du survol
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Transformations:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>scale</code> - Agrandissement/rétrécissement</li>
              <li><code>rotate</code> - Rotation en degrés</li>
              <li><code>translateY</code> - Déplacement vertical</li>
              <li><code>brightness</code> - Luminosité</li>
              <li><code>saturate</code> - Saturation</li>
              <li><code>blur</code> - Flou</li>
            </ul>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Exemple avancé:
            </Text>
            {renderCodeExample(`hover: {
  scale: 1.05,          // Agrandit de 5%
  rotate: 2,            // Rotation 2°
  translateY: -4,       // Monte de 4px
  brightness: 1.2,      // +20% luminosité
  saturate: 1.3,        // +30% saturation
  blur: 0,              // Pas de flou
  duration: 300,        // 300ms transition
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
}`)}
          </div>
        </Grid>
      </Card>

      {/* Focus States */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎯 États de Focus
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Indicateurs visuels pour l'accessibilité et la navigation clavier
        </Text>

        {renderCodeExample(`focus: {
  scale: 1.02,              // Léger agrandissement
  glow: true,               // Activer le glow
  glowColor: '#3B82F6',     // Couleur du glow
  borderScale: 1.1,         // Agrandissement bordure
  duration: 200             // Durée transition
}

// Génère automatiquement:
// - Box-shadow avec la couleur spécifiée
// - Transformation scale
// - Transition fluide
// - Respect des préférences d'accessibilité`)}
      </Card>

      {/* Active States */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎪 États Actifs
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Feedback immédiat lors de l'activation avec support tactile
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Types de feedback:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>visual</code> - Animation visuelle uniquement</li>
              <li><code>haptic</code> - Vibration tactile uniquement</li>
              <li><code>both</code> - Visuel + tactile</li>
            </ul>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Configuration:
            </Text>
            {renderCodeExample(`active: {
  scale: 0.95,        // Rétrécit de 5%
  rotate: 0,          // Pas de rotation
  duration: 100,      // Très rapide
  feedback: 'both'    // Visuel + vibration
}

// Support vibration:
// - Détection automatique du support
// - Vibration de 10ms
// - Compatible mobile uniquement`)}
          </div>
        </Grid>
      </Card>

      {/* Ripple Effect */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🌊 Effet Ripple
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Onde expansive Material Design lors du clic
        </Text>

        {renderCodeExample(`ripple: {
  color: 'rgba(255, 255, 255, 0.6)',  // Couleur de l'onde
  duration: 600,                      // Durée expansion
  scale: 2                            // Facteur d'agrandissement
}

// Fonctionnement:
// 1. Détection position du clic
// 2. Création élément rond
// 3. Animation expansion + fade out
// 4. Nettoyage automatique
// 5. Génération keyframes CSS

// Utilisation automatique:
// - Déclenché sur onClick
// - Position calculée depuis l'événement
// - Taille adaptée au conteneur
// - Cleanup automatique après animation`)}
      </Card>

      {/* Magnetic Effect */}
      <Card variant="crystal" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🧲 Effet Magnétique
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Attraction subtile vers le curseur de la souris
        </Text>

        {renderCodeExample(`magnetic: {
  strength: 0.5,    // Force d'attraction (0-1)
  distance: 100     // Distance d'activation en pixels
}

// Calcul automatique:
// 1. Distance curseur ↔ centre élément
// 2. Si distance < seuil → activation
// 3. Calcul vecteur d'attraction
// 4. Application transform translate
// 5. Retour position normale si éloigné

// Optimisations:
// - Utilise requestAnimationFrame
// - Transform3D pour GPU
// - Throttling des événements mousemove
// - Cleanup automatique sur mouseleave`)}
      </Card>

      {/* Tilt Effect */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📐 Effet Tilt 3D
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Inclinaison 3D suivant la position du curseur
        </Text>

        {renderCodeExample(`tilt: {
  maxTilt: 10,      // Inclinaison max en degrés
  scale: 1.02,      // Agrandissement pendant tilt
  speed: 400        // Vitesse transition en ms
}

// Calcul 3D:
// 1. Position curseur relative au centre
// 2. Normalisation (-1 à 1)
// 3. Calcul rotateX et rotateY
// 4. Application perspective 3D
// 5. Transform: perspective(1000px) rotateX(Xdeg) rotateY(Ydeg)

// Formule:
// deltaX = (curseur.x - centre.x) / (largeur / 2)
// deltaY = (curseur.y - centre.y) / (hauteur / 2)
// tiltX = deltaY * maxTilt
// tiltY = deltaX * maxTilt`)}
      </Card>

      {/* Loading States */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          ⏳ États de Chargement
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Animations de chargement intégrées
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Types d'animation:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>spin</code> - Rotation continue</li>
              <li><code>pulse</code> - Pulsation scale + opacity</li>
              <li><code>bounce</code> - Rebond vertical</li>
              <li><code>dots</code> - Fade in/out</li>
            </ul>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Configuration:
            </Text>
            {renderCodeExample(`loading: {
  animation: 'spin',    // Type d'animation
  duration: 1000        // Durée en ms
}

// Utilisation:
const { setIsLoading } = interactions;

// Déclencher loading
setIsLoading(true);

// Arrêter loading
setIsLoading(false);`)}
          </div>
        </Grid>
      </Card>

      {/* Performance Considerations */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          ⚡ Considérations Performance
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Optimisations automatiques pour une expérience fluide
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🚀 Optimisations GPU
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Transform3D pour accélération GPU</li>
              <li>will-change appliqué intelligemment</li>
              <li>backface-visibility: hidden</li>
              <li>Optimisations CSS automatiques</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ♿ Accessibilité
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Respect prefers-reduced-motion</li>
              <li>Indicateurs focus visibles</li>
              <li>Support navigation clavier</li>
              <li>Feedback tactile optionnel</li>
            </ul>
          </Card>
        </Grid>
      </Card>

      {/* Best Practices */}
      <Card variant="crystal" padding="lg">
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          💡 Bonnes Pratiques
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ✅ Recommandations
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Utilisez des transitions courtes (100-300ms)</li>
              <li>Préférez les transforms aux propriétés layout</li>
              <li>Testez sur appareils tactiles</li>
              <li>Respectez les préférences d'accessibilité</li>
              <li>Utilisez le feedback tactile avec modération</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🎯 Cas d'Usage
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Boutons et liens interactifs</li>
              <li>Cartes et éléments cliquables</li>
              <li>Formulaires et inputs</li>
              <li>Navigation et menus</li>
              <li>Galeries et portfolios</li>
            </ul>
          </Card>
        </Grid>
      </Card>
    </div>
  );
}