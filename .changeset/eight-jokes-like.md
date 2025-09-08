---
"sit-onyx": patch
---

fix: correctly apply density when using `.onyx-density-*` classes

When using CSS classes to set densities, the `compact` density was not applied due to CSS selector specificity which caused the default density to be always used
