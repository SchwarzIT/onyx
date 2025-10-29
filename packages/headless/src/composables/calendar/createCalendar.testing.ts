import { expect } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type CalendarTestingOptions = {
  /**
   * Playwright page.
   */
  page: Page;
  /**
   * Locator for the root calendar table/grid element.
   */
  calendarGrid: Locator;
  /**
   * Locator for the button to navigate to the previous month.
   */
  prevMonthButton: Locator;
  /**
   * Locator for the button to navigate to the next month.
   */
  nextMonthButton: Locator;
  /**
   * Locator for all day buttons/cells.
   */
  dayButtons: Locator;
  /**
   * Locator for the button/cell that should initially have focus (tabindex=0).
   */
  initialFocusDay: Locator;
  /**
   * Selection mode to run specific tests for.
   */
  mode: "single" | "multiple" | "range";
};

const runBaseA11yAndKeyboardChecks = async ({
  page,
  calendarGrid,
  prevMonthButton,
  nextMonthButton,
  dayButtons,
  initialFocusDay,
}: CalendarTestingOptions) => {
  // --- ARIA Role und Initial Focus Checks ---
  await expect(calendarGrid, "The main calendar container must have role='grid'").toHaveAttribute(
    "role",
    "grid",
  );
  await expect(calendarGrid).toBeVisible();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(
    initialFocusDay,
    "The initially focused day must have tabindex='0' and be focused",
  ).toBeFocused();
  await expect(initialFocusDay, "The initially focused day must have tabindex='0'").toHaveAttribute(
    "tabindex",
    "0",
  );

  const otherDays = dayButtons.filter({ hasNot: initialFocusDay });
  await expect(otherDays.first(), "Other days must have tabindex='-1'").toHaveAttribute(
    "tabindex",
    "-1",
  );

  // --- Keyboard Navigation Checks ---
  await initialFocusDay.focus();

  await initialFocusDay.press("ArrowDown");
  await expect(initialFocusDay, "Focus should move away after ArrowDown").not.toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(
    initialFocusDay,
    "Focus should return (oder move 7 days back) after ArrowUp",
  ).toBeFocused();

  await initialFocusDay.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  await expect(initialFocusDay, "Focus should return after ArrowLeft").toBeFocused();

  await initialFocusDay.press("Home");
  await expect(initialFocusDay, "Focus should move away after Home").not.toBeFocused();

  await page.keyboard.press("End");
  await expect(initialFocusDay, "Focus should move away after End").not.toBeFocused();
  await initialFocusDay.focus();

  const initialMonth = await calendarGrid.getAttribute("aria-label");
  await nextMonthButton.click();
  await expect(
    calendarGrid,
    "Clicking next month button should change aria-label",
  ).not.toHaveAttribute("aria-label", initialMonth!);

  await prevMonthButton.click();
  await expect(
    calendarGrid,
    "Clicking previous month button should return to initial month label",
  ).toHaveAttribute("aria-label", initialMonth!);
};

const testMultiSelection = async ({
  dayButtons,
  initialFocusDay,
}: Pick<CalendarTestingOptions, "dayButtons" | "initialFocusDay">) => {
  const day1 = initialFocusDay;
  const day1Cell = day1.locator("..");
  const day2 = dayButtons.filter({ hasText: "20" }).first();
  const day2Cell = day2.locator("..");

  await day1.focus();
  await day1.press("Enter");
  await day1.press("Enter");

  await expect(day1Cell, "Day 1 must be selected").toHaveAttribute("aria-selected", "true");

  await day2.focus();
  await day2.press("Enter");
  await expect(day2Cell, "Day 2 must also be selected").toHaveAttribute("aria-selected", "true");
  await expect(day1Cell, "Day 1 must remain selected in multiple-mode").toHaveAttribute(
    "aria-selected",
    "true",
  );

  await day1.focus();
  await day1.press("Enter");
  await expect(
    day1Cell,
    "Day 1 must be deselected after second Enter press in multiple-mode",
  ).toHaveAttribute("aria-selected", "false");
  await expect(day1Cell, "Day 1 must not be selected").not.toHaveAttribute("aria-selected", "true");
  await expect(day2Cell, "Day 2 must remain selected after deselecting Day 1").toHaveAttribute(
    "aria-selected",
    "true",
  );
};

const testRangeSelection = async ({
  dayButtons,
  initialFocusDay,
}: Pick<CalendarTestingOptions, "dayButtons" | "initialFocusDay">) => {
  const dayStart = initialFocusDay; // day 15
  const dayStartCell = dayStart.locator("..");
  const dayEnd = dayButtons.filter({ hasText: "24" }).first(); // day 24
  const dayEndCell = dayEnd.locator("..");

  await dayStart.focus();
  await dayStart.press("Enter");
  await expect(dayStartCell, "Start day must be selected and marked").toHaveAttribute(
    "aria-selected",
    "true",
  );

  await dayEnd.focus();
  await dayEnd.press("Enter");

  await expect(dayStartCell, "Start day must remain selected").toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(dayEndCell, "End day must be selected").toHaveAttribute("aria-selected", "true");

  const newStartDay = dayButtons.filter({ hasText: "5" }).first();
  const newStartDayCell = newStartDay.locator("..");

  await newStartDay.focus();
  await newStartDay.press("Enter");

  await expect(dayStartCell, "Old Start day must not be selected anymore").not.toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(newStartDayCell, "New Start day must be selected").toHaveAttribute(
    "aria-selected",
    "true",
  );
};

export const calendarTesting = async (options: CalendarTestingOptions) => {
  const { initialFocusDay, mode } = options;
  const parentCell = initialFocusDay.locator("..");

  await runBaseA11yAndKeyboardChecks(options);

  if (mode === "single") {
    await initialFocusDay.focus();
    await initialFocusDay.press("Enter");
    await expect(parentCell, "Day should be selected after Enter press").toHaveAttribute(
      "aria-selected",
      "true",
    );

    await initialFocusDay.press("Space");
    await expect(
      parentCell,
      "Day should remain selected after Space press in single-mode",
    ).toHaveAttribute("aria-selected", "true");
  } else if (mode === "multiple") {
    await testMultiSelection(options);
  } else if (mode === "range") {
    await testRangeSelection(options);
  }
};
