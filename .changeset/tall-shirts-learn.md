---
"@sit-onyx/headless": minor
---

feat(createTabs): support skipping disabled tabs for keyboard navigation

Disabled tabs will now be skipped/ignored when navigating via keyboard.
You need to provide the disabled state when calling the `tabs()` element, e.g.:

```vue
<button v-bind="tab({ value: 'tab-1', disabled: true })" />
```
