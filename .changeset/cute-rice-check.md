---
"sit-onyx": major
---

feat(OnyxDataGrid): support changing default enabled/disabled state of sorting, filtering and hide columns feature

Previously, the default enabled behavior of data grid features was inconsistent when passing options without explicitly specifying the enabled property.

The default enabled/disabled state can now also be configured (and overridden per column if needed):

```ts
DataGridFeatures.useSorting<Entry>({
  enabled: false,
});
```

#### Breaking changes

- sorting feature: all columns will be enabled now by default (previously they were disabled)
- hide columns feature: API / options for passing columns has changed to align with the other features
  - Old:
  ```ts
  DataGridFeatures.useHideColumns({
  columns: [{ name: "a" }, { name: "b", hidden: true }];
  });
  ```
  - New:
  ```ts
  DataGridFeatures.useHideColumns<Entry>({
    columns: {
      b: { hidden: true },
    },
  });
  ```
