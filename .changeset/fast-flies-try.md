---
"sit-onyx": major
---

refactor(OnyxAvatar): update default initials

Previously the initials were taken from the first two words. Now they will be used from the first and last word.

Example for "John Middlename Doe":

- Previously: "JM"
- Now: "JD"

The default slot has been removed in favor of the `initials` property to set custom initials.
