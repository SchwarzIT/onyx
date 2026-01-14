import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxFilterBadge from "./OnyxFilterBadge.vue";

test.describe("Screenshot tests", () => {
  const state = ["default", "hover", "focus", "active"];
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
      beforeEach: async (component, _page, _column, row) => {
        const badge = component.getByRole("button", { name: "Badge" });
        if (row === "hover") await badge.hover();
        if (row === "focus") await badge.focus();
      },
    },
  });
});
