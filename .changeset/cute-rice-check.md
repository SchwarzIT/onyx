---
"sit-onyx": major
---

feat(OnyxDataGrid): support changing default enabled/disabled state of sorting and filtering feature

Previously, the default enabled behavior of data grid features was inconsistent when passing options without explicitly specifying the enabled property.

**Breaking change**: for the sorting feature, all columns will be enabled now by default (previously they were disabled)

The default enabled/disabled state can now also be configured (and overridden per column if needed):

```ts
DataGridFeatures.useSorting<Entry>({
  enabled: false,
});
```
