---
"sit-onyx": minor
---

feat(OnyxSlider): make component API stable

`OnyxUnstableSlider` is renamed to `OnyxSlider` and is now considered to have a stable API.
Therefore, no breaking changes will be introduced from now on within major versions. The `OnyxUnstableSliderControl` component has been removed and integrated into the OnyxSlider directly.

Changes to the last unstable version:

- when `control="icon"` is set, the icon buttons will no longer be focusable via keyboard because its redundant (slider can already be changed with arrow keys). When clicking the icon buttons, the tooltip will now be shown automatically
- when labelled marks are used, the tooltip will now be positioned top
- remove `disableTooltip` property in favor of new `tooltip` property that also allows customizing the tooltip value
- removed `errorMessages` and `successMessages` property which were inconsistent with other form components. Use `error` and `success` instead
- fix: error message not shown when slider is touched
