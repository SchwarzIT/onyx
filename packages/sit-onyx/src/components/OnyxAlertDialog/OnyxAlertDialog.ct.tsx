import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";

test.describe("Screenshot tests", () => {
  for (const breakpoint of ["2xs", "xs", "sm"] as const) {
    test(`Screenshot ${breakpoint}`, async ({ mount, makeAxeBuilder, page }) => {
      await page.setViewportSize({ width: ONYX_BREAKPOINTS[breakpoint] + 1, height: 256 });

      // ARRANGE
      await mount(<TestWrapperCt />);

      // ASSERT
      await expect(page).toHaveScreenshot(`breakpoint-${breakpoint}.png`);

      // ACT
      const accessibilityScanResults = await makeAxeBuilder().analyze();

      // ASSERT
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

test("should behave correctly", async ({ mount }) => {
  let closeEventCount = 0;

  // ARRANGE
  const component = await mount(<TestWrapperCt onClose={() => closeEventCount++} />);
  const closeButton = component.getByRole("button", { name: "Close dialog" });

  // ACT
  await closeButton.click();

  // ASSERT
  await expect(() => expect(closeEventCount).toBe(1)).toPass();
});
