<script setup lang="ts">
  // import { ref } from 'vue'
  import { getCurrentInstance, ref, toRef } from 'vue';
  import Sidebar from '../../components/Sidebar/index.vue';
  import MinSidebar from '../../components/Sidebar/MinSidebar.vue';
  import Setting from '../../components/Seting/index.vue';
  import Breadcrumb from '../../components/Breadcrumb/index.vue';

  import { AppLocale, AppTheme, AppAccount } from '@/components/Application';

  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useAppStoreHook } from '@/store/modules/app';

  const drawer = ref(false);

  const config = getCurrentInstance()?.appContext.config.globalProperties.$config;

  const appStore = useAppStoreHook();
  const appConfigMode = toRef(appStore, 'appConfigMode');
</script>

<template>
  <div class="navbar">
    <div class="navbar-left">
      <Breadcrumb
        v-if="appConfigMode.sidebarMode !== 'horizontal' || appConfigMode.drawerSidebar"
      />
      <div v-else class="app-logo">
        <!-- <SvgIcon name="Vue"></SvgIcon> -->
        <img class="logo_img" src="@/assets/logo.png" mode="scaleToFill" />
        <span class="name">{{ config.title }}</span>
      </div>
    </div>
    <div class="navbar-center">
      <template v-if="!appConfigMode.drawerSidebar">
        <Sidebar
          v-if="appConfigMode.sidebarMode === 'horizontal'"
          class="sidebar-horizontal"
          mode="horizontal"
        />
        <MinSidebar
          v-if="appConfigMode.sidebarMode === 'blend'"
          class="sidebar-horizontal"
          mode="horizontal"
        />
      </template>
    </div>
    <div class="navbar-right">
      <AppTheme></AppTheme>
      <AppLocale class="icon"></AppLocale>
      <AppAccount></AppAccount>
      <SvgIcon class="icon cursor" name="iEL-setting" @click="drawer = true"></SvgIcon>
    </div>

    <Setting v-model:modelValue="drawer"></Setting>
  </div>
</template>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    // margin-left: #{$sideBarWidth};
    height: #{$navBarHeight};
    padding: 0 20px;
    background-color: $navBarColor;
    border-bottom: 1px solid var(--border-color-light);
    box-shadow: 1px 0 20px rgb(0 0 0 / 8%);

    // .navbar-left {
    // }

    .logo_img {
      width: 38px;
      height: 38px;
    }

    .navbar-center {
      height: 100%;
      min-width: 0;
      flex: 1;
    }

    .navbar-right {
      display: flex;
      // flex: 1;
      align-items: center;

      .icon {
        margin-left: 12px;
        font-size: var(--font-size-extra-large);
      }
    }
  }
</style>
