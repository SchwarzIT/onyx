---
"@sit-onyx/headless": major
"sit-onyx": major
---

- breaking change: `useOutsideClick` - renamed `element` to `inside`: Can now accept multiple element refs
- split `createTooltip` into `createTooltip` and `createToggletip` headless functions, as these implement different accessibility concepts: See https://inclusive-components.design/tooltips-toggletips/
- Therefore, the `OnyxTooltip` had to be reworked:
  - on hover, the tooltip pattern is used
  - on click the toggletip pattern is used
  - the default slot now provides a `trigger` property, which needs to be bound by the user
- Also, the `OnyxInfoTooltip` component has been updated to be accessible.
