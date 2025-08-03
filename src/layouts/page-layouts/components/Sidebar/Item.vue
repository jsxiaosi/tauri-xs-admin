<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { translateI18n } from '@/hooks/web/useI18n';
  import type { localeTitle } from '@/router/type';

  const props = withDefaults(
    defineProps<{
      icon?: string;
      title?: string | localeTitle;
      className?: string;
      collapse?: boolean;
      mode?: 'vertical' | 'horizontal';
    }>(),
    {
      icon: '',
      title: '',
      className: '',
      collapse: false,
      mode: 'vertical',
    },
  );

  const showTextTooltip = ref<Boolean | null>(null);
  const sidebarItemTextRef = useTemplateRef<HTMLDivElement>('sidebar-item-text-ref');

  const onTextMove = () => {
    if (showTextTooltip.value !== null || props.mode === 'horizontal') return;
    const sidebarItemTextDom = sidebarItemTextRef.value?.children?.[0];
    showTextTooltip.value = sidebarItemTextDom
      ? sidebarItemTextDom.scrollWidth > sidebarItemTextDom.clientWidth
      : false;
  };
</script>

<template>
  <SvgIcon v-if="props.icon" :class-name="props.className" :name="props.icon" />
  <div
    ref="sidebar-item-text-ref"
    class="menu-item-text"
    :class="[!props.icon && 'menu-item-text-only', props.mode === 'vertical' && 'sidebar-menu-item-text']"
    @mouseover="onTextMove"
  >
    <el-tooltip :content="translateI18n(props.title)" :disabled="!showTextTooltip || props.collapse" placement="top">
      <el-text truncated>
        {{ translateI18n(props.title) }}
      </el-text>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
  .sidebar-menu-item-text {
    flex: 1;
    width: 0;
  }

  .menu-item-text {
    color: currentcolor;

    .el-text {
      color: currentcolor;
    }
  }
</style>
