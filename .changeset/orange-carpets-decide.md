---
"@sit-onyx/nuxt-docs": minor
---

refactor(useCollection): require `collection` name to be passed in as parameter

Other changes

- feat!: support passing a `path` option to set which collection path should be queried. By default, the current localized path will be used instead of the `slug` route parameter
- feat: a fatal 404 error is thrown when the collection item does not exist
- feat: `useSeoMeta()` is automatically called to define the SEO meta for the current collection item
