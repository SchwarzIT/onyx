---
"sit-onyx": major
---

fix: prevent "Cannot find module '../composables/density' or its corresponding type declarations." error

We removed the `sit-onyx/types` alias, please import directly from `sit-onyx` instead
