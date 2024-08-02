import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxHeadline from "./OnyxHeadline.vue";
import { HEADLINE_TYPES } from "./types";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Headline",
    columns: ["default"],
    rows: HEADLINE_TYPES,
    component: (column, row) => <OnyxHeadline is={row}>Hello World</OnyxHeadline>,
    beforeScreenshot: async (component) => {
      await expect(component).toContainText("Hello World");
    },
  });
});
