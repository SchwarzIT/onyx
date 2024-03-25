import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

/**
 * Test an implementation of the combobox based on https://w3c.github.io/aria/#combobox
 */
export const comboboxTesting = async (
  page: Page,
  listbox: Locator,
  combobox: Locator,
  button: Locator,
  options: Locator,
) => {
  await expect(listbox, "Typically, the initial state of a combobox is collapsed.").toBeHidden();

  await expect(combobox, "In the collapsed state, the combobox element is visible.").toBeVisible();
  await expect(
    button,
    "In the collapsed state, the optional button element is visible.",
  ).toBeVisible();

  await button.click(); // toggle to be expanded
  await expect(
    combobox,
    "A combobox is said to be expanded when the combobox element shows its current value",
  ).toHaveValue("");
  await expect(
    listbox,
    "A combobox is said to be expanded when the associated popup is visible",
  ).toBeVisible();
  await button.click(); // toggle to be closed

  await expect(
    combobox,
    "Authors MUST set aria-expanded to false when it is collapsed.",
  ).toHaveAttribute("aria-expanded", "false");
  await button.click(); // toggle to be expanded
  await expect(
    combobox,
    "Authors MUST set aria-expanded to true when it is expanded.",
  ).toHaveAttribute("aria-expanded", "true");
  await button.click(); // toggle to be closed

  await button.focus();
  await expect(button, "authors SHOULD ensure that the button is focusable").toBeFocused();
  await expect(
    button,
    "authors SHOULD ensure that the button is not included in the page Tab sequence",
  ).toHaveAttribute("tabindex", "-1");
  await expect(
    combobox.getByRole("button"),
    "authors SHOULD ensure that the button is not a descendant of the element with role combobox",
  ).toHaveCount(0);

  const firstElement = options.first();

  // open and select first option
  await combobox.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");

  const firstId = await (await firstElement.elementHandle())!.getAttribute("id");
  expect(typeof firstId).toBe("string");
  await expect(
    combobox,
    "When a descendant of the popup element is active, authors MAY set aria-activedescendant on the combobox to a value that refers to the active element within the popup.",
  ).toHaveAttribute("aria-activedescendant", firstId as string);
  await expect(
    combobox,
    "When a descendant of the popup element is active, authors MAY ensure that the focus remains on the combobox element",
  ).toBeFocused();
};
