import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require("path");

require("dotenv").config();   // Require the dotenv
const PORT = process.env.PORT || 8080;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: PORT,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})