---
"@sit-onyx/headless": patch
---

fix(createElRef): make returned ref nullable

When using `createElRef()`, the returned ref was typed to be always defined. This is not true since the element can not be mounted yet. This fix adds `| null` to the type definition. This also aligns with the behavior of Vue's `useTemplateRef`.
