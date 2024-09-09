---
"@sit-onyx/headless": major
---

feat: support SSR for OnyxSelect, OnyxNavButton, OnyxUserMenu and more components

Removed `createId()` utility. Use Vue's new `useId()` utility which is SSR safe and supported since Vue `>= 3.5.0`.
