import { defineConfig } from "@playwright/experimental-ct-vue";
import { PLAYWRIGHT_BASE_CONFIG } from "@sit-onyx/shared/playwright.config.base";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...PLAYWRIGHT_BASE_CONFIG,
  testDir: "./",
});
