---
"@sit-onyx/storybook-utils": major
---

fix(background): Fix missing background color on fullscreen stories and sometimes on general page.

BREAKING CHANGE: `storybook/background` addon is not disabled anymore. If you don't plan on providing additional, custom backgrounds you should hide the background select from the toolbar:

```ts
// manager.ts
addons.setConfig({
  toolbar: {
    "storybook/background": { hidden: true },
  },
});
```
