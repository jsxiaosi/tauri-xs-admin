<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePermissionStoreHook } from '@/store/modules/permission';

  defineOptions({
    name: 'RtDetailsInfo',
  });

  const route = useRoute();
  const { path, params } = route;

  const router = useRouter();

  const toPath = (item: string) => {
    const params = { id: `${item}` };
    usePermissionStoreHook().handleMultiTabs('add', {
      path,
      name: `RtDetailsParams`,
      params,
      meta: {
        title: { 'zh-ch': `详情页-params-${item}`, en: `pageDatails-${item}` },
      },
    });
    router.push({ name: 'RtDetailsParams', params });
  };
  onBeforeMount(() => {
    toPath(params.id as string);
  });
</script>

<template>
  <div>
    <span>page-params --- {{ params.id }}</span>
  </div>
</template>

<style lang="scss"></style>
