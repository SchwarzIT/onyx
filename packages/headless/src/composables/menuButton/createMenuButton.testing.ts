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
  menuItems: Locator;
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
  await expect(
    button,
    'navigation menu should have an "aria-haspopup" attribute set to true',
  ).toHaveAttribute("aria-haspopup", "true");

  await expect(button).toBeVisible();

  // ensure correct navigation menu aria attributes
  await expect(button, "button must have arial-controls attribute").toHaveAttribute(
    "aria-controls",
  );
  await expect(button, "button must have aria-expanded attribute").toHaveAttribute(
    "aria-expanded",
    "false",
  );

  await page.keyboard.press("Tab");
  await expect(button, "Button should be focused when pressing tab key").toBeFocused();

  const firstItem = menuItems.first();
  const secondItem = menuItems.nth(1);
  const lastItem = menuItems.last();

  await page.keyboard.press("Enter");
  await expect(button, "button must have aria-expanded attribute").toHaveAttribute(
    "aria-expanded",
    "true",
  );
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

  await page.keyboard.press("Tab");
  await expect(button, "should close flyout when tabbing out of component").toHaveAttribute(
    "aria-expanded",
    "false",
  );
};
