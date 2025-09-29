import { describe, expect, it } from "vitest";
import { nextTick, ref } from "vue";
import { createCalendar } from "./createCalendar.js";

const createDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
};

const setupCalendar = (initialDate?: Date, min?: Date, max?: Date) => {
  const buttonRefs = ref<Record<string, HTMLElement>>({});
  const { elements, state, internals } = createCalendar({
    locale: "en",
    calendarSize: "small",
    weekStartDay: "Monday",
    buttonRefs,
    min,
    max,
    initialDate,
  });

  if (initialDate) state.focusedDate.value = initialDate;
  return { elements, state, internals, buttonRefs };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
const triggerKey = async (elements: any, key: string, opts: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent("keydown", { key, ...opts });
  elements.table.value.onKeydown?.(event);
  await nextTick();
};

describe("createCalendar", () => {
  it("should initialize with correct defaults", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { state } = setupCalendar();

    expect(state.selectedDate.value).toBeNull();
    expect(state.focusedDate.value?.getTime()).toBe(today.getTime());
    expect(state.currentYear.value).toBe(today.getFullYear());
    expect(state.currentMonth.value).toBe(today.getMonth());
    expect(state.weeks.value.length).toBeGreaterThan(0);
    expect(state.weekdays.value).toStrictEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  });

  it("should respect min and max dates", () => {
    const min = createDate(2025, 8, 10);
    const max = createDate(2025, 8, 20);
    const { internals } = setupCalendar(undefined, min, max);

    expect(internals.isDisabled(createDate(2025, 8, 9))).toBe(true);
    expect(internals.isDisabled(createDate(2025, 8, 15))).toBe(false);
    expect(internals.isDisabled(createDate(2025, 8, 21))).toBe(true);
  });

  it("should navigate months correctly", () => {
    const { state, internals } = setupCalendar(createDate(2025, 8, 15));

    internals.goToNextMonth();
    expect(state.currentMonth.value).toBe(9);

    internals.goToPreviousMonth();
    expect(state.currentMonth.value).toBe(8);
  });

  it("should identify today, selected, focused, and weekend correctly", () => {
    const { internals, state } = setupCalendar(createDate(2025, 8, 15));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    expect(internals.isToday(today)).toBe(true);
    expect(internals.isToday(createDate(2025, 0, 1))).toBe(false);

    state.selectedDate.value = createDate(2025, 8, 15);
    expect(internals.isSelected(createDate(2025, 8, 15))).toBe(true);
    expect(internals.isSelected(createDate(2025, 8, 16))).toBe(false);

    state.focusedDate.value = createDate(2025, 8, 15);
    expect(internals.isFocused(createDate(2025, 8, 15))).toBe(true);
    expect(internals.isFocused(createDate(2025, 8, 16))).toBe(false);

    expect(internals.isWeekend(createDate(2025, 8, 12))).toBe(false); //Fr
    expect(internals.isWeekend(createDate(2025, 8, 13))).toBe(true); //Sa
  });

  it("should handle keyboard navigation", async () => {
    const { elements, state } = setupCalendar(createDate(2025, 8, 15));

    await triggerKey(elements, "ArrowRight");
    expect(state.focusedDate.value?.getDate()).toBe(16);

    await triggerKey(elements, "ArrowLeft");
    expect(state.focusedDate.value?.getDate()).toBe(15);

    await triggerKey(elements, "ArrowUp");
    expect(state.focusedDate.value?.getDate()).toBe(8);

    await triggerKey(elements, "ArrowDown");
    expect(state.focusedDate.value?.getDate()).toBe(15);

    await triggerKey(elements, "Home");
    expect(state.focusedDate.value?.getDay()).toBe(1); // Monday

    await triggerKey(elements, "End");
    expect(state.focusedDate.value?.getDay()).toBe(0); // Sunday

    await triggerKey(elements, "PageUp");
    expect(state.focusedDate.value?.getMonth()).toBe(7);

    await triggerKey(elements, "PageDown");
    expect(state.focusedDate.value?.getMonth()).toBe(8);

    await triggerKey(elements, "PageUp", { shiftKey: true });
    expect(state.focusedDate.value?.getFullYear()).toBe(2024);

    await triggerKey(elements, "PageDown", { shiftKey: true });
    expect(state.focusedDate.value?.getFullYear()).toBe(2025);
  });

  it("should generate correct calendar grid with offsets", () => {
    const { state } = setupCalendar(createDate(2025, 8, 15));
    const week = state.weeks.value[2];

    expect(week?.length).toBe(7);

    const firstDay = week?.[0]?.date;
    if (firstDay) {
      expect(firstDay.getFullYear()).toBe(2025);
      expect(firstDay.getMonth()).toBe(8); // August
    }
  });
});
