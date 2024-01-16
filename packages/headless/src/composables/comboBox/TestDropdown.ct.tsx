import { expect, test } from "@playwright/experimental-ct-vue";
import type { Locator } from "@playwright/test";
import TestDropdown from "./TestDropdown.vue";

const expectToHaveFocus = async (locator: Locator) => {
  const result = await locator.evaluateHandle((element) => element === document.activeElement);
  await expect(result.jsonValue()).resolves.toBeTruthy();
};

/**
 * Based on https://w3c.github.io/aria/#combobox
 */
test("combobox", async ({ mount, page }) => {
  await mount(<TestDropdown />);
  const listbox = page.getByRole("listbox");
  const combobox = page.getByRole("combobox");
  const button = page.getByRole("button");

  // Typically, the initial state of a combobox is collapsed.
  await expect(listbox).toBeHidden();

  // In the collapsed state, only the combobox element and a separate, optional popup control button are visible.
  await expect(combobox).toBeVisible();
  await expect(button).toBeVisible();

  // A combobox is said to be expanded when both the combobox element showing its current value and
  // its associated popup element are visible.
  await button.click();
  await expect(combobox).toBeVisible();
  await expect(listbox).toBeVisible();
  await button.click();

  // Authors MUST set aria-expanded to true on an element with role combobox when it is expanded and false when it is collapsed.
  await expect(combobox).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(combobox).toHaveAttribute("aria-expanded", "true");
  await button.click();

  // If the user interface includes an additional icon that allows the visibility of the popup to be controlled via pointer and touch events,
  // authors SHOULD ensure that element has role button, that it is focusable but not included in the page Tab sequence,
  // and that it is not a descendant of the element with role combobox.
  await button.focus();
  await expectToHaveFocus(button);

  await expect(button).toHaveAttribute("tabindex", "-1");
  await expect(combobox.getByRole("button")).toHaveCount(0);

  // In addition, to be keyboard accessible, authors SHOULD provide keyboard mechanisms for moving focus between the combobox element and elements contained in the popup.
  // For example, one common convention is that Down Arrow moves focus from the input to the first focusable descendant of the popup element.
  // If the popup element supports aria-activedescendant, in lieu of moving focus, such keyboard mechanisms can control the value of aria-activedescendant on the combobox element.
  // When a descendant of the popup element is active, authors MAY set aria-activedescendant on the combobox to a value that refers to the active element within the popup while focus remains on the combobox element.
  const firstElement = page.getByRole("option").first();

  await combobox.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");

  const firstId = await (await firstElement.elementHandle())!.getAttribute("id");
  expect(typeof firstId).toBe("string");
  await expect(combobox).toHaveAttribute("aria-activedescendant", firstId as string);
  await expectToHaveFocus(combobox);
});
