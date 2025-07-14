// Pure Lucent-UI - Zero Tailwind Dependencies
import React from 'react';
import { PureBody } from '../components/pure/PureBody';
import { PureButton } from '../components/pure/PureButton';
import { PureCard } from '../components/pure/PureCard';
import { PureNavbar } from '../components/pure/PureNavbar';
import { PureContainer } from '../components/pure/PureContainer';
import { PureGrid } from '../components/pure/PureGrid';

// Export pure components
export { PureBody as Body };
export { PureButton as Button };
export { PureCard as Card };
export { PureNavbar as Navbar };
export { PureContainer as Container };
export { PureGrid as Grid };

// Re-export themes and providers
export * from '../themes';
export * from '../providers';
export * from '../types';

// Pure DSL - Ultra clean API
export interface PureDSLNode {
  type: string;
  props?: Record<string, any>;
  children?: (PureDSLNode | string)[];
}

export interface PureDSLConfig {
  theme?: string;
  mode?: 'light' | 'dark' | 'auto';
  responsive?: boolean;
}

export interface PureLucentDSL {
  config?: PureDSLConfig;
  layout: PureDSLNode[];
}

// Pure component map
const PURE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  body: PureBody,
  card: PureCard,
  button: PureButton,
  navbar: PureNavbar,
  container: PureContainer,
  grid: PureGrid,
};

// Ultra-clean DSL builder
export class PureLucent {
  private nodes: PureDSLNode[] = [];
  private config: PureDSLConfig = {};

  theme(theme: string) {
    this.config.theme = theme;
    return this;
  }

  mode(mode: 'light' | 'dark' | 'auto') {
    this.config.mode = mode;
    return this;
  }

  responsive(enabled = true) {
    this.config.responsive = enabled;
    return this;
  }

  // Layout components
  container(maxWidth?: string, padding?: string) {
    const node: PureDSLNode = { 
      type: 'container', 
      props: { maxWidth, padding },
      children: []
    };
    this.nodes.push(node);
    return new PureComponentBuilder(node, this);
  }

  grid(columns?: number | 'auto', gap?: string) {
    const node: PureDSLNode = { 
      type: 'grid', 
      props: { columns, gap },
      children: []
    };
    this.nodes.push(node);
    return new PureComponentBuilder(node, this);
  }

  navbar(logo?: string) {
    const node: PureDSLNode = { 
      type: 'navbar', 
      props: logo ? { logo } : {},
      children: []
    };
    this.nodes.push(node);
    return new PureComponentBuilder(node, this);
  }

  card(variant = 'default', size = 'md') {
    const node: PureDSLNode = { 
      type: 'card', 
      props: { variant, size },
      children: []
    };
    this.nodes.push(node);
    return new PureComponentBuilder(node, this);
  }

  button(variant = 'primary', text = 'Button') {
    const node: PureDSLNode = { 
      type: 'button', 
      props: { variant, children: text }
    };
    this.nodes.push(node);
    return this;
  }

  text(content: string, size?: string, weight?: string) {
    const node: PureDSLNode = {
      type: 'text',
      props: { 
        children: content,
        style: {
          fontSize: size,
          fontWeight: weight
        }
      }
    };
    this.nodes.push(node);
    return this;
  }

  heading(content: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 1) {
    const sizes = {
      1: 'var(--text-5xl)',
      2: 'var(--text-4xl)',
      3: 'var(--text-3xl)',
      4: 'var(--text-2xl)',
      5: 'var(--text-xl)',
      6: 'var(--text-lg)'
    };

    const node: PureDSLNode = {
      type: 'text',
      props: {
        children: content,
        style: {
          fontSize: sizes[level],
          fontWeight: level <= 2 ? 700 : 600,
          lineHeight: 1.2,
          marginBottom: 'var(--space-4)'
        }
      }
    };
    this.nodes.push(node);
    return this;
  }

  section(spacing: 'sm' | 'md' | 'lg' | 'xl' = 'lg') {
    const spacings = {
      sm: 'var(--space-8)',
      md: 'var(--space-12)',
      lg: 'var(--space-16)',
      xl: 'var(--space-24)'
    };

    const node: PureDSLNode = {
      type: 'section',
      props: {
        style: {
          paddingTop: spacings[spacing],
          paddingBottom: spacings[spacing]
        }
      },
      children: []
    };
    this.nodes.push(node);
    return new PureComponentBuilder(node, this);
  }

