---
"@sit-onyx/headless": patch
---

refactor(createSlider): refactor internal implementation

Since the slider is a unstable / experimental, this change contains breaking changes.

- remove option `orientation`
- remove focusedThumbIndex, valueToPercent, isMarkActive, axis and normalizeValues. Prefer native CSS selectors instead
- fix: do not adjust track length to next step when `discrete` is disabled
