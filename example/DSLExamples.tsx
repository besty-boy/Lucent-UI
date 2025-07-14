import React from 'react';
import { lucent, ui, templates, renderDSL } from '../src';

// Example 1: Ultra-Simple API
export const SimpleExample = () => {
  return lucent()
    .theme('aurora')
    .card('premium')
    .text('Welcome to Lucent-UI Ultra')
    .button('magic', 'Get Started')
    .render();
};

// Example 2: Template Strings DSL
export const TemplateExample = () => {
  const layout = ui`
    card.premium.xl > button.magic[loading] "Processing"
    card.glass > button.neon "Cyberpunk"
    card.crystal > button.holographic "Future"
  `;
  
  return renderDSL({ layout });
};

// Example 3: Pre-built Templates
export const TemplatePresets = () => {
  const heroSite = templates.landing({
    title: 'Ultra App',
    theme: 'neon'
  });
  
  return renderDSL(heroSite);
};

// Example 4: Complex Layout with Chaining
export const ComplexExample = () => {
  return lucent()
    .theme('obsidian')
    .responsive()
    .navbar('🔥 Ultra Dashboard')
    .end()
    
    // Hero section
    .card('premium', 'xl')
    .text('Dashboard Ultra')
    .text('Performance et style premium')
    .button('magic', 'Voir Analytics')
    .button('holographic', 'Export Data')
    .end()
    
    // Grid of cards
    .card('glass')
    .text('Utilisateurs Actifs')
    .text('1,234')
    .button('neon', 'Details')
    .end()
    
    .card('crystal')
    .text('Revenue')
    .text('€45,678')
    .button('outline', 'Trends')
    .end()
    
    .card('gradient')
    .text('Conversions')
    .text('89.5%')
    .button('primary', 'Optimize')
    .end()
    
    .render();
};

// Example 5: Programmatic Theme Switching
export const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = React.useState('velora');
  
  const themes = ['velora', 'aurora', 'neon', 'crystal', 'obsidian', 'glacial'];
  
  return lucent()
    .theme(currentTheme)
    .card('premium')
    .text(`Theme: ${currentTheme.toUpperCase()}`)
    .end()
    .navbar('Theme Switcher')
    .add({
      type: 'div',
      props: { className: 'flex gap-2' },
      children: themes.map(theme => ({
        type: 'button',
        props: {
          variant: currentTheme === theme ? 'magic' : 'ghost',
          onClick: () => setCurrentTheme(theme),
          children: theme
        }
      }))
    })
    .end()
    .render();
};

// Example 6: Real-world E-commerce Page
export const EcommercePage = () => {
  return lucent()
    .theme('crystal')
    .navbar('🛍️ Ultra Store')
    .end()
    
    // Product showcase
    .card('premium', 'xl')
    .text('Produit Ultra Premium')
    .text('Description du produit avec tous les détails techniques et avantages.')
    .button('magic', 'Acheter - €299')
    .button('outline', 'Ajouter au Panier')
    .end()
    
    // Features grid
    .card('glass')
    .text('✨ Qualité Premium')
    .text('Matériaux de haute qualité')
    .end()
    
    .card('gradient')
    .text('🚀 Performance')
    .text('Optimisé pour la vitesse')
    .end()
    
    .card('crystal')
    .text('🛡️ Garantie')
    .text('2 ans de garantie incluse')
    .end()
    
    .render();
};

// Example 7: Admin Dashboard
export const AdminDashboard = () => {
  return lucent()
    .theme('midnight')
    .navbar('⚡ Admin Ultra')
    .end()
    
    .card('neon')
    .text('Système Status')
    .text('Tous les services opérationnels')
    .button('primary', 'Voir Logs')
    .end()
    
    .card('premium')
    .text('Utilisateurs')
    .text('5,432 actifs')
    .button('secondary', 'Gérer')
    .end()
    
    .card('glass')
    .text('Sécurité')
    .text('Aucune menace détectée')
    .button('success', 'Scan Complet')
    .end()
    
    .render();
};