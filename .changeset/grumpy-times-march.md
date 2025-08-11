---
"@sit-onyx/nuxt": major
---

feat(nuxt): auto register onyx locales

The `registerLocales` option for the onyx module was removed as it is no longer necessary.
onyx will now automatically detect which locales are used by the project and register the corresponding onyx locales automatically.

If you are not using IETF's BCP47 names for your locale codes, you must include the `language` property when defining your locales.
For further details, see the [onyx documentation](https://onyx.schwarz/development/packages/nuxt.html#setup).

**Old**:

```ts
export default defineNuxtConfig({
  modules: ["@sit-onyx/nuxt", "@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "en-US",
    locales: [
      { code: "en-US", file: "en-US.json" },
      { code: "de", file: "de-DE.json" },
    ],
  },
  onyx: {
    i18n: {
      registerLocales: {
        "en-US": "en-US",
        de: "de-DE",
      },
    },
  },
});
```

**New**:

```ts
export default defineNuxtConfig({
  modules: ["@sit-onyx/nuxt", "@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "en-US",
    locales: [
      { code: "en-US", file: "en-US.json" },
      // in the "de" example, the langauge property is necessary because the "de" code is not a valid IETF's BCP47 code
      // alternatively, you could remove the language property and change to code to "de-DE"
      { code: "de", language: "de-DE", file: "de-DE.json" },
    ],
  },
});
```
