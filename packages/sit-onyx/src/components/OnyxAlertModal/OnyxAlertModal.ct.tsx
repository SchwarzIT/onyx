import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { ONYX_BREAKPOINTS } from "../../utils/breakpoints.js";
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

test("should behave correctly", async ({ mount, page }) => {
  const onOpenUpdate = createEmitSpy<typeof TestWrapperCt, "onUpdate:open">();

  // ARRANGE
  const component = await mount(<TestWrapperCt onUpdate:open={onOpenUpdate} />);
  const closeButton = component.getByRole("button", { name: "Close dialog" });
  const dialog = page.getByRole("alertdialog");

  // ASSERT
  await expect(dialog).toBeVisible();

  // ACT
  await closeButton.click();

  // ASSERT
  await expectEmit(onOpenUpdate, 1, [false]);
  await expect(dialog).toBeVisible();
});

test("should handle nonDismissible", async ({ mount, page }) => {
  // ARRANGE
  const onOpenUpdate = createEmitSpy<typeof TestWrapperCt, "onUpdate:open">();
  const component = await mount(TestWrapperCt, {
    props: {
      "onUpdate:open": onOpenUpdate,
    },
  });

  const closeButton = component.getByRole("button", { name: "Close" });

  // ASSERT
  await expect(component).toBeVisible();
  await expect(closeButton).toBeVisible();

  // ACT
  await component.update({ props: { nonDismissible: true } });

  // ASSERT
  await expect(closeButton).toBeHidden();

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expectEmit(onOpenUpdate, 0);

  // ACT
  await component.update({ props: { nonDismissible: false } });

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expectEmit(onOpenUpdate, 1, [false]);
});
