<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePermissionStoreHook } from '@/store/modules/permission';

  defineOptions({
    name: 'RtDetailsInfo',
  });

  const route = useRoute();
  const { query } = route;

  const router = useRouter();

  const value = ref('');

  const toPath = (item: string) => {
    const query = { id: `${item}` };
    usePermissionStoreHook().handleMultiTabs('add', {
      path: `/details_page/details_info`,
      name: `RtDetailsInfo`,
      query,
      meta: {
        title: { 'zh-ch': `详情页-${item}`, en: `pageDatails-${item}` },
      },
    });
    router.push({ name: 'RtDetailsInfo', query });
  };
  onBeforeMount(() => {
    toPath(query.id as string);
  });
</script>

<template>
  <div>
    <span>page --- {{ query.id }}</span>
    <el-input v-model="value"></el-input>
  </div>
</template>

<style lang="scss"></style>
