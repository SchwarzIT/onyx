---
"@sit-onyx/storybook-utils": minor
"@sit-onyx/figma-utils": minor
"sit-onyx": major
---

feat: Implemented Light-Dark mode using native CSS API. Users no longer need to import separate light and dark mode files; now, all styles are combined into a single file with the light-dark function.
E.g.: @import lidl-light.css; @import lidl-dark.css -> @import lidl.css

Renamed CSS Variables
| Old | New |
| ------------------ | -------------------------- |
| --onyx-color-steel | --onyx-color-neutral-steel |
| --onyx-color-stone | --onyx-color-neutral-stone |
| --onyx-color-steel | --onyx-color-digits-mint|
| --onyx-color-gray | --onyx-color-kl-gray |
| --onyx-color-lidl | --onyx-color-lidl-blue |
| --onyx-color-prezero | --onyx-color-prezero-green |
| --onyx-color-petrol | --onyx-color-prezero-petrol |
| --onyx-color-scos| --onyx-color-scos-blue |
| --onyx-color-lemon| --onyx-color-scos-lemon |
| --onyx-color-lime | --onyx-color-scos-lime |
| --onyx-color-green | --onyx-color-system-green |
| --onyx-color-orange | --onyx-color-system-orange|
| --onyx-color-purple | --onyx-color-system-purple|
| --onyx-color-red | --onyx-color-system-red|
