---
"sit-onyx": minor
---

feat(OnyxStepper): update OnyxStepper API

- remove property `step`, use `stepSize` instead
- remove property `stripStep`, use `validStepSize` instead. User inputs will no longer be manipulated, instead an error will be shown
- changed logic of `precision` property. Now determined numbers of decimal places to show. Is no longer the default value of `stepSize` property.
- fix bug that decimal value is not displayed correctly when `precision` is not set
