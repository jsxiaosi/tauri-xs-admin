<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import type { AppRouteRecordRaw } from '@/router/type';
  import { findRouteByPath, getParentPaths } from '@/router/utils';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import Item from './Item.vue';
  import AppLink from './Link.vue';

  const route = useRoute();

  const resolvePath = (routeRaw: AppRouteRecordRaw): string => {
    let path = routeRaw.path;
    if (routeRaw.children && routeRaw.children.length && !routeRaw.children[0].meta?.hideSidebar) {
      path = routeRaw.children[0].path;
    }
    return path;
  };

  const activeMenyu = computed<string>(() => {
    const { path } = route;
    const wholeMenus = usePermissionStoreHook().wholeMenus;
    // 当前路由的父级路径
    const parentRoutes = getParentPaths(path, wholeMenus)[0];
    const routeByPath = findRouteByPath(parentRoutes, wholeMenus);
    if (routeByPath?.children && routeByPath.children.length && !routeByPath.children[0].meta?.hideSidebar) {
      return routeByPath.children[0].path;
    }
    return path;
  });
</script>

<template>
  <el-menu ref="menu" :default-active="activeMenyu" class="horizontal-header-menu" mode="horizontal">
    <AppLink
      v-for="menusRoute in usePermissionStoreHook().wholeMenus"
      :key="menusRoute.path"
      :to="resolvePath(menusRoute)"
    >
      <el-menu-item :index="resolvePath(menusRoute)">
        <Item
          class-name="menu-item-svg"
          :icon="menusRoute.meta && menusRoute.meta.icon"
          :title="menusRoute.meta?.title"
          mode="horizontal"
        />
      </el-menu-item>
    </AppLink>
  </el-menu>
</template>
