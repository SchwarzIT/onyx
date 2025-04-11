import { devices } from "@playwright/experimental-ct-vue";
import { defineOnyxPlaywrightConfig } from "@sit-onyx/shared/playwright.config.base";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineOnyxPlaywrightConfig({
  testDir: "./src",
  testMatch: `**/*.ct.tsx`,
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  /* Configure projects for major browsers */
  projects: [
    // one browser is sufficient for the screenshot tests
    // since its responsibility of Chart.js itself to be cross-browser compatible
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
  ],
});
