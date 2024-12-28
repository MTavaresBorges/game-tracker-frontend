import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
      proxy: {
          '/api-cep': {
              target: 'https://viacep.com.br',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api-cep/, ''), // Remove o prefixo
          },
      },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
