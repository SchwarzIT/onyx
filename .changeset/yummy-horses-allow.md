---
"sit-onyx": minor
---

refactor(OnyxSlider): make component API stable

`OnyxUnstableSlider` and `OnyxUnstableSliderControl` are renamed to `OnyxSlider` and `OnyxSliderControl` and are now considered to have a stable API.
Therefore, no breaking changes will be introduced from now on within major versions.

Changes to the last unstable version:

- when `control="icon"` is set, the tooltip will now be shown after clicking on the plus or minus button
- when labelled marks are used, the tooltip will now be positioned top
- remove `disableTooltip` property in favor of new `tooltip` property that also allows customizing the tooltip value
