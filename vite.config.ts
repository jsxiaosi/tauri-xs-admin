/// <reference types="vitest" />

import type { UserConfig, ConfigEnv } from 'vite';

import { createVitePlugins } from './build/vite/plugin';
import { createViteResolve } from './build/vite/resolve';
import { createViteBuild } from './build/vite/build';
import { createViteEsbuild } from './build/vite/esbuild';
import { createViteServer } from './build/vite/server';
import { createViteOptimizeDeps } from './build/vite/optimizeDeps';
import { createViteCSS } from './build/vite/css';
import { createVitestTest } from './build/vite/viteTestConfig';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfig => {
  const { mode, command } = configEnv;
  // const root = process.cwd();

  // const env = loadEnv(mode, root);

  const isBuild = command === 'build';

  return {
    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下请通过 --clearScreen false 设置。
    clearScreen: false,
    logLevel: 'info',
    envPrefix: ['VITE_', 'TAURI_'],
    // esbuild
    esbuild: createViteEsbuild(isBuild),
    // vitest配置
    test: createVitestTest(),
    // 解析配置
    resolve: createViteResolve(mode, __dirname),
    // 插件配置
    plugins: createVitePlugins(isBuild, configEnv),
    // 服务配置
    server: createViteServer(),
    // 打包配置
    build: createViteBuild(),
    // 依赖优化配置
    optimizeDeps: createViteOptimizeDeps(),
    // css预处理配置
    css: createViteCSS(),
  };
};
