import React, { useState } from 'react';
import { 
  Body, Card, Button, Navbar,
  AnimatedCard, MagicButton, FluidLayout, SmartContainer,
  lucent, renderDSL, templates
} from '../src';
import { getThemeNames, LUCENT_THEMES } from '../src/themes';

export function UltraShowcase() {
  const [currentTheme, setCurrentTheme] = useState('aurora');
  const [dslMode, setDslMode] = useState(false);
  const themeNames = getThemeNames();

  // Démonstration du DSL
  const dslExample = lucent()
    .theme(currentTheme)
    .card('premium', 'xl')
    .text('🚀 DSL in Action')
    .button('magic', 'DSL Magic')
    .end()
    .build();

  if (dslMode) {
    return renderDSL(dslExample);
  }

  return (
    <Body 
      theme={currentTheme as any}
      autoDark 
      responsive
      meta={{
        title: `Lucent-UI Ultra - ${LUCENT_THEMES[currentTheme]?.name} Experience`,
        description: "Expérience ultra-premium avec DSL, animations avancées et thèmes révolutionnaires",
        author: "Lucent-UI Team",
        keywords: "React, UI, premium, themes, DSL, animations"
      }}
    >
      <Navbar logo={`✨ ${LUCENT_THEMES[currentTheme]?.name}-UI Ultra`} variant="glass">
        <div className="flex gap-2 overflow-x-auto">
          {themeNames.map((theme) => (
            <MagicButton
              key={theme}
              variant={currentTheme === theme ? 'magic' : 'ghost'}
              size="sm"
              effect="shimmer"
              onClick={() => setCurrentTheme(theme)}
              className="whitespace-nowrap"
            >
              {LUCENT_THEMES[theme].name}
            </MagicButton>
          ))}
        </div>
      </Navbar>

      <SmartContainer mode="fluid" maxWidth="2xl" spacing="relaxed">
        {/* Hero Section Ultra */}
        <AnimatedCard 
          variant="premium" 
          animation="morphism" 
          hoverEffect="float"
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            {LUCENT_THEMES[currentTheme].name} Ultra
          </h1>
          <p className="text-2xl opacity-90 mb-8">
            {LUCENT_THEMES[currentTheme].description}
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <MagicButton variant="magic" size="xl" effect="aurora">
              ✨ Experience Magic
            </MagicButton>
            <MagicButton variant="holographic" size="xl" effect="particle">
              🎨 Holographic UI
            </MagicButton>
            <MagicButton 
              variant="neon" 
              size="xl" 
              effect="glow"
              onClick={() => setDslMode(true)}
            >
              🚀 Try DSL Mode
            </MagicButton>
          </div>
        </AnimatedCard>

        {/* DSL Demonstration */}
        <AnimatedCard variant="glass" className="mb-8">
          <h2 className="text-3xl font-bold mb-6">🔮 Nouveau Language DSL</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Code Traditionnel React:</h3>
              <pre className="bg-black/20 p-4 rounded text-sm overflow-x-auto">
{`<Body theme="aurora">
  <Card variant="premium">
    <h1>Hello World</h1>
    <Button variant="primary">
      Click me
    </Button>
  </Card>
</Body>`}
              </pre>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Nouveau DSL Lucent:</h3>
              <pre className="bg-black/20 p-4 rounded text-sm overflow-x-auto">
{`lucent()
  .theme('aurora')
  .card('premium')
  .text('Hello World')
  .button('primary', 'Click me')
  .render()`}
              </pre>
            </div>
          </div>
        </AnimatedCard>

        {/* Ultra Premium Components Showcase */}
        <FluidLayout mode="magnetic" animate>
          <AnimatedCard variant="neon" hoverEffect="glow">
            <h3 className="text-xl font-bold mb-4">🔥 Neon Effects</h3>
            <p className="mb-4">Effets cyberpunk avec glow électrique</p>
            <MagicButton variant="neon" effect="particle" fullWidth>
              Neon Power
            </MagicButton>
          </AnimatedCard>

          <AnimatedCard variant="crystal" hoverEffect="tilt">
            <h3 className="text-xl font-bold mb-4">💎 Crystal UI</h3>
            <p className="mb-4">Surfaces cristallines avec réflexions</p>
            <MagicButton variant="outline" effect="morphism" fullWidth>
              Crystal Clear
            </MagicButton>
          </AnimatedCard>

          <AnimatedCard variant="gradient" hoverEffect="scale">
            <h3 className="text-xl font-bold mb-4">🌈 Aurora Gradients</h3>
            <p className="mb-4">Gradients iridescents comme les aurores boréales</p>
            <MagicButton variant="holographic" effect="aurora" fullWidth>
              Aurora Magic
            </MagicButton>
          </AnimatedCard>

          <AnimatedCard variant="premium" hoverEffect="lift">
            <h3 className="text-xl font-bold mb-4">✨ Premium Shimmer</h3>
            <p className="mb-4">Effets de brillance premium avec animations</p>
            <MagicButton variant="magic" effect="shimmer" fullWidth>
              Premium Experience
            </MagicButton>
          </AnimatedCard>
        </FluidLayout>

        {/* Advanced Features */}
        <AnimatedCard variant="glass" className="mt-8">
          <h2 className="text-3xl font-bold mb-6">🎯 Fonctionnalités Avancées</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">IA Auto-Config</h3>
              <p className="text-sm opacity-80">
                Détection automatique des capacités device et optimisation performance
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Thèmes Ultra</h3>
              <p className="text-sm opacity-80">
                6 nouveaux thèmes premium avec effets avancés
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Performance</h3>
              <p className="text-sm opacity-80">
                Optimisations GPU et mode économie automatique
              </p>
            </div>
          </div>
        </AnimatedCard>

        {/* Theme Color Palette Ultra */}
        <AnimatedCard>
          <h3 className="text-2xl font-bold mb-6">🎨 Palette {LUCENT_THEMES[currentTheme].name}</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {Object.entries(LUCENT_THEMES[currentTheme].colors).map(([name, color]) => (
              <div key={name} className="text-center group">
                <div 
                  className="w-16 h-16 rounded-xl mx-auto mb-2 border-2 border-[var(--color-border)] shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs font-medium capitalize">{name}</p>
                <p className="text-xs opacity-60">{color}</p>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Code Examples */}
        <AnimatedCard variant="premium" className="mt-8">
          <h2 className="text-3xl font-bold mb-6">💻 Examples de Code Ultra-Simplifié</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Site complet en une ligne:</h3>
              <pre className="bg-black/10 dark:bg-white/10 p-4 rounded-lg text-sm overflow-x-auto">
                {`<Body theme="${currentTheme}"><Card><Button>Hello World</Button></Card></Body>`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Dashboard avec DSL:</h3>
              <pre className="bg-black/10 dark:bg-white/10 p-4 rounded-lg text-sm overflow-x-auto">
{`lucent()
  .theme('${currentTheme}')
  .navbar('My App')
  .card('premium').text('Dashboard').button('primary', 'Action').end()
  .render()`}
              </pre>
            </div>
          </div>
        </AnimatedCard>

        {/* Back to React Mode */}
        <div className="text-center mt-8">
          <MagicButton 
            variant="ghost" 
            onClick={() => setDslMode(false)}
            className="opacity-50 hover:opacity-100"
          >
            ← Retour mode React
          </MagicButton>
        </div>
      </SmartContainer>
    </Body>
  );
}

export default UltraShowcase;