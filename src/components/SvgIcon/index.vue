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
  <svg v-else :class="className" class="svg" :aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
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

  .svg {
    width: 1em;
    height: 1em;

    use {
      fill: currentColor;
    }
  }
</style>
