import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxFilterBadge from "./OnyxFilterBadge.vue";

test.describe("Screenshot tests", () => {
  const state = ["default", "hover", "focus-visible", "active"];
  executeMatrixScreenshotTest({
    name: "Filter Badge",
    columns: DENSITIES,
    rows: state,
    component: (column, row) => (
      <OnyxFilterBadge
        label="Badge"
        density={column}
        active={row === "active"}
        style={{ margin: "0 3rem 2rem 0" }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ page, component, state: row });
      },
    },
  });
});
