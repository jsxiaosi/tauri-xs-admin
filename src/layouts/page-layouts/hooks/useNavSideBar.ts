import { useRouter } from 'vue-router';
import { useThrottleFn } from '@vueuse/core';
import { isUrl } from '@jsxiaosi/utils';
import type { AppRouteRecordRaw } from '@/router/type';
import { findRouteByPath } from '@/router/utils';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { emitter } from '@/utils/mitt';

export const useNavSideBar = () => {
  const router = (useRouter().options.routes.find((i) => i.path === '/') ||
    []) as AppRouteRecordRaw;

  const selectMenu = useThrottleFn((path: string) => {
    const findRoute = findRouteByPath(path, router.children || []);
    if (findRoute) {
      if (findRoute.redirect && findRoute.children && findRoute.children.length) {
        selectMenu(findRoute.children[0].path);
        return;
      }

      if (isUrl(findRoute.path)) return;
      emitter.emit('siteBarChange', {
        routeRaw: findRoute,
      });
    }
  }, 100);

  const logout = () => {
    usePermissionStoreHook().handleRemoveMultiTabs();
  };

  return { selectMenu, logout };
};
