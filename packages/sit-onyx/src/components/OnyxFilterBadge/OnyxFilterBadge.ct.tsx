import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxFilterBadge from "./OnyxFilterBadge.vue";

test.describe("Screenshot tests", () => {
  const state = ["default", "hover", "focus-visible", "selected"];
  executeMatrixScreenshotTest({
    name: "Filter badge",
    columns: DENSITIES,
    rows: state,
    component: (column, row) => (
      <OnyxFilterBadge
        label="Badge"
        density={column}
        active={row === "active"}
        style={{ margin: "2rem" }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const badge = component.getByRole("button", { name: "Badge" });
        await useFocusStateHooks({ page, component: badge, state: row });

        if (row === "hover" || row === "focus-visible") {
          // ensure the tooltip is visible in the screenshot
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});
