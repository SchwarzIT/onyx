---
"sit-onyx": patch
---

fix(OnyxIcon): use `span` instead of `figure`

Reason: From semantic HTML perspective, `figure` elements are not allowed inside some elements like e.g. `<p>`.
To support using icons in more nesting contexts (without hydration warnings when using SSR), we changed the internally used element to `span`.
