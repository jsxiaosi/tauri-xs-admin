<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  const { appConfig } = useRootSetting();
  const config = getCurrentInstance()?.appContext.config.globalProperties.$config;
</script>

<template>
  <div
    class="app-logo"
    :class="{
      'app-logo-hide': appConfig.collapseMenu && appConfig.sidebarMode !== 'horizontal',
    }"
  >
    <div class="logo">
      <img class="logo-img" src="@/assets/logo.png" mode="scaleToFill" alt="logo" />
    </div>

    <span class="name">{{ config.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .app-logo {
    display: flex;
    align-items: center;
    width: $side-bar-width;
    height: #{$nav-bar-height};
    font-size: 38px;
    // justify-content: center;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $side-hide-bar-width;

      .logo-img {
        width: 38px;
        height: 38px;
      }
    }

    .name {
      flex: 1;
      width: 100%;
      overflow: hidden;
      transition: all 0.5s;
      font-size: 22px;
      font-weight: 500;
    }
  }

  .app-logo-hide {
    // width: $side-bar-width;
    .name {
      transform: translateX(-20px);
      opacity: 0;
    }
  }
</style>
