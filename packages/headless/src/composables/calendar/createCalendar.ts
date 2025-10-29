import { computed, nextTick, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from "vue";
import { createBuilder, createElRef } from "../../utils/builder.js";
import {
  getISOWeekNumber,
  getNormalizedDayIndex,
  isInDateRange,
  sortDateRange,
  WEEKDAYS,
  type DateRange,
  type DateValue,
  type Weekday,
} from "../../utils/dates.js";
import type { Nullable } from "../../utils/types.js";

export type SelectionMode = "single" | "multiple" | "range";

export type CalendarSize = "small" | "big";

export type CreateCalendarOptions = {
  locale: MaybeRefOrGetter<string>;
  calendarSize: MaybeRefOrGetter<CalendarSize>;
  weekStartDay: MaybeRefOrGetter<Weekday>;
  viewMonth: Ref<DateValue>;
  modelValue?: Ref<Nullable<DateValue | DateValue[] | DateRange>>;
  disabled?: MaybeRefOrGetter<boolean | ((date: Date) => boolean)>;
  min?: MaybeRefOrGetter<Nullable<DateValue>>;
  max?: MaybeRefOrGetter<Nullable<DateValue>>;
  showCalendarWeeks?: MaybeRefOrGetter<boolean>;
  selectionMode?: MaybeRefOrGetter<SelectionMode>;
  onUpdateViewMonth?: (date: Date) => unknown;
  onUpdateModelValue?: (newValue: Date | Date[] | DateRange) => unknown;
};

export type RenderWeek = {
  weekNumber: number;
  days: RenderDay[];
};

export type RenderDay = {
  date: Date;
  isCurrentMonth: boolean;
};

/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export const _unstableCreateCalendar = createBuilder((options: CreateCalendarOptions) => {
  const viewMonth = computed({
    get: () => {
      const date = toValue(options.viewMonth);
      return date ? new Date(date) : new Date();
    },
    set: (newValue) => options.onUpdateViewMonth?.(new Date(newValue)),
  });

  /**
   * Human readable weekday names depending on the given locale.
   */
  const weekdayNames = computed(() => {
    const formatter = new Intl.DateTimeFormat(toValue(options.locale), {
      weekday: toValue(options.calendarSize) === "big" ? "long" : "short",
    });

    const names = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i)).map((day) =>
      formatter.format(day),
    );

    const weekStartDay = toValue(options.weekStartDay);
    const index = WEEKDAYS.indexOf(weekStartDay);
    return names.slice(index).concat(names.slice(0, index));
  });

  // check if view month contains today, else default to first day of month
  const initialFocusedDate = () => {
    const today = new Date();
    const view = viewMonth.value;

    const isTodayInViewMonth =
      today.getFullYear() === view.getFullYear() && today.getMonth() === view.getMonth();

    if (isTodayInViewMonth) {
      return today;
    } else {
      return new Date(view.getFullYear(), view.getMonth(), 1);
    }
  };

  const focusedDate = ref(initialFocusedDate());

  // sync focusDate with selection
  watch(
    () => toValue(options.modelValue),
    (newValue) => {
      if (!newValue) return;
      let newFocusDate: Date | undefined;

      if (Array.isArray(newValue)) {
        newFocusDate = newValue.length ? new Date(newValue[0]!) : undefined;
      } else if (typeof newValue === "object" && !(newValue instanceof Date)) {
        newFocusDate = new Date(newValue.start);
      } else {
        newFocusDate = new Date(newValue);
      }

      if (newFocusDate) focusedDate.value = newFocusDate;
    },
    { immediate: true },
  );

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = computed(() => {
    return (date: Date) => {
      const value = toValue(options.modelValue);
      if (!value) return false;

      // multiple
      if (Array.isArray(value)) {
        const values = value.map((i) => new Date(i));
        return values.some((d) => d.toDateString() === date.toDateString());
      }

      // date range
      if (typeof value === "object" && !(value instanceof Date)) {
        const start = new Date(value.start);
        const end = value.end ? new Date(value.end) : undefined;
        return (
          start.toDateString() === date.toDateString() ||
          end?.toDateString() === date.toDateString()
        );
      }

      // single
      return new Date(value).toDateString() === date.toDateString();
    };
  });

  const isFocused = computed(() => {
    return (date: Date) => {
      return focusedDate.value?.toDateString() === date.toDateString();
    };
  });

  const isDisabled = computed(() => {
    return (date: Date): boolean => {
      const disabledPropValue = toValue(options.disabled);

      if (typeof disabledPropValue === "boolean") {
        if (disabledPropValue) return true;
      }
      if (typeof disabledPropValue === "function") {
        if (disabledPropValue(date)) return true;
      }

      const min = toValue(options.min);
      const minDate = min ? new Date(min) : undefined;
      minDate?.setHours(0, 0, 0, 0);
      const max = toValue(options.max);
      const maxDate = max ? new Date(max) : undefined;
      maxDate?.setHours(23, 59, 59, 999);

      if (minDate && maxDate) return !isInDateRange(date, minDate, maxDate);
      if (minDate) return date.getTime() < minDate.getTime();
      if (maxDate) return date.getTime() > maxDate.getTime();

      return false;
    };
  });

  const weeksToRender = computed(() => {
    const weekStartDay = toValue(options.weekStartDay);
    const firstDayInViewMonth = new Date(
      viewMonth.value.getFullYear(),
      viewMonth.value.getMonth(),
      1,
    );

    const startOffset = (firstDayInViewMonth.getDay() + 6) % 7;
    const daysBeforeStart = (startOffset - WEEKDAYS.indexOf(weekStartDay) + 7) % 7;

    const weeksToRender = 6;
    const weeks: RenderWeek[] = [];

    for (let weekIndex = 0; weekIndex < weeksToRender; weekIndex++) {
      const weekStartDate = new Date(firstDayInViewMonth);
      weekStartDate.setDate(weekStartDate.getDate() - daysBeforeStart + weekIndex * 7);

      const days = Array.from({ length: 7 }, (_, dayIndex) => {
        const date = new Date(weekStartDate);
        date.setDate(date.getDate() + dayIndex);

        return {
          date,
          isCurrentMonth: date.getMonth() === viewMonth.value.getMonth(),
        } satisfies RenderDay;
      });

      weeks.push({
        weekNumber: getISOWeekNumber(weekStartDate),
        days,
      });
    }

    return weeks;
  });

  const goToDate = (date: Date, preventSelectionUpdate?: boolean) => {
    focusedDate.value = new Date(date);

    // if new date is out of current month, automatically switch the view month
    if (
      focusedDate.value.getFullYear() !== viewMonth.value.getFullYear() ||
      focusedDate.value.getMonth() !== viewMonth.value.getMonth()
    ) {
      viewMonth.value = new Date(focusedDate.value);
    }

    const selectionMode = toValue(options.selectionMode);
    if (!selectionMode || preventSelectionUpdate) return;

    const selection = toValue(options.modelValue);

    switch (selectionMode) {
      case "single":
        options.onUpdateModelValue?.(new Date(date));
        break;

      case "multiple": {
        let values = Array.isArray(selection) ? selection.map((d) => new Date(d)) : [];

        if (isSelected.value(date)) {
          values = values.filter((d) => d.toDateString() !== date.toDateString());
        } else {
          values.push(new Date(date));
        }

        options.onUpdateModelValue?.(values);
        break;
      }

      case "range": {
        const currentRange =
          typeof selection === "object" && !(selection instanceof Date) && !Array.isArray(selection)
            ? selection
            : undefined;

        let newRange: DateRange<Date>;

        if (currentRange?.start && currentRange.end) {
          newRange = { start: new Date(date) };
        } else {
          newRange = {
            start: currentRange?.start ? new Date(currentRange.start) : new Date(date),
            end: currentRange?.start ? new Date(date) : undefined,
          };
        }

        newRange = sortDateRange(newRange);
        options.onUpdateModelValue?.(newRange);
        break;
      }
    }
  };

  const handleKeyNavigation = async (event: KeyboardEvent) => {
    let newDate: Date | undefined;

    const getNewFocusDateByDiff = (diff: number, type: "days" | "month" = "days") => {
      const date = new Date(focusedDate.value);
      if (type === "month") date.setMonth(date.getMonth() + diff);
      else date.setDate(date.getDate() + diff);
      return date;
    };

    switch (event.key) {
      case "ArrowUp":
        newDate = getNewFocusDateByDiff(-7);
        break;
      case "ArrowDown":
        newDate = getNewFocusDateByDiff(7);
        break;
      case "ArrowLeft":
        newDate = getNewFocusDateByDiff(-1);
        break;
      case "ArrowRight":
        newDate = getNewFocusDateByDiff(1);
        break;
      case "Home": {
        const idx = getNormalizedDayIndex(focusedDate.value, toValue(options.weekStartDay));
        newDate = getNewFocusDateByDiff(-idx);
        break;
      }
      case "End": {
        const idx = getNormalizedDayIndex(focusedDate.value, toValue(options.weekStartDay));
        newDate = getNewFocusDateByDiff(6 - idx);
        break;
      }
      case "PageUp":
        newDate = getNewFocusDateByDiff(-(event.shiftKey ? 12 : 1), "month");
        break;
      case "PageDown":
        newDate = getNewFocusDateByDiff(event.shiftKey ? 12 : 1, "month");
        break;
    }

    if (!newDate || isDisabled.value(newDate)) return;

    event.preventDefault();
    goToDate(newDate, true);
    await nextTick();

    tableRef.value
      ?.querySelector<HTMLElement>(`[data-date="${focusedDate.value.toDateString()}"]`)
      ?.focus();
  };

  const getRangeType = computed(() => {
    return (date: Date, range?: DateRange): "start" | "middle" | "end" | undefined => {
      const selection = range ?? toValue(options.modelValue);
      if (
        !selection ||
        typeof selection !== "object" ||
        Array.isArray(selection) ||
        selection instanceof Date
      ) {
        return;
      }

      const sortedRange = sortDateRange(selection);

      const start = new Date(sortedRange.start);
      start.setHours(0, 0, 0, 0);

      const end = sortedRange.end ? new Date(sortedRange.end) : undefined;
      end?.setHours(23, 59, 59, 999);

      if (
        date.toDateString() === start.toDateString() &&
        date.toDateString() === end?.toDateString()
      )
        return;
      if (date.toDateString() === start.toDateString()) return "start";
      if (date.toDateString() === end?.toDateString()) return "end";
      if (end && isInDateRange(date, start, end)) return "middle";
    };
  });

  const goToMonthByOffset = (offset: number) => {
    const date = new Date(viewMonth.value);
    date.setMonth(date.getMonth() + offset, 1);
    viewMonth.value = date;
  };

  const goToToday = () => {
    viewMonth.value = new Date();
  };

  const tableRef = createElRef<HTMLElement>();

  return {
    state: {
      weekdayNames,
      weeksToRender,
      focusedDate,
      viewMonth,
    },
    elements: {
      table: {
        role: "grid",
        onKeydown: handleKeyNavigation,
        ref: tableRef,
      },
      cell: computed(() => (cell: { date: Date }) => ({
        role: "gridcell",
        "aria-selected": isSelected.value(cell.date),
        "aria-disabled": isDisabled.value(cell.date),
      })),
      button: computed(() => (button: { date: Date }) => {
        const formatter = new Intl.DateTimeFormat(toValue(options.locale), { dateStyle: "full" });

        const attributes = {
          "aria-label": formatter.format(button.date),
          "data-date": button.date.toDateString(),
        };
        const selection = toValue(options.selectionMode);
        if (!selection) return attributes;

        const disabled = isDisabled.value(button.date);

        return {
          ...attributes,
          tabindex: isFocused.value(button.date) && !disabled ? "0" : "-1",
          disabled,
          onClick: disabled ? undefined : () => goToDate(button.date),
        };
      }),
    },
    internals: {
      goToMonthByOffset,
      goToToday,
      isSelected,
      isToday,
      getRangeType,
      isDisabled,
      goToDate,
      isFocused,
    },
  };
});
