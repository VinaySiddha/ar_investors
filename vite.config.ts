import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Inline critical CSS below 4kb
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/framer-motion')) return 'framer-motion';
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react-vendor';
        },
      },
    },
  },
});
