import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type MenuButtonTestingOptions = {
  /**
   * Playwright page.
   */
  page: Page;
  /**
   * Locator for the button element.
   */
  button: Locator;
  /**
   * Menu, e.g. a `<ul>` element.
   */
  menu: Locator;
  /**
   * List items (at least 3).
   */
  menuItems: Locator[];
};

/**
 * Playwright utility for executing accessibility testing for a navigation menu.
 * Will check aria attributes and keyboard shortcuts as defined in https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links.
 */
export const menuButtonTesting = async ({
  page,
  button,
  menu,
  menuItems,
}: MenuButtonTestingOptions) => {
  const menuId = await menu.getAttribute("id");
  expect(menuId).toBeDefined();
  await expect(
    button,
    "navigation menu should have set the list ID to the aria-controls",
  ).toHaveAttribute("aria-controls", menuId!);

  await expect(
    button,
    'navigation menu should have an "aria-haspopup" attribute set to true',
  ).toHaveAttribute("aria-haspopup", "true");

  await expect(button).toBeVisible();

  // ensure correct navigation menu aria attributes
  await expect(
    button,
    'flyout menu must have an "aria-expanded" attribute set to false',
  ).toHaveAttribute("aria-expanded", "false");

  button.hover();

  await expect(
    button,
    'flyout menu must have an "aria-expanded" attribute set to true',
  ).toHaveAttribute("aria-expanded", "true");

  const firstItem = menuItems[0].getByRole("menuitem");
  const secondItem = menuItems[1].getByRole("menuitem");
  const lastItem = menuItems[menuItems.length - 1].getByRole("menuitem");

  await page.keyboard.press("Tab");
  await expect(button, "Button should be focused when pressing tab key").toBeFocused();

  await button.press("ArrowDown");
  await expect(
    firstItem,
    "First item should be focused when pressing arrow down key",
  ).toBeFocused();

  await menu.press("ArrowDown");
  await expect(
    secondItem,
    "Second item should be focused when pressing arrow down key",
  ).toBeFocused();

  await menu.press("ArrowUp");
  await expect(firstItem, "First item should be focused when pressing arrow up key").toBeFocused();

  await menu.press("ArrowRight");
  await expect(
    secondItem,
    "Second item should be focused when pressing arrow right key",
  ).toBeFocused();

  await menu.press("ArrowLeft");
  await expect(
    firstItem,
    "First item should be focused when pressing arrow left key",
  ).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(button, "Button should be focused when pressing tab key").not.toBeFocused();

  await page.keyboard.press("Tab");

  await menu.press("Home");
  await expect(firstItem, "First item should be focused when pressing home key").toBeFocused();

  await page.keyboard.press("Tab");
  await expect(button, "Button should be focused when pressing tab key").not.toBeFocused();

  await page.keyboard.press("Tab");

  await menu.press("End");
  await expect(lastItem, "Last item should be focused when pressing end key").toBeFocused();
};
