---
"@sit-onyx/nuxt-docs": major
---

feat: support Nuxt i18n

Nuxt i18n integration is now supported by default. For further information see the [onyx documentation](https://onyx.schwarz/development/packages/nuxt-docs.html#i18n).

The default Nuxt content config has been changed, so by default, markdown files will only be loaded from the `content/en` directory instead of `content/` directly. to migrate, move all existing files to a new `content/en` folder.
