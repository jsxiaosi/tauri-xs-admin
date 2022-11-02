<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, ref, toRef, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import SidebarItem from './SidebarItem.vue';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import type { AppRouteRecordRaw } from '#/route';
  import { getParentPaths, findRouteByPath } from '@/router/utils';
  import { useAppStoreHook } from '@/store/modules/app';

  defineProps({
    mode: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
  });

  const route = useRoute();
  const appStore = useAppStoreHook();
  const appConfigMode = toRef(appStore, 'appConfigMode');
  let subMenuData = ref<AppRouteRecordRaw[]>(usePermissionStoreHook().wholeMenus);

  const menuData = computed<AppRouteRecordRaw[]>(() => {
    return appConfigMode.value.sidebarMode === 'blend' && !appConfigMode.value.drawerSidebar
      ? subMenuData.value
      : usePermissionStoreHook().wholeMenus;
  });

  function getSubMenuData(path: string) {
    // path的父级路由组成的数组
    const parentPathArr = getParentPaths(path, usePermissionStoreHook().wholeMenus);
    // 当前路由的信息
    const parenetRoute = findRouteByPath(parentPathArr[0], usePermissionStoreHook().wholeMenus);
    if (parenetRoute) {
      if (parenetRoute.children && !parenetRoute.children[0].hidden)
        subMenuData.value = parenetRoute.children;
      else subMenuData.value = [parenetRoute];
    }
  }

  getSubMenuData(route.path);
  watch(
    () => [route.path, appConfigMode.value.sidebarMode],
    () => {
      if (appConfigMode.value.sidebarMode === 'blend') {
        getSubMenuData(route.path);
      }
    },
  );

  const activeMenyu = computed<string>(() => {
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu as string;
    }
    return path;
  });
</script>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenyu"
      :unique-opened="true"
      :collapse="appConfigMode.sidebarMode === 'horizontal' ? false : appConfigMode.collapseMenu"
      :mode="mode"
    >
      <SidebarItem
        v-for="menuRoute in menuData"
        :key="menuRoute.path"
        :item="menuRoute"
        :is-nest="false"
        :base-path="menuRoute.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped></style>
