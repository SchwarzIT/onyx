import { test } from "../../playwright/a11y.js";
import { POPOVER_POSITION_TEST_CASES } from "../../playwright/index.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import TestCase from "./TestCase.ct.vue";

for (const value in POPOVER_POSITION_TEST_CASES) {
  test.describe(`Screenshot tests (${value})`, () => {
    executeMatrixScreenshotTest({
      name: `Support popover (${value})`,
      columns: ["default", "unsupported-popover-api"],
      rows: POPOVER_POSITION_TEST_CASES[value as keyof typeof POPOVER_POSITION_TEST_CASES],
      component: (column, row) => (
        <TestCase
          label="Label"
          position={row}
          open
          forceUnsupported={column === "unsupported-popover-api"}
        />
      ),
    });
  });
}
