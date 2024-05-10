// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxt/test-utils/module", "@nuxtjs/color-mode"],
  css: ["~/assets/css/main.scss"],
  app: {
    head: {
      title: "onyx Storybook",
      link: [{ rel: "icon", href: "/favicon.svg" }],
    },
  },
  i18n: {
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    locales: [{ code: "en", file: "en-US.json" }],
  },
  colorMode: {
    classSuffix: "",
  },
});
