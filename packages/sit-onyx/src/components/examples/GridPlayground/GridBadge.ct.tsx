import { expect, test } from "../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../playwright/screenshots";
import GridBadge from "./GridBadge.vue";

test.describe("screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Grid badge",
    columns: ["default"],
    rows: ["info", "warning", "danger"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => <GridBadge label="Label" value="value" color={row} />,
    beforeScreenshot: async (component) => {
      await expect(component.getByLabel("Label")).toBeAttached();
    },
  });
});
