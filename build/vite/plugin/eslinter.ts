/**
 * eslint
 * https://bitbucket.org/unimorphic/vite-plugin-linter/src/master/
 */
import { EsLinter, linterPlugin, TypeScriptLinter } from 'vite-plugin-linter';
import type { ConfigEnv } from 'vite';

export function configEsLinterPlugin(configEnv: ConfigEnv) {
  const esLinterPlugin = linterPlugin({
    // 包括检查的文件
    include: [
      'src/**/*.ts',
      'src/**/*.d.ts',
      'src/**/*.tsx',
      'src/**/*.vue',
      'types/**/*.d.ts',
      'types/**/*.ts',
      'mock/**/*.ts',
      'build/**/*.ts',
      'vite.config.ts',
    ],
    //运行的lint类型（这里运行了eslint typeScriptLint）注意：目前这个插件好像还没支持styleLint没看到有相关的define
    linters: [
      new EsLinter({
        // 环境变量
        configEnv,
        // 运行时是否删除缓存文件
        serveOptions: { clearCacheOnStart: true },
      }),
      new TypeScriptLinter(),
    ],
    // build配置
    build: {
      // build配置会出现查找不到app.vue文件暂时不在build下使用
      disable: true,
      includeMode: 'filesInFolder',
    },
    // dev配置
    serve: {
      disable: false,
      includeMode: 'processedFiles',
    },
    // 排除的文件
    exclude: ['node_modules', 'dist', '**/*.js'],
  });
  return esLinterPlugin;
}
