import React from 'react';

// Version avec Tailwind (ancienne méthode)
import { Body as TailwindBody, Card as TailwindCard, Button as TailwindButton } from '../src';

// Version Pure (nouvelle méthode - recommandée)
import { Body, Card, Button, lucent, pure } from '../src/pure';

// ❌ Ancienne méthode - Dépendance Tailwind
export const TailwindExample = () => (
  <TailwindBody theme="crystal">
    <div className="container mx-auto p-8">  {/* ❌ Classes Tailwind nécessaires */}
      <TailwindCard variant="premium" className="text-center">
        <h1 className="text-4xl font-bold mb-4">  {/* ❌ Plus de classes CSS */}
          Old Way
        </h1>
        <TailwindButton variant="primary">
          Requires Tailwind
        </TailwindButton>
      </TailwindCard>
    </div>
  </TailwindBody>
);

// ✅ Nouvelle méthode Pure - Zero Tailwind
export const PureExample = () => (
  <Body theme="crystal">
    {/* ✅ Container intégré avec styles automatiques */}
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: '2rem' 
    }}>
      <Card variant="premium" padding="xl">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'var(--text-4xl)', 
            fontWeight: 700, 
            marginBottom: 'var(--space-4)' 
          }}>
            ✅ Pure Way
          </h1>
          <Button variant="primary">
            Zero Tailwind Required
          </Button>
        </div>
      </Card>
    </div>
  </Body>
);

// 🚀 Méthode DSL Ultra-Clean
export const DSLExample = () => 
  lucent()
    .theme('crystal')
    .container('xl', 'xl')
    .card('premium', 'xl')
    .heading('🚀 DSL Way', 1)
    .text('Ultra-simplified syntax')
    .button('primary', 'Amazing!')
    .render();

// 📦 Templates pré-configurés
export const TemplateExample = () => 
  pure.hero(
    '📦 Template Way',
    'One-line complete sections',
    'crystal'
  );

// Comparaison Bundle Size:
// Tailwind Version: ~45KB + Tailwind CSS (~50KB) = 95KB total
// Pure Version: ~35KB (styles intégrés) = 35KB total
// Économie: 60KB+ (63% de réduction)

export default {
  TailwindExample,  // ❌ Ancienne méthode
  PureExample,      // ✅ Recommandée
  DSLExample,       // 🚀 Ultra-clean
  TemplateExample   // 📦 Pré-configuré
};