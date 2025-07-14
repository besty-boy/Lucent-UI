## 🧩 PrismaUI — React/TypeScript Component Library

**PrismaUI** est un **framework React complet** pour créer des interfaces utilisateurs élégantes, performantes et responsives **en un temps record**.

Conçu pour les développeurs qui veulent **gagner en efficacité sans sacrifier la qualité du design**, ce package vous propose une collection de composants premium, un système de thème intelligent, et des hooks d’optimisation prêts à l’emploi.

---

### 🚀 Fonctionnalités principales

* **Composants UI Premium** : Buttons, Cards, Inputs, Layouts – entièrement stylés et réactifs
* **Thématisation automatique** : mode clair/sombre, variables CSS, transitions fluides
* **Hooks d’optimisation** : lazy loading, animations, gestion d’images, debounce
* **Utilitaires de développement** : `cn()`, ID uniques, auto-mémorisation de composants

---

### ⚡ Pourquoi l’utiliser ?

* ⏱️ **Gagnez jusqu’à 70% de temps** sur la création d’UI
* 🎨 **Design cohérent** et moderne sans effort
* 📱 **Responsiveness intégré** par défaut
* 🔧 **Performance optimisée** out-of-the-box

---

### 📦 Installation rapide

```bash
npm install prismaUI
```

---

### 🛠 Exemple d’utilisation

```tsx
import { ThemeProvider, Button, Card } from 'premium-ui-kit';

function App() {
  return (
    <ThemeProvider>
      <Card glass hover>
        <Button variant="primary" size="lg">Click me</Button>
      </Card>
    </ThemeProvider>
  );
}
```

---

### 📌 Roadmap

✅ Buttons, Cards, Inputs, Layout
✅ Mode clair/sombre intelligent
✅ Hooks d’optimisation (`useOptimizedImage`, `useAnimation`, etc.)

🛠️ À venir : Modals, Toasts, Tables, Formulaires avancés

---
