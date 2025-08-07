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
- Removed most instances of the `close` emit, where it was used in combination with the `open` prop. Instead the `open` prop now has `v-model` support:

```vue
<template>
  <!-- OLD -->
  <OnyxComponent :open="isOpen" @close="isOpen = false" />
  <OnyxComponent open @close="onClose" />
  <!-- is now NEW -->
  <OnyxComponent v-model:open="isOpen" />
  <OnyxComponent open @update:open="$event && onClose($event)" />
</template>
```
