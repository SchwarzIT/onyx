import { defineOnyxPlaywrightConfigCT } from "@sit-onyx/shared/playwright.config.base";

export default defineOnyxPlaywrightConfigCT({
  overrides: {
    timeout: 45 * 1000,
  },
});
