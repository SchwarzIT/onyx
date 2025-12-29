---
"@sit-onyx/playwright-utils": minor
---

feat(useMatrixScreenshotTest): support passing a custom `test` function

This allows e.g. to pass in custom text [fixtures](https://playwright.dev/docs/test-fixtures#creating-a-fixture).
Example:

```ts
import { test } from "./custom-fixtures";

export const { executeMatrixScreenshotTest } = useMatrixScreenshotTest({ test });
```
