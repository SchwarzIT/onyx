import { describe, expect, it } from "vitest";
import { nextTick, ref, type Ref } from "vue";
import type { DateRange, DateValue } from "../../utils/dates.js";
import {
  _unstableCreateCalendar,
  type CreateCalendarOptions,
  type SelectionMode,
} from "./createCalendar.js";

const createDate = (year: number, month: number, day: number): Date => {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
};

type SetupResult = ReturnType<typeof _unstableCreateCalendar> & {
  modelValue: Ref<DateValue | DateValue[] | DateRange | null>;
  viewMonth: Ref<DateValue | null>;
};

const setupCalendar = (options: {
  modelValue?: DateValue | DateValue[] | DateRange | null;
  viewMonth?: DateValue | null;
  min?: Date;
  max?: Date;
  selection?: SelectionMode;
}): SetupResult => {
  const modelValue = ref(options.modelValue ?? null);
  const viewMonth = ref(options.viewMonth ?? new Date());

  const defaultOptions: CreateCalendarOptions = {
    locale: ref("en"),
    calendarSize: ref("small"),
    weekStartDay: ref("Monday"),
    disabled: ref(false),
    showCalendarWeeks: ref(false),
    min: ref(options.min ?? null),
    max: ref(options.max ?? null),
    selectionMode: ref(options.selection ?? "single"),
    modelValue,
    viewMonth,
    onUpdateViewMonth: (date) => (viewMonth.value = date),
    onUpdateModelValue: (newValue) => (modelValue.value = newValue),
  };

  const composable = _unstableCreateCalendar(defaultOptions);

  return { ...composable, modelValue, viewMonth };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity
const triggerKey = async (elements: any, key: string, opts: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent("keydown", { key, ...opts });
  elements.table.onKeydown?.(event);
  await nextTick();
};

describe("createCalendar (Headless)", () => {
  const initialDate = createDate(2025, 8, 15); // Mon, Sept 15, 2025

  it("should initialize with correct default values", () => {
    const today = createDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const { state, modelValue } = setupCalendar({});

    expect(modelValue.value).toBeNull();
    // FocusedDate is set to today's date by default if modelValue is null.
    expect(state.focusedDate.value?.toDateString()).toBe(today.toDateString());
    expect(state.weeksToRender.value.length).toBeGreaterThan(4);
    // For "small" (from setupCalendar), the weekday should be short
    expect(state.weekdayNames.value).toStrictEqual([
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]);
  });

  it("should respect min and max dates", () => {
    const min = createDate(2025, 8, 10);
    const max = createDate(2025, 8, 20);
    const { internals } = setupCalendar({ min, max });

    expect(internals.isDisabled.value(createDate(2025, 8, 9))).toBe(true);
    expect(internals.isDisabled.value(createDate(2025, 8, 15))).toBe(false);
    expect(internals.isDisabled.value(createDate(2025, 8, 21))).toBe(true);
  });

  it("should navigate months correctly", () => {
    const { state, internals, viewMonth } = setupCalendar({ viewMonth: initialDate });

    // viewMonth is initialized, state reflects this
    expect(state.viewMonth.value.getMonth()).toBe(8); // September (month 8)

    internals.goToMonthByOffset(1);
    expect(state.viewMonth.value.getMonth()).toBe(9); // October
    expect((viewMonth.value as Date).getMonth()).toBe(9);
    internals.goToMonthByOffset(-1);
    expect(state.viewMonth.value.getMonth()).toBe(8); // September
    expect((viewMonth.value as Date).getMonth()).toBe(8);
  });

  it("should handle goToToday correctly", () => {
    const today = createDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const { internals, state, viewMonth } = setupCalendar({ viewMonth: createDate(2020, 0, 1) });

    internals.goToToday();
    expect((viewMonth.value as Date)?.toDateString()).toBe(today.toDateString());
    expect(state.focusedDate.value?.toDateString()).toBe(today.toDateString());
    expect(internals.isToday(today)).toBe(true);
  });

  it("should correctly identify selection states (Single Mode)", () => {
    const selectedDate = createDate(2025, 8, 15);
    const { internals, modelValue } = setupCalendar({ selection: "single" });

    modelValue.value = selectedDate;
    expect(internals.isSelected.value(selectedDate)).toBe(true);
    expect(internals.isSelected.value(createDate(2025, 8, 16))).toBe(false);
  });

  it("should correctly handle date selection (Single Mode)", () => {
    const { internals, modelValue } = setupCalendar({
      viewMonth: initialDate,
      selection: "single",
    });
    const newDate = createDate(2025, 8, 15);

    internals.goToDate(newDate);

    expect(modelValue.value).toBeInstanceOf(Date);
    expect((modelValue.value as Date).getTime()).toBe(newDate.getTime());
    expect(internals.isFocused.value(newDate)).toBe(true);
  });

  describe("Multiple Selection Mode", () => {
    const dateA = createDate(2025, 8, 15); // Mon
    const dateB = createDate(2025, 8, 16); // Tue

    it("should add dates to the array when selecting multiple", () => {
      const { internals, modelValue } = setupCalendar({ selection: "multiple" });

      // 1. Select dateA
      internals.goToDate(dateA);
      expect(internals.isSelected.value(dateA)).toBe(true);
      expect((modelValue.value as DateValue[]).length).toBe(1);
      expect(((modelValue.value as DateValue[])[0] as Date).getTime()).toBe(dateA.getTime());

      // 2. Select dateB
      internals.goToDate(dateB);
      expect(internals.isSelected.value(dateB)).toBe(true);
      expect((modelValue.value as DateValue[]).length).toBe(2);
      expect(((modelValue.value as DateValue[])[1] as Date).getTime()).toBe(dateB.getTime());
    });

    it("should remove (toggle off) dates that are already selected", () => {
      const initialSelection: DateValue[] = [dateA, dateB];
      const { internals, modelValue } = setupCalendar({
        selection: "multiple",
        modelValue: initialSelection,
      });

      expect(internals.isSelected.value(dateA)).toBe(true);

      // 3. Deselect dateA
      internals.goToDate(dateA);

      expect(internals.isSelected.value(dateA)).toBe(false);
      expect((modelValue.value as DateValue[]).length).toBe(1);
      // The remaining date should be dateB
      expect(((modelValue.value as DateValue[])[0] as Date).getTime()).toBe(dateB.getTime());
    });
  });

  describe("Range Selection Mode", () => {
    it("should correctly set the start and end points", () => {
      const { internals, modelValue } = setupCalendar({ selection: "range" });
      const start = createDate(2025, 8, 15);
      const end = createDate(2025, 8, 20);

      // 1. Set start
      internals.goToDate(start);
      expect(((modelValue.value as DateRange).start as Date).getTime()).toBe(start.getTime());
      expect((modelValue.value as DateRange).end).toBeUndefined();
      expect(internals.isSelected.value(start)).toBe(true);
      expect(internals.isSelected.value(end)).toBe(false);

      // 2. Set end
      internals.goToDate(end);
      expect(((modelValue.value as DateRange).end as Date).getTime()).toBe(end.getTime());
      expect(internals.isSelected.value(end)).toBe(true);
    });

    it("should correct the order if the end date is before the start date", () => {
      const { internals, modelValue } = setupCalendar({ selection: "range" });
      const start = createDate(2025, 8, 20);
      const end = createDate(2025, 8, 15);

      // 1. Set start (20th)
      internals.goToDate(start);
      // 2. Set end (15th)
      internals.goToDate(end);

      // The start date should now be the 15th (the earlier date)
      expect(((modelValue.value as DateRange).start as Date).toDateString()).toBe(
        end.toDateString(),
      );
      expect(((modelValue.value as DateRange).end as Date).toDateString()).toBe(
        start.toDateString(),
      );
    });
  });

  it("should handle keyboard navigation correctly", async () => {
    const { elements, state, viewMonth } = setupCalendar({ viewMonth: initialDate });
    const startFocusedDate = initialDate; // Mon, Sept 15, 2025
    state.focusedDate.value = startFocusedDate;

    // ArrowRight: +1 day
    await triggerKey(elements, "ArrowRight");
    expect(state.focusedDate.value?.getDate()).toBe(16);

    // ArrowLeft: -1 day
    await triggerKey(elements, "ArrowLeft");
    expect(state.focusedDate.value?.getDate()).toBe(15);

    // ArrowUp: -7 days
    await triggerKey(elements, "ArrowUp");
    expect(state.focusedDate.value?.getDate()).toBe(8);

    // ArrowDown: +7 days
    await triggerKey(elements, "ArrowDown");
    expect(state.focusedDate.value?.getDate()).toBe(15);

    // Home: To start of the week (Monday)
    await triggerKey(elements, "Home");
    expect(state.focusedDate.value?.getDate()).toBe(15);

    // End: To end of the week (Sunday)
    await triggerKey(elements, "End");
    expect(state.focusedDate.value?.getDate()).toBe(21);

    // PageUp: Previous month (August)
    await triggerKey(elements, "PageUp");
    expect(state.focusedDate.value?.getMonth()).toBe(7);
    expect((viewMonth.value as Date)?.getMonth()).toBe(7);

    // PageDown: Next month (September)
    await triggerKey(elements, "PageDown");
    expect(state.focusedDate.value?.getMonth()).toBe(8);
    expect((viewMonth.value as Date)?.getMonth()).toBe(8);

    // Shift + PageUp: Previous year (2024)
    await triggerKey(elements, "PageUp", { shiftKey: true });
    expect(state.focusedDate.value?.getFullYear()).toBe(2024);

    // Shift + PageDown: Next year (2025)
    await triggerKey(elements, "PageDown", { shiftKey: true });
    expect(state.focusedDate.value?.getFullYear()).toBe(2025);
  });
});
