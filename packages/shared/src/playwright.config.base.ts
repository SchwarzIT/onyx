import type { ConfigOptions } from "@nuxt/test-utils/playwright";
import { defineConfig, devices, type PlaywrightTestConfig } from "@playwright/experimental-ct-vue";
import vue, { type Options } from "@vitejs/plugin-vue";

export type DefineOnyxPlaywrightConfigOptions = {
  /**
   * Whether to run the tests in all onyx-defined browsers or just a single one of them.
   *
   * @default "all"
   */
  browsers?: "all" | "single";
  /**
   * Optional custom overrides for the Playwright config.
   */
  overrides?: PlaywrightTestConfig;
};

export type ConfigOptionsNuxt = ConfigOptions & {
  nuxt: { nuxtConfig?: { content?: Record<PropertyKey, unknown> } };
};

export const vuePluginOptions: Options = {
  template: {
    compilerOptions: {
      // comments can cause issues for components where classes
      // are not merged correctly, e.g. when using `<OnyxIcon class="custom-class" />`
      comments: false,
    },
  },
};

/**
 * Common default Playwright config that is INDEPENDENT from e2e/integration/component tests.
 */
function getDefaultConfig(options?: DefineOnyxPlaywrightConfigOptions) {
  const DEFAULT_CONFIG = {
    /**
     * General
     */
    testMatch: "**/*.@(ct|e2e).?(c|m)[jt]s?(x)",

    /**
     * SCREENSHOTS
     *
     * See: https://playwright.dev/docs/screenshots
     */
    snapshotDir: "./playwright/snapshots",
    // custom snapshotPathTemplate to remove the testFileName folder that we don't want
    snapshotPathTemplate: "{snapshotDir}/{testFileDir}/{arg}-{projectName}-{platform}{ext}",
    // we don't want to update snapshots on the local machine of each developer.
    // if you want to update snapshots for your branch, use the corresponding GitHub action:
    // https://github.com/SchwarzIT/onyx/actions/workflows/playwright-screenshots.yml
    ignoreSnapshots: !process.env.CI,
    updateSnapshots: process.env.PW_UPDATE_SNAPSHOTS === "true" ? "changed" : "none",

    /**
     * SHARDING
     *
     * See: https://playwright.dev/docs/test-sharding
     */
    fullyParallel: true,
    // when (in the pipeline) the sharding environment variables are set, sharding is enabled
    shard:
      process.env.CI && process.env.PW_SHARD && process.env.PW_TOTAL_SHARDS
        ? {
            current: +process.env.PW_SHARD,
            total: +process.env.PW_TOTAL_SHARDS,
          }
        : null,

    /**
     * FAILURE HANDLING
     *
     * See: https://playwright.dev/docs/test-retries
     */
    timeout: 20 * 1000,
    forbidOnly: !!process.env.CI, // fail build on CI if we left test.only in the source code

    // we do not want to retry failing tests because if they fail but work after retry, they are flaky
    // we don't want to have flaky tests so you must fix the flaky tests immediately instead of increasing the retries!
    // the same is valid for CI
    retries: 0,

    /**
     * REPORTERS
     *
     * See: https://playwright.dev/docs/test-reporters
     */
    /* In the CI pipeline it generates dot (for the stdout) and blob reports, locally only a html report is generated */
    reporter: process.env.CI ? [["dot"], ["blob"]] : [["html", { open: "never" }]],
    use: {
      trace: process.env.CI ? "retain-on-failure" : "off",
      video: process.env.CI ? "retain-on-failure" : "off",
      locale: "en-US",
      timezoneId: "Europe/Berlin",
    },

    /**
     * BROWSERS
     *
     * See: https://playwright.dev/docs/test-projects
     */
    projects: [
      { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
      { name: "firefox", use: { ...devices["Desktop Firefox"] } },
      { name: "webkit", use: { ...devices["Desktop Safari"] } },
    ],
  } satisfies PlaywrightTestConfig;

  if (options?.browsers === "single") {
    DEFAULT_CONFIG.projects = [DEFAULT_CONFIG.projects[0]];
  }

  return DEFAULT_CONFIG;
}

/**
 * Creates a new onyx-specific Playwright config for e2e/integration testing.
 * If you want to do component tests, please use `defineOnyxPlaywrightConfigCT` instead.
 *
 * @see: https://playwright.dev/docs/test-configuration
 */
export const defineOnyxPlaywrightConfigE2E = (options?: DefineOnyxPlaywrightConfigOptions) => {
  return defineConfig(
    getDefaultConfig(options),
    {
      testDir: "./tests",
      /* Run your local dev server before starting the tests */
      webServer: {
        command: "pnpm preview --port 3200 --mode test",
        port: 3200,
        reuseExistingServer: false,
      },
    },
    options?.overrides ?? {},
  );
};

/**
 * Creates a new onyx-specific Playwright config for component testing.
 * If you want to do e2e/integration tests, please use `defineOnyxPlaywrightConfigE2E` instead.
 *
 * @see: https://playwright.dev/docs/test-configuration
 */
export const defineOnyxPlaywrightConfigCT = (options?: DefineOnyxPlaywrightConfigOptions) => {
  return defineConfig(
    getDefaultConfig(options),
    {
      testDir: "./src",
      use: {
        ctPort: 3100,
        ctViteConfig: {
          plugins: [vue(vuePluginOptions)],
        },
      },
    },
    options?.overrides ?? {},
  );
};

/**
 * Creates a new onyx-specific Playwright config for Nuxt testing.
 *
 * @see: https://playwright.dev/docs/test-configuration
 */
export const defineOnyxPlaywrightConfigNuxt = (options?: DefineOnyxPlaywrightConfigOptions) => {
  return defineConfig<ConfigOptionsNuxt>(
    getDefaultConfig(options),
    {
      testDir: "./tests/playwright",
      timeout: 60 * 1000,
      use: {
        nuxt: {
          nuxtConfig: {
            content: {
              // prevent flaky tests / general test issues due to parallel execution
              // by using a separate/unique database file for each test so the tests do not run / modify the same database
              _localDatabase: {
                type: "sqlite",
                // see: https://playwright.dev/docs/test-parallel#worker-index-and-parallel-index
                filename: `.data/playwright/playwright-${process.env.TEST_WORKER_INDEX}.sqlite`,
              },
            },
          },
        },
      },
    },
    options?.overrides ?? {},
  );
};
