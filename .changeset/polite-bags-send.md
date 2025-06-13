---
"sit-onyx": minor
---

feat(router): consider hash for active state

Also consider hashes when determining the active state of a link when a Vue Router is provided. E.g. the link `#some-headline` will now be active when the current route is `/page-1#some-headline`
