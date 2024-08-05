import { expect, test } from "../../../playwright/a11y";
import { ONYX_BREAKPOINTS } from "../../../types";
import GridPlayground from "./GridPlayground.vue";

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: "body { margin: 0; }",
  });

  await page.setViewportSize({ width: ONYX_BREAKPOINTS.xl, height: 1080 });
});

test("screenshot and accessibility test", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(<GridPlayground />);

  // ASSERT
  await expect(page).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder()
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    .disableRules(["color-contrast"])
    .analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should add/edit grid elements", async ({ mount, page }) => {
  // ARRANGE
  await mount(<GridPlayground />);

  /**
   * Should add new grid element
   */
  // ACT
  await page.getByLabel("Add grid element").click();

  // ASSERT
  const dialog = page.getByRole("dialog", { name: "Column configuration" });
  const columnCountStepper = dialog.getByLabel("Default column count");
  const smBreakpointCheckbox = dialog.getByLabel("SM breakpoint");
  const smBreakpointStepper = dialog.getByLabel("Column count for breakpoint sm");

  await expect(dialog).toBeVisible();

  await expect(smBreakpointCheckbox).toBeDisabled();

  // ACT
  await columnCountStepper.fill("4");

  // ASSERT
  await expect(smBreakpointCheckbox).toBeEnabled();

  // ACT
  await smBreakpointCheckbox.check();

  // ASSERT
  await expect(smBreakpointStepper).toHaveValue("4");

  // ACT
  await smBreakpointStepper.fill("6");
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  await expect(dialog).toBeHidden();

  // ACT (add a second grid element)
  await page.getByLabel("Add grid element").click();

  // ASSERT (test that dialog is reset when used before)
  await expect(columnCountStepper).toHaveValue("");

  // ACT
  await columnCountStepper.fill("2");
  await dialog.getByRole("button", { name: "Apply" }).click();

  /**
   * Should edit grid element
   */
  // ACT
  await page.getByLabel("Edit grid element 2").click();

  // ASSERT
  await expect(dialog).toBeVisible();
  await expect(columnCountStepper).toHaveValue("2");

  // ACT
  await columnCountStepper.fill("4");
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  await expect(page.getByLabel("Edit grid element 2")).not.toHaveClass(/onyx-grid-span-2/);
  await expect(page.getByLabel("Edit grid element 2")).toHaveClass(/onyx-grid-span-4/);

  // ASSERT
  await expect(page).toHaveScreenshot("with-elements.png");

  /**
   * Should delete grid element
   */
  // ACT
  await page.getByLabel("Edit grid element 2").click();
  await dialog.getByRole("button", { name: "Delete" }).click();

  // ASSERT
  await expect(dialog).toBeHidden();
  await expect(page.getByLabel("Edit grid element 2")).toBeHidden();
});

test("should should current grid values", async ({ mount, page }) => {
  // ARRANGE
  await mount(<GridPlayground />);

  // ASSERT
  await expect(
    page.getByRole("heading", { name: "Your current breakpoint: xl (1920px)" }),
  ).toBeVisible();

  await expect(page.getByLabel("Margin")).toContainText("4rem");
  await expect(page.getByLabel("Columns")).toContainText("16");
  await expect(page.getByLabel("Gutter")).toContainText("2rem");

  // ACT
  await page.setViewportSize({ width: 800, height: 1080 });

  // ASSERT
  await expect(
    page.getByRole("heading", { name: "Your current breakpoint: sm (800px)" }),
  ).toBeVisible();

  await expect(page.getByLabel("Margin")).toContainText("2rem");
  await expect(page.getByLabel("Columns")).toContainText("8");
  await expect(page.getByLabel("Gutter")).toContainText("1.5rem");
});

test("should support to configure the grid", async ({ mount, page }) => {
  // ARRANGE
  await mount(<GridPlayground />);

  const maxWidthGroup = page.getByRole("radiogroup", { name: "Max content width" });
  const alignmentGroup = page.getByRole("radiogroup", { name: "Alignment" });
  const columnCountGroup = page.getByRole("radiogroup", { name: "Max columns" });

  // ASSERT
  await expect(maxWidthGroup.getByLabel("none")).toBeChecked();
  await expect(alignmentGroup.getByLabel("left")).toBeChecked();
  await expect(alignmentGroup.getByLabel("left")).toBeDisabled(); // max width is none so alignment should be disabled
  await expect(columnCountGroup.getByLabel("16")).toBeChecked();

  // ACT
  await maxWidthGroup.getByLabel("1440px").check();
  await alignmentGroup.getByLabel("center").check();
  await columnCountGroup.getByLabel("20").check();

  // ASSERT
  await expect(page.locator(".onyx-grid-center.onyx-grid-max-md.onyx-grid-xl-20")).toBeAttached();

  // ACT
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.lg, height: 1080 });

  // ASSERT
  await expect(columnCountGroup).toBeHidden();
});
