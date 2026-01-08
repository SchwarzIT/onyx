declare module "#i18n" {
  // This module will be defined at runtime inside a project using nuxt-i18n. It's manually declared here to provide these types to the module during development
  export const { defineI18nLocale } = await import(
    "../../node_modules/@nuxtjs/i18n/dist/runtime/composables/index.d.ts"
  );
}
