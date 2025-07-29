---
"sit-onyx": minor
---

feat(OnyxSidebar): implement mobile behavior
The sidebar will collapse automatically into drawer mode when the screen reaches specific breakpoint (depending on the `collapseSidebar` property). A floating action button (FAB) will be shown then to toggle the sidebar visibility

#### Other changes:

- implement `OnyxGlobalFAB` component and `useGlobalFAB` composable
- OnyxAppLayout: provide OnyxToast and OnyxGlobalFAB by default so it you are using the OnyxAppLayout, you no longer need to add those components manually
