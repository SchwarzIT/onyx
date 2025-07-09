import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxFilterTag from "./OnyxFilterTag.vue";

test.describe("Screenshot tests", () => {
  const state = ["default", "hover", "focus", "active"];
  executeMatrixScreenshotTest({
    name: "Tag",
    columns: DENSITIES,
    rows: state,
    component: (column, row) => (
      <OnyxFilterTag
        label="Tag"
        density={column}
        active={row === "active"}
        style={{ margin: "0 3rem 2rem 0" }}
      />
    ),
    hooks: {
      beforeEach: async (component, _page, _column, row) => {
        const tag = component.getByRole("button", { name: "Tag" });
        if (row === "hover") {
          await tag.hover();
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (row === "focus") await tag.focus();
      },
    },
  });
});
