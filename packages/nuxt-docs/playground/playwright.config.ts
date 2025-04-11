import type { ConfigOptions } from "@nuxt/test-utils/playwright";
import { devices } from "@playwright/test";
import { defineOnyxPlaywrightConfig } from "@sit-onyx/shared/playwright.config.base";
import { fileURLToPath } from "node:url";

/**
 * Global Playwright configuration.
 *
 * @see https://playwright.dev/docs/test-configuration.
 */
export default defineOnyxPlaywrightConfig<ConfigOptions>({
  testDir: "./tests/playwright",
  timeout: 30 * 1000,
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  projects: [{ name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } }],
});
