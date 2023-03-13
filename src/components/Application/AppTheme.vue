<script setup lang="ts">
  import { useColorMode } from '@vueuse/core';
  import { watch } from 'vue';
  import SvgIcon from '../SvgIcon/index.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import type { AppConfig } from '@/store/types';
  import { updateColor } from '@/utils/theme/transformTheme';

  const color = useColorMode();

  const { appConfig, setAppConfigMode } = useRootSetting();

  const toggleDarkMode = () => {
    setAppConfigMode({ themeMode: color.value as AppConfig['themeMode'] });
  };

  watch(color, () => {
    toggleDarkMode();
    updateColor(appConfig.value.primaryColor, color.value as AppConfig['themeMode']);
  });
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
    <div class="theme-inner"></div>
    <SvgIcon name="sun"></SvgIcon>
    <SvgIcon name="moon"></SvgIcon>
  </div>
</template>

<style lang="scss" scoped>
  .theme {
    position: relative;
    width: 48px;
    height: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: 151515;
    border: 1px solid var(--text-color-primary);
    padding: 0 5px;
    font-size: 0.8em;
    border-radius: 30px;

    .theme-inner {
      position: absolute;
      z-index: 1;
      width: 16px;
      height: 16px;
      background-color: var(--text-color-primary);
      border-radius: 50%;
      transition: transform 0.5s, background-color 0.5s;
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
