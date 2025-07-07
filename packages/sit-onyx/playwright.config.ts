import { defineConfig } from "@playwright/experimental-ct-vue";
import { PLAYWRIGHT_BASE_CONFIG } from "@sit-onyx/shared/playwright.config.base";

export const vuePluginOptions = {
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
  ...PLAYWRIGHT_BASE_CONFIG,
  testDir: "./src",
});
