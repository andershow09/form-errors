/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'projects/ionic-form-errors/src/**/*.spec.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'html'],
      include: [
        'projects/ionic-form-errors/src/lib/**/*.ts',
      ],
      exclude: [
        '**/*.spec.ts',
        '**/public-api.ts',
        '**/index.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 80,
      },
    },
    setupFiles: ['./test-setup.ts'],
  },
});
