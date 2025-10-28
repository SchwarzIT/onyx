---
"sit-onyx": patch
---

refactor(OnyxSlider): refactor internal implementation

Since the slider is a unstable / experimental, this change contains breaking changes.

- correctly manage value if no `modelValue` is not set explicitly
- remove property `orientation`
- renamed, updated and removed some CSS classes and variables
- fix: do not adjust track length to next step when `discrete` is disabled
