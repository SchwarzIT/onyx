import { defineConfig, devices, type PlaywrightTestConfig } from "@playwright/experimental-ct-vue";
import vue, { type Options } from "@vitejs/plugin-vue";

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
 * Creates a basic, shared playwright configuration for onyx.
 *
 * @param overrides - Optional config overrides. Will be merged with the default config
 * @see https://playwright.dev/docs/test-configuration
 */
export const defineOnyxPlaywrightConfig = <T>(overrides: PlaywrightTestConfig<T> = {}) => {
  const defaultConfig: PlaywrightTestConfig = {
    /**
     * SCREENSHOTS
     *
     * @see https://playwright.dev/docs/screenshots
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
     * @see https://playwright.dev/docs/test-sharding
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
     * @see https://playwright.dev/docs/test-retries
     */
    timeout: 20 * 1000,
    forbidOnly: !!process.env.CI, // fail build on CI if we left test.only in the source code
    retries: process.env.CI ? 1 : 0, // retry on CI only

    /**
     * REPORTERS
     *
     * @see https://playwright.dev/docs/test-reporters
     */
    /* In the CI pipeline it generates dot (for the stdout) and blob reports, locally only a html report is generated */
    reporter: process.env.CI ? [["dot"], ["blob"]] : [["html", { open: "never" }]],
    use: {
      trace: process.env.CI ? "retain-on-failure" : "off",
      video: process.env.CI ? "retain-on-failure" : "off",
      ctPort: 3100,
      ctViteConfig: {
        plugins: [vue(vuePluginOptions)],
      },
    },

    /**
     * BROWSERS
     *
     * @see https://playwright.dev/docs/test-projects
     */
    projects: [
      { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
      { name: "firefox", use: { ...devices["Desktop Firefox"] } },
      { name: "webkit", use: { ...devices["Desktop Safari"] } },
    ],
  };

  return defineConfig<T>(defaultConfig as PlaywrightTestConfig<T>, overrides);
};
