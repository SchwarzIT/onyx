---
"sit-onyx": patch
---

fix(OnyxCodeTabs): remove non existing `copyCode` emit

The `copyCode` emit was a leftover in the code but didn't have any functionality. The source code is automatically copied when clicking the copy button.
