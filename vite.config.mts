import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  root: 'src/renderer',
  base: './',
  plugins: [react(), tailwind()],
  optimizeDeps: {
    exclude: ['tailwindcss'],
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'),
      css: path.resolve(__dirname, 'src/renderer/css'),
    },
  },
});
