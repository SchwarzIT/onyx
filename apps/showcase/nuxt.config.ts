// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  extends: ["@sit-onyx/nuxt-docs"],
  modules: ["nuxt-studio"],
  app: {
    head: {
      titleTemplate: "%s | onyx",
      link: [{ rel: "icon", href: "/onyx-logo.svg" }],
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", language: "en-US", file: "en-US.json", name: "English" }],
  },
  studio: {
    // Git repository configuration (owner and repo are required)
    repository: {
      provider: "github",
      owner: "SchwarzIT",
      repo: "onyx",
      private: false,
    },
  },
});
