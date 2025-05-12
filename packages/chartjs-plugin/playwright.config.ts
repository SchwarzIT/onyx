import { defineConfig, devices } from "@playwright/experimental-ct-vue";
import { PLAYWRIGHT_BASE_CONFIG } from "@sit-onyx/shared/playwright.config.base";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...PLAYWRIGHT_BASE_CONFIG,
  testDir: "./src",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  /* Configure projects for major browsers */
  projects: [
    // one browser is sufficient for the screenshot tests
    // since its responsibility of Chart.js itself to be cross-browser compatible
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
  ],
});
