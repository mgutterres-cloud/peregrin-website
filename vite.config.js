import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nexus: resolve(__dirname, 'nexus.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true,
  },
})
