---
"sit-onyx": patch
---

fix: correctly detect links as external

Previously only links starting with `http://` or `https://` we detected as external links, meaning all other links we treated as internal and navigated using the [provided Vue Router](https://onyx.schwarz/development/router.html).

Since this is incorrect for links like `mailto:`, `tel:` etc. this behavior has been fixed.
Now only links starting with `/` and `#` are treated as **internal**. All other links are treated as **external**.
