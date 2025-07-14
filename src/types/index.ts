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
}

export interface BodyProps {
  children: React.ReactNode;
  theme?: 'velora' | 'aurora' | 'neon' | 'crystal' | 'obsidian' | 'glacial' | 'military' | 'apple' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'custom';
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
