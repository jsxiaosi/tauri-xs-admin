import type { AppRouteRecordRaw } from '@/router/type';
import { pathNamekeyCheck, setUpRoutePath } from '../utils';

export function configRouteList() {
  // 白名单目录/文件，白名单目录 = 不渲染到菜单，不显示标签页
  const whiteCatalogue = ['root', 'whiteList'];

  let routeModulesList: AppRouteRecordRaw[] = []; //菜单路由
  const whiteRouteModulesList: AppRouteRecordRaw[] = []; // 不参与菜单处理的路由

  // 自动查找路由配置文件
  const modules: Recordable = import.meta.glob('./**/*.ts', { eager: true });
  Object.keys(modules).forEach(key => {
    const mod = modules[key].default;
    if (!mod) return;
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    if (pathNamekeyCheck(key, whiteCatalogue)) {
      whiteRouteModulesList.push(...modList);
    } else {
      routeModulesList.push(...modList);
    }
  });

  // 菜单路由 根据父级重新处理子路由的path路径
  routeModulesList = setUpRoutePath(routeModulesList);

  /**
   * 先把菜单路由插入根路径 '/' 防止route 初始化警告查找不到路由
   */
  const whIndex = whiteRouteModulesList.findIndex(i => i.path === '/');
  if (whiteRouteModulesList[whIndex]) whiteRouteModulesList[whIndex].children = routeModulesList;
  return { whiteRouteModulesList, routeModulesList };
}
