import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Sets '@' to point to the 'src'
    },
  },
  plugins: [react(), eslint(), checker({ typescript: true })],
});
