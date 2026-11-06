---
"sit-onyx": minor
---

feat(OnyxDataGrid): Enhanced ColumnConfig type to dynamically extract supported column types directly from a feature function or a array of features:

```ts
const columns: ColumnConfig<Entry, typeof features> = [
  // ...
];
```
