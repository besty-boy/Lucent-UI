import React, { useState } from 'react';
import { Text, Card, Grid, Button, Flex, Input } from '../../../src';

export function StateManagement() {
  const [demoState, setDemoState] = useState('');
  const [historyDemo, setHistoryDemo] = useState<string[]>([]);

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

  const addToHistory = (action: string) => {
    setHistoryDemo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${action}`]);
  };

  return (
    <div>
      <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '2rem' }}>
        🗄️ Gestion d'État Optimisée
      </Text>
      
      <Text size="lg" color="muted" style={{ marginBottom: '3rem' }}>
        Système de gestion d'état avancé avec debouncing, throttling, undo/redo et optimisations de performance
      </Text>

      {/* State Management Overview */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎯 Vue d'Ensemble
        </Text>
        
        <Grid columns={3} gap="2rem" minWidth="250px" mobileColumns={1}>
          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🔄 Debouncing/Throttling
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Contrôle de la fréquence des mises à jour d'état pour optimiser les performances
            </Text>
          </Card>

          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ↩️ Undo/Redo
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Historique automatique des changements d'état avec navigation temporelle
            </Text>
          </Card>

          <Card variant="glass" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              💾 Persistance
            </Text>
            <Text color="muted" style={{ lineHeight: '1.6' }}>
              Sauvegarde automatique dans localStorage avec gestion des erreurs
            </Text>
          </Card>
        </Grid>
      </Card>

      {/* Demo Interactive */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎮 Démo Interactive
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              État actuel:
            </Text>
            <Input
              value={demoState}
              onChange={(e) => {
                setDemoState(e.target.value);
                addToHistory(`État modifié: "${e.target.value}"`);
              }}
              placeholder="Tapez quelque chose..."
              style={{ marginBottom: '1rem' }}
            />
            <Flex gap="1rem" wrap="wrap">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setDemoState('');
                  addToHistory('État réinitialisé');
                }}
              >
                Réinitialiser
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => {
                  addToHistory('État sauvegardé');
                }}
              >
                Sauvegarder
              </Button>
            </Flex>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Historique:
            </Text>
            <Card variant="outline" padding="sm" style={{ height: '200px', overflowY: 'auto' }}>
              {historyDemo.length === 0 ? (
                <Text color="muted" size="sm">Aucune action effectuée</Text>
              ) : (
                historyDemo.map((action, index) => (
                  <div key={index} style={{ marginBottom: '0.5rem' }}>
                    <Text size="sm" style={{ fontFamily: 'monospace' }}>
                      {action}
                    </Text>
                  </div>
                ))
              )}
            </Card>
          </div>
        </Grid>
      </Card>

      {/* Hook useOptimizedState */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🔧 Hook useOptimizedState
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Hook complet pour une gestion d'état optimisée avec toutes les fonctionnalités avancées
        </Text>

        {renderCodeExample(`import { useOptimizedState } from 'lucent-ui';

function MonComposant() {
  const {
    state,
    setState,
    batchUpdate,
    createSelector,
    undo,
    redo,
    reset,
    merge,
    canUndo,
    canRedo,
    getPerformanceMetrics,
    clearCache,
    exportState,
    importState
  } = useOptimizedState({
    initialState: { name: '', age: 0, preferences: {} },
    persist: true,
    persistKey: 'user-data',
    debounceMs: 300,
    throttleMs: 100,
    enableUndo: true,
    maxUndoHistory: 50,
    enableDevTools: true
  });

  // Mise à jour simple
  const updateName = (name: string) => {
    setState(prev => ({ ...prev, name }));
  };

  // Mise à jour en lot
  const updateProfile = () => {
    batchUpdate([
      prev => ({ ...prev, name: 'John' }),
      prev => ({ ...prev, age: 30 }),
      { preferences: { theme: 'dark' } }
    ]);
  };

  // Sélecteur mémorisé
  const displayName = createSelector(
    state => state.name || 'Utilisateur',
    [state.name]
  );

  return (
    <div>
      <p>Nom: {displayName}</p>
      <p>Âge: {state.age}</p>
      <button onClick={undo} disabled={!canUndo}>Annuler</button>
      <button onClick={redo} disabled={!canRedo}>Refaire</button>
      <button onClick={reset}>Réinitialiser</button>
    </div>
  );
}`)}
      </Card>

      {/* Configuration Options */}
      <Card variant="crystal" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          ⚙️ Options de Configuration
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              🔧 Options principales
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>initialState</code> - État initial</li>
              <li><code>persist</code> - Persistance localStorage</li>
              <li><code>persistKey</code> - Clé de sauvegarde</li>
              <li><code>debounceMs</code> - Délai debouncing</li>
              <li><code>throttleMs</code> - Délai throttling</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              📚 Historique & Debug
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>enableUndo</code> - Activer undo/redo</li>
              <li><code>maxUndoHistory</code> - Taille historique</li>
              <li><code>enableDevTools</code> - Outils développeur</li>
            </ul>
          </Card>
        </Grid>
      </Card>

      {/* Debouncing & Throttling */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          ⏱️ Debouncing & Throttling
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Optimisation des performances avec contrôle de la fréquence des mises à jour
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Debouncing:
            </Text>
            {renderCodeExample(`// Délai après la dernière modification
const state = useOptimizedState({
  initialState: '',
  debounceMs: 300 // 300ms après la dernière saisie
});

// Parfait pour les champs de recherche
const handleSearch = (query) => {
  state.setState(query); // Déclenché 300ms après la dernière saisie
};`)}
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Throttling:
            </Text>
            {renderCodeExample(`// Limitation de la fréquence
const state = useOptimizedState({
  initialState: { x: 0, y: 0 },
  throttleMs: 100 // Max 1 fois par 100ms
});

// Parfait pour les événements mousemove
const handleMouseMove = (e) => {
  state.setState({ x: e.clientX, y: e.clientY });
};`)}
          </div>
        </Grid>
      </Card>

      {/* Undo/Redo System */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          ↩️ Système Undo/Redo
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Historique automatique des changements avec navigation temporelle
        </Text>

        {renderCodeExample(`// Activation de l'historique
const state = useOptimizedState({
  initialState: { content: '' },
  enableUndo: true,
  maxUndoHistory: 50
});

// Utilisation
function EditeurTexte() {
  const { state, setState, undo, redo, canUndo, canRedo } = state;

  return (
    <div>
      <textarea
        value={state.content}
        onChange={(e) => setState({ content: e.target.value })}
      />
      <div>
        <button onClick={undo} disabled={!canUndo}>
          ↩️ Annuler
        </button>
        <button onClick={redo} disabled={!canRedo}>
          ↪️ Refaire
        </button>
      </div>
    </div>
  );
}`)}
      </Card>

      {/* Batch Updates */}
      <Card variant="gradient" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📦 Mises à Jour en Lot
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Optimisation des performances avec mise à jour groupée
        </Text>

        {renderCodeExample(`// Mise à jour en lot
const state = useOptimizedState({
  initialState: { user: null, settings: {}, notifications: [] }
});

// Au lieu de plusieurs setState
setState(prev => ({ ...prev, user: newUser }));
setState(prev => ({ ...prev, settings: newSettings }));
setState(prev => ({ ...prev, notifications: [] }));

// Utiliser batchUpdate
state.batchUpdate([
  prev => ({ ...prev, user: newUser }),
  prev => ({ ...prev, settings: newSettings }),
  prev => ({ ...prev, notifications: [] })
]);

// Mélange de fonctions et valeurs
state.batchUpdate([
  prev => ({ ...prev, loading: true }),
  { error: null },
  prev => ({ ...prev, data: processedData })
]);`)}
      </Card>

      {/* Selectors */}
      <Card variant="crystal" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🎯 Sélecteurs Mémorisés
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Calculs optimisés avec mise en cache automatique
        </Text>

        {renderCodeExample(`// Sélecteurs mémorisés
const state = useOptimizedState({
  initialState: { items: [], filters: {} }
});

// Sélecteur simple
const itemCount = state.createSelector(
  state => state.items.length
);

// Sélecteur avec dépendances
const filteredItems = state.createSelector(
  state => state.items.filter(item => 
    item.category === state.filters.category
  ),
  [state.filters.category] // Dépendances pour la mise en cache
);

// Sélecteur complexe
const statistiques = state.createSelector(
  state => ({
    total: state.items.length,
    active: state.items.filter(i => i.active).length,
    categories: [...new Set(state.items.map(i => i.category))]
  }),
  [state.items] // Recalculé seulement si items change
);`)}
      </Card>

      {/* Performance Metrics */}
      <Card variant="premium" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          📊 Métriques de Performance
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Surveillance et optimisation des performances de l'état
        </Text>

        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Métriques disponibles:
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><code>updateCount</code> - Nombre de mises à jour</li>
              <li><code>renderCount</code> - Nombre de rendus</li>
              <li><code>lastUpdate</code> - Timestamp dernière MAJ</li>
              <li><code>timeSinceLastUpdate</code> - Temps écoulé</li>
              <li><code>averageUpdateInterval</code> - Intervalle moyen</li>
              <li><code>cacheSize</code> - Taille du cache</li>
            </ul>
          </div>

          <div>
            <Text size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              Utilisation:
            </Text>
            {renderCodeExample(`// Accès aux métriques
const metrics = state.getPerformanceMetrics();

console.log('Performances:', {
  mises_a_jour: metrics.updateCount,
  rendus: metrics.renderCount,
  derniere_maj: metrics.lastUpdate,
  cache: metrics.cacheSize
});

// Nettoyage du cache si nécessaire
if (metrics.cacheSize > 100) {
  state.clearCache();
}`)}
          </div>
        </Grid>
      </Card>

      {/* DevTools Integration */}
      <Card variant="glass" padding="lg" style={{ marginBottom: '3rem' }}>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          🛠️ Intégration DevTools
        </Text>
        
        <Text size="lg" color="muted" style={{ marginBottom: '2rem' }}>
          Outils de développement intégrés pour le debugging
        </Text>

        {renderCodeExample(`// Activation des DevTools
const state = useOptimizedState({
  initialState: { data: null },
  enableDevTools: true
});

// Accès global dans la console
window.__LUCENT_UI_STATE__ = {
  current: state.current,
  history: state.history,
  performance: state.getPerformanceMetrics(),
  actions: {
    setState: state.setState,
    undo: state.undo,
    redo: state.redo,
    reset: state.reset,
    merge: state.merge,
    exportState: state.exportState,
    importState: state.importState,
    clearCache: state.clearCache
  }
};

// Utilisation dans la console du navigateur
// __LUCENT_UI_STATE__.current       // État actuel
// __LUCENT_UI_STATE__.history       // Historique
// __LUCENT_UI_STATE__.performance   // Métriques
// __LUCENT_UI_STATE__.actions.undo() // Actions`)}
      </Card>

      {/* Best Practices */}
      <Card variant="gradient" padding="lg">
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          💡 Bonnes Pratiques
        </Text>
        
        <Grid columns={2} gap="2rem" minWidth="300px" mobileColumns={1}>
          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ✅ Recommandations
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Utiliser debouncing pour les champs de recherche</li>
              <li>Throttling pour les événements fréquents</li>
              <li>Sélecteurs mémorisés pour les calculs coûteux</li>
              <li>BatchUpdate pour les mises à jour multiples</li>
              <li>Limiter la taille de l'historique undo</li>
            </ul>
          </Card>

          <Card variant="outline" padding="md">
            <Text as="h3" size="lg" weight="bold" style={{ marginBottom: '1rem' }}>
              ⚠️ À Éviter
            </Text>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Historique trop grand en production</li>
              <li>Persistance d'objets complexes</li>
              <li>Sélecteurs sans dépendances</li>
              <li>Mises à jour trop fréquentes</li>
              <li>Oublier de nettoyer le cache</li>
            </ul>
          </Card>
        </Grid>
      </Card>
    </div>
  );
}