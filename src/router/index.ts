import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import { configRouteList } from './modules';
import { handleAliveRoute, initAsyncRoute } from './utils';
import { usePermissionStoreHook } from '@/store/modules/permission';
import NProgress from '@/utils/plugin/progress';
import { getConfig } from '@/config';
import { translateI18n } from '@/hooks/web/useI18n';
import { isUrl } from '@/utils/is';
import { getStorage, removeStorage } from '@/utils/storage';
import type { UseInfoType } from '@/server/useInfo';

const { whiteRouteModulesList, routeModulesList } = configRouteList();

// 在导航栏上的路由
export const sidebarRouteList = routeModulesList;

console.log(JSON.parse(JSON.stringify(whiteRouteModulesList)));
export const router = createRouter({
  history: createWebHistory(''),
  routes: whiteRouteModulesList as unknown as RouteRecordRaw[],
});

export const configMainRouter = async (app: App<Element>) => {
  app.use(router);
  await router.isReady();
};

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta?.keepAlive) {
    const newMatched = to.matched;
    handleAliveRoute(newMatched, 'add');
    // 页面整体刷新
    if (from.name === undefined || from.name === 'Redirect') {
      handleAliveRoute(newMatched);
    }
  }

  if (!isUrl(to.path) && to.meta.title) {
    const Title = getConfig().title;
    if (Title) document.title = `${translateI18n(to.meta.title)} | ${Title}`;
    else document.title = translateI18n(to.meta.title);
  }

  const userInfo = getStorage<UseInfoType>('userInfo');
  if (userInfo) {
    // 已登陆状态不允许去登录页
    if (to.path === '/login') {
      next({
        path: from.path,
        query: from.query,
      });
    }

    if (from.name) {
      next();
    } else {
      if (usePermissionStoreHook().wholeMenus.length === 0) {
        initAsyncRoute(userInfo.power || '').then((res) => {
          if (res.length) {
            router.push({
              path: to.path,
              query: to.query,
            });
          } else {
            removeStorage('userInfo');
            router.push('login');
          }
        });
      } else {
        next();
      }
    }
  } else {
    if (to.path !== '/login') {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
