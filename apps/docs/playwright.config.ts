import { defineOnyxPlaywrightConfigE2E } from "@sit-onyx/shared/playwright.config.base";

// NOTE: You need to run "pnpm build" before running the tests
export default defineOnyxPlaywrightConfigE2E({
  overrides: {
    expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  },
});
