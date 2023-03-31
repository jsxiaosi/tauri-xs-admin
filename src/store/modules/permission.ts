import { defineStore } from 'pinia';
import type { RouteRecordName } from 'vue-router';
import { isEqual } from 'lodash-es';
import { storage } from '@jsxiaosi/utils';
import type { MultiTabsType, PermissionState } from '../types';
import { useAppStoreHook } from './app';
import { store } from '@/store';
import type { AppRouteRecordRaw } from '#/route';

// console.log(getStorage('multiTabsList'));
const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    // 路由菜单
    wholeMenus: [],
    // 缓存页面keepAlive
    cachePageList: [],
    // 标签页（路由记录）
    multiTabs: storage.getStorage<MultiTabsType[]>('multiTabsList') || [],
  }),
  actions: {
    setWholeMenus(routeList: AppRouteRecordRaw[]) {
      this.wholeMenus = [...routeList];
    },
    cacheOperate({ mode, name = '' }: { mode: string; name: RouteRecordName }) {
      let delIndex = -1;
      switch (mode) {
        case 'add':
          this.cachePageList.push(name);
          this.cachePageList = [...new Set(this.cachePageList)];
          break;
        case 'delete':
          delIndex = this.cachePageList.findIndex((v) => v === name);
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
    },
    // 清空缓存页面
    clearAllCachePage() {
      this.cachePageList = [];
    },
    // 持久化
    persistent() {
      storage.setStorage('multiTabsList', this.multiTabs);
    },
    handleMultiTabs(type: 'add' | 'delete', value: MultiTabsType) {
      const route = value as MultiTabsType;
      const index = this.multiTabs.findIndex(
        (i) =>
          i.path === route.path && isEqual(i.query, route.query) && isEqual(i.params, route.params),
      );

      switch (type) {
        case 'add':
          if (index !== -1 || !value.meta.title) return;
          this.multiTabs.push(route);
          break;
        case 'delete':
          if (index === -1) return;
          this.multiTabs.splice(index, 1);
          break;
        default:
          break;
      }
      const appConfig = useAppStoreHook();
      if (appConfig.appConfigMode.labelPersistent) this.persistent();
    },
    handleRemoveMultiTabs() {
      storage.removeStorage('multiTabsList');
      this.multiTabs = [];
      this.clearAllCachePage();
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
