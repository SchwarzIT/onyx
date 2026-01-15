import { expect } from "@playwright/experimental-ct-vue";
import type { Locator } from "@playwright/test";

export type ToggleButtonTestingOptions = {
  /**
   * Locator for the (toggle) button element.
   */
  button: Locator;
  labelText: string;
  initiallyPressed: boolean;
};

/**
 * Playwright utility for executing accessibility testing for a navigation menu.
 * Will check aria attributes and keyboard shortcuts as defined in https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links.
 */
export const toggleButtonTesting = async ({
  button,
  labelText,
  initiallyPressed,
}: ToggleButtonTestingOptions) => {
  await expect(
    button,
    `button must have 'aria-pressed' attribute to be recognized as toggle button.`,
  ).toHaveAttribute("aria-pressed", String(initiallyPressed));

  await expect(button).toBeVisible();
  await expect(button).toHaveAccessibleName(labelText);

  await button.click();

  await expect(button, `button must toggle 'aria-pressed' attribute after click.`).toHaveAttribute(
    "aria-pressed",
    String(!initiallyPressed),
  );
  await expect(
    button,
    "button must not switch it's label after a state change",
  ).toHaveAccessibleName(labelText);

  await button.press("Space");

  await expect(button, `button must toggle 'aria-pressed' attribute after click.`).toHaveAttribute(
    "aria-pressed",
    String(initiallyPressed),
  );
  await expect(
    button,
    "button must not switch it's label after a state change",
  ).toHaveAccessibleName(labelText);
};
