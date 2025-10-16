---
"sit-onyx": patch
---

fix(OnyxDatepicker): Fix incorrect `v-model` type and behaviour which could cause runtime type mismatches

Fix type mismatch between `update:modelValue` and `modelValue`, both are now always using [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) strings.
This mismatch cause the value of ref that is bound using `v-model` to be updated as string, even though it could have been typed as `Date` or `number`.
