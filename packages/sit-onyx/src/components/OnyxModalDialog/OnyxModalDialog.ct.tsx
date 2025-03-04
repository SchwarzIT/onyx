import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";

test("should behave correctly", async ({ mount, makeAxeBuilder, page }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.xs + 1, height: 256 });

  let closeEventCount = 0;

  // ARRANGE
  const component = await mount(<TestWrapperCt onClose={() => closeEventCount++} />);
  const closeButton = component.getByRole("button", { name: "Close dialog" });

  await test.step("default screenshot", async () => {
    // ASSERT
    await expect(page).toHaveScreenshot("default.png");
    // ACT
    await page.getByText("end of content").scrollIntoViewIfNeeded();
    // ASSERT
    await expect(page).toHaveScreenshot("scrolled.png");
  });

  await test.step("accessiblity test", async () => {
    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  await test.step("trigger and handle close event", async () => {
    // ACT
    await closeButton.click();

    // ASSERT
    expect(closeEventCount).toBe(1);

    // ACT
    await page.keyboard.press("Escape");

    // ASSERT
    expect(closeEventCount).toBe(2);
  });
});
