import { defineConfig, devices } from "@playwright/experimental-ct-vue";
import vue, { Options } from "@vitejs/plugin-vue";

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
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src",
  testMatch: `**/*.ct.tsx`,
  snapshotDir: "./playwright/snapshots",
  // custom snapshotPathTemplate to remove the testFileName folder that we don't want
  snapshotPathTemplate: "{snapshotDir}/{testFileDir}/{arg}-{projectName}-{platform}{ext}",
  // we don't want to update snapshots on the local machine of each developer.
  // if you want to update snapshots for your branch, use the corresponding GitHub action:
  // https://github.com/SchwarzIT/onyx/actions/workflows/playwright-screenshots.yml
  ignoreSnapshots: !process.env.CI,
  updateSnapshots: "none",
  timeout: 20 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // fail build on CI if we left test.only in the source code
  retries: process.env.CI ? 1 : 0, // retry on CI only
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
  /* Configure projects for major browsers */
  projects: [
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