  build(): PureLucentDSL {
    return {
      config: this.config,
      layout: this.nodes
    };
  }

  render(): React.ReactElement {
    return renderPureDSL(this.build());
  }
}

class PureComponentBuilder {
  constructor(
    private node: PureDSLNode,
    private parent: PureLucent
  ) {}

  add(childNode: PureDSLNode) {
    if (!this.node.children) this.node.children = [];
    this.node.children.push(childNode);
    return this;
  }

  text(content: string, size?: string, weight?: string) {
    return this.add({
      type: 'text',
      props: { 
        children: content,
        style: {
          fontSize: size,
          fontWeight: weight
        }
      }
    });
  }

  heading(content: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 2) {
    const sizes = {
      1: 'var(--text-5xl)',
      2: 'var(--text-4xl)',
      3: 'var(--text-3xl)',
      4: 'var(--text-2xl)',
      5: 'var(--text-xl)',
      6: 'var(--text-lg)'
    };

    return this.add({
      type: 'text',
      props: {
        children: content,
        style: {
          fontSize: sizes[level],
          fontWeight: level <= 2 ? 700 : 600,
          lineHeight: 1.2,
          marginBottom: 'var(--space-4)'
        }
      }
    });
  }

  button(variant = 'primary', text = 'Button', onClick?: () => void) {
    return this.add({ 
      type: 'button', 
      props: { variant, children: text, onClick }
    });
  }

  card(variant = 'default', size = 'md') {
    const card: PureDSLNode = { 
      type: 'card', 
      props: { variant, size },
      children: []
    };
    this.add(card);
    return new PureComponentBuilder(card, this.parent);
  }

  grid(columns?: number | 'auto', gap?: string) {
    const grid: PureDSLNode = { 
      type: 'grid', 
      props: { columns, gap },
      children: []
    };
    this.add(grid);
    return new PureComponentBuilder(grid, this.parent);
  }

  container(maxWidth?: string, padding?: string) {
    const container: PureDSLNode = { 
      type: 'container', 
      props: { maxWidth, padding },
      children: []
    };
    this.add(container);
    return new PureComponentBuilder(container, this.parent);
  }

  section(spacing: 'sm' | 'md' | 'lg' | 'xl' = 'lg') {
    const spacings = {
      sm: 'var(--space-8)',
      md: 'var(--space-12)',
      lg: 'var(--space-16)',
      xl: 'var(--space-24)'
    };

    const section: PureDSLNode = {
      type: 'section',
      props: {
        style: {
          paddingTop: spacings[spacing],
          paddingBottom: spacings[spacing]
        }
      },
      children: []
    };
    this.add(section);
    return new PureComponentBuilder(section, this.parent);
  }

  spacer(size: 'sm' | 'md' | 'lg' | 'xl' = 'md') {
    const sizes = {
      sm: 'var(--space-4)',
      md: 'var(--space-8)',
      lg: 'var(--space-12)',
      xl: 'var(--space-16)'
    };

    return this.add({
      type: 'div',
      props: {
        style: { height: sizes[size] }
      }
    });
  }

  end() {
    return this.parent;
  }
}

export const renderPureDSL = (dsl: PureLucentDSL): React.ReactElement => {
  const { config = {}, layout } = dsl;
  
  const renderNode = (node: PureDSLNode | string, key: number): React.ReactNode => {
    if (typeof node === 'string') {
      return node;
    }
    
    if (node.type === 'text') {
      return React.createElement('span', { 
        key, 
        style: node.props?.style,
        ...node.props 
      });
    }

    if (node.type === 'section') {
      return React.createElement('section', {
        key,
        style: node.props?.style,
        ...node.props
      }, node.children?.map((child, index) => renderNode(child, index)));
    }

    if (node.type === 'div') {
      return React.createElement('div', {
        key,
        ...node.props
      }, node.children?.map((child, index) => renderNode(child, index)));
    }
    
    const Component = PURE_COMPONENTS[node.type];
    if (!Component) {
      console.warn(`Unknown Pure component: ${node.type}`);
      return null;
    }
    
    const children = node.children?.map((child, index) => 
      renderNode(child, index)
    );
    
    return React.createElement(Component, { 
      key, 
      ...node.props 
    }, ...children || []);
  };
  
  // Auto-wrap in Body if not present
  const hasBody = layout.some(node => 
    typeof node === 'object' && node.type === 'body'
  );
  
  if (hasBody) {
    return React.createElement(React.Fragment, {}, 
      layout.map((node, index) => renderNode(node, index))
    );
  }
  
  return React.createElement(PureBody, {
    theme: config.theme as any,
    autoDark: config.mode === 'auto',
    responsive: config.responsive !== false,
    children: layout.map((node, index) => renderNode(node, index))
  });
};

