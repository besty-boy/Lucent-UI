import React, { useState } from 'react';
import { Text, Card, Grid, Button, Flex } from '../../../src';

export function Performance() {
  const [performanceMode, setPerformanceMode] = useState<'economy' | 'balanced' | 'high'>('balanced');

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
        ⚡ Optimisation de Performance
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Système d'optimisation intelligent qui s'adapte aux capacités de l'appareil et aux préférences utilisateur
      </Text>

      {/* Performance Overview */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎯 Vue d'Ensemble
        </Text>
        
        <Grid columns={3} gap="2rem" minWidth="250px" mobileColumns={1}>
          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              📊 Monitoring FPS
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Surveillance en temps réel des performances avec adaptation automatique de la qualité d'animation
            </Text>
          </Card>

          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🧠 Détection Appareil
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Analyse des capacités GPU, mémoire, type de connexion et préférences d'accessibilité
            </Text>
          </Card>

          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🚀 Optimisation Auto
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Ajustement automatique des animations, images et ressources selon les performances
            </Text>
          </Card>
        </Grid>
      </Card>

      {/* Performance Hook */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🔧 Hook usePerformanceOptimization
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Hook complet pour optimiser les performances de vos composants
        </Text>

        {renderCodeExample(`import { usePerformanceOptimization } from 'lucent-ui';

function MonComposant() {
  const performance = usePerformanceOptimization({
    enableFPSMonitoring: true,
    enableMemoryTracking: true,
    enableNetworkOptimization: true,
    enableImageOptimization: true,
    enableLazyLoading: true,
    enableVirtualization: false,
    enableCodeSplitting: true,
    enablePredictiveLoading: true,
    enableResourceHints: true,
    enableCriticalResourcePriority: true,
    enableAdaptiveQuality: true,
    enableIntelligentCaching: true,
    enableBundleAnalysis: true,
    enableRuntimeOptimization: true,
    enableGPUAcceleration: true
  });

  // Accès aux métriques
  const metrics = performance.metrics;
  const isOptimized = performance.isOptimized;
  const adaptiveStyles = performance.getAdaptiveStyles();

  return (
    <div style={adaptiveStyles}>
      <p>FPS: {metrics.fps}</p>
      <p>Mémoire: {metrics.memory}MB</p>
      <p>Mode: {metrics.performanceMode}</p>
      <p>Optimisé: {isOptimized ? 'Oui' : 'Non'}</p>
    </div>
  );
}`)}
      </Card>

      {/* Performance Modes */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎛️ Modes de Performance
        </Text>
        
        <Flex gap="1rem" wrap="wrap" mobileDirection="column" style={{ marginBottom: '2rem' }}>
          <Button
            variant={performanceMode === 'economy' ? 'primary' : 'outline'}
            onClick={() => setPerformanceMode('economy')}
          >
            💚 Economy
          </Button>
          <Button
            variant={performanceMode === 'balanced' ? 'primary' : 'outline'}
            onClick={() => setPerformanceMode('balanced')}
          >
            ⚖️ Balanced
          </Button>
          <Button
            variant={performanceMode === 'high' ? 'primary' : 'outline'}
            onClick={() => setPerformanceMode('high')}
          >
            🚀 High
          </Button>
        </Flex>

        <Grid columns={1} gap="1.5rem">
          {performanceMode === 'economy' && (
            <Card variant="outline" padding="md">
              <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
                💚 Mode Economy
              </Text>
              <Text color="muted" style={{ marginBottom: '1rem' }}>
                Optimisé pour les appareils à faibles performances
              </Text>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>Animations réduites ou désactivées</li>
                <li>Images compressées avec qualité réduite</li>
                <li>Lazy loading agressif</li>
                <li>Pas d'accélération GPU</li>
                <li>Transitions simplifiées</li>
              </ul>
            </Card>
          )}

          {performanceMode === 'balanced' && (
            <Card variant="outline" padding="md">
              <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
                ⚖️ Mode Balanced
              </Text>
              <Text color="muted" style={{ marginBottom: '1rem' }}>
                Équilibre entre performance et expérience utilisateur
              </Text>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>Animations standard avec optimisations</li>
                <li>Images adaptatives selon la connexion</li>
                <li>Lazy loading intelligent</li>
                <li>Accélération GPU sélective</li>
                <li>Respect des préférences utilisateur</li>
              </ul>
            </Card>
          )}

          {performanceMode === 'high' && (
            <Card variant="outline" padding="md">
              <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
                🚀 Mode High
              </Text>
              <Text color="muted" style={{ marginBottom: '1rem' }}>
                Expérience premium pour appareils performants
              </Text>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>Animations complexes et fluides</li>
                <li>Images haute qualité</li>
                <li>Effets visuels avancés</li>
                <li>Accélération GPU maximale</li>
                <li>Préchargement intelligent</li>
              </ul>
            </Card>
          )}
        </Grid>
      </Card>

      {/* Lazy Loading */}
      <Card variant="crystal" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🔄 Lazy Loading Intelligent
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Chargement différé adaptatif avec intersection observer
        </Text>

        {renderCodeExample(`// Lazy loading avec le hook performance
const performance = usePerformanceOptimization({
  enableLazyLoading: true
});

const lazyHook = performance.useLazyLoading(0.1); // 10% visible

return (
  <div ref={lazyHook.ref}>
    {lazyHook.isIntersecting && (
      <img 
        src="image-haute-qualite.jpg" 
        alt="Contenu"
        loading="lazy"
      />
    )}
  </div>
);`)}
      </Card>

      {/* Image Optimization */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🖼️ Optimisation d'Images
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Optimisation automatique des images selon les capacités de l'appareil
        </Text>

        {renderCodeExample(`// Optimisation d'image intelligente
const performance = usePerformanceOptimization({
  enableImageOptimization: true
});

const optimizedImage = performance.useImageOptimization('image.jpg', {
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp',
  lazy: true
});

return (
  <img 
    src={optimizedImage.src}
    loading={optimizedImage.loading ? 'lazy' : 'eager'}
    alt="Image optimisée"
  />
);`)}
      </Card>

      {/* Metrics */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📈 Métriques de Performance
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Métriques temps réel:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>fps</code> - Images par seconde</li>
              <li><code>memory</code> - Utilisation mémoire</li>
              <li><code>networkSpeed</code> - Vitesse connexion</li>
              <li><code>deviceType</code> - Type d'appareil</li>
              <li><code>performanceMode</code> - Mode actuel</li>
            </ul>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Optimisations actives:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>isOptimized</code> - État d'optimisation</li>
              <li><code>adaptiveQuality</code> - Qualité adaptative</li>
              <li><code>gpuAcceleration</code> - Accélération GPU</li>
              <li><code>cacheEfficiency</code> - Efficacité cache</li>
              <li><code>bundleSize</code> - Taille bundle</li>
            </ul>
          </div>
        </Grid>
      </Card>

      {/* Best Practices */}
      <Card variant="gradient" padding="lg">
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          💡 Bonnes Pratiques
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ✅ À Faire
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Utiliser le lazy loading pour les images</li>
              <li>Respecter <code>prefers-reduced-motion</code></li>
              <li>Optimiser les images selon l'appareil</li>
              <li>Surveiller les métriques FPS</li>
              <li>Adapter la qualité selon les performances</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ❌ À Éviter
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Animations complexes sur mobile</li>
              <li>Images haute résolution sur connexion lente</li>
              <li>Ignorer les préférences d'accessibilité</li>
              <li>Forcer l'accélération GPU partout</li>
              <li>Négliger la surveillance des performances</li>
            </ul>
          </Card>
        </Grid>
      </Card>
    </div>
  );
}