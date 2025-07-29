---
"sit-onyx": patch
---

fix(OnyxPopover): correctly position popover in some browsers

Removed CSS `transform` when positioning the popover which caused the popover to be misaligned in some cases for some browsers (e.g. Safari)
