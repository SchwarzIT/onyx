import { expect } from "@playwright/experimental-ct-vue";
import type { Locator } from "@playwright/test";

export type NavigationMenuTestingOptions = {
  /**
   * Locator for the navigation landmark.
   */
  nav: Locator;
  /**
   * Locator for the button elements.
   */
  buttons: Locator;
};

/**
 * Playwright utility for executing accessibility testing for a navigation menu.
 * Will check aria attributes and keyboard shortcuts as defined in https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
 */
export const navigationTesting = async ({ nav, buttons }: NavigationMenuTestingOptions) => {
  /**
   * Navigation landmark should have label
   */
  await expect(nav).toHaveRole("navigation");
  await expect(nav).toHaveAttribute("aria-label");
  /**
   * Disclosure buttons should have aria attributes
   */
  for (const button of await buttons.all()) {
    await expect(button, "button must have arial-controls attribute").toHaveAttribute(
      "aria-controls",
    );
    await expect(button, "button must have aria-expanded attribute").toHaveAttribute(
      "aria-expanded",
    );
  }
  /**
   * Move keyboard focus among top-level buttons using tab
   */
  await nav.press("Tab");
  await expect(buttons.nth(0)).toBeFocused();
  await nav.press("Tab");
  await expect(buttons.nth(1)).toBeFocused();
  await nav.press("Shift+Tab");
  await expect(buttons.nth(0)).toBeFocused();
  /**
   * Move keyboard focus among top-level buttons using arrow keys
   */
  await nav.press("ArrowRight");
  await expect(buttons.nth(1)).toBeFocused();
  await nav.press("ArrowLeft");
  await expect(buttons.nth(0)).toBeFocused();
};
