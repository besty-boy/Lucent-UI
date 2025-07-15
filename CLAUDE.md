# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Lucent-UI** is an ultra-simplified React UI library that generates complete, responsive, performant websites with minimal code. The core vision is one-click setup where users can write 2-3 components and have everything ready automatically.

### Key Features
- **One-click setup**: Complete React initialization with themes, dark mode, SEO
- **Minimal code**: `<Body theme="velora"><Card><Button>Hello</Button></Card></Body>` creates a full site
- **Auto-everything**: 100% responsive, premium themes, optimized performance, accessibility
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

## Important Project Files

### Entry Points
- **Main library**: `src/index.ts` - Exports all components with Tailwind dependencies
- **Pure API**: `src/pure/index.ts` - Zero-dependency CSS variant exports
- **Demo files**: `demo/` - Contains theme showcases and examples
- **Build config**: `vite.config.ts` - Library mode configuration with React externals

### Core Architecture Files
- **Body component**: `src/components/Body.tsx` - Root intelligent component (317 lines)
- **Theme system**: `src/themes/index.ts` - 25 premium themes with full definitions
- **Theme provider**: `src/providers/ThemeProvider.tsx` - Context and auto-dark mode
- **Performance hooks**: `src/hooks/` - Device detection, animations, optimized images

## Architecture Overview

### Core Structure
```
src/
├── components/           # Core UI components
│   ├── Body.tsx         # Root intelligent component with auto-setup
│   ├── Button.tsx       # Pre-styled button component
│   ├── Card.tsx         # Container component
│   ├── Input.tsx        # Form input component
│   ├── Layout.tsx       # Layout utilities
│   ├── Navbar.tsx       # Navigation component
│   ├── premium/         # Premium animated components
│   └── pure/            # Pure CSS variant components
├── hooks/               # Performance and utility hooks
│   ├── useAnimation.ts  # Intersection observer animations
│   ├── useDevice.ts     # Device detection
│   └── useOptimizedImage.ts
├── providers/           # React context providers
│   └── ThemeProvider.tsx # Theme management
├── themes/              # Theme system
├── types/               # TypeScript interfaces
└── utils/               # Utility functions
```

### Key Components

#### Body Component (`src/components/Body.tsx`)
The root intelligent component that handles:
- **Auto-setup**: Theme injection, SEO meta tags, responsive viewport
- **Performance optimization**: Based on device memory, connection type, user preferences
- **Accessibility**: Respects `prefers-reduced-motion` and `prefers-contrast`
- **Theme management**: Applies CSS custom properties and theme-specific styles
- **Development tools**: Performance monitor in dev mode

#### Theme System (`src/providers/ThemeProvider.tsx`)
- **Auto dark mode**: Detects system preferences and applies appropriate theme
- **Premium themes**: velora, aurora, neon, crystal, obsidian, glacial, military, apple, ocean, sunset, forest, midnight, rose, space, coral, mint, slate, vintage (25 total)
- **CSS custom properties**: Dynamic theming through CSS variables
- **Performance-aware**: Adjusts animations based on device capabilities
- **Theme application**: `applyThemeToDocument()` function applies colors, gradients, shadows, and properties to CSS custom properties

#### Performance Hooks (`src/hooks/`)
- `useAnimation`: Intersection observer for scroll-triggered animations
- `useDevice`: Device detection and capabilities
- `useOptimizedImage`: Image optimization utilities

### Build Configuration

Built with Vite in library mode:
- **Entry point**: `src/index.ts`
- **External dependencies**: React, React-DOM (peer dependencies)
- **Output**: ES modules and UMD bundles
- **TypeScript**: Strict mode with full type checking

### Development Architecture

#### Component Structure
Components follow a consistent pattern:
- TypeScript interfaces in `src/types/index.ts`
- Tailwind CSS for styling with CSS custom properties
- Premium variants with advanced animations in `src/components/premium/`
- Pure CSS variants in `src/components/pure/` (zero Tailwind dependency)
- Performance-optimized rendering with conditional GPU acceleration

#### Theme Implementation
Themes are applied through:
1. CSS custom properties set on document root
2. Tailwind classes referencing theme variables
3. Performance-based animation adjustments
4. Auto-detection of user preferences

#### Performance Strategy
- **Adaptive performance**: Adjusts based on device memory and connection
- **Reduced motion**: Respects accessibility preferences
- **GPU acceleration**: Conditionally applied based on performance mode
- **Bundle optimization**: Tree-shakeable exports

## Key Dependencies

- **React 18**: Core framework with TypeScript
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Consistent iconography
- **Vite**: Build tooling and development server
- **Vitest**: Testing framework
- **PostCSS + Autoprefixer**: CSS processing

## Development Notes

### Theme Development
- Themes are defined in `src/themes/` with CSS custom properties
- Auto dark mode detection is handled by ThemeProvider
- Performance-based animation adjustments in Body component

### Component Development
- Follow existing patterns in component structure
- Use TypeScript interfaces from `src/types/index.ts`
- Implement responsive design with Tailwind breakpoints
- Consider performance implications (device memory, connection speed)

### Testing Strategy
- Use Vitest for unit tests
- Component testing with React Testing Library patterns
- Performance testing for theme switching and animations

### Performance Considerations
- Body component automatically detects device capabilities (memory, connection type)
- Animations disabled for reduced motion preferences
- GPU acceleration conditionally applied based on performance mode (high/balanced/economy)
- Bundle size optimized through tree-shaking
- Performance monitor in development mode shows device metrics
- Adaptive CSS injection based on user preferences (contrast, motion)

### Body Component Intelligence
The Body component (`src/components/Body.tsx`) is the core of the auto-setup system:
- **Auto-detects**: Device memory, connection speed, motion preferences, dark mode
- **SEO injection**: Meta tags, Open Graph, Twitter Cards, viewport settings
- **Performance modes**: Economy (low-end devices), balanced, high (premium devices)
- **CSS injection**: Automatically injects global styles and theme variables
- **Accessibility**: Respects `prefers-reduced-motion`, `prefers-contrast`, `prefers-color-scheme`

## Project Goals

The ultimate goal is **one npm install, 2-3 components = complete React site** with premium design and zero configuration required. The library should feel magical in its simplicity while providing professional-grade output.

## Important Development Guidelines

### Code Style & Architecture
- ALWAYS follow the existing component patterns found in `src/components/`
- Use TypeScript interfaces defined in `src/types/index.ts`
- Implement both standard and premium variants for components
- Consider performance implications - the Body component adapts to device capabilities
- Test theme switching and responsive behavior across different devices

### Theme System
- All 25 themes are defined in `src/themes/index.ts` with complete color palettes
- Each theme includes: colors, gradients, shadows, and mode preferences
- Use `applyThemeToDocument()` to apply themes via CSS custom properties
- Auto dark mode detection is handled by ThemeProvider

### Performance & Accessibility
- The Body component automatically optimizes based on device memory and connection
- Always respect `prefers-reduced-motion` and `prefers-contrast` preferences
- GPU acceleration is conditionally applied based on performance mode
- Development mode includes performance monitoring

### Dual API Strategy
- **Main API**: `src/index.ts` - Full-featured with Tailwind dependencies
- **Pure API**: `src/pure/index.ts` - Zero-dependency CSS variants
- Both APIs should provide equivalent functionality with different implementation approaches