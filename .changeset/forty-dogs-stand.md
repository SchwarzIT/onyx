---
"sit-onyx": major
---

feat!: Renamed Popover, Dialog, Modal components

**BREAKING CHANGE**

- Renamed `OnyxPopover` to `OnyxBasicPopover`.
- Renamed `OnyxDialog` to `OnyxBasicDialog`.
- Renamed `OnyxModalDialog` to `OnyxModal`.
- Renamed `OnyxAlertDialog` to `OnyxAlertModal`.
- Renamed `disableClosingOnBackdropClick` prop to `nonDismissible` for `OnyxBasicDialog` and `OnyxModal`.
- Added `role` prop to `OnyxBasicPopover` (Defaults to `dialog`).
