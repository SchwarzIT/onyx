import { defineConfig, devices } from "@playwright/experimental-ct-vue";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src/components",
  snapshotDir: "./playwright/snapshots",
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // fail build on CI if we left test.only in the source code
  retries: process.env.CI ? 2 : 0, // retry on CI only
  workers: process.env.CI ? 1 : undefined, // opt out of parallel tests on CI
  reporter: [["html", { open: "never" }]],
  use: {
    trace: process.env.CI ? "retain-on-failure" : "off",
    video: process.env.CI ? "retain-on-failure" : "off",
    ctPort: 3100,
    ctViteConfig: {
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
    },
  },
  /* Configure projects for major browsers */
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
