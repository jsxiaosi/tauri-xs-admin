import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import type { LocaleMessages, LocalesType, localeKey } from './types';
import { LocalesEnum } from '@/enum/locales';

const localesList: LocalesType[] = [
  {
    name: 'English',
    locale: LocalesEnum.EN,
  },
  {
    name: '中文简体',
    locale: LocalesEnum.ZHCN,
  },
];

const i18n = createI18n({
  legacy: false,
  locale: LocalesEnum.ZHCN,
  fallbackLocale: LocalesEnum.ZHCN,
  messages: messages as LocaleMessages,
});

export const configMainI18n = (app: App<Element>, locale: localeKey) => {
  i18n.global.locale.value = locale;
  app.use(i18n);
};

export const availableLocales: LocalesType[] = localesList;

export default i18n;
