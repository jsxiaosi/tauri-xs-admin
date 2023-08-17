<script setup lang="ts">
  import { computed } from 'vue';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  const getInclude = computed<string[]>(() => {
    return usePermissionStoreHook().cachePageList as string[];
  });
</script>

<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="getInclude">
            <component :is="Component" :key="route.fullPath"></component>
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<style lang="scss">
  .app-main {
    position: relative;
    width: 100%;
    // height: calc(100vh - #{$navBarHeight+$tabsPageHeight});
    // min-height: calc(100vh - #{$navBarHeight+$tabsPageHeight});
    flex: 1;
    overflow: auto;
    padding: 20px;
    background-color: #{$app-main-bg-color};
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }
</style>
