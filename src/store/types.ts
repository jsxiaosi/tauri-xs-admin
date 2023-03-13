import type { LocationQuery, RouteParams, RouteRecordName, _RouteLocationBase } from 'vue-router';
import type { StorageConfig } from 'xs-vue-utils/es/utils/storage/types';
import type { AppRouteRecordRaw } from '#/route';

export interface AppState {
  appConfigMode: AppConfig;
}

export type SidebarMode = 'vertical' | 'horizontal' | 'blend';

export interface AppConfig {
  // 标题
  title: string;
  // 折叠菜单
  collapseMenu: boolean;
  // 菜单显示模式： 'vertical'：左侧模式 | 'horizontal'：顶部模式 | 'blend'：混合模式
  sidebarMode: SidebarMode;
  // 主题模式：白天主题、夜间主题
  themeMode: 'light' | 'dark';
  // 国际化
  locale: string;
  // storage配置
  StorageConfig: StorageConfig;
  // 移动端菜单
  drawerSidebar?: boolean;
  // 主题颜色
  primaryColor: string;
  // 灰色模式
  greyMode: boolean;
  // 色弱模式
  colorWeaknessMode: boolean;
  // 隐藏侧边菜单栏
  hideSidebar: boolean;
  // 隐藏顶部
  hideNavbart: boolean;
  // 隐藏标签栏
  hideTabs: boolean;
  // 隐藏标签栏操作按钮
  hideTabsConfig: boolean;
  // 标签持久化
  labelPersistent: boolean;
  // 侧边栏按钮
  sidebarFold: 'none' | 'top' | 'bottom';
}

export type MultiTabsType = Omit<
  _RouteLocationBase,
  'fullPath' | 'hash' | 'params' | 'query' | 'redirectedFrom'
> & {
  query?: LocationQuery;
  params?: RouteParams;
};
export interface PermissionState {
  wholeMenus: AppRouteRecordRaw[];
  cachePageList: RouteRecordName[];
  multiTabs: MultiTabsType[];
}
