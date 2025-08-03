<script setup lang="ts">
  import { useTheme } from '@/hooks/web/useTheme';
  import SvgIcon from '../SvgIcon/index.vue';

  const { color } = useTheme();
</script>

<template>
  <div
    class="theme cursor"
    :class="{ 'theme-dark': color === 'dark' }"
    @click="
      () => {
        color = color === 'dark' ? 'light' : 'dark';
      }
    "
  >
    <div class="theme-inner" />
    <SvgIcon name="sun" />
    <SvgIcon name="moon" />
  </div>
</template>

<style lang="scss" scoped>
  .theme {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    width: 48px;
    height: 26px;
    padding: 0 5px;
    border: 1px solid var(--text-color-primary);
    border-radius: 30px;
    background-color: #151515;
    font-size: 0.8em;

    .theme-inner {
      position: absolute;
      z-index: 1;
      width: 16px;
      height: 16px;
      transition:
        transform 0.5s,
        background-color 0.5s;
      border-radius: 50%;
      background-color: var(--text-color-primary);
      will-change: transform;
    }
  }

  .theme-dark {
    .theme-inner {
      transform: translateX(calc(100% + 4px));
    }
  }

  .icon {
    font-size: 1em;
  }
</style>
