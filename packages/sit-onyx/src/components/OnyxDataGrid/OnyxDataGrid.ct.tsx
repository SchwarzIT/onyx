import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";
import TestWrapperWithColumnTypesCt from "./TestWrapperWithColumnTypes.ct.vue";

test("should behave correctly", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  const moreActionsBtn = component.getByLabel("Toggle column actions").first();
  const flyout = component.getByLabel('Choose an action for the column "name"');

  // ACT
  await moreActionsBtn.click();

  // ASSERT
  await expect(flyout).toBeVisible();
  await expect(component).toHaveScreenshot("with-header-interactions.png");
});

test("should render different types of columns", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapperWithColumnTypesCt />);

  await expect(component).toHaveScreenshot("with-different-column-types.png");
});
