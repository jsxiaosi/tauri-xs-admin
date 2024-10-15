<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDatailsInfo } from '../hooks/useDatailsInfo';

  defineOptions({
    name: 'RtDetailsInfo',
  });

  const route = useRoute();
  const { query } = route;

  const value = ref('');

  const { toDatailsInfo } = useDatailsInfo();

  onBeforeMount(() => {
    toDatailsInfo(`${query.id}`, 'query');
  });
</script>

<template>
  <div>
    <span>page --- {{ query.id }}</span>
    <el-input v-model="value" />
  </div>
</template>
