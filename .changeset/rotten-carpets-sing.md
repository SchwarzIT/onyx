---
"sit-onyx": major
---

feat: remove inline font families from bundle

onyx now no longer bundles/inlines the recommend font families because they got bundled by Vite into the main `style.css` file as base64 encoded URL.
This had negative impact on performance and tree-shaking.

From now on, you need to install and import the font families manually. For more information see our [typography docs](https://onyx.schwarz/development/typography.html#installation).
