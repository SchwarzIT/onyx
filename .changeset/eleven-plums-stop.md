---
"@sit-onyx/headless": minor
---

feat(createSlider): Removed non-headless elements and properties

- Added `getValueInPercentage` to exposed internals, which allows converting a value to a percentage value.
- Added `track` to state, which exposes the following values:
  - start
  - startPercentage
  - end
  - endPercentage

**BREAKING CHANGE**:

- Removed `track` element, use the computed `track` state for rendering a track element if needed.
- Removed `thumbContainer` element, if necessary the relative position can be calculated using `getValueInPercentage`.

The concept of _marks_ was removed form the headless slider, as they don't have any special accessibility properties or meaning.

- Removed option property `marks`
- Removed type `SliderMark`
- Removed `mark` element
- Removed `marks` state
