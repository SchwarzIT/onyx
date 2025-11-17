---
"@sit-onyx/headless": minor
---

refactor `createSlider` implementation

Breaking changes: This change includes breaking changes. Since the `createSlider` is marked as unstable, we allow for breaking changes within minor versions.

- update and optimize internal implementation
- remove `onCommit` option, use `onChange` instead
- prevent thumbs from overlapping each other in range mode
- remove `rail` element since it is not needed
- removed unnecessary exposed states: isDragging, activeThumbIndex, isRange, trackOffset, trackLength
- renamed exposed states: marksList => marks, normalizedValues => normalizedValues
- removed unnecessary exposed internals: clampValue and roundToStep, use the new unified `updateValue` instead
- removed `discrete` option. Pass a corresponding `step` value if you only want to allow certain discrete values
- export `singleSliderTesting` and `rangeSliderTesting` Playwright test utils
