import { describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import type { OnyxCalderProps } from "./types.js";
import { useCalendar } from "./useCalender.js";

const createDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
};

// Mock the props and other dependencies
const mockCalenderRef = ref({
  querySelector: vi.fn(() => ({
    focus: vi.fn(),
  })),
});

// Explicitly define the type for mockProps to resolve the TypeScript error
const mockProps: OnyxCalderProps & {
  dayNames: string[];
  calenderRef: typeof mockCalenderRef;
} = {
  size: "auto",
  selection: "single",
  weekStartDay: "Monday",
  dayNames: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  calenderRef: mockCalenderRef,
};

vi.mock("vue", async (importOriginal) => {
  const mod = await importOriginal<typeof import("vue")>();
  return {
    ...mod,
    nextTick: (fn: () => void) => {
      return Promise.resolve().then(fn);
    },
  };
});

describe("useCalendar", () => {
  test("should initialize with correct default values", () => {
    const { selectedDate, focusedDate, currentYear, currentMonth, weeks, weekdays } =
      useCalendar(mockProps);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    expect(selectedDate.value).toBeNull();
    expect(focusedDate.value?.getTime()).toBe(today.getTime());
    expect(currentYear.value).toBe(today.getFullYear());
    expect(currentMonth.value).toBe(today.getMonth());
    expect(weeks.value).toBeDefined();
    expect(weekdays.value).toStrictEqual(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
  });

  test("should correctly navigate between months", () => {
    const { currentYear, currentMonth, goToNextMonth, goToPreviousMonth } = useCalendar(mockProps);

    const initialMonth = currentMonth.value;
    const initialYear = currentYear.value;

    goToNextMonth();
    const nextMonth = initialMonth === 11 ? 0 : initialMonth + 1;
    const nextYear = initialMonth === 11 ? initialYear + 1 : initialYear;
    expect(currentMonth.value).toBe(nextMonth);
    expect(currentYear.value).toBe(nextYear);

    goToPreviousMonth();
    expect(currentMonth.value).toBe(initialMonth);
    expect(currentYear.value).toBe(initialYear);
  });

  test("should correctly identify today, selected, focused, and weekend days", () => {
    const { isToday, isSelected, isFocused, isWeekend, goToDate } = useCalendar(mockProps);

    const today = new Date();
    const futureDate = new Date(today.getFullYear() + 1, 0, 1);
    const sunday = new Date(2025, 0, 5);
    const saturday = new Date(2025, 0, 4);
    const monday = new Date(2025, 0, 6);

    expect(isToday(today)).toBe(true);
    expect(isToday(futureDate)).toBe(false);

    goToDate(futureDate);
    expect(isSelected(futureDate)).toBe(true);
    expect(isSelected(today)).toBe(false);

    expect(isFocused(futureDate)).toBe(true);
    expect(isFocused(today)).toBe(false);

    expect(isWeekend(sunday)).toBe(true);
    expect(isWeekend(saturday)).toBe(true);
    expect(isWeekend(monday)).toBe(false);
  });

  test("should respect min and max props", () => {
    const minDate = createDate(2025, 0, 10);
    const maxDate = createDate(2025, 0, 20);

    const { isDisabled } = useCalendar({ ...mockProps, min: minDate, max: maxDate });

    const beforeMin = createDate(2025, 0, 9);
    const withinRange = createDate(2025, 0, 15);
    const afterMax = createDate(2025, 0, 21);

    expect(isDisabled(beforeMin)).toBe(true);
    expect(isDisabled(withinRange)).toBe(false);
    expect(isDisabled(afterMax)).toBe(true);
  });

  test("should handle keyboard navigation correctly", async () => {
    const { handleKeyNavigation, focusedDate } = useCalendar(mockProps);

    // Initial state setup for focusedDate
    focusedDate.value = createDate(2025, 8, 15);

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(focusedDate.value?.getDate()).toBe(16);

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    expect(focusedDate.value?.getDate()).toBe(15);

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    expect(focusedDate.value?.getDate()).toBe(22);

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    expect(focusedDate.value?.getDate()).toBe(15);

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "End" }));
    expect(focusedDate.value?.getDate()).toBe(21); // Last Week day

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "Home" }));
    expect(focusedDate.value?.getDate()).toBe(15); // First Week day

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "PageUp" }));
    expect(focusedDate.value?.getMonth()).toBe(7); // Previous month (July)

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "PageDown" }));
    expect(focusedDate.value?.getMonth()).toBe(8); // Next month (August)

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "PageUp", shiftKey: true }));
    expect(focusedDate.value?.getFullYear()).toBe(2024); // Previous year

    await handleKeyNavigation(new KeyboardEvent("keydown", { key: "PageDown", shiftKey: true }));
    expect(focusedDate.value?.getFullYear()).toBe(2025); // Next year
  });

  test("should generate correct calendar grid", () => {
    const { weeks } = useCalendar({ ...mockProps, weekStartDay: "Sunday" });

    // The first day of the month is not a Sunday, so there should be offset days from the previous month
    // September 2025 starts on a Monday.
    // So for weekStartDay: "Sunday", the calendar should show days from August 2025.
    const firstWeek = weeks.value?.[0];

    // August 31, 2025 is a Sunday, so we expect the first day to be August 31.
    const firstDay = firstWeek?.[0]?.date;
    expect(firstDay?.getFullYear()).toBe(2025);
    expect(firstDay?.getMonth()).toBe(7); // August (0-indexed)
    expect(firstDay?.getDate()).toBe(31);
    expect(firstWeek?.[0]?.isCurrentMonth).toBe(false);
  });
});
