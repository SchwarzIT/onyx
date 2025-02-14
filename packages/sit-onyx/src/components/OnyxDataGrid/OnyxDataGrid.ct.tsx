import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";
import TestWrapperWithColumnTypesCt from "./TestWrapperWithColumnTypes.ct.vue";

test("OnyxDataGrid", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  await test.step("should display header labels as expected", async () => {
    // ASSERT
    const headers = await component.locator("th").all();
    expect(headers).toHaveLength(3);
    await expect(component).toHaveScreenshot("data-grid-with-header-labels.png");
  });

  await test.step("should support header actions", async () => {
    // ARRANGE
    const moreActionsBtn = component.getByLabel("Toggle column actions").last();
    const flyout = component.getByLabel('Choose an action for the column "Day of Birth"');

    // ACT
    await moreActionsBtn.click();

    // ASSERT
    await expect(flyout).toBeVisible();
    await expect(component).toHaveScreenshot("with-header-interactions.png");
  });
});

test("should render different types of columns", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapperWithColumnTypesCt />);

  await expect(component).toHaveScreenshot("with-different-column-types.png");
});
