import type { UserConfig } from 'vitest/config';

export const createVitestTest = (): UserConfig['test'] => {
  return {
    environment: 'jsdom',
    transformMode: {
      web: [/.tsx$/],
    },
  };
};
