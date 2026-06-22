---
"@sit-onyx/nuxt": patch
---

fix(nuxt): correctly load i18n locales

This fixes the following issue / warning:
WARN Failed to load messages for locale "en" Failed loading locale (en): /@fs/@sit-onyx/nuxt/dist/runtime/locales/en-US.js — You need to define 'export default' that will return the locale messages.
