<script setup lang="ts">
  import { useDatailsInfo } from './hooks/useDatailsInfo';
  // import { usePermissionStoreHook } from '@/store/modules/permission';

  const { toDatailsInfo } = useDatailsInfo();

  const toPath = (item: number, type = 'query') => {
    toDatailsInfo(`${item}`, type);
  };
</script>

<template>
  <div class="page-container">
    <div>
      <el-button v-for="item in 6" :key="item" @click="toPath(item)"> 详情页{{ item }} </el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button v-for="item in 6" :key="item" @click="toPath(item, 'params')"> 详情页-params-{{ item }} </el-button>
    </div>
  </div>
</template>
