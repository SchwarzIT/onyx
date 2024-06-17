import { expect, test } from "../../playwright/a11y";
import OnyxColorSchemeDialog from "./OnyxColorSchemeDialog.vue";
import type { ColorSchemeValue } from "./types";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 512, height: 640 });
});

test("Screenshot tests", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(<OnyxColorSchemeDialog modelValue="light" open style={{ width: "48rem" }} />);

  // ASSERT
  await expect(page).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder()
    .disableRules([
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      "color-contrast",
    ])
    .analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ACT
  await page.setViewportSize({ width: 384, height: 832 });

  // ASSERT
  await expect(page).toHaveScreenshot("mobile.png");
});

test("should behave correctly", async ({ mount, page }) => {
  const updateModelValueEvents: ColorSchemeValue[] = [];
  let closeEventCount = 0;

  // ARRANGE
  const component = await mount(
    <OnyxColorSchemeDialog
      modelValue="light"
      open
      style={{ width: "48rem" }}
      onUpdate:modelValue={(value) => updateModelValueEvents.push(value)}
      onClose={() => closeEventCount++}
    />,
  );

  // ASSERT (should be focussed initially)
  await expect(component.getByLabel("Light")).toBeFocused();

  // ACT
  await page.keyboard.press("ArrowDown");

  // ASSERT
  await expect(component.getByLabel("Dark")).toBeFocused();

  // ACT
  await page.keyboard.press("Enter");

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark"]);
  expect(closeEventCount).toBe(1);

  // ACT
  await component.getByLabel("Auto").click();

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark"]);

  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark", "auto"]);
  expect(closeEventCount).toBe(2);

  // ACT
  await component.getByLabel("Light").click();
  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark", "auto", "light"]);
  expect(closeEventCount).toBe(3);

  // ACT
  await component.getByRole("button", { name: "Cancel" }).click();

  // ASSERT
  expect(closeEventCount).toBe(4);

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  expect(closeEventCount).toBe(5);
});
