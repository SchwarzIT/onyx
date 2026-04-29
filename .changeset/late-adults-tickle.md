---
"@sit-onyx/playwright-utils": minor
---

feat(useMatrixScreenshotTest): add `fastNoIsolation` flag for `useMatrixScreenshotTest`

Usually `useMatrixScreenshotTest` creates a combined matrix screenshot that includes the screenshots for every column-row combination. Every combination is mounted individually, which allows to perform pointer or keyboard interactions before taking a screenshot.
If the isolation is not necessary, consider enabling `fastNoIsolation` which is way faster, as it mounts all combinations together. On the downside the hooks will not be executed.
