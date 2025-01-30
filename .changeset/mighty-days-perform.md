---
"sit-onyx": major
---

support Vue Router integration

To enable the Vue Router integration for all onyx components, provide the router using the `createOnyx()` plugin:

```ts
const onyx = createOnyx({
  // if you are using the Vue Router, make sure to pass it here be enable the router integration for onyx
  // router: createRouter(),
});
```

When passing internal links to onyx components, like OnyxLink, OnyxNavButton etc., they will be opened using the provided router instead of native browser links so no full page-reload is done in SPAs.

#### Breaking changes

- rename type `OnyxExternalLinkIcon` to `OnyxExternalLinkIconProps`
- OnyxLink: make property `href` required
- OnyxMenuItem: remove properties `href` and `target` in favor of new `link` property
- OnyxNavButton and OnyxNavItem: remove properties `href`, `target` and `withExternalIcon` in favor of new `link` property

#### Other changes

- add new `OnyxRouterLink` component, `useLink` composable and `extractLinkProps` utility
