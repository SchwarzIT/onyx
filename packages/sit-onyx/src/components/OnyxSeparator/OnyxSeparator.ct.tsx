import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ORIENTATIONS } from "../../types";
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
