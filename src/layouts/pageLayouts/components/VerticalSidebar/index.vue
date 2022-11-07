<script setup lang="ts">
  import Sidebar from '../Sidebar/index.vue';
  import AppLogo from '../AppLogo/index.vue';
  import AppFold from '../AppFold/index.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  const { appConfig } = useRootSetting();
</script>

<template>
  <div
    v-show="
      !appConfig.hideSidebar && (appConfig.sidebarMode !== 'horizontal' || appConfig.drawerSidebar)
    "
    class="sidebar-container"
    :class="{ hideSidebar: appConfig.collapseMenu }"
  >
    <AppLogo />
    <Sidebar mode="vertical" />
    <div
      v-if="
        (appConfig.sidebarFold === 'bottom' || appConfig.sidebarMode === 'blend') &&
        appConfig.sidebarFold !== 'none'
      "
      class="sidebar-fold"
    >
      <AppFold />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .sidebar-container {
    .sidebar-fold {
      border-top: 1px solid var(--border-color-light);
      padding: 10px;
      display: flex;
      justify-content: center;
      font-size: var(--font-size-extra-large);
    }
  }
</style>
