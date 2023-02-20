import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  plugins: [
    reactRefresh(),
    terser({
      format: {
        comments: false,
      },
    }) as Plugin,
  ],
  server: {
    port: 3000,
    host: true,
  },
});
