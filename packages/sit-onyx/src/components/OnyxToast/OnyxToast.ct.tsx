import { expect, test } from "../../playwright/a11y";
import { ONYX_BREAKPOINTS } from "../../types";
import PlaywrightTestWrapper from "./PlaywrightTestWrapper.vue";

Object.entries(ONYX_BREAKPOINTS).forEach(([breakpoint, width]) => {
  test(`should render (${breakpoint})`, async ({ mount, makeAxeBuilder, page }) => {
    await page.setViewportSize({ width, height: 512 });

    // ARRANGE
    const component = await mount(<PlaywrightTestWrapper />);

    // ASSERT
    await expect(page).toHaveScreenshot(`breakpoint-${breakpoint}.png`);

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
});
