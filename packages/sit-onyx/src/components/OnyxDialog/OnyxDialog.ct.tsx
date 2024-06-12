import { expect, test } from "../../playwright/a11y";
import OnyxDialog from "./OnyxDialog.vue";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 128 });
});

test("should render", async ({ mount, makeAxeBuilder }) => {
  const component = await mount(
    <OnyxDialog label="Label" open>
      Content
    </OnyxDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(component).toHaveScreenshot("default.png");
});

test("should render in modal", async ({ mount, makeAxeBuilder }) => {
  const component = await mount(
    <OnyxDialog label="Label" open modal>
      Content
    </OnyxDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(component).toHaveScreenshot("modal.png");
});
