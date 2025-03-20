import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT || 5173, // Use the provided PORT
    allowedHosts: "web-dev-3-tez7.onrender.com",
  },
  plugins: [react()],
})
