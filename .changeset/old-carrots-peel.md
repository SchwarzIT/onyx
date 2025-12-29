---
"sit-onyx": patch
---

fix: remove `Nullable` from some emit types

Some component emits where incorrectly types as `Nullable<T>` although the actual emitted value is always defined. This affects the `update:open` event of: OnyxAlertModal, OnyxInfoTooltip, OnyxColorSchemeDialog, OnyxSelectDialog and OnyxTooltip
