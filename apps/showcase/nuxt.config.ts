// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  extends: ["@sit-onyx/nuxt-docs"],
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", language: "en-US", file: "en-US.json", name: "English" }],
  },
});
