---
"@sit-onyx/nuxt": patch
---

Re-enable cssnano extension "calc" to optimize css calc expressions during build. This had to be disabled until now because of a bug in the extension. (See: https://github.com/postcss/postcss-calc/issues/210)
