import { defineOnyxPlaywrightConfig } from "@sit-onyx/shared/playwright.config.base";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineOnyxPlaywrightConfig({
  testDir: "./src",
  testMatch: `**/*.ct.tsx`,
});
