import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxTextEditor from "./OnyxTextEditor.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Text editor",
    columns: ["default", "placeholder", "filled"],
    rows: ["default", "hover", "focus"],
    context: {
      // TODO: fix this
      disabledAccessibilityRules: ["aria-allowed-attr", "aria-prohibited-attr"],
    },
    component: (column) => (
      <OnyxTextEditor
        label="Test label"
        modelValue={column === "filled" ? "Filled value" : undefined}
        placeholder={column === "placeholder" ? "Placeholder" : undefined}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await input.hover();
        if (row === "focus") await input.click();
      },
    },
  });
});
