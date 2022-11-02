<script setup lang="ts">
  import { getCurrentInstance, toRef } from 'vue';
  import Sidebar from '../Sidebar/index.vue';
  import { useAppStoreHook } from '@/store/modules/app';

  const appStore = useAppStoreHook();
  const appConfigMode = toRef(appStore, 'appConfigMode');
  const config = getCurrentInstance()?.appContext.config.globalProperties.$config;
</script>

<template>
  <div
    v-if="appConfigMode.sidebarMode !== 'horizontal' || appConfigMode.drawerSidebar"
    class="sidebar-container"
    :class="{ hideSidebar: appConfigMode.collapseMenu }"
  >
    <div class="app-logo" :class="{ 'app-logo-hide': appConfigMode.collapseMenu }">
      <div class="logo">
        <img class="logo_img" src="@/assets/logo.png" mode="scaleToFill" />
      </div>

      <span class="name">{{ config.title }}</span>
    </div>
    <Sidebar mode="vertical" />
  </div>
</template>

<style lang="scss" scoped>
  .app-logo {
    .logo_img {
      width: 38px;
      height: 38px;
    }
    .name {
      transition: all 0.5s;
    }
  }
  .app-logo-hide {
    width: $sideHideBarWidth;
    .name {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
</style>
