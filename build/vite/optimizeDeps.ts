import type { DepOptimizationOptions } from 'vite';

export function createViteOptimizeDeps(): DepOptimizationOptions {
  const viteOptimizeDeps: DepOptimizationOptions = {
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: ['element-plus/es/locale/lang/zh-tw', 'element-plus/es/locale/lang/en'],
    // 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项。如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。
    entries: [],
    // 在预构建中强制排除的依赖项。
    exclude: ['@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'],
  };
  return viteOptimizeDeps;
}
