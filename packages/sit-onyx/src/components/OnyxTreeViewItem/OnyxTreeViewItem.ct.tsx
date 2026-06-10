import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTreeViewItem from "./OnyxTreeViewItem.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Tree view item",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "active", "disabled", "open"],
    component: (column, row) => (
      <ul role="tree">
        <OnyxTreeViewItem
          label="Test Label"
          density={column}
          active={row === "active"}
          disabled={row === "disabled"}
          open={row === "open"}
        >
          Child content
        </OnyxTreeViewItem>
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const item = component.getByRole("treeitem", { name: "Test Label" });
        await useFocusStateHooks({ component: item, page, state: row });
      },
    },
  });
});
