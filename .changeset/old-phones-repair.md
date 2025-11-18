---
"sit-onyx": patch
---

refactor(OnyxSlider): update icon and input control behavior

- icon: value is now changed based on the `step` property, not the `shiftStep` value
- icon: correctly disable the increase button when max value is reached
- input: pass step, min and max to the stepper
- input: prevent keyboard focus on thumbs when input controls are shown since the value can by changed directly with the inputs via keyboard
