import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/login': 'http://localhost:5001',
      '/check': 'http://localhost:5001'
    }
  }
});
