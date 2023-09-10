import type en from './modules/en.json';
import type { LocalesEnum } from '@/enum/locales';

export type MessageSchema = typeof en;

export type localeKey = (typeof LocalesEnum)[keyof typeof LocalesEnum];

export interface LocalesType {
  name: string;
  locale: localeKey;
}

export type LocaleMessages = {
  [K in localeKey]: MessageSchema;
};
