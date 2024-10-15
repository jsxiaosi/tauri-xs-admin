import type { App, Plugin } from 'vue';
import 'virtual:svg-icons-register';
// import { setWindowAppConfig } from '@/store/modules/app';

// 定义全局钩子
export const configMainGlobalProperties = (app: App<Element>): void => {
  // 全局定义属性
  app.config.globalProperties.foo = 'bar';
  /**
   * 页面使用方法：
   * import { getCurrentInstance } from 'vue';
   * const { proxy } = getCurrentInstance()
   * proxy.foo
   */
};

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as Recordable;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, comp);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export const converToArray = (number: number): Array<number> => [...`${number}`].map(el => parseInt(el));
