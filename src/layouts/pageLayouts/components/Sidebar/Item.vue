<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  });
</script>

<template>
  <SvgIcon :class-name="className" :name="icon" />
  <span v-if="title">{{ $t(title) }}</span>
</template>

<style scoped>
  .sub-el-icon {
    /* color: currentColor; */
    width: 1em;
    height: 1em;
  }
</style>
