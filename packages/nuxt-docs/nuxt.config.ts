// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-01-20",
  typescript: { typeCheck: "build" },
  modules: ["@sit-onyx/nuxt", "@nuxt/content", "@nuxtjs/color-mode", "@nuxt/image"],
  css: ["@fontsource-variable/source-code-pro", "@fontsource-variable/source-sans-3"],
  colorMode: {
    classSuffix: "",
  },
});
