import type { LocationQuery, RouteParams, RouteRecordName, _RouteLocationBase } from 'vue-router';
import type { AppRouteRecordRaw } from '#/route';
import type { StorageConfig } from '@/utils/storage/types';

export interface AppState {
  appConfigMode: AppConfig;
}

export type SidebarMode = 'vertical' | 'horizontal' | 'blend';

export interface AppConfig {
  title: string;
  collapseMenu: boolean;
  sidebarMode: SidebarMode;
  themeMode: string;
  locale: string;
  StorageConfig: StorageConfig;
  drawerSidebar?: boolean;
  primaryColor: string;
  greyMode: boolean;
  colorWeaknessMode: boolean;
  hideTabs: boolean;
  labelPersistent: boolean;
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
