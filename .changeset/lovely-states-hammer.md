---
"sit-onyx": major
---

refactor OnyxAppLayout and OnyxPageLayout component

The existing OnyxAppLayout and OnyxPageLayout components have been refactored to remove unused features, provide more useful features and extend the documentation and examples.

The breaking changes in this version are:

#### OnyxAppLayout

- removed slot `pageOverlay` and `appOverlay`. Use the OnyxModalDialog, OnyxDialog or OnyxAlertDialog component instead
- removed default colors for slots. The layout will now no longer define any default colors so they correct colors are taken from the passed slot content

#### OnyxPageLayout

- removed property `hideSidebar`. Use a `v-if` on your passed slot instead, e.g. `<template v-if="isSidebarVisible" #sidebar>`
- removed property `footerAsideSidebar`. Use new `footerAlignment` instead.
- removed default colors for slots. The layout will now no longer define any default colors so they correct colors are taken from the passed slot content
- page content and footer will now always be left aligned by default when used together with a sidebar, even when the global app grid is configured to be centered (with CSS class `onyx-grid-center`).

By default, the page content now has responsive padding (same as the `.onyx-grid-container` CSS class) so you should no longer manually pass it. You can disable this behavior and revert to the previous behavior by setting the new `noPadding` property.

Before:

```html
<OnyxPageLayout>
  <div class="onyx-grid-container">Page content</div>
</OnyxPageLayout>
```

After:

```html
<OnyxPageLayout>Page content</OnyxPageLayout>
```
