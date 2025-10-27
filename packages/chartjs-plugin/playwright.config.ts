import { defineOnyxPlaywrightConfigCT } from "@sit-onyx/shared/playwright.config.base";

export default defineOnyxPlaywrightConfigCT({
  browsers: "single",
  overrides: {
    expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  },
});
