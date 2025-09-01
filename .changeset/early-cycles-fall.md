---
"sit-onyx": patch
---

fix(OnyxTable): increase header min height

We slightly increased the tables min height so the header height does not change when e.g. a system button or icon is shown/hidden inside the header.
Also, the header content is not centered vertically by default.

For changing the table header/cell paddings, we'd recommend using the new `--onyx-table-padding-vertical` and `--onyx-table-padding-inline` CSS variables.
