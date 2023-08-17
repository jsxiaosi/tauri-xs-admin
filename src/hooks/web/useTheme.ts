import { useColorMode } from '@vueuse/core';
import { watch } from 'vue';
import { useRootSetting } from '../setting/useRootSetting';
import { updateColor } from '@/utils/theme/transformTheme';
import type { AppConfig } from '@/store/types';

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
