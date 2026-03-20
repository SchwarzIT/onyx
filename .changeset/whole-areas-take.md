---
"sit-onyx": patch
---

fix(OnyxFormElementAction): correctly hide whole component (including tooltip) when `showOnFocus` property is set

Previously, only the button was hidden but the tooltip wrapper was still visible
