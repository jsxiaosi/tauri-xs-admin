import { createApp } from 'vue';
import App from './App.vue';
import { getServerConfig } from './config';
import { configMainI18n } from './locales';
import { configMainRouter } from './router';
import { configMainStore } from './store';
import { configMainGlobalProperties } from './utils';
import { useElementPlus } from './utils/plugin/element';

// tailwind css
import '@/styles/tailwind.css';
// element-plus dark style
import 'element-plus/theme-chalk/src/dark/css-vars.scss';
// 公共样式
import '@/styles/index.scss';

const app = createApp(App);

getServerConfig(app).then(async config => {
  // 路由
  await configMainRouter(app);

  // 全局钩子
  configMainGlobalProperties(app);

  // Pinia
  configMainStore(app);

  // 国际化
  configMainI18n(app, config.locale);

  // ElementPlus
  useElementPlus(app);

  app.mount('#app');
});
