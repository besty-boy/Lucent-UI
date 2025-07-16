import React, { useState } from 'react';
import { Text, Card, Grid, Button, Flex } from '../../../src';

export function Responsive() {
  const [breakpoint, setBreakpoint] = useState<string>('md');

  const breakpoints = {
    xs: { name: 'Extra Small', width: '0-639px', icon: '📱' },
    sm: { name: 'Small', width: '640-767px', icon: '📱' },
    md: { name: 'Medium', width: '768-1023px', icon: '📱' },
    lg: { name: 'Large', width: '1024-1279px', icon: '💻' },
    xl: { name: 'Extra Large', width: '1280-1535px', icon: '💻' },
    '2xl': { name: '2X Large', width: '1536px+', icon: '🖥️' }
  };

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
        📱 Système Responsive Avancé
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Responsive design adaptatif avec container queries, typographie fluide et optimisation tactile
      </Text>

      {/* Breakpoint Showcase */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎯 Breakpoints Interactifs
        </Text>
        
        <Flex gap="1rem" wrap="wrap" mobileDirection="column" style={{ marginBottom: '2rem' }}>
          {Object.entries(breakpoints).map(([key, bp]) => (
            <Button
              key={key}
              variant={breakpoint === key ? 'primary' : 'outline'}
              onClick={() => setBreakpoint(key)}
              size="sm"
            >
              {bp.icon} {bp.name}
            </Button>
          ))}
        </Flex>

        <Card variant="glass" padding="lg">
          <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
            {breakpoints[breakpoint as keyof typeof breakpoints].icon} {breakpoints[breakpoint as keyof typeof breakpoints].name}
          </Text>
          <Text size="lg" color="muted" style={{ marginBottom: '1rem' }}>
            Largeur: {breakpoints[breakpoint as keyof typeof breakpoints].width}
          </Text>
          <Text>
            Exemple de contenu adaptatif pour le breakpoint <strong>{breakpoint}</strong>. 
            Le layout, la typographie et les interactions s'adaptent automatiquement.
          </Text>
        </Card>
      </Card>

      {/* Hook useAdvancedResponsive */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🔧 Hook useAdvancedResponsive
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Hook puissant pour créer des interfaces parfaitement adaptatives
        </Text>

        {renderCodeExample(`import { useAdvancedResponsive } from 'lucent-ui';

function MonComposant() {
  const responsive = useAdvancedResponsive({
    breakpoints: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    },
    fluidTypography: true,
    containerQueries: true,
    adaptiveImages: true,
    touchOptimization: true,
    performanceMode: 'balanced'
  });

  // Accès aux informations responsive
  const { currentBreakpoint, isMobile, isTablet, isDesktop } = responsive;
  const { deviceCapabilities } = responsive;

  // Valeurs adaptatives
  const columns = responsive.getResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  });

  return (
    <div style={responsive.getResponsiveGrid({ xs: 1, md: 2, lg: 3 })}>
      <p>Breakpoint: {currentBreakpoint}</p>
      <p>Mobile: {isMobile ? 'Oui' : 'Non'}</p>
      <p>Colonnes: {columns}</p>
      <p>Support tactile: {deviceCapabilities.touchSupport ? 'Oui' : 'Non'}</p>
    </div>
  );
}`)}
      </Card>

      {/* Device Capabilities */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📱 Détection des Capacités
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Détection automatique des capacités de l'appareil pour une adaptation optimale
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🖥️ Écran & Affichage
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>screenWidth</code> - Largeur écran</li>
              <li><code>screenHeight</code> - Hauteur écran</li>
              <li><code>devicePixelRatio</code> - Ratio pixels</li>
              <li><code>orientation</code> - Portrait/Paysage</li>
              <li><code>darkMode</code> - Mode sombre</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🎮 Interactions
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>touchSupport</code> - Support tactile</li>
              <li><code>hoverSupport</code> - Support hover</li>
              <li><code>pointerType</code> - Type de pointeur</li>
              <li><code>reducedMotion</code> - Mouvement réduit</li>
              <li><code>highContrast</code> - Contraste élevé</li>
            </ul>
          </Card>
        </Grid>
      </Card>

      {/* Container Queries */}
      <Card variant="crystal" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📦 Container Queries
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Adaptation basée sur la taille du conteneur parent plutôt que sur l'écran
        </Text>

        {renderCodeExample(`import { useAdvancedResponsive } from 'lucent-ui';

function ContainerAdaptif() {
  const responsive = useAdvancedResponsive({
    containerQueries: true
  });
  
  const containerRef = useRef(null);
  const containerSize = responsive.useContainerQuery(containerRef);

  return (
    <div ref={containerRef}>
      <p>Largeur conteneur: {containerSize.width}px</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: containerSize.width > 600 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
        gap: containerSize.width > 400 ? '2rem' : '1rem'
      }}>
        {/* Contenu adaptatif */}
      </div>
    </div>
  );
}`)}
      </Card>

      {/* Fluid Typography */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📝 Typographie Fluide
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Taille de police qui s'adapte fluidement à la taille de l'écran
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Typographie fluide:
            </Text>
            {renderCodeExample(`// Activation de la typographie fluide
const responsive = useAdvancedResponsive({
  fluidTypography: true
});

// Utilisation
<Text style={{ fontSize: responsive.fluidFontSize }}>
  Texte adaptatif
</Text>`)}
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Résultat CSS:
            </Text>
            {renderCodeExample(`/* Génération automatique */
font-size: clamp(
  14px,      /* Taille minimum */
  1.2rem,    /* Taille fluide */
  18px       /* Taille maximum */
);`)}
          </div>
        </Grid>
      </Card>

      {/* Touch Optimization */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          👆 Optimisation Tactile
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Optimisations automatiques pour les appareils tactiles
        </Text>

        {renderCodeExample(`// Optimisation tactile automatique
const responsive = useAdvancedResponsive({
  touchOptimization: true
});

const touchProps = responsive.getTouchOptimizedProps();

return (
  <button {...touchProps}>
    Bouton optimisé tactile
  </button>
);

// Génère automatiquement :
// {
//   style: {
//     minHeight: '44px',        // Taille minimum recommandée
//     minWidth: '44px',
//     touchAction: 'manipulation', // Pas de zoom double-tap
//     userSelect: 'none',          // Pas de sélection accidentelle
//     WebkitTouchCallout: 'none'   // Pas de menu contextuel iOS
//   }
// }`)}
      </Card>

      {/* Adaptive Images */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🖼️ Images Adaptatives
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Optimisation automatique des images selon l'appareil et la connexion
        </Text>

        {renderCodeExample(`// Images adaptatives
const responsive = useAdvancedResponsive({
  adaptiveImages: true
});

const imageProps = responsive.getAdaptiveImageProps(
  'mon-image.jpg',
  'Description de l\'image'
);

return <img {...imageProps} />;

// Génère automatiquement :
// {
//   src: 'mon-image.jpg',
//   alt: 'Description de l\'image',
//   sizes: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
//   srcSet: 'mon-image.jpg?w=800&q=75 1x, mon-image.jpg?w=1600&q=60 2x',
//   loading: 'lazy',
//   decoding: 'async'
// }`)}
      </Card>

      {/* Responsive Grid */}
      <Card variant="crystal" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🏗️ Grille Responsive
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Système de grille intelligent qui s'adapte aux breakpoints
        </Text>

        {renderCodeExample(`// Grille responsive
const responsive = useAdvancedResponsive();

const gridStyle = responsive.getResponsiveGrid({
  xs: 1,    // 1 colonne sur mobile
  sm: 2,    // 2 colonnes sur petit écran
  md: 3,    // 3 colonnes sur tablette
  lg: 4,    // 4 colonnes sur desktop
  xl: 5     // 5 colonnes sur grand écran
});

return (
  <div style={gridStyle}>
    <div>Élément 1</div>
    <div>Élément 2</div>
    <div>Élément 3</div>
    {/* ... */}
  </div>
);`)}
      </Card>

      {/* Performance Modes */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          ⚡ Modes de Performance
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Adaptation automatique selon les capacités de l'appareil
        </Text>

        <Grid columns={3} gap="2rem" minWidth="200px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              💚 Economy
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Transitions réduites</li>
              <li>Images compressées</li>
              <li>Lazy loading agressif</li>
              <li>Pas d'accélération GPU</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ⚖️ Balanced
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Transitions optimisées</li>
              <li>Images adaptatives</li>
              <li>Lazy loading intelligent</li>
              <li>GPU sélectif</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🚀 High
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Transitions fluides</li>
              <li>Images haute qualité</li>
              <li>Préchargement</li>
              <li>GPU maximisé</li>
            </ul>
          </Card>
        </Grid>
      </Card>

      {/* Best Practices */}
      <Card variant="glass" padding="lg">
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          💡 Bonnes Pratiques
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ✅ Recommandations
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Utiliser les valeurs responsive pour les layouts</li>
              <li>Optimiser les images selon l'appareil</li>
              <li>Respecter les préférences d'accessibilité</li>
              <li>Tester sur vrais appareils</li>
              <li>Monitorer les performances</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🎯 Cas d'Usage
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Galeries d'images adaptatives</li>
              <li>Tableaux de bord responsifs</li>
              <li>Formulaires optimisés mobile</li>
              <li>Navigation adaptative</li>
              <li>Contenu éditorial fluide</li>
            </ul>
          </Card>
        </Grid>
      </Card>
    </div>
  );
}