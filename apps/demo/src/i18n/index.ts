import config from '@/config';
import { createI18n, datetimeFormats, numberFormats } from '@sit/vue-core';
import type { useI18n } from 'vue-i18n';
import enUS from './locales/en-US.json';

export type T = ReturnType<typeof useI18n>['t'];

export const { initializeI18n, changeLocale, getUserPreferredLocale } = createI18n({
  locale: 'en-US',
  messages: { 'en-US': enUS },
  supportedLocales: Object.keys(config.i18n.locales),
  datetimeFormats,
  numberFormats,
  loadLocaleFunc: async (locale) => {
    const module = await import(`./locales/${locale}.json`);
    return module.default;
  },
});
