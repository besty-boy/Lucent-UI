import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Body, Button, Navbar, Text, Flex, Card, SmartContainer } from '../../src';
import { LUCENT_THEMES } from '../../src/themes';

export function DocsLayout() {
  const [currentTheme, setCurrentTheme] = useState('velora');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    { id: 'installation', label: '🚀 Installation', path: '/docs/installation', icon: '📦' },
    { id: 'components', label: '🎨 Composants', path: '/docs/components', icon: '🧩' },
    { id: 'premium', label: '⭐ Premium', path: '/docs/premium', icon: '✨' },
    { id: 'animations', label: '🎬 Animations', path: '/docs/animations', icon: '🎭' },
    { id: 'performance', label: '⚡ Performance', path: '/docs/performance', icon: '🚀' },
    { id: 'responsive', label: '📱 Responsive', path: '/docs/responsive', icon: '📱' },
    { id: 'microinteractions', label: '✨ Micro-Interactions', path: '/docs/microinteractions', icon: '🎪' },
    { id: 'state', label: '🗄️ État', path: '/docs/state', icon: '📊' },
    { id: 'themes', label: '🌈 Thèmes', path: '/docs/themes', icon: '🎨' },
    { id: 'examples', label: '💡 Exemples', path: '/docs/examples', icon: '🔍' },
    { id: 'advanced', label: '🔧 Avancé', path: '/docs/advanced', icon: '⚙️' }
  ];

  const getCurrentSection = () => {
    const path = location.pathname;
    if (path === '/docs' || path === '/docs/installation') return 'installation';
    if (path.includes('/components')) return 'components';
    if (path.includes('/premium')) return 'premium';
    if (path.includes('/animations')) return 'animations';
    if (path.includes('/performance')) return 'performance';
    if (path.includes('/responsive')) return 'responsive';
    if (path.includes('/microinteractions')) return 'microinteractions';
    if (path.includes('/state')) return 'state';
    if (path.includes('/themes')) return 'themes';
    if (path.includes('/examples')) return 'examples';
    if (path.includes('/advanced')) return 'advanced';
    return 'installation';
  };

  return (
    <Body 
      theme={currentTheme as any} 
      autoDark 
      responsive
      meta={{
        title: "Lucent-UI Documentation - Guide Complet",
        description: "Documentation complète pour Lucent-UI. Apprenez à créer des sites web professionnels avec 2-3 composants.",
        keywords: "lucent-ui, documentation, react, ui, components, themes, premium"
      }}
    >
      {/* Header */}
      <Navbar logo="📚 Lucent-UI Docs" variant="glass" sticky>
        <Flex gap="1rem" align="center">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? '✕' : '☰'}
            </Button>
          )}
          <Button variant="ghost" size="sm">GitHub</Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" size="sm">Showcase</Button>
          </Link>
          <Button variant="primary" size="sm">Démarrer</Button>
        </Flex>
      </Navbar>

      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Sidebar Navigation */}
        <aside style={{ 
          width: isMobile ? '100%' : '280px', 
          backgroundColor: 'var(--color-surface)', 
          borderRight: isMobile ? 'none' : '1px solid var(--color-border)',
          borderBottom: isMobile ? '1px solid var(--color-border)' : 'none',
          padding: isMobile ? '1rem' : '2rem 1rem',
          position: isMobile ? 'relative' : 'sticky',
          top: isMobile ? '0' : '80px',
          height: isMobile ? 'auto' : 'calc(100vh - 80px)',
          overflowY: 'auto',
          display: isMobile ? (sidebarOpen ? 'block' : 'none') : 'block'
        }}>
          <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
            Navigation
          </Text>
          <nav>
            {navigationItems.map((item) => (
              <Link 
                key={item.id} 
                to={item.path}
                style={{ textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <Button
                  variant={getCurrentSection() === item.id ? "primary" : "ghost"}
                  style={{ 
                    width: '100%',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    padding: '0.75rem'
                  }}
                >
                  <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: '2rem' }}>
            <Text as="h4" size="md" weight="bold" style={{ marginBottom: '1rem' }}>
              Thème Actuel
            </Text>
            <Card variant="outline" padding="sm">
              <Text size="sm" weight="medium" style={{ textTransform: 'capitalize' }}>
                {LUCENT_THEMES[currentTheme]?.name || currentTheme}
              </Text>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: isMobile ? '1rem' : '2rem',
          maxWidth: isMobile ? '100%' : 'calc(100% - 280px)',
          overflow: 'auto'
        }}>
          <SmartContainer mode="adaptive" maxWidth="2xl">
            <Outlet />
          </SmartContainer>
        </main>
      </div>
    </Body>
  );
}