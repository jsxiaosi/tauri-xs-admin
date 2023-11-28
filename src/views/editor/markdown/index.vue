<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { marked } from 'marked';

  const inputText = ref<string>('# Marked in Node.js\n\nRendered by **marked**.');

  const html = computed(() => marked.parse(inputText.value));
</script>

<template>
  <div class="page-container">
    <el-input v-model="inputText" class="input" type="textarea"></el-input>
    <div class="marked" :innerHTML="html"></div>
  </div>
</template>

<style lang="scss" scoped>
  .page-container {
    display: flex;
    justify-content: space-between;
    height: 100%;

    .input {
      width: 49%;
      height: 100%;

      :deep(.el-textarea__inner) {
        height: 100% !important;
      }
    }

    .marked {
      width: 49%;
      height: 100%;
      padding: 0 20px;
      border: 1px solid var(--text-color-placeholder);
    }
  }
</style>
