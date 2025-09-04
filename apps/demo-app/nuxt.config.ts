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
  imports: {
    transform: {
      // fix "Identifier 'h' has already been declared" error which occurs only inside this monorepo
      // see: https://github.com/nuxt/nuxt/issues/18823#issuecomment-1419704343
      exclude: [/\bpackages\/flags\b/, /\bpackages\/icons\b/],
    },
  },
});
