---
"sit-onyx": major
---

- fix(OnyxDataGrid): prevent "Cannot use in to search for 'ResizeObserver' / 'CSS' in undefined" errors
- fix(OnyxDataGrid): preventSR hydration errors when using SSR / Nuxt
- fix(OnyxSidebar): check if should be collapsed only onMounted to support SSR / prevent hydration errors
- OnyxFileCard: BREAKING CHANGE - remove default slot prop `status` in favor of new `props` that also contains other useful file card properties
- export `useFileSize` composable that can be used to format a file size in a user-friendly format
