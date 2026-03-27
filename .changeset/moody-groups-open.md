---
"sit-onyx": patch
---

fix(OnyxTable, OnyxDataGrid): correctly scope CSS selectors to not apply styles to cell content

This e.g. fixes the issue that the `OnyxDatePickerV2` looks broken when used inside a table or data grid.
