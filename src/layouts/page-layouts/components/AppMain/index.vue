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
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<style lang="scss">
  .app-main {
    position: relative;
    // height: calc(100vh - #{$nav-bar-height+$tabs-page-height});
    // min-height: calc(100vh - #{$nav-bar-height+$tabs-page-height});
    flex: 1;
    width: 100%;
    padding: 20px;
    overflow: auto;
    background-color: #{$app-main-bg-color};
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }
</style>