// Main API
export const lucent = () => new PureLucent();

// Template presets with ultra-clean API
export const pure = {
  hero: (title: string, subtitle?: string, theme = 'velora') => 
    renderPureDSL({
      config: { theme },
      layout: [
        {
          type: 'container',
          props: { maxWidth: 'xl', padding: 'xl' },
          children: [
            {
              type: 'card',
              props: { variant: 'premium', size: 'xl' },
              children: [
                {
                  type: 'text',
                  props: {
                    children: title,
                    style: { fontSize: 'var(--text-5xl)', fontWeight: 700 }
                  }
                },
                {
                  type: 'text',
                  props: {
                    children: subtitle || '',
                    style: { fontSize: 'var(--text-xl)' }
                  }
                },
                {
                  type: 'button',
                  props: { variant: 'gradient', children: 'Get Started' }
                }
              ]
            }
          ]
        }
      ]
    }),
      
  landing: (config: { title: string; subtitle?: string; theme?: string }) =>
    renderPureDSL({
      config: { theme: config.theme || 'velora' },
      layout: [
        {
          type: 'navbar',
          props: { logo: config.title }
        },
        {
          type: 'container',
          props: { maxWidth: 'xl' },
          children: [
            {
              type: 'section',
              props: {
                style: {
                  paddingTop: 'var(--space-16)',
                  paddingBottom: 'var(--space-16)'
                }
              },
              children: [
                {
                  type: 'text',
                  props: {
                    children: config.title,
                    style: { fontSize: 'var(--text-5xl)', fontWeight: 700 }
                  }
                },
                {
                  type: 'text',
                  props: {
                    children: config.subtitle || 'Beautiful, clean, professional UI',
                    style: { fontSize: 'var(--text-xl)' }
                  }
                },
                {
                  type: 'button',
                  props: { variant: 'primary', children: 'Learn More' }
                },
                {
                  type: 'button',
                  props: { variant: 'outline', children: 'Get Started' }
                }
              ]
            }
          ]
        }
      ]
    }),
      
  dashboard: (title: string, theme = 'crystal') =>
    renderPureDSL({
      config: { theme },
      layout: [
        {
          type: 'navbar',
          props: { logo: title }
        },
        {
          type: 'container',
          props: { maxWidth: '2xl', padding: 'lg' },
          children: [
            {
              type: 'grid',
              props: { columns: 'auto', gap: 'lg' },
              children: [
                {
                  type: 'card',
                  props: { variant: 'elevated' },
                  children: [
                    {
                      type: 'text',
                      props: {
                        children: 'Statistics',
                        style: { fontSize: 'var(--text-3xl)', fontWeight: 600 }
                      }
                    },
                    {
                      type: 'text',
                      props: { children: 'Your dashboard overview' }
                    }
                  ]
                },
                {
                  type: 'card',
                  props: { variant: 'glass' },
                  children: [
                    {
                      type: 'text',
                      props: {
                        children: 'Analytics',
                        style: { fontSize: 'var(--text-3xl)', fontWeight: 600 }
                      }
                    },
                    {
                      type: 'text',
                      props: { children: 'Performance metrics' }
                    }
                  ]
                },
                {
                  type: 'card',
                  props: { variant: 'premium' },
                  children: [
                    {
                      type: 'text',
                      props: {
                        children: 'Reports',
                        style: { fontSize: 'var(--text-3xl)', fontWeight: 600 }
                      }
                    },
                    {
                      type: 'text',
                      props: { children: 'Generated insights' }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
};