<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus';
  import { deffElementLocale } from '@/hooks/web/useI18n';

  const { tolocale } = deffElementLocale();
</script>

<template>
  <ElConfigProvider :locale="tolocale">
    <router-view />
  </ElConfigProvider>
</template>
