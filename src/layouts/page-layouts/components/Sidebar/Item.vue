<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import type { localeTitle } from '@/router/type';
  import { translateI18n } from '@/hooks/web/useI18n';

  const props = withDefaults(
    defineProps<{
      icon?: string;
      title?: string | localeTitle;
      className?: string;
    }>(),
    {
      icon: 'hello',
      title: '',
      className: '',
    },
  );
</script>

<template>
  <SvgIcon :class-name="props.className" :name="props.icon" />
  <span v-if="props.title">{{ translateI18n(props.title) }}</span>
</template>

<style lang="scss" scoped>
  .sub-el-icon {
    /* color: currentColor; */
    width: 1em;
    height: 1em;
  }
</style>
