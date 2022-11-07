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

  const isELIcon = computed(() => props.name.indexOf('iEL') != -1);

  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <el-icon v-if="isELIcon" :class="className">
    <component :is="name" />
  </el-icon>
  <i v-else class="svg-icon">
    <svg :class="className" class="svg" :aria-hidden="true">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </i>
</template>

<style lang="scss" scoped>
  .el-icon {
    width: 1em;
    height: 1em;
    margin: 0;
    // 取父级的宽高
    font-size: 1em;
    color: currentColor;
  }
  .svg-icon {
    height: 1em;
    line-height: 1em;
    font-size: 1em;
    .svg {
      width: 1em;
      height: 1em;

      use {
        fill: currentColor;
      }
    }
  }
</style>
