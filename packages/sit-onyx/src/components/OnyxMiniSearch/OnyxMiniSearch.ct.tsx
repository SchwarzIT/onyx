import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxMiniSearch from "./OnyxMiniSearch.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Mini search",
    columns: DENSITIES,
    rows: ["default", "filled", "long"],
    component: (column, row) => {
      let modelValue = row === "filled" ? "Filled value" : undefined;
      if (row === "long") modelValue = "Test".repeat(8);
      return <OnyxMiniSearch density={column} label="Label" modelValue={modelValue} />;
    },
    hooks: {
      beforeEach: async (component) => {
        await component.evaluate((element) => {
          document.body.style.backgroundColor = "var(--onyx-color-base-background-tinted)";
          element.style.width = "200px";
        });
      },
    },
  });
});
