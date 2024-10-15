<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    // route object
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    className: {
      type: String,
      default: '',
    },
  });

  const isELIcon = computed(() => props.name.indexOf('iEL') !== -1);

  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <el-icon v-if="isELIcon" :class="`svg-icon ${className}`">
    <component :is="name" />
  </el-icon>
  <i v-else class="svg-icon" :class="className">
    <svg class="svg" :aria-hidden="true">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </i>
</template>

<style lang="scss" scoped>
  .svg-icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    color: currentcolor;
    font-size: 1em;

    .svg {
      width: 1em;
      height: 1em;
      color: currentcolor;

      use {
        fill: currentcolor;
      }
    }
  }
</style>
