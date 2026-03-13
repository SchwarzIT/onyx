---
"sit-onyx": minor
---

feat(OnyxDataGrid): Implemented basic inline editing feature.

For all base column `typeRenderers` editing is supported.
To enable editing with custom types, you will need to implement two things:

1. Check for the `editable` prop in the metadata to decide if the cell should render in "display" or "edit" mode.
2. Implement or call the `onUpdate:modelValue` when the value is supposed to change through an edit.

Example

```ts
export const MY_CUSTOM_RENDERER = DataGridFeatures.createTypeRenderer({
  header: { component: HeaderCell },
  cell: {
    component: ({ column, row, metadata, modelValue, ...rest }) =>
      metadata?.editable
        ? h(EditingComponent, {
            ...rest,
            label: `${column} with id ${row.id}`,
            modelValue,
          })
        : h(DisplayComponent, { modelValue, ...metadata?.typeOptions }),
  },
});
```

**Caveats:**

- Currently only basic editing is supported.
- Managing `editable` for individual cells or columns state must currently performed in the application. Per default all cells and rows are either editable or not editable.
- Filtering and Sorting features are always using the original value, not the edited value.
