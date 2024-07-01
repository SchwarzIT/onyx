---
"@sit-onyx/nuxt": major
"docs": patch
---

Require mapping of onyx locales to the project ones.

This change was necessary because registering all languages supported by onyx would force the project to also support them due to the way locales are merged by nuxt-i18n.
