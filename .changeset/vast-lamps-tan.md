---
"sit-onyx": major
---

feat(OnyxTooltip, OnyxInfoTooltip)!: split up open and trigger property

Previously, the `open` property of the OnyxTooltip and OnyxInfoTooltip was used to both define the trigger type (hover, click) and set a boolean for the open state.

This is changed now so:

- the `open` property is now just a boolean to control the open state. Supports `v-model:open`.
- the new `trigger` property can be used to set the trigger type (hover, click)
