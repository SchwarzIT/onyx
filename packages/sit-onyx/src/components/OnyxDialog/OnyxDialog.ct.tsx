import { expect, test } from "../../playwright/a11y";
import { ONYX_BREAKPOINTS } from "../../types";
import OnyxDialog from "./OnyxDialog.vue";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 128 });
});

test("should render", async ({ mount, makeAxeBuilder, page }) => {
  await mount(
    <OnyxDialog label="Label" open>
      Content
    </OnyxDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(page).toHaveScreenshot("default.png");
});

test("should render in modal", async ({ mount, makeAxeBuilder, page }) => {
  await mount(
    <OnyxDialog label="Label" open modal>
      Content
    </OnyxDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(page).toHaveScreenshot("modal.png");
});

Object.entries(ONYX_BREAKPOINTS).forEach(([breakpoint, width]) => {
  test(`should render max size ${breakpoint}`, async ({ mount, page }) => {
    await page.setViewportSize({ width, height: 300 });

    await mount(
      <OnyxDialog label="Label" open style={{ width: "100%", height: "100%" }} modal>
        Max size, breakpoint {breakpoint} ({width}px)
      </OnyxDialog>,
    );

    await expect(page).toHaveScreenshot(`breakpoint-${breakpoint}.png`);
  });
});
