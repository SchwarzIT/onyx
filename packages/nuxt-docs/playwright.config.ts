import type { ConfigOptions } from "@nuxt/test-utils/playwright";
import { defineConfig, devices } from "@playwright/test";
import { PLAYWRIGHT_BASE_CONFIG } from "@sit-onyx/shared/playwright.config.base";
import { fileURLToPath } from "node:url";

/**
 * Global Playwright configuration.
 *
 * @see https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<ConfigOptions>({
  ...PLAYWRIGHT_BASE_CONFIG,
  testDir: "./tests/playwright",
  timeout: 30 * 1000,
  use: {
    ...PLAYWRIGHT_BASE_CONFIG.use,
    nuxt: {
      rootDir: fileURLToPath(new URL("./.playground", import.meta.url)),
    },
  },
  projects: [{ name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } }],
});
