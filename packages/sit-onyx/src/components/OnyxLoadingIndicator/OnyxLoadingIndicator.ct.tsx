import { test } from "../../playwright-axe";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
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
