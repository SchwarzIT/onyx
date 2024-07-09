import { expect, test } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

const expectToOpen = async (
  keyCombo: string,
  combobox: Locator,
  listbox: Locator,
  checkActive?: () => Promise<boolean>,
) => {
  await closeCombobox(combobox, listbox);
  await combobox.press(keyCombo);
  await expect(listbox, `Listbox should be opened after pressing ${keyCombo}.`).toBeVisible();
  if (checkActive) {
    const active = await checkActive();
    expect(active, "Given option should be active").toBeTruthy();
  }
};

const expectToClose = async (
  keyCombo: string,
  combobox: Locator,
  listbox: Locator,
  selectedLocator?: () => Locator,
) => {
  await openCombobox(combobox, listbox);
  await combobox.press(keyCombo);
  await expect(listbox, `Listbox should be closed after pressing ${keyCombo}.`).toBeHidden();
  await expect(combobox).toBeFocused();
  await openCombobox(combobox, listbox);
  if (selectedLocator) {
    await expectToBeSelected(selectedLocator());
  }
};

/**
 * Test an implementation of the combobox based on https://w3c.github.io/aria/#combobox
 */
export const comboboxTesting = async (
  _page: Page,
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
  await combobox.press("Home");
  return expect(listbox, "Listbox should be open again").toBeVisible();
};

const expectToBeSelected = async (selectedItem: Locator) =>
  expect(selectedItem, "Option should be selected").toHaveAttribute("aria-selected", "true");

export type CheckLocator = (option: Locator) => Promise<boolean>;

/**
 * Test an implementation of the combobox based on https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 */
export const comboboxSelectOnlyTesting = async (
  page: Page,
  listbox: Locator,
  combobox: Locator,
  isActive: CheckLocator,
) => {
  await expect(listbox, "Initial state of a combobox is collapsed.").toBeHidden();

  await combobox.focus();

  await test.step("Test opening keys", async () => {
    await expectToOpen("ArrowUp", combobox, listbox, () =>
      isActive(page.getByRole("option").first()),
    );
    await expectToOpen("Alt+ArrowDown", combobox, listbox);
    await expectToOpen("Space", combobox, listbox);
    await expectToOpen("Enter", combobox, listbox);
    await expectToOpen("Home", combobox, listbox, () => isActive(page.getByRole("option").first()));
    await expectToOpen("End", combobox, listbox, () => isActive(page.getByRole("option").last()));
    await expectToOpen("ArrowDown", combobox, listbox);
    await expectToOpen("a", combobox, listbox);
  });

  await test.step("Selecting with Enter", async () => {
    await expectToClose("Enter", combobox, listbox, () => page.getByRole("option").first());
    await expectToClose(" ", combobox, listbox, () => page.getByRole("option").first());
    await expectToClose("Escape", combobox, listbox, () => page.getByRole("option").first());
  });

  await test.step("Activating with End", async () => {
    await openCombobox(combobox, listbox);
    await combobox.press("End");
    const active = await isActive(listbox.getByRole("option").last());
    expect(active, "Given option should be active").toBeTruthy();
    await expect(combobox).toBeFocused();
  });

  await test.step("Activating with Home", async () => {
    await openCombobox(combobox, listbox);
    await combobox.press("Home");
    const active = await isActive(listbox.getByRole("option").first());
    expect(active, "Given option should be active").toBeTruthy();
    await expect(combobox).toBeFocused();
  });
};
