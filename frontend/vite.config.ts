import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    react(),
    inspect(),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom'], // Include essential dependencies
  },
});
