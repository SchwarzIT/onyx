---
"@sit-onyx/nuxt-docs": patch
---

fix(@sit-onyx/nuxt-docs): prevent missing test module on startup

Prevent `Cannot find module "@nuxt/test-utils"` error on app start.
