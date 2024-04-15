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
  expectToOpen("ArrowDown", combobox, listbox);
  expectToOpen("ArrowDown", combobox, listbox);

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

  // Single Select Pattern
};

const closeCombobox = async (combobox: Locator, listbox: Locator) => {
  await combobox.press("Escape");
  return expect(listbox, "Listbox should be collapsed again").toBeHidden();
};

const openCombobox = async (combobox: Locator, listbox: Locator) => {
  await combobox.press("ArrowDown");
  return expect(listbox, "Listbox should be open again").toBeVisible();
};

const expectToOpen = async (
  keyCombo: string,
  combobox: Locator,
  listbox: Locator,
  selectedItem?: Locator,
) => {
  await closeCombobox(combobox, listbox);
  await combobox.press(keyCombo);
  await expect(listbox, "Combobox should be opened.").toBeVisible();
  if (selectedItem) {
    await expect(selectedItem, "Option should be selected").toHaveAttribute(
      "aria-selected",
      "true",
    );
  }
};

const expectToBeSelected = async (selectedItem: Locator) =>
  expect(selectedItem, "Option should be selected").toHaveAttribute("aria-selected", "true");

/**
 * Test an implementation of the combobox based on https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 */
export const comboboxSelectOnlyTesting = async (
  page: Page,
  listbox: Locator,
  combobox: Locator,
) => {
  await expect(listbox, "Initial state of a combobox is collapsed.").toBeHidden();

  await combobox.focus();

  // Keyboard Support - Closed Combobox
  await expectToOpen("ArrowUp", combobox, listbox, page.getByRole("option").first());
  await expectToOpen("Alt+ArrowDown", combobox, listbox);
  await expectToOpen("Space", combobox, listbox);
  await expectToOpen("Enter", combobox, listbox);
  await expectToOpen("Home", combobox, listbox, listbox.getByRole("option").first());
  await expectToOpen("End", combobox, listbox, listbox.getByRole("option").last());
  await expectToOpen("ArrowDown", combobox, listbox);
  await expectToOpen("a", combobox, listbox);

  // Keyboard Support - Listbox Popup
  await expectToOpen("ArrowDown", combobox, listbox);

  await combobox.press("Enter");
  await expect(listbox).toBeHidden();
  await expect(combobox).toBeFocused();

  await openCombobox(combobox, listbox);
  await combobox.press(" ");
  await expect(listbox).toBeHidden();
  await expect(combobox).toBeFocused();

  /* TODO: Tab seems to be flaky?
  await openCombobox(combobox, listbox);
  await combobox.press("Tab");
  await expect(listbox).toBeHidden();
  await expect(combobox).not.toBeFocused();
  await combobox.focus(); */

  await openCombobox(combobox, listbox);
  await combobox.press("Escape");
  await expect(listbox).toBeHidden();
  await expect(combobox).toBeFocused();

  await openCombobox(combobox, listbox);
  await combobox.press("Home");
  await expectToBeSelected(listbox.getByRole("option").first());
  await expect(combobox).toBeFocused();

  await openCombobox(combobox, listbox);
  await combobox.press("End");
  await expectToBeSelected(listbox.getByRole("option").last());
  await expect(combobox).toBeFocused();
};
