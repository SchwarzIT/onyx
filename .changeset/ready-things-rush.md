---
"sit-onyx": minor
---

refactor `OnyxSlider` implementation

Breaking changes: This change includes breaking changes. Since the slider is marked as unstable, we allow for breaking changes within minor versions.

- update and optimize internal implementation
- prevent thumbs from overlapping each other in range mode
- removed `discrete` property. Pass a corresponding `step` value if you only want to allow certain discrete values
- add separate aria labels for input controls in range mode
- fix(OnyxStepper): emit undefined instead of NaN when value is cleared
