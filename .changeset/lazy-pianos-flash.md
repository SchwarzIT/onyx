---
"sit-onyx": major
---

refactor(OnyxDataGrid): align enabled options for useResizing

The options for enabling the `useResizing` feature of the OnyxDataGrid has been changed to be aligned with all other features.
Also if no options are passed, the feature is now enabled for all columns instead of being disabled.

**Old**:

```ts
const withResizing = DataGridFeatures.useResizing<TEntry>({
  columnResizing: true,
  disabledColumns: ["age"],
});
```

**New**:

```ts
const withResizing = DataGridFeatures.useResizing<TEntry>({
  columns: {
    age: {
      enabled: false,
    },
  },
});
```
