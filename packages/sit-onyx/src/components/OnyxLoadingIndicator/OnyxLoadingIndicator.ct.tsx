import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxLoadingIndicator from "./OnyxLoadingIndicator.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Loading indicator",
    columns: ["dots", "circle"],
    rows: ["default"],
    component: (column) => (
      <OnyxLoadingIndicator
        type={column}
        style={{ color: "var(--onyx-color-text-icons-primary-intense)" }}
      />
    ),
  });
});
