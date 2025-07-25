import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y.js";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import TestWrapper from "../OnyxTooltip/TestWrapper.ct.vue";
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

test("should render with long content", async ({ mount, makeAxeBuilder, page }) => {
  await mount(
    <OnyxDialog label="Label" open>
      {"Test".repeat(64)}
    </OnyxDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder()
    // the interactive/focusable content is provided by the project
    .disableRules(["scrollable-region-focusable"])
    .analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(page).toHaveScreenshot("long-content.png");
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

for (const alignment of ["left", "right"] as const) {
  test(`should align ${alignment}`, async ({ mount, page, makeAxeBuilder }) => {
    await page.setViewportSize({ width: 256, height: 512 });

    // ARRANGE
    await mount(
      <OnyxDialog label="Label" alignment={alignment} open modal>
        Content
      </OnyxDialog>,
    );

    // ASSERT
    await expect(page).toHaveScreenshot(`alignment-${alignment}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}

test("should close correctly when clicking outside the dialog", async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({ width: 512, height: 1028 });

  let closeCount = 0;

  await mount(
    <OnyxDialog label="Label" open modal onClose={() => closeCount++}>
      Example modal dialog
      <OnyxSelect
        label="Select"
        listLabel="List label"
        options={Array.from({ length: 32 }, (_, index) => ({
          label: `Option ${index + 1}`,
          value: index + 1,
        }))}
      />
    </OnyxDialog>,
  );

  const dialog = page.getByRole("dialog", { name: "Label" });
  const select = dialog.getByLabel("Select", { exact: true });

  // ASSERT
  await expect(dialog).toBeVisible();

  // ACT
  await select.click();
  await dialog.getByRole("option", { name: "Option 1", exact: true }).click();

  // ASSERT
  await expect(select).toHaveValue("Option 1");
  await expect(
    () => expect(closeCount).toBe(0),
    "should not close when clicking inside the select flyout",
  ).toPass();

  // ACT
  await page.mouse.click(1, 1);

  // ASSERT
  await expect(
    () => expect(closeCount).toBe(1),
    "should close when clicking the backdrop",
  ).toPass();
});

test("tooltip inside dialog", async ({ mount, makeAxeBuilder, page }) => {
  await mount(
    <OnyxDialog label="Label" open modal>
      <TestWrapper text="Test tooltip" open="hover" />
    </OnyxDialog>,
  );

  // accessibility tests
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations, "should pass accessibility checks").toEqual([]);

  await expect(page).toHaveScreenshot("with-tooltip.png");
});
