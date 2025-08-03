import { _storage } from '@jsxiaosi/utils';
import type { App } from 'vue';
import { getConfigInfo } from '@/server/config';
import type { AppConfig } from '@/store/types';
import { configTheme } from '@/utils/theme/transformTheme';

let config: AppConfig = {} as AppConfig;

export function getConfig(): AppConfig {
  return config;
}

// 延迟进入vue，显示loding页
export async function getServerConfig(app: App): Promise<AppConfig> {
  const appConfigMode = localStorage.getItem('appConfigMode');
  if (appConfigMode) {
    config = JSON.parse(appConfigMode);
  } else {
    const res = await getConfigInfo();
    if (res) {
      config = res.data;
      localStorage.setItem('appConfigMode', JSON.stringify(config));
    } else {
      throw new Error(
        `\npublic文件夹下无法查找到serverConfig配置文件\nUnable to find serverconfig configuration file under public folder`,
      );
    }
  }
  configTheme(config);
  _storage.setStorageConfig({ ...config.StorageConfig, prefix: config.title });
  app.config.globalProperties.$config = getConfig();
  return config;
}
