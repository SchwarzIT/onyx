---
"sit-onyx": patch
---

refactor: revert workaround for boolean casting

The issue described [here](https://github.com/SchwarzIT/onyx/issues/3958) that boolean shorthands / boolean casting is not working for some properties has been officially fixed with Vue 3.5.19.

We removed the onyx internal workarounds in this version.
