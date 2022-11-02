<script setup lang="ts">
  import { useRouter } from 'vue-router';
  // import { usePermissionStoreHook } from '@/store/modules/permission';

  const router = useRouter();

  const toPath = (item: number, type = 'query') => {
    if (type === 'params') {
      const params = { id: `${item}` };
      router.push({ name: 'RtDetailsParams', params });
    } else {
      const query = { id: `${item}` };
      router.push({ name: 'RtDetailsInfo', query });
    }
  };
</script>

<template>
  <div class="page-container">
    <div>
      <el-button v-for="item in 6" :key="item" @click="toPath(item)">详情页{{ item }}</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button v-for="item in 6" :key="item" @click="toPath(item, 'params')">
        详情页-params-{{ item }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss"></style>
