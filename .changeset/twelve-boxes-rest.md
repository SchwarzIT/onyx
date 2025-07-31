---
"@sit-onyx/nuxt": patch
---

fix(nuxt): always provide onyx plugin

Previously, the onyx plugin was only registered if Nuxt I18n was used.
This caused the issue that the router integration did not work when not using i18n.
