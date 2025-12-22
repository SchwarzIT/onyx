---
"sit-onyx": minor
---

refactor(OnyxSlider): update tooltip behavior

- when `control="icon"` is set, the tooltip will now be shown after clicking on the plus or minus button
- when labelled marks are used, the tooltip will now be positioned top
- the slider is marked as unstable, therefore we are able to introduce breaking changes to the component within minor versions: remove `disableTooltip` property in favor of new `tooltip` property that also allows customizing the tooltip value
