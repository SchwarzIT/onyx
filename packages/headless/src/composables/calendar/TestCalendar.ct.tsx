import { test } from "@playwright/experimental-ct-vue";
import type { Page } from "@playwright/test";
import TestCalendar from "./TestCalendar.vue";
import { calendarTesting } from "./createCalendar.testing.js";
const getTestOptions = (page: Page) => ({
  page,
  calendarGrid: page.getByRole("grid"),
  prevMonthButton: page.getByRole("button", { name: "Previous month" }),
  nextMonthButton: page.getByRole("button", { name: "Next month" }),
  dayButtons: page.locator(".day-button"),
  initialFocusDay: page.getByRole("button", { name: "15" }).first(),
});

test("Calendar: single selection mode", async ({ mount, page }) => {
  await mount(<TestCalendar mode="single" />);

  await calendarTesting({
    ...getTestOptions(page),
    mode: "single",
  });
});

test("Calendar: multi selection mode (select and deselect)", async ({ mount, page }) => {
  await mount(<TestCalendar mode="multiple" />);

  await calendarTesting({
    ...getTestOptions(page),
    mode: "multiple",
  });
});

test("Calendar: range selection mode (select start, end, and middle)", async ({ mount, page }) => {
  await mount(<TestCalendar mode="range" />);

  await calendarTesting({
    ...getTestOptions(page),
    mode: "range",
  });
});
