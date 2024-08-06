import { expect, test } from "../../../../playwright/a11y";
import EditGridElementDialog, { type GridElementConfig } from "./EditGridElementDialog.vue";

test("should behave correctly", async ({ mount, makeAxeBuilder, page }) => {
  const submitEvents: GridElementConfig[] = [];
  let closeEvents = 0;

  // ARRANGE
  await page.setViewportSize({ width: 512, height: 768 });
  await mount(
    <EditGridElementDialog
      open
      onSubmit={(element) => submitEvents.push(element)}
      onClose={() => closeEvents++}
    />,
  );
  const dialog = page.getByRole("dialog", { name: "Column configuration" });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder()
    .disableRules(
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      ["color-contrast"],
    )
    .analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(page).toHaveScreenshot("default.png");
  await expect(dialog).toBeVisible();

  const columnCountStepper = dialog.getByLabel("Default column count");
  await expect(columnCountStepper).toBeFocused();
  await expect(columnCountStepper).toHaveAttribute("min", "1");
  await expect(columnCountStepper).toHaveAttribute("max", "20");

  const smBreakpointStepper = dialog.getByLabel("Column count for breakpoint sm");
  await expect(smBreakpointStepper).toBeDisabled();

  // ACT
  await columnCountStepper.fill("4");
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expect(submitEvents).toStrictEqual([{ columnCount: 4, breakpoints: {} }]);
  expect(closeEvents).toBe(0);

  // ACT
  await smBreakpointStepper.fill("2");

  // ASSERT
  await expect(dialog.getByLabel("SM breakpoint")).toBeChecked();

  // ACT
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expect(submitEvents).toStrictEqual([
    { columnCount: 4, breakpoints: {} },
    { columnCount: 4, breakpoints: { sm: 2 } },
  ]);

  // ACT
  await dialog.getByLabel("MD breakpoint").check();

  // ASSERT
  await expect(dialog.getByLabel("Column count for breakpoint md")).toHaveValue("4");

  // ACT
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expect(submitEvents).toStrictEqual([
    { columnCount: 4, breakpoints: {} },
    { columnCount: 4, breakpoints: { sm: 2 } },
    { columnCount: 4, breakpoints: { sm: 2, md: 4 } },
  ]);

  // ACT
  await dialog.getByRole("button", { name: "Cancel" }).click();

  // ASSERT
  expect(closeEvents).toBe(1);

  // ACT
  await page.getByRole("document").hover(); // reset hover

  // ASSERT
  await expect(page).toHaveScreenshot("filled.png");
});
