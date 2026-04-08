import { defineOnyxPlaywrightConfigCT } from "@sit-onyx/shared/playwright.config.base";
import { fileURLToPath } from "node:url";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineOnyxPlaywrightConfigCT({
  browsers: "single",
  overrides: {
    use: {
      ctViteConfig: {
        resolve: {
          alias: {
            "#mdc-imports": getFilePath("./stub-mdc-imports.js"),
            "#mdc-configs": getFilePath("./stub-mdc-imports.js"),
          },
        },
      },
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
