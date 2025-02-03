import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  base: '/website/',  // Nome del repository GitHub
  plugins: [react()],

}
