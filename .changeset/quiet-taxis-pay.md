---
"sit-onyx": patch
---

fix(OnyxPageLayout): bind root `style` and `class` attributes to `<main>` element

This change now allows that you don't need redundant wrapper elements for your page to e.g. apply grid styles etc.

Old:

```html
<OnyxPageLayout>
  <div class="onyx-grid-container">Page content...</div>
</OnyxPageLayout>
```

New:

```html
<OnyxPageLayout class="onyx-grid-container"> Page content... </OnyxPageLayout>
```
