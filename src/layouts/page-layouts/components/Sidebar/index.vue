<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import type { PropType } from 'vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import type { AppRouteRecordRaw } from '@/router/type';
  import { findRouteByPath, getParentPaths } from '@/router/utils';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import SidebarItem from './SidebarItem.vue';

  defineProps({
    mode: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
  });

  const permission = usePermissionStoreHook();

  const route = useRoute();
  const { appConfig } = useRootSetting();
  const subMenuData = ref<AppRouteRecordRaw[]>(permission.wholeMenus);

  const menuData = computed<AppRouteRecordRaw[]>(() => {
    return appConfig.value.sidebarMode === 'blend' && !appConfig.value.drawerSidebar
      ? subMenuData.value
      : permission.wholeMenus;
  });

  function getSubMenuData(path: string) {
    // path的父级路由组成的数组
    const parentPathArr = getParentPaths(path, permission.wholeMenus);
    // 当前路由的信息
    const parenetRoute = findRouteByPath(parentPathArr[0], permission.wholeMenus);
    if (parenetRoute) {
      if (parenetRoute.children && !parenetRoute.children[0].meta?.hideSidebar)
        subMenuData.value = parenetRoute.children;
      else subMenuData.value = [parenetRoute];
    }
  }

  getSubMenuData(route.path);
  watch(
    () => [route.path, appConfig.value.sidebarMode],
    () => {
      if (appConfig.value.sidebarMode === 'blend') {
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

  const collapse = computed(() =>
    appConfig.value.sidebarMode === 'horizontal' ? false : appConfig.value.collapseMenu,
  );
</script>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenyu"
      :unique-opened="true"
      :collapse="collapse"
      :mode="mode"
      :collapse-transition="true"
    >
      <SidebarItem
        v-for="menuRoute in menuData"
        :key="menuRoute.path"
        :item="menuRoute"
        :is-nest="false"
        :base-path="menuRoute.path"
        :collapse="collapse"
        :mode="mode"
      />
    </el-menu>
  </el-scrollbar>
</template>
