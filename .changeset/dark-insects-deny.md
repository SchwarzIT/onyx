---
"sit-onyx": patch
---

fix: implement workaround for boolean shorthands not working

Previously, some boolean properties did not work when used as shorthand, e.g. `<OnyxSelect multiple />` so they had to be explicitly set to `true`.

We've implemented an internal workaround to fix this until the [issue](https://github.com/SchwarzIT/onyx/issues/3958) is officially fixed by the Vue core team.
