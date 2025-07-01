import { menuButtonTesting } from "@sit-onyx/headless/playwright";
import { expect, test } from "../../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots";
import TestWrapperCt from "./TestWrapper.ct.vue";
import TestWrapperManyCt from "./TestWrapperMany.ct.vue";
import TestWrapperNestedCt from "./TestWrapperNested.ct.vue";

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

  const results = await makeAxeBuilder().analyze();
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

  // ACT
  await page.getByRole("menuitem", { name: "Appearance" }).click();

  // ASSERT
  await expect(page.getByRole("dialog", { name: "Change appearance" })).toBeVisible();
});

test("should open on click", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(TestWrapperCt, {
    props: { label: "Choose application language", trigger: "click" },
  });
  const menu = page.locator("ul");
  const menuItems = page.getByRole("menuitem");

  // ASSERT
  await expect(menu).toBeHidden();

  // ACT
  await component.hover();

  // ASSERT
  await expect(menu).toBeHidden();

  // ACT
  await component.click();

  // ASSERT
  await expect(menu).toBeVisible();
  for (const item of await menuItems.all()) {
    await expect(item).toBeEnabled();
  }
  await expect(menu).toHaveScreenshot("flyout-menu.png");
});

test("should open on hover", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(TestWrapperCt, {
    props: { label: "Choose application language", trigger: "hover" },
  });
  const menu = page.getByLabel("Choose application language");

  // ASSERT
  await expect(menu).toBeHidden();

  // ACT
  await component.hover();

  // ASSERT
  await expect(menu).toBeVisible();

  // ACT
  await component.click();

  // ASSERT
  await expect(menu).toBeVisible();

  // ACT
  await page.locator("body").hover();

  // ASSERT
  await expect(menu).toBeHidden();
});

test("should display correctly and allow scrolling for many options", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(TestWrapperManyCt);
  const menu = page.locator("ul");
  const footer = page.getByTestId("footer-content");
  const header = page.getByTestId("header-content");

  // ASSERT
  await expect(menu).toBeHidden();
  await expect(footer).toBeHidden();
  await expect(header).toBeHidden();

  // ACT
  await component.click();
  // Only in Firefox and in the test: There is a weird bug where the menu doesn't initially have the correct height
  // TODO: check if this "fix" is still necessary in later versions
  await component.click();
  await component.click();

  // ASSERT
  await expect(menu).toBeInViewport();
  await expect(footer).toBeInViewport();
  await expect(header).toBeInViewport();
  await expect(menu.getByRole("menuitem", { name: "Option 8" })).toBeInViewport();
  await expect(menu.getByRole("menuitem", { name: "Option 9" })).not.toBeInViewport();

  // ACT
  await menu.getByRole("menuitem", { name: "Option 10" }).scrollIntoViewIfNeeded();

  // ASSERT
  await expect(menu.getByRole("menuitem", { name: "Option 10" })).toBeInViewport();
  await expect(footer).toBeInViewport();
  await expect(header).toBeInViewport();
  await expect(menu).toHaveScreenshot("flyout-menu-scrolled-many.png");
});

test.describe("Disabled Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Disabled Flyout",
    columns: ["default", "disabled"],
    rows: ["default"],
    component: (column, _row) => {
      return (
        <div class="container" style={{ margin: "0 8rem 12rem 0" }}>
          <TestWrapperCt label="test" open={true} disabled={column === "disabled"} />
        </div>
      );
    },
  });
});

test("should behave correctly with nested items (via mouse)", async ({ page, mount }) => {
  // ARRANGE
  await mount(TestWrapperNestedCt, {
    props: { label: "Choose item" },
  });

  const trigger = page.getByRole("button", { name: "Trigger" });
  const firstItem = page.getByRole("menuitem", { name: "Item 1", exact: true });
  const nestedChild = page.getByRole("menuitem", { name: "Item 1.1" });
  const backButton = page.getByRole("menuitem", { name: "Back" });

  // ACT
  await trigger.hover();

  // ASSERT
  await expect(firstItem).toBeVisible();

  // ACT
  await firstItem.hover();

  // ASSERT
  await expect(
    firstItem,
    "should not open nested child on hover, even when flyout trigger is hover",
  ).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Item 1.1" })).toBeHidden();

  // ACT
  await firstItem.click();

  // ASSERT
  await expect(firstItem).toBeHidden();
  await expect(nestedChild).toBeVisible();
  await expect(backButton).toBeVisible();

  // ACT
  await backButton.click();

  // ASSERT
  await expect(firstItem).toBeVisible();
  await expect(nestedChild).toBeHidden();
  await expect(backButton).toBeHidden();
});

test("should behave correctly with nested items (via keyboard)", async ({
  page,
  mount,
  makeAxeBuilder,
}) => {
  // ARRANGE
  await mount(TestWrapperNestedCt, {
    props: { label: "Choose item" },
  });

  const trigger = page.getByRole("button", { name: "Trigger" });
  const menu = page.locator("ul").first();

  // ASSERT
  await menuButtonTesting({
    page,
    button: trigger,
    menu,
    menuItems: page.getByRole("menuitem"),
  });

  const results = await makeAxeBuilder().analyze();
  expect(results.violations).toEqual([]);

  // ACT
  await trigger.click();

  // ASSERT
  await expect(menu).toHaveScreenshot("nested.png");

  // ACT
  await page.keyboard.press("ArrowDown");

  // ASSERT
  await expect(menu).toHaveScreenshot("nested-active.png");
  await expect(page.getByRole("menuitem", { name: "Item 1" })).toBeFocused();

  // ACT
  await page.keyboard.press("ArrowRight");

  // ASSERT
  await expect(menu).toHaveScreenshot("nested-open.png");
  await expect(page.getByRole("menuitem", { name: "Back" })).toBeFocused();

  // ACT
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowRight");

  // ASSERT
  await expect(menu).toHaveScreenshot("nested-open-2.png");
  await expect(page.getByRole("menuitem", { name: "Back" })).toBeFocused();

  // ACT
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("menuitem", { name: "Item 1.2" })).toBeFocused();

  // ACT
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("menuitem", { name: "Back" })).toBeFocused();
  await page.keyboard.press("Enter");

  // ASSERT
  await expect(page.getByRole("menuitem", { name: "Item 1" })).toBeFocused();
});

test("should keep nested children open state when toggling", async ({ page, mount }) => {
  // ARRANGE
  await mount(TestWrapperNestedCt, {
    props: { label: "Choose item", trigger: "click" },
  });

  const trigger = page.getByRole("button", { name: "Trigger" });
  const menu = page.locator("ul").first();

  // ACT
  await trigger.click();
  await page.getByRole("menuitem", { name: "Item 1" }).click();

  // ASSERT
  await expect(page.getByRole("menuitem", { name: "Item 1.1" })).toBeVisible();

  // ACT
  await trigger.click();

  // ASSERT
  await expect(menu).toBeHidden();

  // ACT
  await trigger.click();

  // ASSERT
  await expect(page.getByRole("menuitem", { name: "Item 1.1" })).toBeVisible();
});
