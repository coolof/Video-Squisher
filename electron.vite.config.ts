import { defineConfig } from 'electron-vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main',
      lib: {
        entry: 'src/main/main.ts',
        formats: ['cjs'],
      },
      emptyOutDir: false,
    },
  },
  preload: {
    build: {
      outDir: 'dist/main',
      lib: {
        entry: 'src/main/preload.ts',
        formats: ['cjs'],
      },
      emptyOutDir: false,
    },
  },
  renderer: {
    root: 'src/renderer',
    base: './',
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer'),
        css: path.resolve(__dirname, 'src/renderer/css'),
      },
    },
    build: {
      outDir: 'dist/renderer',
      emptyOutDir: true,
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },
});
