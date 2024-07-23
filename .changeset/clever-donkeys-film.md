---
"sit-onyx": major
---

refactor(OnyxSelect): restrict modelValue to only contain values

- OnyxSelects `modelValue` now only needs TValue, not SelectOption<TValue>
- OnyxSelect determines the displayed labels by comparing `modelValue` with `options`. This can be overridden by setting the new prop `valueLabel`.
- OnyxSelect now filters the options internally when `searchTerm` is set. This can be overridden by setting the new prop `filteredOptions`.
