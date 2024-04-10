import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type ListboxTestingOptions = {
  /**
   * Playwright page.
   */
  page: Page;
  /**
   * Locator for the listbox element.
   */
  listbox: Locator;
  /**
   * Options (at least 3).
   */
  options: Locator;
  /**
   * Function that returns whether the given option locator is visually active.
   */
  isOptionActive: (locator: Locator) => Promise<boolean>;
};

/**
 * Playwright utility for executing accessibility testing for a listbox.
 * Will check aria attributes and keyboard shortcuts as defined in https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable.
 */
export const listboxTesting = async ({
  page,
  listbox,
  options,
  isOptionActive,
}: ListboxTestingOptions) => {
  const expectOptionToBeActive = async (locator: Locator, message: string) => {
    expect(await isOptionActive(locator), message).toBeTruthy();
    const optionId = await locator.getAttribute("id");
    expect(optionId).toBeDefined();
    await expect(
      listbox,
      "listbox should have set aria-activedescendant to the ID of the currently visually active option",
    ).toHaveAttribute("aria-activedescendant", optionId!);
  };

  await expect(listbox).toBeVisible();

  // ensure correct listbox aria attributes
  await expect(
    listbox,
    'listbox must have a "aria-label" attribute with an existing id',
  ).toHaveAttribute("aria-label");

  await listbox
    .getAttribute("aria-label")
    .then((label) => expect(page.locator(`#${label}`)).toBeDefined());

  await expect(listbox, "listbox must have role attribute with value listbox").toHaveAttribute(
    "role",
    "listbox",
  );

  // ensure that all options have correct aria attributes
  for (const option of await options.all()) {
    await expect(option, "option must have arial-label attribute").toHaveAttribute("aria-label");
    await expect(option, "option must have role attribute with value option").toHaveAttribute(
      "role",
      "option",
    );
  }

  await page.keyboard.press("Tab");
  await expect(listbox, "Listbox should be focused when pressing tab key").toBeFocused();

  await listbox.press("ArrowDown");

  await expectOptionToBeActive(
    options.first(),
    "Pressing arrow down key when no option is active should activate the first option",
  );
  await expect(
    listbox,
    "When option is visually active, DOM focus should still be on the listbox",
  ).toBeFocused();

  await listbox.press("ArrowDown");
  await expectOptionToBeActive(
    options.nth(1),
    "Pressing arrow down key should activate the next option",
  );

  await listbox.press(" ");
  await expect(
    options.nth(1),
    "Pressing space key should select the currently active option",
  ).toHaveAttribute("aria-selected", "true");

  await listbox.press("ArrowUp");
  await expectOptionToBeActive(
    options.first(),
    "Pressing arrow up key should activate the previous option",
  );

  await listbox.press("End");
  await expectOptionToBeActive(options.last(), "Pressing End key should activate the last option");

  const secondOptionText = await options.nth(1).textContent();
  expect(secondOptionText).toBeDefined();

  const firstCharacter = secondOptionText!.charAt(0);
  await listbox.press(firstCharacter);

  await expectOptionToBeActive(
    listbox.getByLabel(firstCharacter).first(),
    "Pressing any other printable character should activate the fist option starting with the pressed key",
  );

  await listbox.press("Home");
  await expectOptionToBeActive(
    options.first(),
    "Pressing Home key should activate the first option",
  );

  const firstOptionHeight = await options.first().evaluate((element) => element.clientHeight);

  await listbox.evaluate((element, height) => {
    element.style.height = `${height}px`;
    element.style.overflow = "hidden";
  }, firstOptionHeight);

  await expect(options.nth(1)).not.toBeInViewport();

  await listbox.press("ArrowDown");
  await expect(
    options.nth(1),
    "activating an option should scroll it into viewport if not visible",
  ).toBeInViewport();

  // reset temporary styles
  await listbox.evaluate((element) => {
    element.style.height = "";
    element.style.overflow = "";
  });
};
