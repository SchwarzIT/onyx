import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";

/**
 * Matrix screenshot hooks for illustrations screenshot tests which will apply light/dark theme settings correctly.
 */
export const illustrationScreenshotHooks: MatrixScreenshotTestOptions["hooks"] = {
  beforeEach: async (component, page, column) => {
    if (column !== "dark") return;

    await component.evaluate((element) => {
      element.style.backgroundColor = "var(--onyx-color-base-background-blank)";
      element.classList.add("dark");
    });
  },
};
