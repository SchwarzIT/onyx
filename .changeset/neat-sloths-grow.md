---
"sit-onyx": minor
---

feat: implement new `OnyxUnstableGlobalSearch` component

For now, the component is marked as experimental/unstable which means that it is still under active development and the API might change in patch or minor releases. Keep an eye on the [changelog](https://onyx.schwarz/development/packages/changelogs/sit-onyx.html) when using the component.

Other minor changes:

- feat(OnyxDialog): expose `dialog` template ref to the internal `<dialog>` element
- feat: make CSS variable `--onyx-grid-margin-vertical` globally available. Previously it was just available inside the `.onyx-grid-layout` class
