<script setup lang="ts">
  import ToModal from './component/ToModal.vue';
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <ToModal></ToModal>
      </template>
      <template #fallback>
        <el-card
          v-loading="true"
          element-loading-text="异步组件加载中。。。。。"
          class="loading"
        ></el-card>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss">
  .loading {
    width: 100%;
    height: 200px;
  }
</style>
