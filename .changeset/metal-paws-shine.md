---
"@sit-onyx/nuxt-docs": patch
---

fix(useCollection): prevent 404 when route starts with locale but has no locale prefix

This fixes cases where e.g. the route is `/design` for locale `de` which was incorrectly detected as locale prefix (`/de/design`) although no prefix is used in this case.
