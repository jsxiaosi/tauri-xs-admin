import process from 'process';
// https://github.com/btd/rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';

export function configVisualizerPlugin(): Plugin | Plugin[] {
  if (process.env.REPORT === 'true') {
    return [
      visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as unknown as Plugin,
    ];
  } else {
    return [];
  }
}
