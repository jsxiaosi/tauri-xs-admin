import type { CSSOptions } from 'vite';

export function createViteCSS(): CSSOptions {
  const viteCSS: CSSOptions = {
    preprocessorOptions: {
      // 配置scss全局样式以及变量
      scss: {
        api: 'modern-compiler',
        charset: false,
        additionalData: `
          @use "@/styles/var/element/theme/index.scss" as *;
          @use "@/styles/var/index.scss" as *;
        `,
        javascriptEnabled: true,
      },
    },
  };
  return viteCSS;
}
