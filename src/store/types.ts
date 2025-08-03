import type { StorageConfig } from '@jsxiaosi/utils/es/window/storage/types';
import type { _RouteLocationBase, LocationQuery, RouteParams, RouteRecordName } from 'vue-router';
import type { PermissionMode } from '@/enum/role';
import type { localeKey } from '@/locales/types';
import type { AppRouteRecordRaw, Meta } from '@/router/type';

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
  locale: localeKey;
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
  // 关闭标签页拖拽
  closeTabDrag: boolean;
  // 隐藏标签栏操作按钮
  hideTabsConfig: boolean;
  // 标签持久化
  tabPersistent: boolean;
  // 侧边栏按钮
  sidebarFold: 'none' | 'top' | 'bottom';
  // 路由模式 REAREND后端路由、ROLE角色权限控制路由
  permissionMode: keyof typeof PermissionMode;
}

export type MultiTabsType = Omit<
  _RouteLocationBase,
  'fullPath' | 'hash' | 'params' | 'query' | 'redirectedFrom' | 'meta'
> & {
  query?: LocationQuery;
  params?: RouteParams;
  meta?: Meta;
};
export interface PermissionState {
  wholeMenus: AppRouteRecordRaw[];
  cachePageList: RouteRecordName[];
  multiTabs: MultiTabsType[];
}
