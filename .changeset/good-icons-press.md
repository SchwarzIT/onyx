---
"sit-onyx": minor
---

refactor: implement new density CSS variables

New density CSS variables were added and used inside all onyx components which automatically adjust their spacing based on the current density:

- --onyx-density-3xs
- --onyx-density-2xs
- --onyx-density-xs
- --onyx-density-sm
- --onyx-density-md
- --onyx-density-lg
- --onyx-density-2xl
- --onyx-density-3xl
- --onyx-density-4xl

The following components now also support density:

- OnyxCheckboxGroup / OnyxRadioGroup headline and horizontal layout
- OnyxEmpty
- OnyxTooltip

Other changes:

- several visual fixes/improvements related to density/spacing
- fix(OnyxMiniSearch): translate placeholder
- fix(OnyxSelectInput): disable autocomplete for native input
