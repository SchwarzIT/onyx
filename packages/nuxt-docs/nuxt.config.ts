// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: {
    // the name is used to generate import aliases so the user can easily import
    // any component or file from this layer from "#layers/onyx"
    // see: https://nuxt.com/docs/4.x/guide/going-further/layers#named-layer-aliases
    name: "onyx",
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-01-20",
  typescript: { typeCheck: "build" },
  modules: ["@sit-onyx/nuxt", "@nuxt/content", "@nuxtjs/color-mode", "@nuxt/image", "@nuxtjs/i18n"],
  css: ["@fontsource-variable/source-code-pro", "@fontsource-variable/source-sans-3"],
  colorMode: {
    classSuffix: "",
  },
  i18n: {
    defaultLocale: "en",
    // we explicitly don't define any default locales here so the project is fully in charge if defining which locales to use.
    // Otherwise if we would e.g. add en here, the project would always be forced to register en, even if it does not plan to add en translations
    // which could conflict with e.g. "const { locales } = useI18n()" to render a language switch which would always include en then
  },
});
