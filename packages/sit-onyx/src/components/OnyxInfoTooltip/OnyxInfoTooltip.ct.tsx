import type { Locator } from "@playwright/test";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxInfoTooltip from "./OnyxInfoTooltip.vue";

test.describe("Screenshot tests", () => {
  const isTooltipVisible = async (tooltip: Locator) => {
    await expect(tooltip).toBeVisible();
  };

  executeMatrixScreenshotTest({
    name: "Info Tooltip",
    columns: ["default", "long-text"],
    rows: ["default", "bottom"],
    component: (column, row) => {
      return (
        <OnyxInfoTooltip
          text={column === "long-text" ? "Lorem ipsum dolor sit amet " : "Test tooltip"}
          position={row === "bottom" ? "bottom" : "top"}
        />
      );
    },
    // set component size to fully include the tooltip
    beforeScreenshot: async (component, page, _column, _row) => {
      const tooltip = page.getByRole("status");

      // set paddings to fit the full tooltip in the screenshot
      await component.evaluate((element) => {
        element.style.padding = `3rem 5rem`;
      });

      await component.click();

      await isTooltipVisible(tooltip);
    },
  });
});
