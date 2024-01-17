/* eslint-disable playwright/expect-expect */
import { expect, test } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";
import TestDropdown from "./TestDropdown.vue";

const expectToHaveFocus = async (
  locator: Locator,
  messageOptions?: Parameters<typeof expect>[1],
) => {
  const result = await locator.evaluateHandle((element) => element === document.activeElement);
  await expect(result.jsonValue(), messageOptions).resolves.toBeTruthy();
};

/**
 * Based on https://w3c.github.io/aria/#combobox
 */
test("combobox", async ({ mount, page }) => {
  await mount(<TestDropdown />);
  const listbox = page.getByRole("listbox");
  const combobox = page.getByRole("combobox");
  const button = page.getByRole("button");
  const options = page.getByRole("option");

  await comboboxTesting(page, listbox, combobox, button, options);
});

/**
 * Based on https://w3c.github.io/aria/#combobox
 */
const comboboxTesting = async (
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

  // A combobox is said to be expanded when both the combobox element showing its current value and
  // its associated popup element are visible.
  await button.click();
  await expect(
    combobox,
    "A combobox is said to be expanded when the combobox element shows its current value",
  ).toHaveValue("");
  await expect(
    listbox,
    "A combobox is said to be expanded when the associated popup is visible",
  ).toBeVisible();
  await button.click();

  await expect(
    combobox,
    "Authors MUST set aria-expanded to false when it is collapsed.",
  ).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(
    combobox,
    "Authors MUST set aria-expanded to true when it is expanded.",
  ).toHaveAttribute("aria-expanded", "true");
  await button.click();

  // If the user interface includes an additional icon that allows the visibility of the popup to be controlled via pointer and touch events,
  // authors SHOULD ensure that element has role button, that it is focusable but not included in the page Tab sequence,
  // and that it is not a descendant of the element with role combobox.
  await button.focus();
  await expectToHaveFocus(button, "authors SHOULD ensure that the button is focusable");
  await expect(
    button,
    "authors SHOULD ensure that the button is not included in the page Tab sequence",
  ).toHaveAttribute("tabindex", "-1");
  await expect(
    combobox.getByRole("button"),
    "authors SHOULD ensure that the button is not a descendant of the element with role combobox",
  ).toHaveCount(0);

  // In addition, to be keyboard accessible, authors SHOULD provide keyboard mechanisms for moving focus between the combobox element and elements contained in the popup.
  // For example, one common convention is that Down Arrow moves focus from the input to the first focusable descendant of the popup element.
  // If the popup element supports aria-activedescendant, in lieu of moving focus, such keyboard mechanisms can control the value of aria-activedescendant on the combobox element.
  // When a descendant of the popup element is active, authors MAY set aria-activedescendant on the combobox to a value that refers to the active element within the popup while focus remains on the combobox element.
  const firstElement = options.first();

  await combobox.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");

  const firstId = await (await firstElement.elementHandle())!.getAttribute("id");
  expect(typeof firstId).toBe("string");
  await expect(
    combobox,
    "When a descendant of the popup element is active, authors MAY set aria-activedescendant on the combobox to a value that refers to the active element within the popup.",
  ).toHaveAttribute("aria-activedescendant", firstId as string);
  await expectToHaveFocus(
    combobox,
    "When a descendant of the popup element is active, authors MAY ensure that the focus remains on the combobox element",
  );
};
