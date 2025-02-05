---
"sit-onyx": major
---

integrate nav bar, nav button and nav item with router

The Vue Router integration has been further improved in this version.

#### Improvements

- nav bar app area is now a link instead of a button which supports browser-native features like copy link address, open in a new tab etc.
- the nav bar automatically closes mobile fly outs (like burger or context menu) when the current route changes, e.g. because the user clicked a nav item
- fix bug that mobile nav item with children does not open child view but instead directly opens link

#### Breaking changes

- OnyxNavBar: remove `navigateToStart` event. App area link will be opened directly (integrated with router). The link defaults to `/` and can be changed by the new `appArea` property
- OnyxNavBar: remove `appAreaLabel` property in favor of new `appArea` property
- OnyxNavButton and OnyxNavItem: remove event `navigate` which is no longer needed. The links will be opened directly. External links via the browser, internal links via the provided router (or browser if no router is provided)
