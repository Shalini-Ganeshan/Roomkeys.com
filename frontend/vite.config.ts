import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// vite.config.js
export default {
  base: '/', // or your subpath if deploying to a subdirectory
  build: {
    outDir: 'dist',  // Ensure the output folder is correct
  },
};
