import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ For Vercel Deployment
export default defineConfig({
  plugins: [react()],
  base: './',
})
