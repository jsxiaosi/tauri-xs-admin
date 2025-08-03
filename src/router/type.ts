import type { RouteMeta, RouteRecordRaw } from 'vue-router';
import type { RoleEnum } from '@/enum/role';
import type { localeKey } from '@/locales/types';

export type localeTitle = { [key in localeKey]: string };
export interface Meta extends RouteMeta {
  // 菜单标题
  title: string | localeTitle;
  // 设置菜单图标
  icon?: string;
  //排序位置 （子路由无效）
  position?: number;
  // 单个路由的时候是否开启折叠
  alwaysShow?: boolean;
  // 不显示侧边栏
  hideSidebar?: boolean;
  // 是否显示面包屑
  breadcrumb?: boolean;
  // 是否开启缓存
  keepAlive?: boolean;
  // 权限路由白名单（只有后端路由模式才生效）
  whiteRoute?: boolean;
  // 路由层级（扁平化路由时自动添加）
  pathList?: number[];
  // 角色权限
  roles?: RoleEnum[];
  // 外部页面地址
  externalUrl?: string;
  // 不显示标签
  hideTabs?: boolean;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  children?: AppRouteRecordRaw[];
  meta?: Meta;
  basePath?: string;
}
