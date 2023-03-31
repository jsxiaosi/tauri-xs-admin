<script setup lang="ts">
  import { ref } from 'vue';
  import { storage } from '@jsxiaosi/utils';
  import { initAsyncRoute } from '@/router/utils';
  import type { UseInfoType } from '@/server/useInfo';
  const userInfo = storage.getStorage<UseInfoType>('userInfo');

  defineOptions({
    name: 'RtPower',
  });

  const power = ref<string>(userInfo ? userInfo.power : '');
  const powerChange = async () => {
    power.value = power.value === 'admin' ? 'test' : 'admin';
    initAsyncRoute(power.value);
  };
</script>

<template>
  <div class="page-container">
    <span>切换权限：</span>
    <el-button @click="powerChange"> {{ power }} </el-button>
  </div>
</template>

<style scoped lang="scss"></style>
