import { isUrl } from '@jsxiaosi/utils';
import { useTimeoutFn } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';
import type { RouteRecordName, RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { PermissionMode, type RoleEnum } from '@/enum/role';
import { getRouteApi } from '@/server/route';
import type { RouteDataItemType } from '@/server/route';
import { useAppStoreHook } from '@/store/modules/app';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { router, sidebarRouteList } from './index';
import type { AppRouteRecordRaw, Meta } from './type';

// 获取路由列表
async function getRouteList(permission: RoleEnum) {
  const appStore = useAppStoreHook();
  if (appStore.appConfigMode.permissionMode === PermissionMode.REAREND) {
    // 后端路由控制
    return await getAsyncRoute(permission);
  } else {
    // 角色路由控制
    return await getStaticRoute(permission);
  }
}

// 初始化权限路由
export async function initRoute(permission: RoleEnum | null) {
  const { clearAllCachePage, setWholeMenus } = usePermissionStoreHook();
  resetRouter();
  clearAllCachePage();
  let routeList: AppRouteRecordRaw[] = [];
  if (permission) {
    routeList = await getRouteList(permission);
    // 更新路由列表前通过formatFlatteningRoutes打平树结构
    privilegeRouting(
      router.options.routes as RouteRecordRaw[],
      formatFlatteningRoutes(routeList) as AppRouteRecordRaw[],
    );
    setWholeMenus(routeList);
  }

  return routeList;
}

// 获取后端路由
async function getAsyncRoute(permission: RoleEnum) {
  const res = await getRouteApi({ name: permission });
  if (res.data.length) {
    // 根据接口返回的路由列表生成新的路由（此时的路由是带有层级关系）
    return handleRouteList(sortRouteList(sidebarRouteList), res.data);
  } else {
    console.error('No requested route');
    return [];
  }
}

// 异步获取静态路由，防止切换权限时因列表缓存导致菜单无法正常刷新
async function getStaticRoute(permission: RoleEnum) {
  return filterNoPermissionRouteList(sortRouteList(cloneDeep(sidebarRouteList)), permission);
}

// 通过角色过滤无权限路由
function filterNoPermissionRouteList(routerList: AppRouteRecordRaw[], roleName: RoleEnum): AppRouteRecordRaw[] {
  const newRouteList = [...routerList];
  let newRoute = newRouteList.filter(i => !i.meta?.roles || i.meta?.roles?.includes(roleName));
  newRoute = newRoute.map(i => {
    if (i.children && i.children.length) {
      i.children = filterNoPermissionRouteList(i.children, roleName);
    }
    return i;
  });

  return newRoute || [];
}

// 通过后端返回路由列表过滤无权限路由
function handleRouteList(routerList: AppRouteRecordRaw[], dataRouter: RouteDataItemType[]) {
  const newRouteList: AppRouteRecordRaw[] = [];
  routerList.forEach(i => {
    if (!i.meta?.whiteRoute) {
      const rItem = dataRouter.find(r => r.name === i.name);
      if (rItem) {
        if (i.children && i.children.length) {
          const children = handleRouteList(i.children, rItem.children);
          if (children) newRouteList.push({ ...i, children });
        } else {
          newRouteList.push(i);
        }
      }
    } else {
      newRouteList.push(i);
    }
  });
  return newRouteList;
}

// 更新route的路由列表
function privilegeRouting(routeList: RouteRecordRaw[], dataRouter: AppRouteRecordRaw[]) {
  const homeIndex = routeList.findIndex(i => i.path === '/');
  if (homeIndex !== -1) {
    routeList[homeIndex].redirect = dataRouter[0].path;
    routeList[homeIndex].children = [];
    dataRouter.forEach(i => {
      routeList[homeIndex].children?.push(i as RouteRecordRaw);
    });
    router.addRoute(routeList[homeIndex]);
  }
}

// 拼接路径 path
function pathResolve(...paths: string[]) {
  let resolvePath = '';
  let isAbsolutePath = false;
  for (let i = paths.length - 1; i > -1; i--) {
    const path = paths[i];
    if (isAbsolutePath) {
      break;
    }
    if (!path) {
      continue;
    }
    resolvePath = `${path}/${resolvePath}`;
    isAbsolutePath = path.charCodeAt(0) === 47;
  }
  if (/^\/+$/.test(resolvePath)) {
    resolvePath = resolvePath.replace(/(\/+)/, '/');
  } else {
    resolvePath = resolvePath
      .replace(/(?!^)\w+\/+\.{2}\//g, '')
      .replace(/(?!^)\.\//g, '')
      .replace(/\/+$/, '');
  }
  return resolvePath;
}

// 按照路由中meta下的rank等级升序来排序路由
function sortRouteList(arr: any[]) {
  arr.forEach(v => {
    if (v?.meta?.rank === null) v.meta.rank = undefined;
    if (v.children) {
      v.children = sortRouteList(v.children);
    }
  });
  return arr.sort((a: { meta: { position: number } }, b: { meta: { position: number } }) => {
    return a?.meta?.position - b?.meta?.position;
  });
}

// 匹配不被清除的文件夹和文件
export function pathNamekeyCheck(key: string, whiteCatalogue: string[]) {
  const pathName = key.split('/')[1];
  const index = whiteCatalogue.findIndex((i: string) => {
    if (pathName.indexOf(i) !== -1) {
      if (pathName === i) return true;
      else if (/^[\s\S]*\.(ts|tsx|js|jsx)$/.test(pathName)) {
        return true;
      }
      return false;
    }
    return false;
  });
  return index !== -1;
}

// 扁平路由
export function formatFlatteningRoutes(routesList: AppRouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = routesList;
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList.slice(0, i + 1).concat(hierarchyList[i].children || [], hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

// 设置路由path,并创建路由层级
export function setUpRoutePath(routeList: AppRouteRecordRaw[], pathName = '', pathList: number[] = []) {
  for (const [key, node] of routeList.entries()) {
    node.meta = { ...(node.meta as Meta), pathList: [...pathList, key] };
    if (pathName && !isUrl(node.path)) {
      node.path = pathResolve(pathName, node.path || '');
    }
    if (node.children && node.children.length) {
      setUpRoutePath(node.children, node.path, node.meta?.pathList);
    }
  }
  return routeList;
}

// 处理缓存路由（添加、删除、刷新）
export function handleAliveRoute(matched: RouteRecordNormalized[], mode?: string) {
  const { cacheOperate } = usePermissionStoreHook();
  const name: RouteRecordName = matched[matched.length - 1].name as RouteRecordName;
  switch (mode) {
    case 'add':
      matched.forEach((v: RouteRecordNormalized) => {
        cacheOperate({ mode: 'add', name: v.name as RouteRecordName });
      });
      break;
    case 'delete':
      cacheOperate({
        mode: 'delete',
        name,
      });
      break;
    default:
      cacheOperate({
        mode: 'delete',
        name,
      });
      useTimeoutFn(() => {
        matched.forEach((v: RouteRecordNormalized) => {
          cacheOperate({ mode: 'add', name: v.name as RouteRecordName });
        });
      }, 100);
  }
}

// 通过path获取父级路径
export function getParentPaths(routePath: string, routes: AppRouteRecordRaw[]) {
  // 深度遍历查找
  function dfs(routes: AppRouteRecordRaw[], path: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // 找到path则返回父级path
      if (item.path === path) return [item.path];
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue;
      // 往下查找时将当前path入栈
      parents.push(item.path);

      if (dfs(item.children, path, parents).length) return parents;
      // 深度遍历查找未找到时当前path 出栈
      parents.pop();
    }
    // 未找到时返回空数组
    return [];
  }
  return dfs(routes, routePath, []);
}

// 查找对应path的路由信息
export function findRouteByPath(path: string, routes: AppRouteRecordRaw[]): AppRouteRecordRaw | null {
  const res = routes.find((item: { path: string }) => item.path === path) || null;
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children instanceof Array && routes[i].children?.length) {
        const miRes = findRouteByPath(path, routes[i].children as AppRouteRecordRaw[]);
        if (miRes) {
          return miRes;
        } else {
          if (routes[i].path === path) return routes[i];
        }
      }
    }
    return null;
  }
}

// 重置路由 不重置白名单
export function resetRouter() {
  sidebarRouteList.forEach(route => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
