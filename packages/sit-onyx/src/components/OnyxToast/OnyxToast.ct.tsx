import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y.js";
import PlaywrightTestWrapper from "./PlaywrightTestWrapper.ct.vue";

Object.entries(ONYX_BREAKPOINTS).forEach(([breakpoint, width]) => {
  test(`should render (${breakpoint})`, async ({ mount, makeAxeBuilder, page }) => {
    await page.setViewportSize({ width, height: 512 });

    // ARRANGE
    const component = await mount(<PlaywrightTestWrapper />);

    // ASSERT
    await expect(page).toHaveScreenshot(`breakpoint-${breakpoint}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
    await expect(component).toContainText("Example toast 1");

    // ACT
    await component.getByLabel("Close").first().click();

    // ASSERT
    await expect(component).not.toContainText("Example toast 1");
  });
});
