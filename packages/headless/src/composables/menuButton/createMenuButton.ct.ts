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
export const menuButtonTesting = async ({ button, menu }: MenuButtonTestingOptions) => {
  const menuId = await menu.getAttribute("id");
  expect(menuId).toBeDefined();
  await expect(
    button,
    "navigation menu should have set the list ID to the aria-controls",
  ).toHaveAttribute("aria-controls", menuId!);

  await expect(button).toBeVisible();

  // ensure correct navigation menu aria attributes
  await expect(
    button,
    'flyout menu must have an "aria-expanded" attribute set to false',
  ).toHaveAttribute("aria-expanded", "false");

  button.click();

  await expect(
    button,
    'flyout menu must have an "aria-expanded" attribute set to true',
  ).toHaveAttribute("aria-expanded", "true");
};
