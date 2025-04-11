import { defineOnyxPlaywrightConfig } from "@sit-onyx/shared/playwright.config.base";

// NOTE: You need to run "pnpm build" before running the tests

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineOnyxPlaywrightConfig({
  testDir: "./tests",
  fullyParallel: true,
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm preview --port 3200 --mode test",
    port: 3200,
    reuseExistingServer: false,
  },
});
