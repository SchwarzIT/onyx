import MyModule from "../../../src/module.js";

export default defineNuxtConfig({
  modules: [MyModule, "@nuxtjs/i18n"],
  compatibilityDate: "2024-07-08",
  i18n: {
    strategy: "prefix",
    defaultLocale: "en-US",
    locales: [
      // en-US will inherit the default translations for onyx by default as en-US is a supported language
      { code: "en-US", file: "en-US.json", name: "English (US)" },
      // de-DE is also a languages with translations from onyx so it will inherit those too. In addition de-DE overwrites some of them to fit the project
      { code: "de-DE", file: "de-DE.json", name: "Deutsch" },
      // "tlh" is the bcd 47 code for Klingon -> This is a custom translation that doesn't exist in onyx and therefor the project needs to provide them
      { code: "tlh", language: "tlh", file: "tlh.json", name: "tlhIngan" },
      // int is a fictional language code we might want to support in our app, as the language is not supported by onyx we will create it inside the project and use the onyx translations for de-DE. (See ./i18n/locales/de-DE-onyx.ts)
      {
        code: "int",
        language: "de-DE",
        // Later files in the array will overwrite entries in the previous ones. (See: https://i18n.nuxtjs.org/docs/guide/lazy-load-translations#multiple-files-lazy-loading)
        // Note: It's not required to use a seprate file for the onyx translations, this was just done as an example on how to separate them from the project specific ones.
        files: ["de-DE-onyx.ts", "int.json"],
        name: "International (DE)",
      },
    ],
  },
});
