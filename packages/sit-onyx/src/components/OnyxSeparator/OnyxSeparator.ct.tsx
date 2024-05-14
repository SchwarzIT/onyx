import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxSeparator from "./OnyxSeparator.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Separator",
    columns: ["default"],
    rows: ["default"],
    component: () => <OnyxSeparator />,
    beforeScreenshot: async (component) => {
      await expect(component.getByRole("separator")).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
    },
  });
});
