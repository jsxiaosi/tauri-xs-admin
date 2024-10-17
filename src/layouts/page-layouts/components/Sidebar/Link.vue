<script setup lang="ts">
  import { isUrl } from '@jsxiaosi/utils';
  import { computed } from 'vue';

  const props = defineProps({
    to: {
      type: String,
      required: true,
    },
  });

  const isExternal = computed(() => isUrl(props.to));

  // 判断是否是外部链接，如果是外部链接，使用标签
  const type = computed(() => {
    if (isExternal.value) {
      return 'a';
    }
    return 'router-link';
  });

  const linkProps = (to: string) => {
    if (isExternal.value) {
      return {
        href: to,
        target: '_blank',
        rel: 'noopener',
      };
    }
    return {
      to,
    };
  };
</script>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
