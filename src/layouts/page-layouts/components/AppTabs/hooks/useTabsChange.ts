import { addClass, removeClass } from '@jsxiaosi/utils';
import qs from 'qs';
import { unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Ref } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { usePermissionStoreHook } from '@/store/modules/permission';
import type { MultiTabsType } from '@/store/types';

export const useTabsChange = (multiTabs: Ref<MultiTabsType[]>) => {
  const route = useRoute();
  const router = useRouter();

  const setTabPaneKey = (item: MultiTabsType | RouteLocationNormalizedLoaded): string => {
    return `${item.path}${item.query && Object.keys(item.query).length ? `?${qs.stringify(item.query)}` : ''}`;
  };

  // 添加标签
  const addRouteTabs = (routeRaw: MultiTabsType) => {
    const { path, name, meta } = routeRaw;
    if (!meta?.hideTabs && !meta?.hideSidebar) {
      const currentRoute = { path, meta, name };
      usePermissionStoreHook().handleMultiTabs('add', currentRoute);
    }
  };

  // 关闭标签
  const closeTabsRoute = (e: MultiTabsType, type: 'other' | 'left' | 'right') => {
    const item = multiTabs.value.findIndex(i => setTabPaneKey(i) === setTabPaneKey(e));
    const mapList = multiTabs.value.filter((i, index) => {
      if (i.path !== e.path && type === 'other') return true;
      else if (index < item && type === 'left') return true;
      else if (index > item && type === 'right') return true;
      return false;
    });
    if (mapList.find(i => i.path === route.path)) {
      const { path, query } = multiTabs.value[item];
      router.push({
        path,
        query,
      });
    }
    mapList.forEach(i => usePermissionStoreHook().handleMultiTabs('delete', i));
  };

  // 关闭当前导航
  const removeTab = (e: MultiTabsType) => {
    const item = multiTabs.value.findIndex(i => setTabPaneKey(i) === setTabPaneKey(e));
    const tabsLength = multiTabs.value.length;
    let value, toRoute;
    if (multiTabs.value[item].name === route.name) {
      if (item === tabsLength - 1) {
        value = multiTabs.value[item - 1];
      } else {
        value = multiTabs.value[tabsLength - 1];
      }
      toRoute = {
        path: value.path,
        query: value.query,
      };
      router.push(toRoute);
    }

    usePermissionStoreHook().handleMultiTabs('delete', multiTabs.value[item]);
  };

  // 重新加载
  function onFresh(item?: MultiTabsType) {
    const refreshButton = 'refresh-button';
    addClass(document.querySelector('.rotate') as HTMLElement, refreshButton);
    const { path, query } = unref(item || route);
    router.replace({
      path: `/redirect${path}`,
      query,
    });
    setTimeout(() => {
      removeClass(document.querySelector('.rotate') as HTMLElement, refreshButton);
    }, 600);
  }

  return { setTabPaneKey, addRouteTabs, onFresh, closeTabsRoute, removeTab };
};
