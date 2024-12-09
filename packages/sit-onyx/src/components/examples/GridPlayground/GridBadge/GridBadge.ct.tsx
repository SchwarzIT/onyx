import { expect, test } from "../../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots";
import GridBadge from "../GridBadge/GridBadge.vue";

test.describe("screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Grid badge",
    columns: ["default"],
    rows: ["info", "warning", "danger"],
    component: (column, row) => <GridBadge label="Label" value="value" color={row} />,
    beforeScreenshot: async (component) => {
      await expect(component.getByLabel("Label")).toBeAttached();
    },
  });
});
