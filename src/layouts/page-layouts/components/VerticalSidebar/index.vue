<script setup lang="ts">
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import AppFold from '../AppFold/index.vue';
  import AppLogo from '../AppLogo/index.vue';
  import Sidebar from '../Sidebar/index.vue';
  const { appConfig } = useRootSetting();
</script>

<template>
  <div
    v-show="(!appConfig.hideSidebar && appConfig.sidebarMode !== 'horizontal') || appConfig.drawerSidebar"
    class="sidebar-container"
    :class="{ 'hide-sidebar': appConfig.collapseMenu }"
  >
    <AppLogo />
    <Sidebar mode="vertical" />
    <div
      v-if="
        (appConfig.sidebarFold === 'bottom' || appConfig.sidebarMode === 'blend') && appConfig.sidebarFold !== 'none'
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
      display: flex;
      justify-content: center;
      padding: 10px;
      border-top: 1px solid var(--border-color-light);
      font-size: var(--font-size-extra-large);
    }
  }
</style>
