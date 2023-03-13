<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  const { appConfig } = useRootSetting();
  const config = getCurrentInstance()?.appContext.config.globalProperties.$config;
</script>

<template>
  <div
    class="app-logo"
    :class="{ 'app-logo-hide': appConfig.collapseMenu && appConfig.sidebarMode !== 'horizontal' }"
  >
    <div class="logo">
      <img class="logo_img" src="@/assets/logo.png" mode="scaleToFill" />
    </div>

    <span class="name">{{ config.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .app-logo {
    width: $sideBarWidth;
    height: #{$navBarHeight};
    font-size: 38px;
    display: flex;
    align-items: center;
    // justify-content: center;
    .logo {
      width: $sideHideBarWidth;
      display: flex;
      align-items: center;
      justify-content: center;

      .logo_img {
        width: 38px;
        height: 38px;
      }
    }

    .name {
      width: 100%;
      flex: 1;
      font-size: 22px;
      font-weight: 500;
      transition: all 0.5s;
      overflow: hidden;
    }
  }

  .app-logo-hide {
    // width: $sideBarWidth;
    .name {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
</style>
