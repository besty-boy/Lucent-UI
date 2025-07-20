export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  secondaryColor?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animation?: 'none' | 'subtle' | 'smooth' | 'energetic';
}

export interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  corner?: number | string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'glow';
  glow?: boolean;
}

export interface ButtonProps extends ComponentProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export interface BodyProps {
  children: React.ReactNode;
  theme?: 'velora' | 'aurora' | 'neon' | 'crystal' | 'obsidian' | 'glacial' | 'military' | 'apple' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'rose' | 'space' | 'coral' | 'lavender' | 'gold' | 'mint' | 'cherry' | 'electric' | 'sand' | 'ruby' | 'slate' | 'emerald' | 'vintage' | 'custom';
  autoDark?: boolean;
  responsive?: boolean;
  className?: string;
  config?: ThemeConfig;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    robots?: string;
    siteName?: string;
  };
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'outline' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  corner?: number | string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'glow';
  glow?: boolean;
  style?: React.CSSProperties;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  blur?: boolean;
  corner?: number | string;
}

export interface NavbarProps {
  logo?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
  variant?: 'default' | 'glass' | 'solid';
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  touchSupport: boolean;
}

// Enhanced device capabilities types
export interface DeviceCapabilities {
  prefersReducedMotion: boolean;
  deviceMemory: number;
  connectionType: string;
  darkModeSupported: boolean;
  performanceMode: 'high' | 'balanced' | 'economy';
}

// Navigator extensions (typed)
export interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
    downlink?: number;
    rtt?: number;
  };
}

// DOM element with custom properties
export interface ElementWithCustomProps extends HTMLElement {
  [key: string]: unknown;
}

// Generic event handler type
export type EventHandler<T = Event> = (event: T) => void;

// Generic ref type for React components
export type ComponentRef<T = HTMLElement> = React.RefObject<T>;

// Hook dependency array type
export type HookDependencies = React.DependencyList;
