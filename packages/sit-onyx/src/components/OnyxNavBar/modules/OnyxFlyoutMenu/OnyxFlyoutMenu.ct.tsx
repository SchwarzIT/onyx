import { menuButtonTesting } from "@sit-onyx/headless/playwright";
import { expect, test } from "../../../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";
import TestWrapperManyCt from "./TestWrapperMany.ct.vue";

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
});
