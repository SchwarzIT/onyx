// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-01-20",
  modules: [
    "@sit-onyx/nuxt",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/test-utils/module",
  ],
  css: ["@fontsource-variable/source-code-pro", "@fontsource-variable/source-sans-3"],
  colorMode: {
    classSuffix: "",
  },
});
