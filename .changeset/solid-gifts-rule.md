---
"@sit-onyx/nuxt-docs": patch
---

fix(nuxt-docs): show correct sidebar root when page is not found

When a page is not found, the sidebar previously included all available pages, even if a custom sidebar root was defined. This is now fixed so that if e.g. a root is defined for "/components" and a non-existing page is opened (e.g. "/components/buttons/not-found"), the sidebar will still correctly show all items inside the "/components" root.
