import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxMiniSearch from "./OnyxMiniSearch.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Mini search",
    columns: DENSITIES,
    rows: ["default", "filled"],
    component: (column, row) => (
      <OnyxMiniSearch
        density={column}
        label="Label"
        modelValue={row === "filled" ? "Filled value" : undefined}
      />
    ),
    beforeScreenshot: async (component) => {
      await component.evaluate(() => {
        document.body.style.backgroundColor = "var(--onyx-color-base-background-tinted)";
      });
    },
  });
});
