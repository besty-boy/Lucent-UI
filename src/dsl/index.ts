import React from 'react';
import { Body, Card, Button, Navbar } from '../components';
import { BodyProps } from '../types';

export interface DSLConfig {
  theme?: string;
  mode?: 'light' | 'dark' | 'auto';
  responsive?: boolean;
  animations?: boolean;
}

export interface DSLNode {
  type: string;
  props?: Record<string, any>;
  children?: (DSLNode | string)[];
}

export interface LucentDSL {
  config?: DSLConfig;
  layout: DSLNode[];
}

const DSL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  body: Body,
  card: Card,
  button: Button,
  navbar: Navbar,
};

export const parseShorthand = (shorthand: string): DSLNode[] => {
  const lines = shorthand.trim().split('\n').map(line => line.trim()).filter(Boolean);
  const nodes: DSLNode[] = [];
  
  for (const line of lines) {
    if (line.startsWith('//') || line.startsWith('#')) continue;
    
    // Support pour syntaxe ultra-courte type "card.premium > button.primary[loading]"
    const parsed = parseCompactSyntax(line);
    if (parsed) {
      nodes.push(parsed);
    }
  }
  
  return nodes;
};

const parseCompactSyntax = (syntax: string): DSLNode | null => {
  // Syntaxe: element.variant.size[props] > child.variant[props] "text"
  const parts = syntax.split('>').map(p => p.trim());
  
  let currentNode: DSLNode | null = null;
  
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    
    // Parse "text" content
    const textMatch = part.match(/"([^"]+)"/);
    if (textMatch && i === parts.length - 1) {
      currentNode = { type: 'text', props: { children: textMatch[1] } };
      continue;
    }
    
    // Parse element.variant.size[props]
    const elementMatch = part.match(/^(\w+)(?:\.(\w+))?(?:\.(\w+))?(?:\[([^\]]+)\])?/);
    if (!elementMatch) continue;
    
    const [, element, variant, size, propsStr] = elementMatch;
    
    const props: Record<string, any> = {};
    if (variant) props.variant = variant;
    if (size) props.size = size;
    
    // Parse props in brackets [loading,disabled,fullWidth]
    if (propsStr) {
      const propsList = propsStr.split(',');
      for (const prop of propsList) {
        const [key, value] = prop.split('=');
        props[key.trim()] = value ? value.trim() : true;
      }
    }
    
    const node: DSLNode = { type: element, props };
    if (currentNode) {
      node.children = [currentNode];
    }
    
    currentNode = node;
  }
  
  return currentNode;
};

export const renderDSL = (dsl: LucentDSL): React.ReactElement => {
  const { config = {}, layout } = dsl;
  
  const renderNode = (node: DSLNode | string, key: number): React.ReactNode => {
    if (typeof node === 'string') {
      return node;
    }
    
    if (node.type === 'text') {
      return node.props?.children || '';
    }
    
    const Component = DSL_COMPONENTS[node.type];
    if (!Component) {
      console.warn(`Unknown DSL component: ${node.type}`);
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
  
  const bodyProps: BodyProps = {
    theme: config.theme as any,
    autoDark: config.mode === 'auto',
    responsive: config.responsive !== false,
    children: layout.map((node, index) => renderNode(node, index))
  };
  
  return React.createElement(Body, bodyProps);
};

// Nouvelles API ultra-simplifiées
export const ui = (strings: TemplateStringsArray, ...values: any[]) => {
  const fullString = strings.reduce((acc, str, i) => 
    acc + str + (values[i] || ''), ''
  );
  
  return parseShorthand(fullString);
};

// API fluide pour construction programmatique
export class LucentBuilder {
  private nodes: DSLNode[] = [];
  private config: DSLConfig = {};
  
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
  
  card(variant = 'default', size = 'md') {
    const node: DSLNode = { 
      type: 'card', 
      props: { variant, size },
      children: []
    };
    this.nodes.push(node);
    return new ComponentBuilder(node, this);
  }
  
  button(variant = 'primary', text = 'Button') {
    const node: DSLNode = { 
      type: 'button', 
      props: { variant, children: text }
    };
    this.nodes.push(node);
    return this;
  }
  
  navbar(logo?: string) {
    const node: DSLNode = { 
      type: 'navbar', 
      props: logo ? { logo } : {},
      children: []
    };
    this.nodes.push(node);
    return new ComponentBuilder(node, this);
  }
  
  build(): LucentDSL {
    return {
      config: this.config,
      layout: this.nodes
    };
  }
  
  render(): React.ReactElement {
    return renderDSL(this.build());
  }
}

class ComponentBuilder {
  constructor(
    private node: DSLNode,
    private parent: LucentBuilder
  ) {}
  
  add(childNode: DSLNode) {
    if (!this.node.children) this.node.children = [];
    this.node.children.push(childNode);
    return this;
  }
  
  text(content: string) {
    return this.add({ type: 'text', props: { children: content } });
  }
  
  button(variant = 'primary', text = 'Button') {
    return this.add({ 
      type: 'button', 
      props: { variant, children: text }
    });
  }
  
  card(variant = 'default') {
    const card: DSLNode = { 
      type: 'card', 
      props: { variant },
      children: []
    };
    this.add(card);
    return new ComponentBuilder(card, this.parent);
  }
  
  end() {
    return this.parent;
  }
}

// Export de l'API principale
export const lucent = () => new LucentBuilder();

// Templates pré-configurés
export const templates = {
  hero: (title: string, subtitle?: string) => 
    lucent()
      .card('premium', 'xl')
      .text(title)
      .text(subtitle || '')
      .button('primary', 'Get Started')
      .end()
      .build(),
      
  dashboard: (title: string) =>
    lucent()
      .navbar(title)
      .end()
      .card('default')
      .text('Dashboard Content')
      .end()
      .build(),
      
  landing: (config: { title: string; theme?: string }) =>
    lucent()
      .theme(config.theme || 'velora')
      .navbar(config.title)
      .end()
      .card('premium', 'xl')
      .text(config.title)
      .button('primary', 'Learn More')
      .button('outline', 'Get Started')
      .end()
      .build()
};