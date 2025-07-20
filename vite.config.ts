import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable React optimizations
      babel: {
        plugins: []
      }
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'src/core.ts'),
        premium: resolve(__dirname, 'src/premium.ts'),
        themes: resolve(__dirname, 'src/themes/index.ts'),
        lazy: resolve(__dirname, 'src/components/LazyPremium.tsx'),
        performance: resolve(__dirname, 'src/utils/performance.ts')
      },
      name: 'LucentUI',
      fileName: (format, entryName) => `lucent-ui.${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsx'
        },
        manualChunks: (id) => {
          // Core utilities
          if (id.includes('src/utils/performance')) return 'performance';
          
          // Theme system
          if (id.includes('src/themes/')) return 'themes';
          
          // Premium components (lazy loaded)
          if (id.includes('src/components/premium/')) return 'premium-lazy';
          
          // Advanced hooks
          if (id.includes('src/hooks/useAdvanced') || 
              id.includes('src/hooks/useDynamic') || 
              id.includes('src/hooks/useOptimized')) return 'hooks-advanced';
          
          // Core hooks
          if (id.includes('src/hooks/')) return 'hooks-core';
          
          // Core components
          if (id.includes('src/components/') && !id.includes('premium')) return 'components-core';
          
          return undefined;
        }
      },
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        passes: 2,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true
      },
      mangle: {
        properties: {
          regex: /^_/ // Mangle private properties starting with _
        }
      },
      format: {
        comments: false
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@types/react', '@types/react-dom']
  }
});
