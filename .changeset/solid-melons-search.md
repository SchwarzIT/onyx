---
"@sit-onyx/nuxt-docs": patch
---

- fix: prevent fetching the full global search index on the server to optimize hydration performance
- fix(useSidebarNavigation): dedupe multiple parallel requests for improve performance
