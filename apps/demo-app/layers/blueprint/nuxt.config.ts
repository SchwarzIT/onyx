// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-06-28",
  devtools: { enabled: true },
  typescript: { typeCheck: "build" },
  modules: ["@sit-onyx/nuxt", "@nuxtjs/i18n", "@nuxtjs/color-mode", "@pinia/nuxt", "@vueuse/nuxt"],
  css: ["@fontsource-variable/source-sans-3", "@fontsource-variable/source-code-pro"],
  app: {
    head: {
      link: [{ rel: "icon", href: "/favicon.svg" }],
    },
  },
  i18n: {
    defaultLocale: "en-US",
    strategy: "no_prefix",
    locales: [
      { code: "en-US", file: "en-US.json", name: "English" },
      { code: "de-DE", file: "de-DE.json", name: "Deutsch" },
    ],
  },
  colorMode: {
    classSuffix: "",
  },
  nitro: {
    compressPublicAssets: true,
  },
});
