import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Two pages: the site, and the admin. Keeping them apart means a normal
    // visitor never downloads the admin's code.
    rollupOptions: {
      input: { main: 'index.html', admin: 'admin.html' },
    },
  },
  server: {
    // While developing, the site runs on 5173 and the content server on 3000.
    proxy: {
      '/api': 'http://localhost:3000',
      // Keeps the browser's Host (localhost:5173), so the Google login knows to
      // come back here afterwards and not to 3000, which has no admin page.
      '/auth': { target: 'http://localhost:3000', changeOrigin: false },
      '/uploads': 'http://localhost:3000',
    },
  },
})
