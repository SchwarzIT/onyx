---
"sit-onyx": minor
---

refactor(OnyxStepper): use `OnyxFormElementV2` internally

- feat: support new slots: `leading`, `leadingIcons`, `trailingIcons`, `trailing` and `bottomRight`
- feat: support left aligned label using `label.position` property
- feat: support new CSS variable `--onyx-stepper-text-align` for easier customization of the value alignment
- fix: show placeholder / modelValue when `loading` is true
