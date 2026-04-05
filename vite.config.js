import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Readypos-Ecommerce/", // INDISPENSABLE para que Git encuentre los assets
})