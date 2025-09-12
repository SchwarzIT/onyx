---
"sit-onyx": major
---

feat(OnyxDataGrid)!: support accessing the state for `useHideColumns` state

You can now pass in a ref to the `useHideColumns` feature which allows you to access the state for which columns are currently hidden. This is useful if the state should be stored e.g. in the local storage.

Breaking change: Remove the `hidden` property for the individual column options in favor of the new `state` option

**Before**

```ts
const withHiddenColumns = DataGridFeatures.useHideColumns<TEntry>({
  columns: { age: { hidden: true } },
});
```

**After**

```ts
const hiddenColumns = ref<DataGridFeatures.HideColumnsState<TEntry>>(new Set(["age"]));

const withHiddenColumns = DataGridFeatures.useHideColumns<TEntry>({
  state: hiddenColumns,
});
```
