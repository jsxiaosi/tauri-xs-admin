import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import type { AppConfig } from '@/store/types';
interface localesType {
  name: string;
  locale: string;
}

const config: Recordable = import.meta.glob('./**/index.ts', { eager: true });

const messages: Recordable = {};
const localesList: localesType[] = [];
Object.keys(config).forEach((key) => {
  const name: RegExpMatchArray | null = key.match(/^\.\/([\s\S]+)\/index.ts$/);
  if (name) {
    if (!name[1]) return;
    messages[name[1]] = config[key].default;
    localesList.push({ name: config[key].name, locale: name[1] });
  }
});

const locStoAPP = localStorage.getItem('appConfigMode');
let appConfigMode: AppConfig = {} as AppConfig;
if (locStoAPP) {
  appConfigMode = JSON.parse(locStoAPP);
}

const i18n = createI18n({
  legacy: false,
  locale: appConfigMode.locale || 'zh-CN',
  fallbackLocale: appConfigMode.locale || 'zh-CN',
  messages,
});

export const configMainI18n = (app: App<Element>, locale: string) => {
  i18n.global.locale.value = locale;
  app.use(i18n);
};

export const availableLocales: localesType[] = localesList;

export default i18n;
