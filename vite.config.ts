/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)', '**/test.?(c|m)[jt]s?(x)'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  base: '/dnd-web',
})
