import React, { useState, useEffect, useMemo } from 'react';
import { Body, Card, Text } from '../src';
import { UltraPerformantButton } from '../src/components/premium/UltraPerformantButton';
import { PerformanceMonitor } from '../src/components/premium/PerformanceMonitor';
import { useSimpleAnimation } from '../src/hooks/useSimpleAnimation';
import { useMicroInteractions } from '../src/hooks/useMicroInteractions';
import { usePerformanceOptimization } from '../src/hooks/usePerformanceOptimization';

export const UltraPerformanceShowcase: React.FC = () => {
  const [currentDemo, setCurrentDemo] = useState('animations');
  const [theme, setTheme] = useState('velora');
  const [performanceMode, setPerformanceMode] = useState<'auto' | 'high' | 'balanced' | 'economy'>('auto');
  const [animationType, setAnimationType] = useState<'scale' | 'fade' | 'slideUp' | 'bounce' | 'elastic'>('scale');

  const themes = [
    'velora', 'aurora', 'neon', 'crystal', 'obsidian', 
    'glacial', 'military', 'apple', 'ocean', 'sunset'
  ];

  const animationTypes = ['scale', 'fade', 'slideUp', 'bounce', 'elastic'] as const;

  // Performance optimization hooks
  const { 
    metrics,
    useLazyLoading,
    getOptimizedAnimationConfig,
    supportsAdvancedFeatures
  } = usePerformanceOptimization({
    enableMemoization: true,
    enableLazyLoading: true,
    enableImageOptimization: true,
    performanceThreshold: 30
  });

  // Simple animation demo - More stable implementation
  const [animationKey, setAnimationKey] = useState(0);
  const { 
    ref: demoRef, 
    animate, 
    isAnimating, 
    animationProgress 
  } = useSimpleAnimation();

  const triggerAnimation = () => {
    if (!isAnimating) {
      console.log(`Animation started: ${animationType}`);
      setAnimationKey(prev => prev + 1);
      animate(animationType, {
        duration: 600,
        onStart: () => console.log(`Animation started: ${animationType}`),
        onComplete: () => console.log(`Animation completed: ${animationType}`),
        onProgress: (progress) => {
          if (Math.floor(progress * 10) !== Math.floor((progress - 0.01) * 10)) {
            console.log(`Animation progress: ${Math.round(progress * 100)}%`);
          }
        }
      });
    }
  };

  // Performance metrics for display
  const effectivePerformance = performanceMode === 'auto' ? 
    (metrics.memory > 60 ? 'economy' : metrics.fps > 50 ? 'high' : 'balanced') : 
    performanceMode;

  // Micro interactions demo
  const { ref: microRef, handlers: microHandlers, isHovered } = useMicroInteractions({
    gpu: true,
    performance: performanceMode,
    hover: {
      scale: 1.05,
      translateY: -5,
      brightness: 1.2,
      duration: 300
    },
    focus: {
      scale: 1.03,
      glow: true,
      glowColor: '#3b82f6'
    },
    active: {
      scale: 0.95,
      feedback: 'both'
    },
    tilt: {
      maxTilt: 5,
      scale: 1.02,
      speed: 400
    },
    magnetic: {
      strength: 0.3,
      distance: 50
    }
  });

  // Lazy loading demo
  const { ref: lazyRef, isIntersecting } = useLazyLoading(0.2);

  // Performance-optimized component list
  const demoComponents = useMemo(() => {
    const animationConfig = getOptimizedAnimationConfig();
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: i * 50,
      config: animationConfig
    }));
  }, [getOptimizedAnimationConfig]);

  const DemoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card style={{ marginBottom: '2rem', padding: '2rem' }}>
      <Text as="h3" size="xl" weight="bold" style={{ marginBottom: '1rem' }}>
        {title}
      </Text>
      {children}
    </Card>
  );

  const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'tsx' }) => (
    <pre style={{
      backgroundColor: 'var(--current-surface)',
      padding: '1rem',
      borderRadius: '0.5rem',
      overflow: 'auto',
      fontSize: '0.875rem',
      border: '1px solid var(--current-border)'
    }}>
      <code>{code}</code>
    </pre>
  );

  const MetricCard: React.FC<{ label: string; value: string | number; color?: string; description?: string }> = ({ 
    label, value, color = 'var(--current-text)', description 
  }) => (
    <div style={{
      padding: '1rem',
      backgroundColor: 'var(--current-surface)',
      borderRadius: '0.5rem',
      border: '1px solid var(--current-border)',
      textAlign: 'center'
    }}>
      <Text as="h4" weight="semibold" style={{ marginBottom: '0.5rem' }}>
        {label}
      </Text>
      <Text size="2xl" weight="bold" style={{ color, marginBottom: '0.25rem' }}>
        {value}
      </Text>
      {description && (
        <Text size="sm" color="muted">
          {description}
        </Text>
      )}
    </div>
  );

  return (
    <Body theme={theme} autoDark={true}>
      {/* Performance Monitor */}
      <PerformanceMonitor 
        position="top-right"
        showInProduction={true}
        compact={false}
        showGraph={true}
      />

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '1rem', textAlign: 'center' }}>
          🚀 Ultra-Performance Showcase
        </Text>
        
        <Text style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '1.125rem' }}>
          Découvrez les optimisations avancées de Lucent-UI avec animations GPU, 
          micro-interactions fluides et métriques de performance en temps réel.
        </Text>

        {/* Controls */}
        <Card style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>Theme</Text>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--current-border)',
                  backgroundColor: 'var(--current-surface)',
                  color: 'var(--current-text)'
                }}
              >
                {themes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>Performance Mode</Text>
              <select 
                value={performanceMode} 
                onChange={(e) => setPerformanceMode(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--current-border)',
                  backgroundColor: 'var(--current-surface)',
                  color: 'var(--current-text)'
                }}
              >
                <option value="auto">Auto</option>
                <option value="economy">Economy</option>
                <option value="balanced">Balanced</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>Animation Type</Text>
              <select 
                value={animationType} 
                onChange={(e) => setAnimationType(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--current-border)',
                  backgroundColor: 'var(--current-surface)',
                  color: 'var(--current-text)'
                }}
              >
                {animationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>Demo Section</Text>
              <select 
                value={currentDemo} 
                onChange={(e) => setCurrentDemo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--current-border)',
                  backgroundColor: 'var(--current-surface)',
                  color: 'var(--current-text)'
                }}
              >
                <option value="animations">Advanced Animations</option>
                <option value="interactions">Micro Interactions</option>
                <option value="performance">Performance Metrics</option>
                <option value="optimization">Optimizations</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Performance Metrics Overview */}
        <DemoSection title="⚡ Performance Metrics en Temps Réel">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <MetricCard 
              label="FPS" 
              value={metrics.fps} 
              color={metrics.fps >= 55 ? '#10b981' : metrics.fps >= 30 ? '#f59e0b' : '#ef4444'}
              description="Frames per second"
            />
            <MetricCard 
              label="Memory" 
              value={`${metrics.memory}%`} 
              color={metrics.memory <= 30 ? '#10b981' : metrics.memory <= 60 ? '#f59e0b' : '#ef4444'}
              description="Heap usage"
            />
            <MetricCard 
              label="Mode" 
              value={effectivePerformance} 
              color={
                effectivePerformance === 'high' ? '#10b981' :
                effectivePerformance === 'balanced' ? '#f59e0b' : '#ef4444'
              }
              description="Current performance mode"
            />
            <MetricCard 
              label="Connection" 
              value={metrics.connection} 
              color={metrics.connection === '4g' ? '#10b981' : '#f59e0b'}
              description="Network speed"
            />
          </div>

          <Text style={{ marginBottom: '1rem' }}>
            <strong>Browser Support:</strong>
          </Text>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {Object.entries(supportsAdvancedFeatures).map(([feature, supported]) => (
              <span 
                key={feature}
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: supported ? '#10b981' : '#ef4444',
                  color: 'white',
                  fontSize: '0.875rem'
                }}
              >
                {feature}: {supported ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </DemoSection>

        {/* Advanced Animations Demo */}
        {currentDemo === 'animations' && (
          <DemoSection title="🎬 Advanced Animations avec GPU Acceleration">
            {/* Animation Controls */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <UltraPerformantButton
                variant="primary"
                size="lg"
                enableAdvancedAnimations={false}
                performanceMode={performanceMode}
                onClick={triggerAnimation}
                disabled={isAnimating}
              >
                {isAnimating ? `Animating... (${animationType})` : `Trigger ${animationType}`}
              </UltraPerformantButton>

              {isAnimating && (
                <div style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: 'var(--current-surface)', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--current-border)'
                }}>
                  <Text size="sm">
                    Progress: {Math.round(animationProgress * 100)}% | 
                    Performance: {effectivePerformance} | 
                    Key: {animationKey}
                  </Text>
                </div>
              )}
            </div>

            {/* Interactive Animation Demo Box */}
            <div 
              ref={demoRef}
              key={`demo-${animationType}-${animationKey}`}
              style={{
                width: '250px',
                height: '250px',
                backgroundColor: 'var(--color-primary)',
                borderRadius: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                margin: '2rem auto',
                cursor: isAnimating ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isAnimating ? '0 8px 32px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
                transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
                userSelect: 'none'
              }}
              onClick={!isAnimating ? triggerAnimation : undefined}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {isAnimating ? '🎬' : '🎯'}
              </div>
              <Text weight="bold" style={{ color: 'white', textAlign: 'center' }}>
                {isAnimating ? `${animationType} in progress...` : `Click for ${animationType}`}
              </Text>
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>
                {isAnimating ? `${Math.round(animationProgress * 100)}%` : 'Ready to animate'}
              </Text>
            </div>

            {/* Animation Grid - Multiple Examples */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {animationTypes.map((type, index) => (
                <div
                  key={`grid-${type}-${index}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: type === animationType ? 'var(--color-primary)' : 'var(--color-secondary)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    margin: '0 auto',
                    transition: 'all 0.2s ease',
                    border: type === animationType ? '2px solid var(--color-primaryLight)' : '2px solid transparent',
                    opacity: isAnimating && type !== animationType ? 0.5 : 1
                  }}
                  onClick={() => {
                    if (!isAnimating) {
                      setAnimationType(type);
                      setTimeout(() => {
                        animate(type, {
                          duration: 600,
                          onStart: () => console.log(`Grid animation started: ${type}`),
                          onComplete: () => console.log(`Grid animation completed: ${type}`)
                        });
                      }, 100);
                    }
                  }}
                >
                  {type}
                </div>
              ))}
            </div>

            {/* Performance Metrics */}
            <Card style={{ padding: '1rem', marginBottom: '2rem', backgroundColor: 'var(--current-surface)' }}>
              <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>
                🔧 Animation Performance Metrics
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div>
                  <Text size="sm" color="muted">Mode détecté:</Text>
                  <Text size="sm" weight="semibold" style={{ 
                    color: effectivePerformance === 'high' ? '#10b981' : 
                           effectivePerformance === 'balanced' ? '#f59e0b' : '#ef4444'
                  }}>
                    {effectivePerformance}
                  </Text>
                </div>
                <div>
                  <Text size="sm" color="muted">FPS actuel:</Text>
                  <Text size="sm" weight="semibold">{metrics.fps}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted">GPU activé:</Text>
                  <Text size="sm" weight="semibold">✅ Oui</Text>
                </div>
                <div>
                  <Text size="sm" color="muted">Type animation:</Text>
                  <Text size="sm" weight="semibold">{animationType}</Text>
                </div>
              </div>
            </Card>

            <CodeBlock code={`import { useSimpleAnimation } from 'lucent-ui';

const { ref, animate, isAnimating, animationProgress } = useSimpleAnimation();

const triggerAnimation = () => {
  animate('${animationType}', {
    duration: 600,
    onStart: () => console.log('Animation started'),
    onProgress: (progress) => console.log(\`Progress: \${progress * 100}%\`),
    onComplete: () => console.log('Animation completed')
  });
};

// Dans votre JSX:
<div ref={ref} onClick={triggerAnimation}>
  {isAnimating ? 'Animating...' : 'Click to animate'}
</div>`} />
          </DemoSection>
        )}

        {/* Micro Interactions Demo */}
        {currentDemo === 'interactions' && (
          <DemoSection title="✨ Micro-Interactions Fluides">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div
                ref={microRef}
                {...microHandlers}
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: '1rem',
                  color: 'white',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <Text weight="bold">Hover & Tilt Effect</Text>
                <Text size="sm" style={{ marginTop: '0.5rem' }}>
                  {isHovered ? 'Hovered!' : 'Hover me!'}
                </Text>
              </div>

              {demoComponents.slice(0, 8).map((item, index) => (
                <UltraPerformantButton
                  key={item.id}
                  variant={index % 2 === 0 ? 'primary' : 'secondary'}
                  enableMicroInteractions={true}
                  performanceMode={performanceMode}
                  style={{ 
                    animationDelay: `${item.delay}ms`,
                    height: '80px'
                  }}
                >
                  Button {index + 1}
                </UltraPerformantButton>
              ))}
            </div>

            <CodeBlock code={`import { useMicroInteractions } from 'lucent-ui';

const { ref, handlers, isHovered } = useMicroInteractions({
  hover: { scale: 1.05, translateY: -5, brightness: 1.2 },
  focus: { glow: true, glowColor: '#3b82f6' },
  tilt: { maxTilt: 5, scale: 1.02 },
  magnetic: { strength: 0.3, distance: 50 }
});`} />
          </DemoSection>
        )}

        {/* Performance Optimization Demo */}
        {currentDemo === 'performance' && (
          <DemoSection title="🔧 Optimisations de Performance">
            <div style={{ marginBottom: '2rem' }}>
              <Text style={{ marginBottom: '1rem' }}>
                Lazy Loading & Intersection Observer:
              </Text>
              <div style={{ height: '300px', overflow: 'auto', border: '1px solid var(--current-border)', borderRadius: '0.5rem', padding: '1rem' }}>
                <div style={{ height: '200px', marginBottom: '1rem' }}>
                  <Text>Scroll down to see lazy loaded content...</Text>
                </div>
                <div ref={lazyRef}>
                  {isIntersecting ? (
                    <div style={{ padding: '2rem', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '0.5rem' }}>
                      ✅ Lazy loaded content appeared!
                    </div>
                  ) : (
                    <div style={{ padding: '2rem', backgroundColor: 'var(--current-surface)', borderRadius: '0.5rem' }}>
                      📦 Content loading...
                    </div>
                  )}
                </div>
                <div style={{ height: '200px', marginTop: '1rem' }}>
                  <Text>More content below...</Text>
                </div>
              </div>
            </div>

            <CodeBlock code={`import { usePerformanceOptimization } from 'lucent-ui';

const { 
  useLazyLoading,
  getOptimizedAnimationConfig,
  metrics 
} = usePerformanceOptimization();

const { ref, isIntersecting } = useLazyLoading(0.2);
const animConfig = getOptimizedAnimationConfig();`} />
          </DemoSection>
        )}

        {/* Optimization Tips */}
        {currentDemo === 'optimization' && (
          <DemoSection title="💡 Conseils d'Optimisation">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Card style={{ padding: '1.5rem', border: `2px solid ${effectivePerformance === 'high' ? '#10b981' : effectivePerformance === 'balanced' ? '#f59e0b' : '#ef4444'}` }}>
                <Text weight="bold" style={{ marginBottom: '0.5rem' }}>
                  🎯 Mode Actuel: {effectivePerformance}
                </Text>
                <Text size="sm">
                  {effectivePerformance === 'high' && "Toutes les optimisations sont activées. Profitez des animations avancées!"}
                  {effectivePerformance === 'balanced' && "Optimisations équilibrées. Bon compromis performance/expérience."}
                  {effectivePerformance === 'economy' && "Mode économique activé. Animations simplifiées pour préserver les performances."}
                </Text>
              </Card>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <Card style={{ padding: '1.5rem' }}>
                  <Text weight="bold" style={{ marginBottom: '1rem' }}>
                    ⚡ GPU Acceleration
                  </Text>
                  <ul style={{ paddingLeft: '1rem' }}>
                    <li>transform: translateZ(0)</li>
                    <li>will-change: transform</li>
                    <li>backface-visibility: hidden</li>
                    <li>Compositions layers optimisées</li>
                  </ul>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                  <Text weight="bold" style={{ marginBottom: '1rem' }}>
                    🔄 Lazy Loading
                  </Text>
                  <ul style={{ paddingLeft: '1rem' }}>
                    <li>Intersection Observer API</li>
                    <li>Chargement à la demande</li>
                    <li>Optimisation des images</li>
                    <li>Code splitting automatique</li>
                  </ul>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                  <Text weight="bold" style={{ marginBottom: '1rem' }}>
                    📊 Performance Monitoring
                  </Text>
                  <ul style={{ paddingLeft: '1rem' }}>
                    <li>FPS tracking en temps réel</li>
                    <li>Memory usage monitoring</li>
                    <li>Adaptive performance mode</li>
                    <li>Browser capabilities detection</li>
                  </ul>
                </Card>
              </div>
            </div>
          </DemoSection>
        )}

        {/* Footer with stats */}
        <Card style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--current-surface)' }}>
          <Text size="sm" color="muted">
            Lucent-UI Ultra-Performance • FPS: {metrics.fps} • Memory: {metrics.memory}% • Mode: {effectivePerformance}
          </Text>
        </Card>
      </div>
    </Body>
  );
};

export default UltraPerformanceShowcase;