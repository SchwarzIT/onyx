---
"sit-onyx": minor
---

feat: remove unstable tag for several components

Therefore, the following components have been renamed:

| Old name                        | New name                |
| ------------------------------- | ----------------------- |
| OnyxUnstableTableOfContents     | OnyxTableOfContents     |
| OnyxUnstableTableOfContentsItem | OnyxTableOfContentsItem |
| OnyxUnstableFilterBadge         | OnyxFilterBadge         |
| OnyxUnstableItemsPerPage        | OnyxItemsPerPage        |
| OnyxUnstableGlobalSearch        | OnyxGlobalSearch        |
| OnyxUnstableGlobalSearchGroup   | OnyxGlobalSearchGroup   |
| OnyxUnstableGlobalSearchOption  | OnyxGlobalSearchOption  |
| OnyxUnstableCalendar            | OnyxCalendar            |
| OnyxUnstableSplitButton         | OnyxSplitButton         |

Other noteworthy changes:

- refactor(OnyxSplitButton)!: remove `default` slot
- refactor(OnyxItemsPerPage)!: remove properties `labelAlignment` and `hideLabel` in favor of `label.position` and `label.hidden`
- feat(OnyxSplitButton): support new properties: `iconPosition`, `type`, `alignment` and `position`
- feat(OnyxFormElementV2): support `right` label position and increase label size for `left` and `right` alignment
- fix(OnyxFormElementV2): use correct cursor styles for input when popover is used
