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
- **Premium themes**: velora, aurora, neon, crystal, obsidian, glacial, military, apple, ocean, sunset, forest, midnight
- **CSS custom properties**: Dynamic theming through CSS variables
- **Performance-aware**: Adjusts animations based on device capabilities

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
- Premium variants with advanced animations
- Performance-optimized rendering

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
- Body component automatically detects device capabilities
- Animations disabled for reduced motion preferences
- GPU acceleration conditionally applied
- Bundle size optimized through tree-shaking

## Project Goals

The ultimate goal is **one npm install, 2-3 components = complete React site** with premium design and zero configuration required. The library should feel magical in its simplicity while providing professional-grade output.