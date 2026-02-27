import { iconPlaceholder } from "@sit-onyx/icons";
import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxEditorToolbarAction from "./OnyxEditorToolbarAction.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Editor toolbar action",
    columns: ["default", "active", "disabled"],
    rows: ["default", "hover", "focus-visible", "active"],
    component: (column) => (
      <OnyxEditorToolbarAction
        style={{ margin: "2rem" }}
        label="Label"
        icon={iconPlaceholder}
        active={column === "active"}
        disabled={column === "disabled"}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
        if (row !== "default" && column !== "disabled") {
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});
