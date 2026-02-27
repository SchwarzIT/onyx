import { expect, test } from "../../../../playwright/a11y.js";
import ActionsExample from "../../examples/ActionsExample.vue";

test("OnyxDataGridActions should handle responsive overflow", async ({ mount, page }) => {
  await page.setViewportSize({ width: 400, height: 600 });

  // ARRANGE
  const component = await mount(ActionsExample);

  // ASSERT
  await expect(component).toHaveScreenshot("data-grid-actions-full.png");

  await page.setViewportSize({ width: 275, height: 600 });

  await expect(component).toHaveScreenshot("data-grid-actions-truncated.png");

  // ACT
  const moreButton = component.getByRole("button", { name: "+2 More" });
  await moreButton.hover();

  // ASSERT
  await expect(component).toHaveScreenshot("data-grid-actions-more-list-open.png");
});
