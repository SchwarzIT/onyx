// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: {
    // see: https://nuxt.com/docs/4.x/guide/going-further/layers#named-layer-aliases
    name: "app",
  },
  css: ["~/assets/css/index.scss"],
  app: {
    head: {
      title: "onyx demo",
    },
  },
  i18n: {
    locales: [
      { code: "en-US", file: "en-US.json", name: "English" },
      { code: "de-DE", file: "de-DE.json", name: "Deutsch" },
    ],
  },
});
