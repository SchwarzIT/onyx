// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxt/test-utils/module"],
  css: ["~/assets/css/main.scss"],
  i18n: {
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    locales: [{ code: "en", file: "en-US.json" }],
  },
});
