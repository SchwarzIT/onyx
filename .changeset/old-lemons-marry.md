---
"sit-onyx": minor
---

OnyxDataGrid: when using `slots` in a data grid feature, the passed slotContent is now always defined so you don't have to to nullish checks. When there is no existing slot content, the returned array will be empty
