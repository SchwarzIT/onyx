// this file is needed to fix type errors when building the app
// because we are not using Nuxt i18n here.
// This file can be removed in the future when Nuxt i18n is used.
declare module "#i18n" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- type doesn't matter here
  export declare const defineI18nLocale: any;
}
