import { defineConfig, devices } from '@playwright/test';
import { config as configureDotenv } from 'dotenv';

// Used to load environment variables from .env* files
configureDotenv();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never', outputFolder: '../../playwright-report/integration' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3200',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? 'retain-on-failure' : 'off',
    video: process.env.CI ? 'retain-on-failure' : 'off',

    /* Set the locale to be consistent between different setups */
    locale: 'en-US',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      /** You can define a custom viewport here */
      // viewport: { width: 1920, height: 1080 },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: '../../test-results/integration/',
  snapshotPathTemplate: '{testDir}/{testFileDir}/__snapshots__/{testFileName}/{arg}{ext}',

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm start --port 3200 --mode test',
    cwd: '../../',
    port: 3200,
    reuseExistingServer: false,
    env: {
      // Env variables to use during integration tests
      VITE_AUTH_DISABLED: 'true',
      BACKEND_URI: 'http://localhost:3000',
    },
  },
});
