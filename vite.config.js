import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configuración de Vite: registra React y Tailwind como plugins
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
