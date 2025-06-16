---
"sit-onyx": major
---

- feat(OnyxDataGrid)!: Support async (disabling) data transformation

BREAKING CHANGE: The `createFeature` and `useDataGridFeatures` API has been adapted.
The type `DataGridFeature`, which they use, has been renamed to `DataGridFeatureDescription`.
`DataGridFeature` is now a function which enables the passing of context from the `OnyxDataGrid` itself to the features.
The function `DataGridFeature` is required to return a `DataGridFeatureDescription` type.
Simply move the composable function definition from inside `createFeature` to wrap the createFeature call stay compatible:

**Before:**

```ts
export const useFiltering = createFeature(
  <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) => {
    // ...
  },
);
```

**After:**

```ts
export const useFiltering = <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) =>
  createFeature((ctx) => {
    // ...
  });
```
