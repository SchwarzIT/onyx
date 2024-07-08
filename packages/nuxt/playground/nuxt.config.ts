export default defineNuxtConfig({
  modules: ["../src/module", "@nuxtjs/i18n"],
  devtools: { enabled: true },
  i18n: {
    defaultLocale: "en-US",
    lazy: true,
    langDir: "./i18n",
    locales: [
      // en-US will inherit the default translations for onyx by default as en-US is a supported language
      { code: "en-US", file: "en-US.json", name: "English (US)" },
      // de-DE is also a languages with translations from onyx so it will inherit those too. In addition de-DE overwrites some of them to fit the project
      { code: "de-DE", file: "de-DE.json", name: "Deutsch" },
      // "tlh" is the bcd 47 code for Klingon -> This is a custom translation that doesn't exist in onyx and therefor the project needs to provide them
      { code: "tlh", file: "tlh.json", name: "tlhIngan" },
      // int is a fictional language code we might want to support in our app, as the language is not supported by onyx we will create it inside the project and use the onyx translations for de-DE. (See ./i18n/int.ts)
      { code: "int", iso: "de-DE", file: "int.ts", name: "International (DE)" },
    ],
  },
  onyx: {
    theme: "kaufland",
    i18n: {
      registerLocales: {
        "en-US": "en-US",
        "de-DE": "de-DE",
        int: "de-DE",
      },
    },
  },

  compatibilityDate: "2024-07-08",
});
