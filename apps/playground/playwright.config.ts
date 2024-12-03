import { defineConfig, devices } from "@playwright/test";

// NOTE: You need to run "pnpm build" before running the tests

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // fail build on CI if we left test.only in the source code
  retries: process.env.CI ? 1 : 0, // retry on CI only
  /* In the CI pipeline it generates dot (for the stdout) and blob reports, locally only a html report is generated */
  reporter: process.env.CI ? [["dot"], ["blob"]] : [["html", { open: "never" }]],
  use: {
    trace: process.env.CI ? "retain-on-failure" : "off",
    video: process.env.CI ? "retain-on-failure" : "off",
  },
  /* Configure projects for major browsers */
  projects: [
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm preview --port 3200 --mode test",
    port: 3200,
    reuseExistingServer: false,
  },
});
