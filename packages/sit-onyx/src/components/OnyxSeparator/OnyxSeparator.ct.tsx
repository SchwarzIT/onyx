import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { ORIENTATIONS } from "../../types/index.js";
import OnyxSeparator from "./OnyxSeparator.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Separator",
    columns: ["default"],
    rows: ORIENTATIONS,
    component: (column, row) => <OnyxSeparator orientation={row} />,
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await expect(component.getByRole("separator")).toHaveAttribute("aria-orientation", row);
      },
    },
  });
});
