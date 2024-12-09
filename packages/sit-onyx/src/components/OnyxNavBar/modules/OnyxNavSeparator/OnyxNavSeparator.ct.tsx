import { expect, test } from "../../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots";
import OnyxNavSeparator from "./OnyxNavSeparator.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Nav separator",
    columns: ["default"],
    rows: ["default"],
    component: () => <OnyxNavSeparator />,
    hooks: {
      beforeEach: async (component) => {
        await expect(component.getByRole("separator")).toHaveAttribute(
          "aria-orientation",
          "vertical",
        );
      },
    },
  });
});
