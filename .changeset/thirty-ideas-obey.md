---
"sit-onyx": patch
---

fix(OnyxPageLayout): do not set grid max-width when `noPadding` is set

Due to a refactoring in version 1.0.0-beta.281, the OnyxPageLayout was applying the max-width when the `noPadding` property was set.
This had the side effect that full-width content like e.g. hero images could not be passed.

This behavior is fixed now so it works like prior version 1.0.0-beta.281
