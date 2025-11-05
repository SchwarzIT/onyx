---
"@sit-onyx/headless": minor
"sit-onyx": minor
---

feat(OnyxSlider): add `OnyxSliderControl` component and improve discrete mode

- Now when passing `discrete: true` to `OnyxSlider`, marks will be generated automatically and there is no need to manually pass `marks: true`
- Add unstable `OnyxSliderControl` component for slider input controls

For now, the components are marked as experimental/unstable which means that they are still under active development and the API might change in patch or minor releases. Keep an eye on the [changelog](https://onyx.schwarz/development/packages/changelogs/sit-onyx.html) when using them.
