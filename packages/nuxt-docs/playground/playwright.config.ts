import { ModuleOptions as NuxtContentOptions } from "@nuxt/content";
import type { ConfigOptions } from "@nuxt/test-utils/playwright";
import { defineConfig, devices } from "@playwright/test";
import { PLAYWRIGHT_BASE_CONFIG } from "@sit-onyx/shared/playwright.config.base";
import { fileURLToPath } from "node:url";

type NuxtPlaywrightConfigOptions = ConfigOptions & {
  nuxt: { nuxtConfig?: { content?: Partial<NuxtContentOptions> } };
};

/**
 * Global Playwright configuration.
 *
 * @see https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<NuxtPlaywrightConfigOptions>({
  ...PLAYWRIGHT_BASE_CONFIG,
  testDir: "./tests/playwright",
  timeout: 60 * 1000,
  use: {
    ...PLAYWRIGHT_BASE_CONFIG.use,
    nuxt: {
      rootDir: fileURLToPath(new URL(".", import.meta.url)),
      nuxtConfig: {
        content: {
          // prevent flaky tests / general test issues due to parallel execution
          // by using a separate/unique database file for each test so the tests do not run / modify the same database
          _localDatabase: {
            type: "sqlite",
            // using performance here instead of Date.now() because its more accurate. Date.now() still caused errors on local machines that are very fast
            filename: `.data/playwright/playwright-${performance.now() + performance.timeOrigin}.sqlite`,
          },
        },
      },
    },
  },
  projects: [{ name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } }],
});
