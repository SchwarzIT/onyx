import { expect, test } from "../../playwright/a11y";
import PlaywrightTestWrapper from "./PlaywrightTestWrapper.vue";

test("should render", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  const component = await mount(<PlaywrightTestWrapper />);

  // ASSERT
  await expect(page).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder()
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    .disableRules(["color-contrast"])
    .analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component).toContainText("Example toast 1");

  // ACT
  await component.getByLabel("Close").nth(4).click();

  // ASSERT
  await expect(component).not.toContainText("Example toast 1");
});
