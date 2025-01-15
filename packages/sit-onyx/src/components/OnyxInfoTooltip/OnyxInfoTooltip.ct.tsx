import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxInfoTooltip from "./OnyxInfoTooltip.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Info Tooltip",
    columns: ["default", "long-text", "bottom"],
    rows: ["default", "focus-visible", "hover"],
    component: (column, row) => {
      return (
        <OnyxInfoTooltip
          style={{ padding: `3rem 5rem` }} // set paddings to fit the full tooltip in the screenshot
          text={column === "long-text" ? "Lorem ipsum dolor sit amet " : "Test tooltip"}
          position={column === "bottom" ? "bottom" : "top"}
          open={row === "hover" ? "hover" : "click"}
        />
      );
    },
    hooks: {
      // set component size to fully include the tooltip
      beforeEach: async (component, page, _column, _row) => {
        const tooltip =
          _row === "hover"
            ? page.getByRole("tooltip", { includeHidden: true })
            : page.getByRole("status");

        if (_row === "default") {
          await component.click();
        } else if (_row === "focus-visible") {
          await page.keyboard.press("Tab");
          await page.keyboard.press("Space");
        } else if (_row === "hover") {
          await component.hover();
        }

        await expect(tooltip).toBeVisible();
      },
    },
  });
});
