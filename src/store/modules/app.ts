import { defineStore } from 'pinia';
import type { AppState, AppConfig } from '../types';
import { getConfig } from '@/config';
import { store } from '@/store';

const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    appConfigMode: getConfig(),
  }),
  getters: {
    getAppConfigMode(): AppConfig {
      return this.appConfigMode;
    },
  },
  actions: {
    setAppConfigMode(data: AppConfig): void {
      const newData = data;
      localStorage.setItem('appConfigMode', JSON.stringify(newData));
      this.appConfigMode = newData;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
