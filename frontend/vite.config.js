import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    rollupOptions: {
      output: {
        // Reduce dynamic chunk creation to prevent 404 errors on Vercel
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('supabase')) {
              return 'supabase-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
