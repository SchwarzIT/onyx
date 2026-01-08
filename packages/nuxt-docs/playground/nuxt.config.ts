export default defineNuxtConfig({
  compatibilityDate: "2025-01-20",
  extends: [".."],
  modules: ["@nuxt/test-utils/module"],
  i18n: {
    locales: [
      { code: "en", language: "en-US", name: "English" },
      { code: "de", language: "de-DE", name: "Deutsch" },
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
