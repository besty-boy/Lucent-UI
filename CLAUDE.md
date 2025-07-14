
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Lucent-UI** (code name, final name TBD) is an ultra-simplified React UI engine that generates complete, responsive, performant and elegant websites with minimal code. The goal is to enable users to install the package, write 2-3 components, and have everything ready automatically.

### Core Vision
- **One-click setup**: Complete React initialization with Tailwind, themes, dark mode, SEO
- **Minimal code**: `<Body theme="velora"><Card><Button>Hello</Button></Card></Body>` creates a full site
- **Auto-everything**: 100% responsive, premium themes, optimized images, accessibility, animations
- **Zero config**: No manual setup needed for common web development requirements

## Development Commands

```bash
# Start development server
npm run dev

# Build the library for production 
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Target Architecture (To Be Built)

### Key Components to Implement
- **Body**: Root intelligent component (theme init, layout, SEO, responsive auto-setup)
- **ThemeEngine**: Dynamic injection of premium styles and colors
- **Pre-styled UI Components**: Card, Button, Input, Layout, Navbar with smart props
- **Core Hooks**: useTheme, useDevice, useOptimizedImage, useAnimation
- **Dynamic Tailwind Config**: Theme variants that auto-configure

### Current Structure
- **Components**: Located in `src/components/` - Basic UI components (Button, Card, Input, Layout)
- **Hooks**: Located in `src/hooks/` - Performance hooks (useAnimation, useOptimizedImage) 
- **Providers**: Located in `src/providers/` - ThemeProvider (needs enhancement for theme engine)
- **Types**: Located in `src/types/` - TypeScript interfaces
- **Utils**: Located in `src/utils/` - Utility functions (cn, debounce, generateId)

### Premium Theme System (Target)
Automatic theme injection with variants:
- **velora**: Primary target theme
- **goodlook**: Secondary theme option  
- **lucent**: Additional theme variant
- Auto dark/light mode detection and switching
- Complete responsive breakpoint management

### Ultra-Simplified API (Target)
```jsx
<Body theme="velora" autoDark responsive>
  <Navbar logo="MyBrand" />
  <Card glass>
    <Button variant="primary" loading>Get Started</Button>
  </Card>
</Body>
```

## Short-term Deliverables

1. **Package structure setup**
2. **Body component** with auto dark mode, responsive, meta tags
3. **Core components**: Card, Button, Navbar with premium styling
4. **Extensible theme system** (velora, goodlook, lucent themes)
5. **README.md** + Vite demo setup

## Development Notes

- Uses React 18 with TypeScript strict mode
- Tailwind CSS for styling with PostCSS and Autoprefixer
- Lucide React for consistent iconography
- ESLint with TypeScript and React hooks rules
- Vitest for testing framework
- Build target: Vite library mode with create-velora-app CLI for rapid setup

## Project Ambition

**One npm install, 2-3 components = complete React site** with premium design, zero configuration required.