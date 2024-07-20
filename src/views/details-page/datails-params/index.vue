<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDatailsInfo } from '../hooks/useDatailsInfo';

  defineOptions({
    name: 'RtDetailsInfo',
  });

  const route = useRoute();
  const { params } = route;
  const { toDatailsInfo } = useDatailsInfo();

  onBeforeMount(() => {
    toDatailsInfo(`${params.id}`, 'params');
  });
</script>

<template>
  <div>
    <span>page-params --- {{ params.id }}</span>
  </div>
</template>
