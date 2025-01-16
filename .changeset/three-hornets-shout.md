---
"@sit-onyx/headless": patch
"sit-onyx": major
---

chore: replace redundant useManagedState with defineModel

The changes are mostly internal, but the typings were of `OnyxSelect` were improved:

- The `modelValue` now infers a specific subtype of `SelectOptionValue` and the `options` values must match.
- `withSearch`: Filtering of the options will not automatically disabled anymore when `searchTerm` is bound. Instead `noFilter` must be set.
