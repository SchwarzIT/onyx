---
"sit-onyx": minor
---

refactor(OnyxSelect): use `OnyxFormElementV2` internally

- feat(OnyxSelect): support left aligned label using `label.position` property
- feat(OnyxSelect): support clear icon to clear the value. Can be disabled with `hideClearIcon`
- feat(OnyxSelect): support new slots: `leading`, `leadingIcons`, `trailingIcons`, `trailing`
- feat(OnyxSelect): show icon of selected option (in single select) in the `leadingIcons` slot by default
- chore(OnyxSelect): deprecate obsolete `hideSuccessIcon` property
