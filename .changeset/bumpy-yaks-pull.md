---
"@sit-onyx/nuxt-docs": patch
---

fix: change collection prefix from "" to "/"

As documented in the [Nuxt content docs](https://content.nuxt.com/docs/collections/sources#prefix), collection prefixes must start with "/" so we fixed the default collection prefix from "" to "/". This also fixes a bug when using [Nuxt Studio](https://nuxt.studio/) where no files/folders are shown.

**Important**: If you are defining custom collections (e.g. for custom languages), make sure to also fix the prefix if necessary!
