---
"sit-onyx": major
---

refactor: remove OnyxDrawer component and integrate it in OnyxSidebar

The OnyxDrawer component was removed and integrated into the OnyxSidebar which already supports other useful features like resizing.

Old:

```html
<OnyxDrawer open> ... </OnyxDrawer>
```

New:

```html
<OnyxSidebar :temporary="{ open: true, floating: true }"> ... </OnyxSidebar>
```

#### Breaking changes

- remove OnyxDrawer component (use OnyxSidebar with `temporary` property instead)
- OnyxSidebar: switch default for `resizable` property to `true` instead of `false`
- OnyxSidebar: rename property `drawer` to `temporary`
