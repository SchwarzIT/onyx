---
"sit-onyx": major
---

refactor: implement new density CSS variables

#### Breaking changes

- remove CSS variable `--onyx-density`, can be replaced with 2rem, 2.5rem or 3rem accordingly for compact, default and cozy density
- OnyxBadge: removed CSS variables `--onyx-badge-padding`, ` --onyx-badge-icon-padding`, `--onyx-badge-height` and `--onyx-badge-dot-size`
- OnyxDialog: removed CSS variable `--onyx-dialog-padding`
- OnyxMiniSearch: removed CSS variable `--onyx-mini-search-icon-size`
- OnyxTable: removed CSS variable `--onyx-table-vertical-padding`
- OnyxTag: removed CSS variable `--onyx-tag-padding`
- OnyxSwitch: removed CSS variable `--onyx-switch-label-padding-vertical`

#### Features

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

#### Other bug fixes

- several visual fixes/improvements related to density/spacing
- fix(OnyxMiniSearch): translate placeholder
- fix(OnyxSelectInput): disable autocomplete for native input
- fix(OnyxSelect): hide required asterisk when `hideLabel` is set
