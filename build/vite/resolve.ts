import path from 'path';
import type { ResolveOptions, AliasOptions } from 'vite';

type myResolveOptions = ResolveOptions & { alias?: AliasOptions };

export function createViteResolve(mode: string, myDirname: string): myResolveOptions {
  // 解决警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
  const I18nAlias: AliasOptions =
    mode === 'development' ? { 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' } : {};
  const viteResolve: myResolveOptions = {
    // 引用别名配置
    alias: {
      // 配置@别名
      '@': `${path.resolve(myDirname, 'src')}`,
      // 配置#别名
      '#': `${path.resolve(myDirname, 'types')}`,
      ...I18nAlias,
    },
    // 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会干扰 IDE 和类型支持。
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  };

  return viteResolve;
}
