import { expect, test } from "../../playwright/a11y";
import type { Locator } from "@playwright/test";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxInfoTooltip from "./OnyxInfoTooltip.vue";

test("should trigger with hover", async ({ mount, page }) => {
  // ARRANGE
  let component = await mount(OnyxInfoTooltip, {
    props: {
      text: "Test tooltip",
    },
  });

  let tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeHidden();

  // ACT
  await component.hover();

  // ASSERT
  await expect(tooltip).toBeHidden(); // should use debounce to show tooltip only after a short delay
  await expect(tooltip).toBeVisible();

  await page.mouse.move(0, 0);
  await expect(tooltip).toBeVisible(); // should use debounce to hide tooltip only after a short delay
  await expect(tooltip).toBeHidden();

  // ACT
  await component.unmount();
  component = await mount(<OnyxInfoTooltip text="Test tooltip" />);
  tooltip = component.getByRole("tooltip");

  await page.keyboard.press("Tab");

  // ASSERT
  await expect(tooltip).toBeVisible();

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expect(tooltip).toBeHidden();
});

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
      const tooltip = page.getByRole("tooltip");

      // set paddings to fit the full tooltip in the screenshot
      await component.evaluate((element) => {
        element.style.padding = `3rem 5rem`;
      });

      await component.hover();

      await isTooltipVisible(tooltip);
    },
  });
});
