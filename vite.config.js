import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Readypos-Ecommerce/", // <--- Respetando la R y la E mayúsculas
})