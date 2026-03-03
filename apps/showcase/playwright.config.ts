import { defineOnyxPlaywrightConfigNuxt } from "@sit-onyx/shared/playwright.config.base";

export default defineOnyxPlaywrightConfigNuxt({
  browsers: "single",
  overrides: {
    timeout: 2 * 60 * 1000,
  },
});
