<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import type { AppRouteRecordRaw } from '@/router/type';

  const route = useRoute();

  const iframeUrl = computed(() => (route.meta as AppRouteRecordRaw['meta'])?.externalUrl);

  const loading = ref<boolean>(true);

  const hideLoading = () => {
    loading.value = !loading.value;
  };
</script>

<template>
  <div v-loading="loading" class="embedded-page">
    <iframe class="iframe" :src="iframeUrl" @load="hideLoading" />
  </div>
</template>

<style lang="scss" scoped>
  .embedded-page {
    width: 100%;
    height: 100%;
    border: 1px solid var(--border-color-light);

    .iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
</style>
