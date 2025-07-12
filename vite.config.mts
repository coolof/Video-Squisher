import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  root: 'src/renderer',
  base: './', // 🟢 Så att alla resurser blir relativa till HTML-filen
  plugins: [react(), tailwind()],
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
