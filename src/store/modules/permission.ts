import { _storage } from '@jsxiaosi/utils';
import { isEqual } from 'lodash-es';
import { defineStore } from 'pinia';
import type { RouteRecordName } from 'vue-router';
import type { AppRouteRecordRaw } from '@/router/type';
import { store } from '@/store';
import { useAppStoreHook } from './app';
import type { MultiTabsType, PermissionState } from '../types';

const getPermissionState = (): PermissionState => {
  return {
    // 路由菜单
    wholeMenus: [],
    // 缓存页面keepAlive
    cachePageList: [],
    // 标签页（路由记录）
    multiTabs: _storage.getStorage<MultiTabsType[]>('multiTabsList') || [],
  };
};

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => getPermissionState(),
  actions: {
    setWholeMenus(routeList: AppRouteRecordRaw[]) {
      this.wholeMenus = [...routeList];
    },
    cacheOperate({ mode = 'sync', name = '' }: { mode: 'add' | 'delete' | 'sync'; name?: RouteRecordName }) {
      let delIndex = -1;
      switch (mode) {
        case 'add':
          this.cachePageList.push(name);
          this.cachePageList = [...new Set(this.cachePageList)];
          break;
        case 'delete':
          delIndex = this.cachePageList.findIndex(v => v === name);
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
        case 'sync':
          // 延时加载：解决因为清除缓存导致回退到上一个页面时页面显示错位问题
          setTimeout(() => {
            this.cachePageList = this.cachePageList.filter(i => {
              return this.multiTabs.some(tabs => tabs.name === i);
            });
          }, 400);
          break;
      }
    },
    // 清空缓存页面
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    },
    // 持久化
    persistent() {
      const appConfig = useAppStoreHook();
      if (appConfig.appConfigMode.tabPersistent) _storage.setStorage('multiTabsList', this.multiTabs);
    },
    handleMultiTabs(type: 'add' | 'delete', value: MultiTabsType) {
      const route = value as MultiTabsType;
      const index = this.multiTabs.findIndex(
        i => i.path === route.path && isEqual(i.query, route.query) && isEqual(i.params, route.params),
      );

      switch (type) {
        case 'add':
          if (!value.meta?.title) return;
          if (index !== -1) {
            this.multiTabs[index] = route;
          } else {
            this.multiTabs.push(route);
          }
          break;
        case 'delete':
          if (index === -1) return;
          this.multiTabs.splice(index, 1);
          this.cacheOperate({ mode: 'sync' });
          break;
        default:
          break;
      }

      this.persistent();
    },

    MultiTabsDropReordering(value: MultiTabsType[]) {
      this.multiTabs = value;
      this.persistent();
    },
    handleRemoveMultiTabs() {
      _storage.removeStorage('multiTabsList');
      this.multiTabs = [];
      this.clearAllCachePage();
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
