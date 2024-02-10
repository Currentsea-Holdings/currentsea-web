import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/currentsea-web/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Sets '@' to point to the 'src'
    },
  },
  plugins: [react(), eslint()],
});
