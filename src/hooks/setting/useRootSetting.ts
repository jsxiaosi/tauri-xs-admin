import { merge } from 'lodash-es';
import { storeToRefs } from 'pinia';
import { useAppStoreHook } from '@/store/modules/app';
import type { AppConfig } from '@/store/types';

export function useRootSetting() {
  const appStore = useAppStoreHook();
  const { appConfigMode } = storeToRefs(appStore);

  function setAppConfigMode(config: Partial<AppConfig>) {
    appStore.setAppConfigMode(merge(appStore.appConfigMode, config));
  }

  return { appConfig: appConfigMode, setAppConfigMode };
}
