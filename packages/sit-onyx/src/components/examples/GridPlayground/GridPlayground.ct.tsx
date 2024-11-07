import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../../playwright/a11y";
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
  const columnCountStepper = dialog.getByLabel("Default number of columns");
  await expect(dialog).toBeVisible();

  // ACT
  await columnCountStepper.fill("4");
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  await expect(dialog).toBeHidden();

  // ACT (add a second grid element)
  await page.getByLabel("Add grid element").click();

  await expect(columnCountStepper, "should reset stepper when being re-opened").toHaveValue("");

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
  await expect(
    columnCountStepper,
    "should fill stepper with current grid element value",
  ).toHaveValue("2");

  // ACT
  await columnCountStepper.fill("4");
  await dialog.getByRole("button", { name: "Apply" }).click();

  await page.getByRole("document").click({ position: { x: 0, y: 0 } }); // reset mouse (needed for webkit screenshot)

  // ASSERT
  await expect(page).toHaveScreenshot("filled.png");

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

  await expect(page.getByLabel("Margin", { exact: true })).toContainText("4rem");
  await expect(page.getByLabel("Columns", { exact: true })).toContainText("16");
  await expect(page.getByLabel("Gutter", { exact: true })).toContainText("2rem");

  // ACT
  await page.setViewportSize({ width: 800, height: 1080 });

  // ASSERT
  await expect(
    page.getByRole("heading", { name: "Your current breakpoint: sm (800px)" }),
  ).toBeVisible();

  await expect(page.getByLabel("Margin", { exact: true })).toContainText("2rem");
  await expect(page.getByLabel("Columns", { exact: true })).toContainText("8");
  await expect(page.getByLabel("Gutter", { exact: true })).toContainText("1.5rem");
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
  await expect(
    alignmentGroup.getByLabel("left"),
    "should disable alignment when max width is none",
  ).toBeDisabled();
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
