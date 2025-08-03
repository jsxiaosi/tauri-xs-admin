import { useColorMode } from '@vueuse/core';
import { watch } from 'vue';
import type { AppConfig } from '@/store/types';
import { updateColor } from '@/utils/theme/transformTheme';
import { useRootSetting } from '../setting/useRootSetting';

export const useTheme = () => {
  const color = useColorMode({ disableTransition: false });

  const { appConfig, setAppConfigMode } = useRootSetting();

  const toggleDarkMode = () => {
    setAppConfigMode({ themeMode: color.value as AppConfig['themeMode'] });
  };

  watch(color, () => {
    toggleDarkMode();
    updateColor(appConfig.value.primaryColor, color.value as AppConfig['themeMode']);
  });

  return { color };
};
