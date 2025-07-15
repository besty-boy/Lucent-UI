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
    description: 'Elegant pink and amber theme with soft gradients',
    mode: 'auto',
    animation: 'smooth',
    borderRadius: 'lg',
    colors: {
      primary: '#d946ef', // fuchsia-500
      primaryLight: '#e879f9', // fuchsia-400
      primaryDark: '#c026d3', // fuchsia-600
      secondary: '#f59e0b', // amber-500
      secondaryLight: '#fbbf24', // amber-400
      secondaryDark: '#d97706', // amber-600
      accent: '#10b981', // emerald-500
      background: '#fef2f9', // pink-50 custom
      backgroundDark: '#1e1b34', // deep violet
      surface: '#fdf4ff', // fuchsia-50
      surfaceDark: '#3b3258', // darker violet
      text: '#1e1b34', // high-contrast dark
      textDark: '#f2eaff', // high-contrast light
      textSecondary: '#585279', // muted
      textSecondaryDark: '#a89ecf', // muted light
      border: '#e879f9', // fuchsia-400
      borderDark: '#585279', // muted
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #d946ef 0%, #f59e0b 100%)',
      secondary: 'linear-gradient(135deg, #f59e0b 0%, #d946ef 100%)',
      background: 'linear-gradient(135deg, #fef2f9 0%, #fdf4ff 100%)',
      backgroundDark: 'linear-gradient(135deg, #1e1b34 0%, #3b3258 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(217, 70, 239, 0.1)',
      md: '0 4px 6px -1px rgba(217, 70, 239, 0.15)',
      lg: '0 10px 15px -3px rgba(217, 70, 239, 0.15)',
      xl: '0 20px 25px -5px rgba(217, 70, 239, 0.15)',
    },
  },

  aurora: {
    name: 'Aurora',
    description: 'Northern lights inspired with shifting iridescent colors',
    mode: 'auto',
    animation: 'energetic',
    borderRadius: 'xl',
    colors: {
      primary: '#10b981', // emerald-500
      primaryLight: '#34d399', // emerald-400
      primaryDark: '#059669', // emerald-600
      secondary: '#3b82f6', // blue-500
      secondaryLight: '#60a5fa', // blue-400
      secondaryDark: '#2563eb', // blue-600
      accent: '#f59e0b', // amber-500
      background: '#f0fdf4', // emerald-50
      backgroundDark: '#0c141a', // dark slate blue
      surface: '#ecfdf5', // emerald-100
      surfaceDark: '#1a2c38', // darker slate blue
      text: '#064e3b', // emerald-900
      textDark: '#ecfdf5', // emerald-50
      textSecondary: '#047857', // emerald-700
      textSecondaryDark: '#a7f3d0', // emerald-200
      border: '#a7f3d0', // emerald-200
      borderDark: '#1a2c38', // surface dark
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(90deg, #10b981 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #10b981 100%)',
      secondary: 'linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #06b6d4 100%)',
      background: 'conic-gradient(from 0deg at 50% 50%, #f0fdf4 0%, #ecfdf5 25%, #f0f9ff 50%, #fef3c7 75%, #f0fdf4 100%)',
      backgroundDark: 'conic-gradient(from 0deg at 50% 50%, #0c141a 0%, #1a2c38 25%, #0c1629 50%, #1a2e05 75%, #0c141a 100%)',
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
      surface: '#1a1a1a',
      surfaceDark: '#1a1a1a',
      text: '#ffffff',
      textDark: '#ffffff',
      textSecondary: '#b3b3b3', // lighter gray for readability
      textSecondaryDark: '#b3b3b3',
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
      primary: '#3b82f6', // blue-500
      primaryLight: '#60a5fa', // blue-400
      primaryDark: '#2563eb', // blue-600
      secondary: '#e5e7eb', // gray-200
      secondaryLight: '#f3f4f6', // gray-100
      secondaryDark: '#d1d5db', // gray-300
      accent: '#06b6d4', // cyan-500
      background: '#ffffff',
      backgroundDark: '#0f1419', // darker
      surface: '#f8fafc', // slate-50
      surfaceDark: '#1a202c', // darker slate
      text: '#1f2937', // gray-800
      textDark: '#f9fafb', // gray-50
      textSecondary: '#4b5563', // gray-600
      textSecondaryDark: '#a0aec0', // lighter gray
      border: '#e5e7eb', // gray-200
      borderDark: '#2d3748', // even darker gray
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
      secondary: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 100%)',
      backgroundDark: 'linear-gradient(145deg, #0f1419 0%, #1a202c 30%, #252a3a 60%, #2d3648 100%)',
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
      background: '#0a0a0a',
      backgroundDark: '#0a0a0a',
      surface: '#1c1c1c',
      surfaceDark: '#1c1c1c',
      text: '#ffffff',
      textDark: '#ffffff',
      textSecondary: '#cccccc', // lighter gray
      textSecondaryDark: '#cccccc',
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
      background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #1c1c1c 50%, #2d1b1b 100%)',
      backgroundDark: 'radial-gradient(ellipse at center, #0a0a0a 0%, #1c1c1c 50%, #2d1b1b 100%)',
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
      primary: '#0ea5e9', // sky-500
      primaryLight: '#38bdf8', // sky-400
      primaryDark: '#0284c7', // sky-600
      secondary: '#e0f2fe', // sky-100
      secondaryLight: '#f0f9ff', // sky-50
      secondaryDark: '#bae6fd', // sky-200
      accent: '#06b6d4', // cyan-500
      background: '#f8fafc', // slate-50
      backgroundDark: '#0f172a', // slate-900
      surface: '#f1f5f9', // slate-100
      surfaceDark: '#1e293b', // slate-800
      text: '#0f172a', // slate-900
      textDark: '#f1f5f9', // slate-100
      textSecondary: '#475569', // slate-600
      textSecondaryDark: '#94a3b8', // slate-400
      border: '#cbd5e1', // slate-300
      borderDark: '#334155', // slate-700
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
      primary: '#4d7c0f', // lime-700
      primaryLight: '#65a30d', // lime-600
      primaryDark: '#365314', // lime-900
      secondary: '#a16207', // amber-700
      secondaryLight: '#ca8a04', // amber-600
      secondaryDark: '#854d0e', // amber-800
      accent: '#dc2626', // red-600
      background: '#fefce8', // yellow-50
      backgroundDark: '#1a2e05', // dark olive
      surface: '#f7fee7', // lime-100
      surfaceDark: '#2a3f13', // darker olive
      text: '#1a2e05', // dark olive
      textDark: '#ecfccb', // lime-100
      textSecondary: '#365314', // lime-900
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
      backgroundDark: 'linear-gradient(135deg, #1a2e05 0%, #2a3f13 100%)',
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
      background: '#f9f9fb', // slightly off-white
      backgroundDark: '#000000', // pure black
      surface: '#ffffff',
      surfaceDark: '#1c1c1e', // iOS dark gray
      text: '#000000',
      textDark: '#ffffff',
      textSecondary: '#636366', // darker gray for contrast
      textSecondaryDark: '#a0a0a5', // lighter gray for contrast
      border: '#d1d1d6', // lighter separator
      borderDark: '#38383a', // iOS dark separator
      success: '#34c759', // iOS green
      warning: '#ff9500', // iOS orange
      error: '#ff3b30', // iOS red
      info: '#007aff', // iOS blue
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
      secondary: 'linear-gradient(135deg, #34c759 0%, #007aff 100%)',
      background: 'linear-gradient(135deg, #f9f9fb 0%, #ffffff 100%)',
      backgroundDark: 'linear-gradient(135deg, #000000 0%, #1c1c1e 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
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
      backgroundDark: '#0c2a4e', // darker blue
      surface: '#e0f2fe', // sky-100
      surfaceDark: '#1a3b69', // even darker blue
      text: '#083358', // high-contrast dark blue
      textDark: '#e0f2fe', // sky-100
      textSecondary: '#0369a1', // sky-700
      textSecondaryDark: '#7dd3fc', // sky-300
      border: '#bae6fd', // sky-200
      borderDark: '#1a3b69', // surface dark
      success: '#059669', // emerald-600
      warning: '#d97706', // amber-600
      error: '#dc2626', // red-600
      info: '#2563eb', // blue-600
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      backgroundDark: 'linear-gradient(135deg, #0c2a4e 0%, #1a3b69 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(14, 165, 233, 0.1)',
      md: '0 4px 6px -1px rgba(14, 165, 233, 0.15)',
      lg: '0 10px 15px -3px rgba(14, 165, 233, 0.2), 0 0 18px rgba(224, 242, 254, 0.5)',
      xl: '0 20px 25px -5px rgba(14, 165, 233, 0.25), 0 0 24px rgba(224, 242, 254, 0.6)',
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
      backgroundDark: '#2c1303', // very dark brown
      surface: '#fef3c7', // amber-100
      surfaceDark: '#451a03', // amber-900
      text: '#451a03', // amber-900
      textDark: '#fef3c7', // amber-100
      textSecondary: '#78350f', // amber-800
      textSecondaryDark: '#fbbf24', // amber-400
      border: '#fed7aa', // orange-200
      borderDark: '#78350f', // amber-800
      success: '#65a30d', // lime-600
      warning: '#eab308', // yellow-500
      error: '#dc2626', // red-600
      info: '#3b82f6', // blue-500
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      secondary: 'linear-gradient(135deg, #ec4899 0%, #facc15 100%)',
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      backgroundDark: 'linear-gradient(135deg, #2c1303 0%, #451a03 100%)',
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
      secondary: '#92400e', // amber-800
      secondaryLight: '#d97706', // amber-600
      secondaryDark: '#78350f', // amber-900
      accent: '#dc2626', // red-600
      background: '#f0fdf4', // green-50
      backgroundDark: '#0f2e1a', // darker green
      surface: '#dcfce7', // green-100
      surfaceDark: '#1a4a2e', // even darker green
      text: '#14532d', // green-900
      textDark: '#dcfce7', // green-100
      textSecondary: '#166534', // green-800
      textSecondaryDark: '#4ade80', // green-400
      border: '#bbf7d0', // green-200
      borderDark: '#1a4a2e', // surface dark
      success: '#16a34a', // green-600
      warning: '#d97706', // amber-600
      error: '#dc2626', // red-600
      info: '#0369a1', // sky-700
    },
    gradients: {
      primary: 'linear-gradient(135deg, #16a34a 0%, #92400e 100%)',
      secondary: 'linear-gradient(135deg, #92400e 0%, #16a34a 100%)',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      backgroundDark: 'linear-gradient(135deg, #0f2e1a 0%, #1a4a2e 100%)',
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
      textSecondary: '#a1a1aa', // zinc-400 for better contrast
      textSecondaryDark: '#a1a1aa',
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

  rose: {
    name: 'Rose',
    description: 'Romantic rose gold with warm pink tones',
    mode: 'auto',
    animation: 'smooth',
    borderRadius: 'xl',
    colors: {
      primary: '#e11d48', // rose-600
      primaryLight: '#f43f5e', // rose-500
      primaryDark: '#be123c', // rose-700
      secondary: '#ec4899', // pink-500
      secondaryLight: '#f472b6', // pink-400
      secondaryDark: '#db2777', // pink-600
      accent: '#f59e0b', // amber-500
      background: '#fff1f2', // rose-50
      backgroundDark: '#2c020d', // very dark rose
      surface: '#ffe4e6', // rose-100
      surfaceDark: '#4c0519', // rose-950
      text: '#4c0519', // rose-950
      textDark: '#ffe4e6', // rose-100
      textSecondary: '#881337', // rose-900
      textSecondaryDark: '#fda4af', // rose-300
      border: '#fecdd3', // rose-200
      borderDark: '#881337', // rose-900
      success: '#10b981', // emerald-500
      warning: '#f59e0b', // amber-500
      error: '#ef4444', // red-500
      info: '#3b82f6', // blue-500
    },
    gradients: {
      primary: 'linear-gradient(135deg, #e11d48 0%, #ec4899 100%)',
      secondary: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
      background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
      backgroundDark: 'linear-gradient(135deg, #2c020d 0%, #4c0519 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(225, 29, 72, 0.1)',
      md: '0 4px 6px -1px rgba(225, 29, 72, 0.15)',
      lg: '0 10px 15px -3px rgba(225, 29, 72, 0.15)',
      xl: '0 20px 25px -5px rgba(225, 29, 72, 0.15)',
    },
  },

  space: {
    name: 'Space',
    description: 'Deep space theme with cosmic indigo',
    mode: 'dark',
    animation: 'energetic',
    borderRadius: 'md',
    colors: {
      primary: '#6366f1', // indigo-500
      primaryLight: '#818cf8', // indigo-400
      primaryDark: '#4f46e5', // indigo-600
      secondary: '#8b5cf6', // violet-500
      secondaryLight: '#a78bfa', // violet-400
      secondaryDark: '#7c3aed', // violet-600
      accent: '#06b6d4', // cyan-500
      background: '#0f0f23', // deep space
      backgroundDark: '#0f0f23',
      surface: '#1e1b4b', // indigo-950
      surfaceDark: '#1e1b4b',
      text: '#e0e7ff', // indigo-100
      textDark: '#e0e7ff',
      textSecondary: '#a5b4fc', // indigo-300 for better contrast
      textSecondaryDark: '#a5b4fc',
      border: '#3730a3', // indigo-800
      borderDark: '#3730a3',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
      secondary: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      background: 'radial-gradient(ellipse at center, #0f0f23 0%, #1e1b4b 70%, #312e81 100%)',
      backgroundDark: 'radial-gradient(ellipse at center, #0f0f23 0%, #1e1b4b 70%, #312e81 100%)',
    },
    shadows: {
      sm: '0 0 10px rgba(99, 102, 241, 0.3)',
      md: '0 0 20px rgba(99, 102, 241, 0.4)',
      lg: '0 0 30px rgba(99, 102, 241, 0.5)',
      xl: '0 0 40px rgba(99, 102, 241, 0.6)',
    },
  },

  coral: {
    name: 'Coral',
    description: 'Vibrant coral with ocean-inspired tones',
    mode: 'auto',
    animation: 'smooth',
    borderRadius: 'lg',
    colors: {
      primary: '#f97316', // orange-500
      primaryLight: '#fb923c', // orange-400
      primaryDark: '#ea580c', // orange-600
      secondary: '#06b6d4', // cyan-500
      secondaryLight: '#22d3ee', // cyan-400
      secondaryDark: '#0891b2', // cyan-600
      accent: '#ec4899', // pink-500
      background: '#fff7ed', // orange-50
      backgroundDark: '#2a0c02', // very dark orange
      surface: '#ffedd5', // orange-100
      surfaceDark: '#431407', // orange-950
      text: '#431407', // orange-950
      textDark: '#ffedd5', // orange-100
      textSecondary: '#9a3412', // orange-800
      textSecondaryDark: '#fdba74', // orange-300
      border: '#fed7aa', // orange-200
      borderDark: '#9a3412', // orange-800
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #06b6d4 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #f97316 100%)',
      background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      backgroundDark: 'linear-gradient(135deg, #2a0c02 0%, #431407 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(249, 115, 22, 0.1)',
      md: '0 4px 6px -1px rgba(249, 115, 22, 0.15)',
      lg: '0 10px 15px -3px rgba(249, 115, 22, 0.15)',
      xl: '0 20px 25px -5px rgba(249, 115, 22, 0.15)',
    },
  },

  mint: {
    name: 'Mint',
    description: 'Fresh mint green with nature vibes',
    mode: 'auto',
    animation: 'smooth',
    borderRadius: 'lg',
    colors: {
      primary: '#059669', // emerald-600
      primaryLight: '#10b981', // emerald-500
      primaryDark: '#047857', // emerald-700
      secondary: '#06b6d4', // cyan-500
      secondaryLight: '#22d3ee', // cyan-400
      secondaryDark: '#0891b2', // cyan-600
      accent: '#8b5cf6', // violet-500
      background: '#ecfdf5', // emerald-50
      backgroundDark: '#022c22', // emerald-950
      surface: '#d1fae5', // emerald-100
      surfaceDark: '#064e3b', // emerald-900
      text: '#014737', // darker emerald
      textDark: '#d1fae5', // emerald-100
      textSecondary: '#047857', // emerald-700
      textSecondaryDark: '#6ee7b7', // emerald-300
      border: '#a7f3d0', // emerald-200
      borderDark: '#064e3b', // emerald-900
      success: '#059669',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #059669 100%)',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      backgroundDark: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(5, 150, 105, 0.1)',
      md: '0 4px 6px -1px rgba(5, 150, 105, 0.15)',
      lg: '0 10px 15px -3px rgba(5, 150, 105, 0.15)',
      xl: '0 20px 25px -5px rgba(5, 150, 105, 0.15)',
    },
  },

  slate: {
    name: 'Slate',
    description: 'Professional slate gray with blue accents',
    mode: 'auto',
    animation: 'subtle',
    borderRadius: 'md',
    colors: {
      primary: '#475569', // slate-600
      primaryLight: '#64748b', // slate-500
      primaryDark: '#334155', // slate-700
      secondary: '#94a3b8', // slate-400
      secondaryLight: '#cbd5e1', // slate-300
      secondaryDark: '#64748b', // slate-500
      accent: '#0ea5e9', // sky-500
      background: '#f1f5f9', // slate-100
      backgroundDark: '#0f172a', // slate-900
      surface: '#f8fafc', // slate-50
      surfaceDark: '#1e293b', // slate-800
      text: '#0f172a', // slate-900
      textDark: '#f1f5f9', // slate-100
      textSecondary: '#475569', // slate-600
      textSecondaryDark: '#94a3b8', // slate-400
      border: '#cbd5e1', // slate-300
      borderDark: '#334155', // slate-700
      success: '#16a34a',
      warning: '#f97316',
      error: '#dc2626',
      info: '#0ea5e9',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #475569 0%, #94a3b8 100%)',
      secondary: 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #f8fafc 100%)',
      backgroundDark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(71, 85, 105, 0.1)',
      md: '0 4px 6px -1px rgba(71, 85, 105, 0.15)',
      lg: '0 10px 15px -3px rgba(71, 85, 105, 0.15)',
      xl: '0 20px 25px -5px rgba(71, 85, 105, 0.15)',
    },
  },

  vintage: {
    name: 'Vintage',
    description: 'Retro vintage with muted earth tones',
    mode: 'auto',
    animation: 'subtle',
    borderRadius: 'lg',
    colors: {
      primary: '#8b5a3c',
      primaryLight: '#a0673f',
      primaryDark: '#6b4423',
      secondary: '#c7956b',
      secondaryLight: '#d4a574',
      secondaryDark: '#a67c52',
      accent: '#d4a574',
      background: '#f7f3f0',
      backgroundDark: '#21150f', // darker brown
      surface: '#f0ebe8',
      surfaceDark: '#3e251a',
      text: '#2b1810',
      textDark: '#f0ebe8',
      textSecondary: '#6b4423',
      textSecondaryDark: '#c7956b',
      border: '#e6d7d0',
      borderDark: '#6b4423',
      success: '#7c9885',
      warning: '#d4a574',
      error: '#a0564b',
      info: '#5f8a8b',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8b5a3c 0%, #c7956b 100%)',
      secondary: 'linear-gradient(135deg, #c7956b 0%, #d4a574 100%)',
      background: 'linear-gradient(135deg, #f7f3f0 0%, #f0ebe8 100%)',
      backgroundDark: 'linear-gradient(135deg, #21150f 0%, #3e251a 100%)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(139, 90, 60, 0.15)',
      md: '0 4px 6px -1px rgba(139, 90, 60, 0.2)',
      lg: '0 8px 15px -3px rgba(139, 90, 60, 0.25)',
      xl: '0 16px 25px -5px rgba(139, 90, 60, 0.3)',
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