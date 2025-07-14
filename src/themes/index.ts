import { ThemeConfig } from '../types';

export interface LucentTheme extends ThemeConfig {
  name: string;
  description: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    accent: string;
    background: string;
    backgroundDark: string;
    surface: string;
    surfaceDark: string;
    text: string;
    textDark: string;
    textSecondary: string;
    textSecondaryDark: string;
    border: string;
    borderDark: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
    backgroundDark: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const LUCENT_THEMES: Record<string, LucentTheme> = {
  velora: {
    name: 'Velora',
    description: 'Mystical purple gradients with ethereal glow effects',
    mode: 'auto',
    animation: 'smooth',
    borderRadius: 'lg',
    colors: {
      primary: '#8b5cf6',
      primaryLight: '#a78bfa',
      primaryDark: '#7c3aed',
      secondary: '#06b6d4',
      secondaryLight: '#22d3ee',
      secondaryDark: '#0891b2',
      accent: '#f59e0b',
      background: '#ffffff',
      backgroundDark: '#0f0a1a',
      surface: '#f8fafc',
      surfaceDark: '#1a1425',
      text: '#0f172a',
      textDark: '#f8fafc',
      textSecondary: '#64748b',
      textSecondaryDark: '#94a3b8',
      border: '#e2e8f0',
      borderDark: '#4c1d95',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #c084fc 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #22d3ee 100%)',
      background: 'radial-gradient(ellipse at top, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)',
      backgroundDark: 'radial-gradient(ellipse at top, #0f0a1a 0%, #1a1425 50%, #2d1b3d 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(139, 92, 246, 0.15), 0 0 8px rgba(139, 92, 246, 0.05)',
      md: '0 4px 12px -2px rgba(139, 92, 246, 0.2), 0 0 16px rgba(139, 92, 246, 0.1)',
      lg: '0 10px 25px -5px rgba(139, 92, 246, 0.25), 0 0 32px rgba(139, 92, 246, 0.15)',
      xl: '0 20px 40px -8px rgba(139, 92, 246, 0.3), 0 0 48px rgba(139, 92, 246, 0.2)',
    },
  },

  aurora: {
    name: 'Aurora',
    description: 'Northern lights inspired with shifting iridescent colors',
    mode: 'auto',
    animation: 'energetic',
    borderRadius: 'xl',
    colors: {
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
      secondary: '#3b82f6',
      secondaryLight: '#60a5fa',
      secondaryDark: '#2563eb',
      accent: '#f59e0b',
      background: '#f0fdf4',
      backgroundDark: '#0a0f0d',
      surface: '#ecfdf5',
      surfaceDark: '#14221b',
      text: '#064e3b',
      textDark: '#ecfdf5',
      textSecondary: '#047857',
      textSecondaryDark: '#6ee7b7',
      border: '#a7f3d0',
      borderDark: '#047857',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(90deg, #10b981 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #10b981 100%)',
      secondary: 'linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #06b6d4 100%)',
      background: 'conic-gradient(from 0deg at 50% 50%, #f0fdf4 0%, #ecfdf5 25%, #f0f9ff 50%, #fef3c7 75%, #f0fdf4 100%)',
      backgroundDark: 'conic-gradient(from 0deg at 50% 50%, #0a0f0d 0%, #14221b 25%, #0c1629 50%, #1a2e05 75%, #0a0f0d 100%)',
    },
    shadows: {
      sm: '0 2px 6px 0 rgba(16, 185, 129, 0.2), 0 0 12px rgba(59, 130, 246, 0.1)',
      md: '0 6px 16px -4px rgba(16, 185, 129, 0.25), 0 0 24px rgba(59, 130, 246, 0.15)',
      lg: '0 12px 28px -6px rgba(16, 185, 129, 0.3), 0 0 36px rgba(59, 130, 246, 0.2)',
      xl: '0 24px 48px -12px rgba(16, 185, 129, 0.35), 0 0 48px rgba(59, 130, 246, 0.25)',
    },
  },

  neon: {
    name: 'Neon',
    description: 'Cyberpunk aesthetic with electric glowing effects',
    mode: 'dark',
    animation: 'energetic',
    borderRadius: 'sm',
    colors: {
      primary: '#ff0080',
      primaryLight: '#ff3399',
      primaryDark: '#cc0066',
      secondary: '#00ffff',
      secondaryLight: '#33ffff',
      secondaryDark: '#00cccc',
      accent: '#ffff00',
      background: '#000000',
      backgroundDark: '#000000',
      surface: '#0a0a0a',
      surfaceDark: '#0a0a0a',
      text: '#ffffff',
      textDark: '#ffffff',
      textSecondary: '#ff0080',
      textSecondaryDark: '#ff0080',
      border: '#ff0080',
      borderDark: '#ff0080',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
      info: '#00ffff',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ff0080 0%, #00ffff 50%, #ffff00 100%)',
      secondary: 'linear-gradient(135deg, #00ffff 0%, #ff0080 100%)',
      background: 'radial-gradient(circle at center, #000000 0%, #0a0a0a 50%, #1a0a1a 100%)',
      backgroundDark: 'radial-gradient(circle at center, #000000 0%, #0a0a0a 50%, #0a0a1a 100%)',
    },
    shadows: {
      sm: '0 0 10px rgba(255, 0, 128, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
      md: '0 0 20px rgba(255, 0, 128, 0.6), 0 0 40px rgba(0, 255, 255, 0.4)',
      lg: '0 0 30px rgba(255, 0, 128, 0.7), 0 0 60px rgba(0, 255, 255, 0.5)',
      xl: '0 0 40px rgba(255, 0, 128, 0.8), 0 0 80px rgba(0, 255, 255, 0.6)',
    },
  },

  crystal: {
    name: 'Crystal',
    description: 'Pristine crystalline surfaces with diamond-like reflections',
    mode: 'auto',
    animation: 'subtle',
    borderRadius: '2xl',
    colors: {
      primary: '#3b82f6',
      primaryLight: '#60a5fa',
      primaryDark: '#2563eb',
      secondary: '#e5e7eb',
      secondaryLight: '#f3f4f6',
      secondaryDark: '#d1d5db',
      accent: '#06b6d4',
      background: '#ffffff',
      backgroundDark: '#0f1419',
      surface: '#fafbfc',
      surfaceDark: '#1a1f2e',
      text: '#1f2937',
      textDark: '#f9fafb',
      textSecondary: '#6b7280',
      textSecondaryDark: '#9ca3af',
      border: '#e5e7eb',
      borderDark: '#374151',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
      secondary: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 100%)',
      backgroundDark: 'linear-gradient(145deg, #0f1419 0%, #1a1f2e 30%, #252a3a 60%, #2d3648 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      md: '0 4px 6px -1px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      lg: '0 10px 15px -3px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      xl: '0 20px 25px -5px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
    },
  },

  obsidian: {
    name: 'Obsidian',
    description: 'Volcanic black with molten orange accents',
    mode: 'dark',
    animation: 'smooth',
    borderRadius: 'md',
    colors: {
      primary: '#ff6b35',
      primaryLight: '#ff8c5a',
      primaryDark: '#e55a2b',
      secondary: '#ffd700',
      secondaryLight: '#ffed4a',
      secondaryDark: '#d4af37',
      accent: '#dc2626',
      background: '#0c0c0c',
      backgroundDark: '#0c0c0c',
      surface: '#1a1a1a',
      surfaceDark: '#1a1a1a',
      text: '#ffffff',
      textDark: '#ffffff',
      textSecondary: '#ff6b35',
      textSecondaryDark: '#ff6b35',
      border: '#404040',
      borderDark: '#404040',
      success: '#10b981',
      warning: '#ffd700',
      error: '#dc2626',
      info: '#06b6d4',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ff6b35 0%, #ffd700 100%)',
      secondary: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
      background: 'radial-gradient(ellipse at center, #0c0c0c 0%, #1a1a1a 50%, #2d1b1b 100%)',
      backgroundDark: 'radial-gradient(ellipse at center, #0c0c0c 0%, #1a1a1a 50%, #2d1b1b 100%)',
    },
    shadows: {
      sm: '0 2px 4px 0 rgba(255, 107, 53, 0.2), 0 0 8px rgba(255, 215, 0, 0.1)',
      md: '0 4px 12px -1px rgba(255, 107, 53, 0.3), 0 0 16px rgba(255, 215, 0, 0.15)',
      lg: '0 10px 20px -3px rgba(255, 107, 53, 0.4), 0 0 24px rgba(255, 215, 0, 0.2)',
      xl: '0 20px 32px -5px rgba(255, 107, 53, 0.5), 0 0 32px rgba(255, 215, 0, 0.25)',
    },
  },

  glacial: {
    name: 'Glacial',
    description: 'Arctic blue with crystalline ice effects',
    mode: 'auto',
    animation: 'subtle',
    borderRadius: 'xl',
    colors: {
      primary: '#0ea5e9',
      primaryLight: '#38bdf8',
      primaryDark: '#0284c7',
      secondary: '#e0f2fe',
      secondaryLight: '#f0f9ff',
      secondaryDark: '#bae6fd',
      accent: '#06b6d4',
      background: '#f8fafc',
      backgroundDark: '#0f172a',
      surface: '#f1f5f9',
      surfaceDark: '#1e293b',
      text: '#0f172a',
      textDark: '#f8fafc',
      textSecondary: '#475569',
      textSecondaryDark: '#94a3b8',
      border: '#cbd5e1',
      borderDark: '#475569',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#0ea5e9',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #e0f2fe 50%, #bae6fd 100%)',
      secondary: 'linear-gradient(135deg, #e0f2fe 0%, #0ea5e9 100%)',
      background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      backgroundDark: 'linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(14, 165, 233, 0.1), 0 0 6px rgba(224, 242, 254, 0.3)',
      md: '0 4px 6px -1px rgba(14, 165, 233, 0.15), 0 0 12px rgba(224, 242, 254, 0.4)',
      lg: '0 10px 15px -3px rgba(14, 165, 233, 0.2), 0 0 18px rgba(224, 242, 254, 0.5)',
      xl: '0 20px 25px -5px rgba(14, 165, 233, 0.25), 0 0 24px rgba(224, 242, 254, 0.6)',
    },
  },

  military: {
    name: 'Military',
    description: 'Tactical design with olive and khaki tones',
    mode: 'auto',
    animation: 'subtle',
    borderRadius: 'sm',
    colors: {
      primary: '#4d7c0f', // lime-700 (olive)
      primaryLight: '#65a30d', // lime-600
      primaryDark: '#365314', // lime-800
      secondary: '#a16207', // amber-700 (khaki)
      secondaryLight: '#ca8a04', // amber-600
      secondaryDark: '#78350f', // amber-800
      accent: '#dc2626', // red-600
      background: '#fefce8', // lime-50
      backgroundDark: '#1a2e05', // dark olive
      surface: '#f7fee7', // lime-25
      surfaceDark: '#2d4a0a', // dark olive surface
      text: '#1a2e05', // dark olive
      textDark: '#ecfccb', // lime-100
      textSecondary: '#65a30d', // lime-600
      textSecondaryDark: '#a3e635', // lime-400
      border: '#d9f99d', // lime-200
      borderDark: '#4d7c0f', // lime-700
      success: '#16a34a', // green-600
      warning: '#ea580c', // orange-600
      error: '#dc2626', // red-600
      info: '#0369a1', // sky-700
    },
    gradients: {
      primary: 'linear-gradient(135deg, #4d7c0f 0%, #a16207 100%)',
      secondary: 'linear-gradient(135deg, #a16207 0%, #4d7c0f 100%)',
      background: 'linear-gradient(135deg, #fefce8 0%, #f7fee7 100%)',
      backgroundDark: 'linear-gradient(135deg, #1a2e05 0%, #2d4a0a 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(77, 124, 15, 0.1)',
      md: '0 4px 6px -1px rgba(77, 124, 15, 0.15)',
      lg: '0 10px 15px -3px rgba(77, 124, 15, 0.15)',
      xl: '0 20px 25px -5px rgba(77, 124, 15, 0.15)',
    },
  },

  apple: {
    name: 'Apple',
    description: 'Clean minimalist design inspired by Apple',
    mode: 'auto',
    animation: 'smooth',
    borderRadius: 'xl',
    colors: {
      primary: '#007aff', // iOS blue
      primaryLight: '#5ac8fa', // light blue
      primaryDark: '#0051d0', // dark blue
      secondary: '#34c759', // iOS green
      secondaryLight: '#30d158', // light green
      secondaryDark: '#248a3d', // dark green
      accent: '#ff9500', // iOS orange
      background: '#ffffff',
      backgroundDark: '#000000', // pure black like iOS
      surface: '#f2f2f7', // iOS light gray
      surfaceDark: '#1c1c1e', // iOS dark gray
      text: '#000000',
      textDark: '#ffffff',
      textSecondary: '#8e8e93', // iOS secondary text
      textSecondaryDark: '#8e8e93',
      border: '#c6c6c8', // iOS separator
      borderDark: '#38383a', // iOS dark separator
      success: '#34c759', // iOS green
      warning: '#ff9500', // iOS orange
      error: '#ff3b30', // iOS red
      info: '#007aff', // iOS blue
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
      secondary: 'linear-gradient(135deg, #34c759 0%, #007aff 100%)',
      background: 'linear-gradient(135deg, #ffffff 0%, #f2f2f7 100%)',
      backgroundDark: 'linear-gradient(135deg, #000000 0%, #1c1c1e 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 122, 255, 0.05)',
      md: '0 4px 6px -1px rgba(0, 122, 255, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 122, 255, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 122, 255, 0.1)',
    },
  },

  ocean: {
    name: 'Ocean',
    description: 'Deep blue marine theme with aqua accents',
    mode: 'auto',
    animation: 'smooth',
    borderRadius: 'lg',
    colors: {
      primary: '#0ea5e9', // sky-500
      primaryLight: '#38bdf8', // sky-400
      primaryDark: '#0284c7', // sky-600
      secondary: '#06b6d4', // cyan-500
      secondaryLight: '#22d3ee', // cyan-400
      secondaryDark: '#0891b2', // cyan-600
      accent: '#14b8a6', // teal-500
      background: '#f0f9ff', // sky-50
      backgroundDark: '#0c4a6e', // sky-900
      surface: '#e0f2fe', // sky-100
      surfaceDark: '#075985', // sky-800
      text: '#0c4a6e', // sky-900
      textDark: '#e0f2fe', // sky-100
      textSecondary: '#0369a1', // sky-700
      textSecondaryDark: '#7dd3fc', // sky-300
      border: '#bae6fd', // sky-200
      borderDark: '#0369a1', // sky-700
      success: '#059669', // emerald-600
      warning: '#d97706', // amber-600
      error: '#dc2626', // red-600
      info: '#2563eb', // blue-600
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      backgroundDark: 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(14, 165, 233, 0.1)',
      md: '0 4px 6px -1px rgba(14, 165, 233, 0.15)',
      lg: '0 10px 15px -3px rgba(14, 165, 233, 0.15)',
      xl: '0 20px 25px -5px rgba(14, 165, 233, 0.15)',
    },
  },

  sunset: {
    name: 'Sunset',
    description: 'Warm orange and pink gradient theme',
    mode: 'auto',
    animation: 'energetic',
    borderRadius: 'xl',
    colors: {
      primary: '#f97316', // orange-500
      primaryLight: '#fb923c', // orange-400
      primaryDark: '#ea580c', // orange-600
      secondary: '#ec4899', // pink-500
      secondaryLight: '#f472b6', // pink-400
      secondaryDark: '#db2777', // pink-600
      accent: '#facc15', // yellow-400
      background: '#fffbeb', // amber-50
      backgroundDark: '#451a03', // amber-900
      surface: '#fef3c7', // amber-100
      surfaceDark: '#78350f', // amber-800
      text: '#451a03', // amber-900
      textDark: '#fef3c7', // amber-100
      textSecondary: '#d97706', // amber-600
      textSecondaryDark: '#fbbf24', // amber-400
      border: '#fed7aa', // orange-200
      borderDark: '#c2410c', // orange-700
      success: '#65a30d', // lime-600
      warning: '#eab308', // yellow-500
      error: '#dc2626', // red-600
      info: '#3b82f6', // blue-500
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      secondary: 'linear-gradient(135deg, #ec4899 0%, #facc15 100%)',
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      backgroundDark: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(249, 115, 22, 0.1)',
      md: '0 4px 6px -1px rgba(249, 115, 22, 0.15)',
      lg: '0 10px 15px -3px rgba(249, 115, 22, 0.15)',
      xl: '0 20px 25px -5px rgba(249, 115, 22, 0.15)',
    },
  },

  forest: {
    name: 'Forest',
    description: 'Natural green theme with earth tones',
    mode: 'auto',
    animation: 'subtle',
    borderRadius: 'md',
    colors: {
      primary: '#16a34a', // green-600
      primaryLight: '#22c55e', // green-500
      primaryDark: '#15803d', // green-700
      secondary: '#92400e', // amber-800 (earth brown)
      secondaryLight: '#d97706', // amber-600
      secondaryDark: '#78350f', // amber-800
      accent: '#dc2626', // red-600 (berry)
      background: '#f0fdf4', // green-50
      backgroundDark: '#14532d', // green-900
      surface: '#dcfce7', // green-100
      surfaceDark: '#166534', // green-800
      text: '#14532d', // green-900
      textDark: '#dcfce7', // green-100
      textSecondary: '#16a34a', // green-600
      textSecondaryDark: '#4ade80', // green-400
      border: '#bbf7d0', // green-200
      borderDark: '#166534', // green-800
      success: '#16a34a', // green-600
      warning: '#d97706', // amber-600
      error: '#dc2626', // red-600
      info: '#0369a1', // sky-700
    },
    gradients: {
      primary: 'linear-gradient(135deg, #16a34a 0%, #92400e 100%)',
      secondary: 'linear-gradient(135deg, #92400e 0%, #16a34a 100%)',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      backgroundDark: 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(22, 163, 74, 0.1)',
      md: '0 4px 6px -1px rgba(22, 163, 74, 0.15)',
      lg: '0 10px 15px -3px rgba(22, 163, 74, 0.15)',
      xl: '0 20px 25px -5px rgba(22, 163, 74, 0.15)',
    },
  },

  midnight: {
    name: 'Midnight',
    description: 'Dark elegant theme with purple accents',
    mode: 'dark',
    animation: 'smooth',
    borderRadius: 'lg',
    colors: {
      primary: '#a855f7', // purple-500
      primaryLight: '#c084fc', // purple-400
      primaryDark: '#9333ea', // purple-600
      secondary: '#06b6d4', // cyan-500
      secondaryLight: '#22d3ee', // cyan-400
      secondaryDark: '#0891b2', // cyan-600
      accent: '#f59e0b', // amber-500
      background: '#030712', // gray-950
      backgroundDark: '#030712',
      surface: '#111827', // gray-900
      surfaceDark: '#111827',
      text: '#f9fafb', // gray-50
      textDark: '#f9fafb',
      textSecondary: '#9ca3af', // gray-400
      textSecondaryDark: '#9ca3af',
      border: '#374151', // gray-700
      borderDark: '#374151',
      success: '#10b981', // emerald-500
      warning: '#f59e0b', // amber-500
      error: '#ef4444', // red-500
      info: '#3b82f6', // blue-500
    },
    gradients: {
      primary: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
      background: 'linear-gradient(135deg, #030712 0%, #111827 100%)',
      backgroundDark: 'linear-gradient(135deg, #030712 0%, #111827 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(168, 85, 247, 0.1)',
      md: '0 4px 6px -1px rgba(168, 85, 247, 0.15)',
      lg: '0 10px 15px -3px rgba(168, 85, 247, 0.15)',
      xl: '0 20px 25px -5px rgba(168, 85, 247, 0.15)',
    },
  },
};

export const getTheme = (themeName: string): LucentTheme => {
  return LUCENT_THEMES[themeName] || LUCENT_THEMES.velora;
};

export const getThemeNames = (): string[] => {
  return Object.keys(LUCENT_THEMES);
};

export const applyThemeToDocument = (theme: LucentTheme) => {
  const root = document.documentElement;
  
  // Apply all color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply gradient variables
  Object.entries(theme.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--gradient-${key}`, value);
  });

  // Apply shadow variables
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });

  // Apply other theme properties
  root.style.setProperty('--border-radius', {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
  }[theme.borderRadius || 'lg']);

  root.style.setProperty('--animation-duration', {
    none: '0ms',
    subtle: '150ms',
    smooth: '300ms',
    energetic: '500ms',
  }[theme.animation || 'smooth']);

  // Apply dark mode class
  const isDark = theme.mode === 'dark' || 
    (theme.mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', isDark);
};