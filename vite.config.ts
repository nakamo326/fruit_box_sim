import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  base:
    process.env.NODE_ENV === 'production' ? '/<GITHUB_REPOSITORY_NAME>/' : './',
});
