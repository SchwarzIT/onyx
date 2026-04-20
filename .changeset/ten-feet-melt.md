---
"@sit-onyx/playwright-utils": patch
---

- fix(useMatrixScreenshotTest): Reduce flakiness by waiting for all images to have been loaded before performing the matrix screenshot comparison
- fix(expectEmit): Reduce flakiness by performing retries when checking for the emit
