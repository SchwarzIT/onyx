import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTreeViewItem from "./OnyxTreeViewItem.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "OnyxTreeViewItem",
    columns: DENSITIES,
    rows: ["default", "hover", "focus", "active", "disabled"],
    component: (column, row) => (
      <ul role="tree">
        <OnyxTreeViewItem
          density={column}
          active={row === "active"}
          disabled={row === "disabled"}
          label="Test Label"
        />
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByRole("treeitem", { name: "Test Label" });
        if (row === "hover") await input.hover();
        if (row === "focus") await input.focus();
      },
    },
  });
});
