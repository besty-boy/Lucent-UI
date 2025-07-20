import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'src/core.ts'),
        premium: resolve(__dirname, 'src/premium.ts'),
        themes: resolve(__dirname, 'src/themes/index.ts')
      },
      name: 'LucentUI',
      fileName: (format, entryName) => `lucent-ui.${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        manualChunks: {
          themes: ['src/themes/index.ts'],
          premium: [
            'src/components/premium/AnimatedCard.tsx',
            'src/components/premium/MagicButton.tsx',
            'src/components/premium/FluidLayout.tsx',
            'src/components/premium/SmartContainer.tsx',
            'src/components/premium/UltraPerformantButton.tsx',
            'src/components/premium/PerformanceMonitor.tsx'
          ],
          hooks: [
            'src/hooks/useAdvancedAnimation.ts',
            'src/hooks/useAdvancedResponsive.ts',
            'src/hooks/useDynamicTheme.ts',
            'src/hooks/useOptimizedState.ts'
          ]
        }
      },
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug']
      }
    }
  },
});
