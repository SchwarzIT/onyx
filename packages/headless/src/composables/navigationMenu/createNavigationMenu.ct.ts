import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type NavigationMenuTestingOptions = {
  /**
   * Playwright page.
   */
  page: Page;
  /**
   * Locator for the navigation menu element.
   */
  navigationMenu: Locator;
  /**
   * List items (at least 3).
   */
  list: Locator;
};

/**
 * Playwright utility for executing accessibility testing for a navigation menu.
 * Will check aria attributes and keyboard shortcuts as defined in https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/.
 */
export const navigationMenuTesting = async ({ navigationMenu }: NavigationMenuTestingOptions) => {
  const itemId = await navigationMenu.getAttribute("label");
  expect(itemId).toBeDefined();
  await expect(
    navigationMenu,
    "navigation menu should have set the list ID to the aria-controls",
  ).toHaveAttribute("aria-controls", itemId!);

  await expect(navigationMenu).toBeVisible();

  // ensure correct navigation menu aria attributes
  await expect(
    navigationMenu,
    'flyout menu must have an "aria-expanded" attribute set to false',
  ).toHaveAttribute("aria-expanded", "false");

  navigationMenu.click();

  await expect(
    navigationMenu,
    'flyout menu must have an "aria-expanded" attribute set to true',
  ).toHaveAttribute("aria-expanded", "true");
};
