<script lang="ts" setup>
  import { marked } from 'marked';
  import { computed, ref } from 'vue';

  const inputText = ref<string>('# Marked in Node.js\n\nRendered by **marked**.');

  const html = computed<string>(() => {
    return marked.parse(inputText.value) as string;
  });
</script>

<template>
  <div class="page-container">
    <el-input v-model="inputText" class="input" type="textarea" />
    <div class="marked" :innerHTML="html" />
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
