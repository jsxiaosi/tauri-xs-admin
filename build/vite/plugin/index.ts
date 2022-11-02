import vue from '@vitejs/plugin-vue';

import vueJsx from '@vitejs/plugin-vue-jsx';

import type { Plugin, ConfigEnv } from 'vite';

// 按需element样式
import ElementPlus from 'unplugin-element-plus/vite';
// setip使用Options API
import VueMacros from 'unplugin-vue-macros/vite';
// 检查插件状态
import Inspect from 'vite-plugin-inspect';
// 按需加载样式配置
import { configStylePlugin } from './style';
// svg配置
import { configSvgPlugin } from './svg';
// 压缩
import { configCompressPlugin } from './compress';
// mock
import { configMockPlugin } from './mock';
// pwd
import { configPwaPlugin } from './pwa';
// 性能分析工具
import { configVisualizerPlugin } from './visualizer';

// 自定义插件 问候语，打包检测用时、大小
import viteBuildOuteInfo from './buildOuteInfo';

// eslint
// import { configEsLinterPlugin } from './eslinter'

export function createVitePlugins(isBuild = false, _configEnv: ConfigEnv) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue({
    //   reactivityTransform: true,
    // }),
  ];

  vitePlugins.push(
    VueMacros({
      plugins: {
        vue: vue({
          reactivityTransform: true,
        }),
        vueJsx: vueJsx(), // if needed
      },
    }),
  );

  vitePlugins.push(configStylePlugin());

  vitePlugins.push(configSvgPlugin());

  vitePlugins.push(configCompressPlugin('gzip', true));

  vitePlugins.push(configMockPlugin(isBuild));

  vitePlugins.push(configPwaPlugin());

  vitePlugins.push(configVisualizerPlugin());

  vitePlugins.push(viteBuildOuteInfo());

  vitePlugins.push(Inspect());

  /* 会重复引入与组件数量相等的主题变量 */
  vitePlugins.push(
    ElementPlus({
      useSource: true,
    }),
  );

  // 使用此插件会导致vite启动变慢 100ms左右
  // vitePlugins.push(configEsLinterPlugin(configEnv))

  return vitePlugins;
}
