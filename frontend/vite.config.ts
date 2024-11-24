import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Specify the base URL for the app (use a subpath if deploying to a subdirectory)
  build: {
    outDir: 'dist', // Specify the output folder for build
     target: 'esnext'
  },
});
