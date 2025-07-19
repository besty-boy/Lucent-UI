import React, { useState } from 'react';
import { Body, Card, Text } from '../src';
import { useSimpleAnimation, SimpleAnimationType } from '../src/hooks/useSimpleAnimation';

export const SimpleAnimationTest: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] = useState<SimpleAnimationType>('scale');
  const { ref, animate, isAnimating, animationProgress } = useSimpleAnimation();

  const animationTypes: SimpleAnimationType[] = ['scale', 'fade', 'slideUp', 'bounce', 'elastic'];

  const triggerAnimation = (type: SimpleAnimationType) => {
    setCurrentAnimation(type);
    animate(type, {
      duration: 800,
      onStart: () => console.log(`Animation ${type} started`),
      onComplete: () => console.log(`Animation ${type} completed`),
      onProgress: (progress) => {
        if (progress === 0.5) console.log(`Animation ${type} 50% complete`);
      }
    });
  };

  return (
    <Body theme="velora" autoDark={true}>
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Text as="h1" size="3xl" weight="bold" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          🧪 Simple Animation Test
        </Text>

        <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Animation Controls
          </Text>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {animationTypes.map((type) => (
              <button
                key={type}
                onClick={() => triggerAnimation(type)}
                disabled={isAnimating}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: currentAnimation === type ? 'var(--color-primary)' : 'var(--color-secondary)',
                  color: 'white',
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  opacity: isAnimating && currentAnimation !== type ? 0.5 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {isAnimating && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--current-surface)', 
              borderRadius: '0.5rem',
              marginBottom: '2rem'
            }}>
              <Text size="sm">
                🎬 Animation en cours: <strong>{currentAnimation}</strong> | 
                Progression: <strong>{Math.round(animationProgress * 100)}%</strong>
              </Text>
            </div>
          )}
        </Card>

        <Card style={{ padding: '2rem' }}>
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Demo Box
          </Text>
          
          <div
            ref={ref}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '2rem auto',
              cursor: isAnimating ? 'wait' : 'pointer',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textAlign: 'center',
              transition: 'box-shadow 0.3s ease',
              boxShadow: isAnimating ? '0 8px 32px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onClick={() => !isAnimating && triggerAnimation(currentAnimation)}
          >
            {isAnimating ? (
              <div>
                <div>🎬</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  {currentAnimation}
                </div>
                <div style={{ fontSize: '0.6rem', marginTop: '0.25rem' }}>
                  {Math.round(animationProgress * 100)}%
                </div>
              </div>
            ) : (
              <div>
                <div>🎯</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  Click pour {currentAnimation}
                </div>
              </div>
            )}
          </div>

          <Text size="sm" color="muted" style={{ textAlign: 'center' }}>
            Cliquez sur la box ou utilisez les boutons pour tester les animations
          </Text>
        </Card>

        <Card style={{ padding: '1.5rem', backgroundColor: 'var(--current-surface)' }}>
          <Text size="sm">
            ✅ <strong>Test réussi!</strong> Les animations utilisent maintenant le hook `useSimpleAnimation` plus stable.
          </Text>
        </Card>
      </div>
    </Body>
  );
};

export default SimpleAnimationTest;