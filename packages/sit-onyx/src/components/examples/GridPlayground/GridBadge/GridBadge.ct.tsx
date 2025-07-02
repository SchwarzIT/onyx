import { expect, test } from "../../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots.js";
import GridBadge from "../GridBadge/GridBadge.vue";

test.describe("screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Grid badge",
    columns: ["default"],
    rows: ["info", "warning", "danger"],
    component: (column, row) => <GridBadge label="Label" value="value" color={row} />,
    hooks: {
      beforeEach: async (component) => {
        await expect(component.getByLabel("Label")).toBeAttached();
      },
    },
  });
});
