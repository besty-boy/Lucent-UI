# 🌟 Guide Complet - Créer un Site Web avec Lucent-UI

> **Construisez des sites web professionnels avec seulement 2-3 composants !**

## 📋 Table des Matières

1. [Installation](#installation)
2. [Configuration de Base](#configuration-de-base)
3. [Composants Principaux](#composants-principaux)
4. [Thèmes Disponibles](#thèmes-disponibles)
5. [Exemples Pratiques](#exemples-pratiques)
6. [Personnalisation Avancée](#personnalisation-avancée)
7. [Déploiement](#déploiement)

---

## 🚀 Installation

### Installation du Package

```bash
npm install lucent-ui
```

### Configuration du Projet

1. **Créer un nouveau projet React** (si nécessaire)
```bash
npx create-react-app mon-site --template typescript
cd mon-site
```

2. **Installer Lucent-UI**
```bash
npm install lucent-ui
```

3. **Importer les styles globaux** dans votre `src/index.tsx` ou `src/App.tsx`
```tsx
import 'lucent-ui/dist/style.css';
```

---

## ⚙️ Configuration de Base

### Structure Minimum

```tsx
import React from 'react';
import { Body, Card, Button } from 'lucent-ui';

function App() {
  return (
    <Body theme="velora">
      <Card>
        <h1>Mon Premier Site</h1>
        <Button variant="primary">Cliquez ici</Button>
      </Card>
    </Body>
  );
}

export default App;
```

### Configuration avec Métadonnées SEO

```tsx
import React from 'react';
import { Body, Card, Button } from 'lucent-ui';

function App() {
  return (
    <Body 
      theme="velora" 
      autoDark={true}
      responsive={true}
      meta={{
        title: "Mon Site Génial",
        description: "Un site web créé avec Lucent-UI",
        keywords: "react, ui, moderne, responsive",
        author: "Votre Nom"
      }}
    >
      <Card>
        <h1>Bienvenue sur mon site</h1>
        <Button variant="primary">Commencer</Button>
      </Card>
    </Body>
  );
}

export default App;
```

---

## 🎨 Composants Principaux

### 1. Body - Composant Racine

Le composant `Body` est le conteneur principal qui gère automatiquement :
- ✅ Thèmes et mode sombre
- ✅ Responsive design
- ✅ Métadonnées SEO
- ✅ Optimisation des performances

```tsx
<Body 
  theme="velora"           // Thème à utiliser
  autoDark={true}          // Mode sombre automatique
  responsive={true}        // Design responsive
  meta={{...}}            // Métadonnées SEO
/>
```

### 2. Button - Boutons Stylisés

```tsx
// Boutons de base
<Button variant="primary">Primaire</Button>
<Button variant="secondary">Secondaire</Button>
<Button variant="ghost">Fantôme</Button>
<Button variant="outline">Contour</Button>

// Tailles disponibles
<Button size="xs">Très petit</Button>
<Button size="sm">Petit</Button>
<Button size="md">Moyen</Button>
<Button size="lg">Grand</Button>
<Button size="xl">Très grand</Button>

// États spéciaux
<Button loading>Chargement...</Button>
<Button disabled>Désactivé</Button>
<Button fullWidth>Pleine largeur</Button>
```

### 3. Personnalisation Corner Radius

**Nouvelle fonctionnalité !** Personnalisez le corner radius avec l'attribut `corner` :

```tsx
// Valeurs numériques (en pixels)
<Button corner={0}>Coins carrés</Button>
<Button corner={10}>Coins arrondis 10px</Button>
<Button corner={45}>Coins très arrondis</Button>

// Valeurs CSS personnalisées
<Button corner="50%">Bouton circulaire</Button>
<Button corner="2rem">Coins en rem</Button>
<Button corner="0.5em">Coins en em</Button>
```

### 4. Card - Conteneurs

```tsx
<Card>
  <h2>Titre de la carte</h2>
  <p>Contenu de la carte</p>
</Card>
```

### 5. Input - Champs de Saisie

```tsx
<Input 
  placeholder="Entrez votre texte" 
  variant="primary"
  size="md"
/>
```

### 6. Layout - Mise en Page

```tsx
<Layout>
  <div>Contenu principal</div>
</Layout>
```

### 7. Navbar - Navigation

```tsx
<Navbar 
  logo="Mon Logo"
  sticky={true}
  variant="glass"
>
  <nav>
    <a href="#accueil">Accueil</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </nav>
</Navbar>
```

---

## 🎨 Thèmes Disponibles

Lucent-UI propose 12 thèmes premium prêts à l'emploi :

### 1. **Velora** - Mystique Violet
```tsx
<Body theme="velora">
  <Button>Bouton Velora</Button>
</Body>
```
- 🎨 Couleurs : Violet mystique avec effets éthérés
- 🌙 Mode : Auto (clair/sombre)
- ✨ Animation : Smooth

### 2. **Aurora** - Aurores Boréales
```tsx
<Body theme="aurora">
  <Button>Bouton Aurora</Button>
</Body>
```
- 🎨 Couleurs : Verts et bleus iridescents
- 🌙 Mode : Auto
- ✨ Animation : Energetic

### 3. **Neon** - Cyberpunk
```tsx
<Body theme="neon">
  <Button>Bouton Neon</Button>
</Body>
```
- 🎨 Couleurs : Rose électrique, cyan, jaune
- 🌙 Mode : Dark uniquement
- ✨ Animation : Energetic

### 4. **Crystal** - Cristallin
```tsx
<Body theme="crystal">
  <Button>Bouton Crystal</Button>
</Body>
```
- 🎨 Couleurs : Surfaces cristallines avec reflets
- 🌙 Mode : Auto
- ✨ Animation : Subtle

### 5. **Obsidian** - Volcanique
```tsx
<Body theme="obsidian">
  <Button>Bouton Obsidian</Button>
</Body>
```
- 🎨 Couleurs : Noir volcanique avec orange
- 🌙 Mode : Dark uniquement
- ✨ Animation : Smooth

### 6. **Glacial** - Arctique
```tsx
<Body theme="glacial">
  <Button>Bouton Glacial</Button>
</Body>
```
- 🎨 Couleurs : Bleu arctique avec effets de glace
- 🌙 Mode : Auto
- ✨ Animation : Subtle

### 7. **Military** - Tactique
```tsx
<Body theme="military">
  <Button>Bouton Military</Button>
</Body>
```
- 🎨 Couleurs : Olive et kaki
- 🌙 Mode : Auto
- ✨ Animation : Subtle

### 8. **Apple** - Minimaliste
```tsx
<Body theme="apple">
  <Button>Bouton Apple</Button>
</Body>
```
- 🎨 Couleurs : Design propre inspiré d'Apple
- 🌙 Mode : Auto
- ✨ Animation : Smooth

### 9. **Ocean** - Marin
```tsx
<Body theme="ocean">
  <Button>Bouton Ocean</Button>
</Body>
```
- 🎨 Couleurs : Bleu océan avec accents aqua
- 🌙 Mode : Auto
- ✨ Animation : Smooth

### 10. **Sunset** - Coucher de Soleil
```tsx
<Body theme="sunset">
  <Button>Bouton Sunset</Button>
</Body>
```
- 🎨 Couleurs : Orange et rose chauds
- 🌙 Mode : Auto
- ✨ Animation : Energetic

### 11. **Forest** - Forêt
```tsx
<Body theme="forest">
  <Button>Bouton Forest</Button>
</Body>
```
- 🎨 Couleurs : Verts naturels avec tons terreux
- 🌙 Mode : Auto
- ✨ Animation : Subtle

### 12. **Midnight** - Minuit
```tsx
<Body theme="midnight">
  <Button>Bouton Midnight</Button>
</Body>
```
- 🎨 Couleurs : Sombre élégant avec accents violets
- 🌙 Mode : Dark uniquement
- ✨ Animation : Smooth

---

## 💡 Exemples Pratiques

### Site Web Simple

```tsx
import React from 'react';
import { Body, Navbar, Card, Button, Input } from 'lucent-ui';

function MonSite() {
  return (
    <Body 
      theme="velora"
      meta={{
        title: "Mon Portfolio",
        description: "Portfolio créé avec Lucent-UI"
      }}
    >
      <Navbar logo="Mon Portfolio" sticky>
        <nav>
          <a href="#accueil">Accueil</a>
          <a href="#projets">Projets</a>
          <a href="#contact">Contact</a>
        </nav>
      </Navbar>

      <main style={{ padding: '2rem' }}>
        <Card>
          <h1>Bienvenue sur mon portfolio</h1>
          <p>Découvrez mes projets et compétences</p>
          <Button variant="primary" size="lg">
            Voir mes projets
          </Button>
        </Card>
      </main>
    </Body>
  );
}

export default MonSite;
```

### Page de Contact

```tsx
import React, { useState } from 'react';
import { Body, Card, Button, Input } from 'lucent-ui';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Body theme="crystal">
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <Card>
          <h2>Contactez-nous</h2>
          <div style={{ marginBottom: '1rem' }}>
            <Input
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="primary"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Input
              placeholder="Votre message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="primary"
            />
          </div>
          <Button variant="primary" fullWidth>
            Envoyer
          </Button>
        </Card>
      </div>
    </Body>
  );
}

export default Contact;
```

### Galerie avec Différents Corners

```tsx
import React from 'react';
import { Body, Card, Button } from 'lucent-ui';

function Galerie() {
  return (
    <Body theme="aurora">
      <div style={{ padding: '2rem' }}>
        <h1>Styles de Boutons</h1>
        
        <Card>
          <h2>Corner Radius Personnalisés</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button corner={0} variant="primary">Carrés</Button>
            <Button corner={8} variant="secondary">Légèrement arrondis</Button>
            <Button corner={16} variant="ghost">Arrondis</Button>
            <Button corner={32} variant="outline">Très arrondis</Button>
            <Button corner="50%" variant="primary">Circulaires</Button>
          </div>
        </Card>

        <Card>
          <h2>Tailles et Variants</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button size="xs" corner={4}>XS</Button>
            <Button size="sm" corner={8}>SM</Button>
            <Button size="md" corner={12}>MD</Button>
            <Button size="lg" corner={16}>LG</Button>
            <Button size="xl" corner={20}>XL</Button>
          </div>
        </Card>
      </div>
    </Body>
  );
}

export default Galerie;
```

---

## 🔧 Personnalisation Avancée

### Configuration Custom du Thème

```tsx
import React from 'react';
import { Body, ThemeProvider } from 'lucent-ui';

const customTheme = {
  mode: 'auto' as const,
  primaryColor: '#ff6b6b',
  secondaryColor: '#4ecdc4',
  borderRadius: 'xl' as const,
  animation: 'smooth' as const,
};

function App() {
  return (
    <Body theme="custom" config={customTheme}>
      {/* Votre contenu */}
    </Body>
  );
}
```

### Responsive Design Automatique

Lucent-UI gère automatiquement :
- ✅ Breakpoints responsive
- ✅ Optimisation mobile
- ✅ Adaptation tactile
- ✅ Orientation écran

```tsx
<Body responsive={true}>
  {/* Contenu automatiquement responsive */}
</Body>
```

### Optimisation des Performances

```tsx
// Le composant Body optimise automatiquement selon :
// - Mémoire de l'appareil
// - Type de connexion
// - Préférences utilisateur (reduced motion)
// - Capacités GPU

<Body theme="velora">
  {/* Performances optimisées automatiquement */}
</Body>
```

---

## 🚀 Déploiement

### Build Production

```bash
npm run build
```

### Déploiement Vercel

```bash
npm install -g vercel
vercel
```

### Déploiement Netlify

```bash
npm run build
# Glisser-déposer le dossier build/ sur Netlify
```

### Variables d'Environnement

Créez un fichier `.env` :
```env
REACT_APP_SITE_TITLE=Mon Site Génial
REACT_APP_SITE_DESCRIPTION=Description de mon site
```

Utilisez dans votre code :
```tsx
<Body 
  theme="velora"
  meta={{
    title: process.env.REACT_APP_SITE_TITLE,
    description: process.env.REACT_APP_SITE_DESCRIPTION
  }}
>
```

---

## 📱 Exemples d'Utilisation par Secteur

### 🏢 Site d'Entreprise
```tsx
<Body theme="apple">
  <Navbar logo="MonEntreprise" variant="glass" />
  <Card>
    <h1>Solutions Professionnelles</h1>
    <Button variant="primary" size="lg">Nos Services</Button>
  </Card>
</Body>
```

### 🎨 Portfolio Créatif
```tsx
<Body theme="aurora">
  <Card>
    <h1>Portfolio Créatif</h1>
    <Button corner="50%" variant="primary">Voir mes œuvres</Button>
  </Card>
</Body>
```

### 🎮 Site Gaming
```tsx
<Body theme="neon">
  <Card>
    <h1>Gaming Zone</h1>
    <Button corner={0} variant="primary">Jouer Maintenant</Button>
  </Card>
</Body>
```

### 🌿 Site Écologique
```tsx
<Body theme="forest">
  <Card>
    <h1>Planète Verte</h1>
    <Button corner={8} variant="secondary">Agir Maintenant</Button>
  </Card>
</Body>
```

---

## 🔥 Conseils Pro

### 1. **Choisir le Bon Thème**
- **Entreprise** : apple, crystal, military
- **Créatif** : aurora, velora, sunset
- **Tech** : neon, obsidian, midnight
- **Nature** : forest, ocean, glacial

### 2. **Optimiser les Performances**
- Utilisez `autoDark={true}` pour le mode sombre automatique
- Activez `responsive={true}` pour l'adaptation automatique
- Lucent-UI optimise automatiquement selon l'appareil

### 3. **SEO Optimal**
```tsx
<Body 
  theme="velora"
  meta={{
    title: "Titre unique et descriptif",
    description: "Description de 150-160 caractères",
    keywords: "mots-clés, séparés, par, virgules",
    author: "Votre nom ou entreprise"
  }}
/>
```

### 4. **Accessibilité**
- Lucent-UI respecte automatiquement `prefers-reduced-motion`
- Contraste automatique selon `prefers-contrast`
- Navigation clavier optimisée

---

## 🆘 Dépannage

### Problèmes Courants

**Thème ne s'applique pas :**
```tsx
// ✅ Correct
<Body theme="velora">

// ❌ Incorrect
<Body theme="velora-theme">
```

**Styles qui ne se chargent pas :**
```tsx
// Assurez-vous d'importer les styles
import 'lucent-ui/dist/style.css';
```

**Performance lente :**
```tsx
// Utilisez les optimisations automatiques
<Body theme="velora" responsive={true}>
```

---

## 🎯 Résumé

Avec Lucent-UI, créer un site web professionnel devient simple :

1. **Installez** : `npm install lucent-ui`
2. **Choisissez** un thème parmi les 12 disponibles
3. **Construisez** avec 2-3 composants
4. **Personnalisez** avec `corner` et autres props
5. **Déployez** votre site terminé

**Exemple minimal complet :**
```tsx
import React from 'react';
import { Body, Card, Button } from 'lucent-ui';

function App() {
  return (
    <Body theme="velora">
      <Card>
        <h1>Mon Site Génial</h1>
        <Button corner={16} variant="primary">
          Commencer
        </Button>
      </Card>
    </Body>
  );
}

export default App;
```

**C'est tout !** Votre site web professionnel est prêt. 🎉

---

*Documentation créée avec ❤️ pour Lucent-UI*