import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? '/music-app/' : '/',
  server: {
    proxy: {
      "/itunes": {
        target: "https://itunes.apple.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/itunes/, '')
      }
    }
  }
}))
