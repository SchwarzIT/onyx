import { menuButtonTesting } from "@sit-onyx/headless/playwright";
import { expect, test } from "../../../../playwright/a11y";
import { type MatrixScreenshotTestOptions } from "../../../../playwright/screenshots";
import TestWrapperCt from "./TestWrapper.ct.vue";

/**
 * TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
 */
const disabledAccessibilityRules: MatrixScreenshotTestOptions["disabledAccessibilityRules"] = [
  "color-contrast",
];

test("check accessibility", async ({ page, mount, makeAxeBuilder }) => {
  await mount(TestWrapperCt, {
    props: { label: "Choose application language" },
  });

  await menuButtonTesting({
    page,
    button: page.getByRole("button"),
    menu: page.locator("ul"),
    menuItems: page.getByRole("menuitem"),
  });

  const results = await makeAxeBuilder().disableRules(disabledAccessibilityRules).analyze();
  expect(results.violations).toEqual([]);
});

test("check custom interactivity", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(TestWrapperCt, {
    props: { label: "Choose application language" },
  });
  const menu = page.locator("ul");
  const menuItems = page.getByRole("menuitem");

  // ASSERT
  await expect(menu).toBeHidden();

  // ACT
  await component.hover();

  // ASSERT
  await expect(menu).toBeVisible();
  for (const item of await menuItems.all()) {
    await expect(item).toBeEnabled();
  }
});
