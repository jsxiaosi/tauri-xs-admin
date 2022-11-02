import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import type { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface Menu extends RouteMeta {
  title: string;
  icon?: string;
  breadcrumb?: boolean;
  keepAlive?: boolean;
  whiteList?: boolean;
  pathList?: number[];
  position?: number; //排序位置
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string;
  name?: string; // 命名路由
  component?: Component;
  components?: { [name: string]: Component }; // 命名视图组件
  alias?: string | Array<string>;
  alwaysShow?: boolean; //单个路由的时候是否开启折叠
  hidden?: boolean;
  children?: AppRouteRecordRaw[];
  meta?: Menu;
  basePath?: string; // 父级路由
}
