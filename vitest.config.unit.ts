import { defineConfig } from 'vitest/config';
import { srcAlias } from './vite.config';

export default defineConfig({
  resolve: {
    alias: srcAlias,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.test.ts',
    include: ['**/*.unit.test.ts', '**/*.unit.test.tsx'],
  },
});
