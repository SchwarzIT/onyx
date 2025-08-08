export default defineNuxtConfig({
  compatibilityDate: "2025-01-20",
  extends: [".."],
  modules: ["@nuxt/test-utils/module"],
  i18n: {
    locales: [
      { code: "en", language: "en-US", name: "English" },
      { code: "de", language: "de-DE", name: "Deutsch" },
    ],
  },
});
