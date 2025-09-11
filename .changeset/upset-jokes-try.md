---
"sit-onyx": patch
---

fix(OnyxDataGrid): do not check header checkbox when empty and no data is selected

When using the `useSelection` feature of the OnyxDataGrid, the header checkbox is now no longer checked when the data is empty and no rows are checked (e.g. while loading async data from an API and showing skeleton or when data was found at all).
Also, the checkbox is disabled when no data exists.
