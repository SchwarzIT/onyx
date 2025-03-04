---
"sit-onyx": minor
---

- feat(OnyxBottomBar): automatically adapt horizontal padding if used inside OnyxModalDialog (`var(--onyx-modal-dialog-padding-inline)`)
- feat(OnyxModalDialog): add new `footer` slot
- feat(OnyxDialog): add new `alignment` property to align the dialog left, center or right
- feat: add new `OnyxDrawer` component
- fix(OnyxModalDialog): fix styles when placing multiple components into the custom `headline` slot
- fix(OnyxModalDialog): the header and footer will now be always be visible if the body has large content. The content will get scrollable if its too large
