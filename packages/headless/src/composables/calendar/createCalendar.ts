import { computed, nextTick, onMounted, ref, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { createBuilder } from "../../utils/builder.js";
import type { Nullable } from "../../utils/types.js";

export type DateValue = Date | string | number;

export type DateRange = {
  start: Nullable<DateValue>;
  end: Nullable<DateValue>;
};

export type OnyxCalendarSelection = "single" | "multiple" | "range";

export type OnyxWeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OnyxHeadlessCalendarOptions = {
  modelValue: Ref<Nullable<DateValue> | DateValue[] | DateRange>;
  viewMonth: Ref<Nullable<DateValue>>;
  disabled?: MaybeRefOrGetter<boolean>;
  weekStartDay?: MaybeRefOrGetter<OnyxWeekDays>;
  min?: MaybeRefOrGetter<Nullable<Date>>;
  max?: MaybeRefOrGetter<Nullable<Date>>;
  showCalendarWeek?: MaybeRefOrGetter<Nullable<boolean>>;
  locale: MaybeRefOrGetter<string>;
  calendarSize: MaybeRefOrGetter<"big" | "small">;
  buttonRefs: Ref<Record<string, HTMLElement>>;
  selection?: MaybeRefOrGetter<OnyxCalendarSelection>;
  hoveredDate: Ref<Nullable<Date>>;
};

const getDayIndex = (dayName: OnyxWeekDays) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return days.indexOf(dayName);
};

const getISOWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
};

const getNormalizedDayIndex = (date: Date, weekStartDay: OnyxWeekDays) => {
  const day = date.getDay();
  const start = getDayIndex(weekStartDay);
  const normalizedDay = day === 0 ? 6 : day - 1;
  return (normalizedDay - start + 7) % 7;
};

const isDateRange = (value: DateRange | Nullable<DateValue> | DateValue[]): value is DateRange => {
  return value !== null && typeof value === "object" && "start" in value && "end" in value;
};

const isDateInstance = (value: DateRange | Nullable<DateValue> | DateValue[]): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

const toDate = (value: Nullable<DateValue>): Date | null => {
  if (isDateInstance(value)) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    if (isDateInstance(date)) {
      return date;
    }
  }
  return null;
};

const getMidnightDate = (value: DateValue): Date => {
  const date = toDate(value);
  if (!date) {
    return getMidnightDate(new Date());
  }
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const initializeDate = (options: {
  viewMonth: Nullable<DateValue>;
  min?: Nullable<Date>;
  max?: Nullable<Date>;
}) => {
  const min = options.min ? getMidnightDate(options.min) : null;
  const max = options.max ? getMidnightDate(options.max) : null;
  const today = getMidnightDate(new Date());

  let initialDate = toDate(options.viewMonth) ?? today;

  if (min && initialDate < min) initialDate = min;
  if (max && initialDate > max) initialDate = max;

  return initialDate;
};

const getFocusDateFromModel = (
  model: Nullable<DateValue | DateValue[] | DateRange>,
): Nullable<Date> => {
  if (!model) return null;

  let dateValueToFocus: Nullable<DateValue> = null;

  if (isDateInstance(model) || typeof model === "string" || typeof model === "number") {
    dateValueToFocus = model;
  } else if (Array.isArray(model) && model.length > 0) {
    dateValueToFocus = model.find((v) => toDate(v) !== null) ?? null;
  } else if (isDateRange(model) && model.start) {
    dateValueToFocus = model.start;
  }

  return toDate(dateValueToFocus);
};

/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export const _unstableCreateCalendar = createBuilder((options: OnyxHeadlessCalendarOptions) => {
  const initialValue = initializeDate({
    viewMonth: options.viewMonth.value,
    min: toValue(options.min),
    max: toValue(options.max),
  });

  onMounted(() => {
    if (!toDate(options.viewMonth.value)) {
      options.viewMonth.value = initialValue;
    }
  });

  const dayNames = computed(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2024, 0, 1 + i);
      return date;
    });

    const formatStyle = toValue(options.calendarSize) === "big" ? "long" : "short";

    const formatter = new Intl.DateTimeFormat(toValue(options.locale), { weekday: formatStyle });
    return days.map((day) => formatter.format(day));
  });

  const focusedDate = ref(toDate(getFocusDateFromModel(options.modelValue.value)) ?? initialValue);

  const currentYear = computed(
    () => toDate(options.viewMonth.value)?.getFullYear() ?? new Date().getFullYear(),
  );
  const currentMonth = computed(
    () => toDate(options.viewMonth.value)?.getMonth() ?? new Date().getMonth(),
  );

  const isToday = (date: Date) =>
    getMidnightDate(date).getTime() === getMidnightDate(new Date()).getTime();

  const isWithinRange = (date: Date, hovering: boolean = false) => {
    const selected = options.modelValue.value;

    if (!isDateRange(selected) || !selected.start) {
      return false;
    }

    const hasPermanentEnd = !!selected.end;
    const hasHoverEnd = !!options.hoveredDate.value;

    if (hovering) {
      if (hasPermanentEnd || !hasHoverEnd) {
        return false;
      }
    } else {
      if (!hasPermanentEnd) {
        return false;
      }
    }

    const start = toDate(selected.start);

    const endValue = hovering ? options.hoveredDate.value : selected.end;
    const end = toDate(endValue);

    if (!start || !end) return false;

    const dateMidnight = getMidnightDate(date);
    const startMidnight = getMidnightDate(start);
    const endMidnight = getMidnightDate(end);

    const [trueStart, trueEnd] = [startMidnight, endMidnight].sort(
      (a, b) => a.getTime() - b.getTime(),
    );

    return (
      dateMidnight.getTime() > trueStart!.getTime() && dateMidnight.getTime() < trueEnd!.getTime()
    );
  };

  const isSelected = computed(() => {
    return (date: Date) => {
      const value = options.modelValue.value;
      if (!value) return false;

      // multiple
      if (Array.isArray(value)) {
        const values = value.map((i) => new Date(i));
        return values.some((d) => d.toDateString() === date.toDateString());
      }

      // date range
      if (typeof value === "object" && !(value instanceof Date)) {
        const start = value.start ? new Date(value.start) : undefined;
        const end = value.end ? new Date(value.end) : undefined;
        return (
          start?.toDateString() === date.toDateString() ||
          end?.toDateString() === date.toDateString()
        );
      }

      // single
      return new Date(value).toDateString() === date.toDateString();
    };
  });

  const isFocused = computed(() => {
    return (date: Date) => {
      const focusedDateObj = toDate(focusedDate.value);
      return (
        !!focusedDateObj &&
        getMidnightDate(date).getTime() === getMidnightDate(focusedDateObj).getTime()
      );
    };
  });

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isDisabled = (date: Date): boolean => {
    const min = toValue(options.min);
    const max = toValue(options.max);
    const disabledFlag = !!toValue(options.disabled);
    const dateAtMidnight = getMidnightDate(date);

    const minCheck = min ? dateAtMidnight < getMidnightDate(min) : false;
    const maxCheck = max ? dateAtMidnight > getMidnightDate(max) : false;

    return disabledFlag || minCheck || maxCheck;
  };

  const generateCalendar = (year: number, month: number) => {
    const weekStartDay = toValue(options.weekStartDay) ?? "Monday";

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDayIndex = getDayIndex(weekStartDay);
    const offset = (firstDay.getDay() + 6) % 7;
    const startOffset = (offset - startDayIndex + 7) % 7;

    const calendarDays: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }[] = [];
    const prevMonthLastDay = new Date(year, month, 0);

    for (let i = startOffset; i > 0; i--) {
      const day = new Date(prevMonthLastDay);
      day.setDate(prevMonthLastDay.getDate() - i + 1);
      calendarDays.push({ date: day, isCurrentMonth: false, isDisabled: isDisabled(day) });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      calendarDays.push({ date: day, isCurrentMonth: true, isDisabled: isDisabled(day) });
    }

    const daysInNextMonth = 42 - calendarDays.length;
    for (let i = 1; i <= daysInNextMonth; i++) {
      const day = new Date(year, month + 1, i);
      calendarDays.push({ date: day, isCurrentMonth: false, isDisabled: isDisabled(day) });
    }

    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      const week = calendarDays.slice(i, i + 7);
      const weekNumber = String(getISOWeekNumber(week[0]!.date)).padStart(2, "0");
      weeks.push({ weekNumber, days: week });
    }

    return weeks;
  };

  const weeks = computed(() => generateCalendar(currentYear.value, currentMonth.value));

  const goToDate = (date: Date) => {
    const selected = options.modelValue.value;
    const selectionMode = toValue(options.selection);

    switch (selectionMode) {
      case "single":
        options.modelValue.value = getMidnightDate(date);
        break;

      case "multiple": {
        const dateMidnight = getMidnightDate(date);

        const selectedDates = Array.isArray(selected)
          ? selected.map(toDate).filter((d): d is Date => d !== null)
          : [];

        const isAlreadySelected = selectedDates.some(
          (d) => getMidnightDate(d).getTime() === dateMidnight.getTime(),
        );

        if (isAlreadySelected) {
          options.modelValue.value = selectedDates.filter(
            (d) => getMidnightDate(d).getTime() !== dateMidnight.getTime(),
          );
        } else {
          options.modelValue.value = [...selectedDates, dateMidnight];
        }
        break;
      }

      case "range": {
        const dateMidnightRange = getMidnightDate(date);
        const range: DateRange = isDateRange(selected) ? selected : { start: null, end: null };

        const currentStart = toDate(range.start);

        if (!currentStart || (currentStart && toDate(range.end))) {
          options.modelValue.value = { start: dateMidnightRange, end: null };
        } else if (getMidnightDate(currentStart).getTime() > dateMidnightRange.getTime()) {
          options.modelValue.value = { start: dateMidnightRange, end: currentStart };
        } else {
          options.modelValue.value = { ...range, end: dateMidnightRange };
        }
        break;
      }
    }

    focusedDate.value = getMidnightDate(date);

    if (
      getMidnightDate(date).getMonth() !== currentMonth.value ||
      getMidnightDate(date).getFullYear() !== currentYear.value
    ) {
      options.viewMonth.value = new Date(
        getMidnightDate(date).getFullYear(),
        getMidnightDate(date).getMonth(),
        1,
      );
    }
  };

  const handleKeyNavigation = async (event: KeyboardEvent) => {
    if (!focusedDate.value || toValue(options.disabled)) return;

    const { min, max } = options;
    const newDate = new Date(focusedDate.value as Date);
    let handled = false;

    switch (event.key) {
      case "ArrowUp":
        newDate.setDate(newDate.getDate() - 7);
        handled = true;
        break;
      case "ArrowDown":
        newDate.setDate(newDate.getDate() + 7);
        handled = true;
        break;
      case "ArrowLeft":
        newDate.setDate(newDate.getDate() - 1);
        handled = true;
        break;
      case "ArrowRight":
        newDate.setDate(newDate.getDate() + 1);
        handled = true;
        break;
      case "Home":
        if (options.weekStartDay) {
          const idx = getNormalizedDayIndex(newDate, toValue(options.weekStartDay));
          newDate.setDate(newDate.getDate() - idx);
        }
        handled = true;
        break;
      case "End":
        if (options.weekStartDay) {
          const idx = getNormalizedDayIndex(newDate, toValue(options.weekStartDay));
          newDate.setDate(newDate.getDate() + (6 - idx));
        }
        handled = true;
        break;
      case "PageUp":
        newDate.setMonth(newDate.getMonth() - (event.shiftKey ? 12 : 1));
        handled = true;
        break;
      case "PageDown":
        newDate.setMonth(newDate.getMonth() + (event.shiftKey ? 12 : 1));
        handled = true;
        break;
    }

    const isDateValid = (d: Date) => {
      const minDate = toValue(min);
      const maxDate = toValue(max);
      const md = getMidnightDate(d);
      return (
        !(minDate && md < getMidnightDate(minDate)) && !(maxDate && md > getMidnightDate(maxDate))
      );
    };

    if (handled) {
      event.preventDefault();
      if (isDateValid(newDate)) {
        focusedDate.value = newDate;

        if (newDate.getMonth() !== currentMonth.value) {
          options.viewMonth.value = getMidnightDate(
            new Date(newDate.getFullYear(), newDate.getMonth(), 1),
          );
          await nextTick();
        }

        const dateKey = focusedDate.value.toISOString().slice(0, 10);
        options.buttonRefs.value[dateKey]?.focus();
      }
    }
  };

  const weekdays = computed(() => {
    const weekStartDay = toValue(options.weekStartDay);
    if (!weekStartDay) return [];
    const days = toValue(dayNames);
    const start = getDayIndex(weekStartDay);
    return days.slice(start).concat(days.slice(0, start));
  });

  const selectedRange = computed(() => {
    const selected = options.modelValue.value;
    return isDateRange(selected) ? selected : null;
  });

  return {
    elements: {
      table: {
        role: "grid",
        onKeydown: handleKeyNavigation,
      },
      cell: computed(() => (day: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }) => {
        const range = selectedRange.value;
        const isRangeSelection = toValue(options.selection) === "range";
        const dateMidnightTime = day.date.getTime();

        const rangeStart = toDate(range?.start);
        const rangeEnd = toDate(range?.end);

        return day.date
          ? {
              role: "gridcell",
              "aria-selected": isSelected.value(day.date),
              "aria-disabled": day.isDisabled || toValue(options.disabled),
              class: {
                "other-month": !day.isCurrentMonth,
                "is-disabled": day.isDisabled,
                today: isToday(day.date),
                selected: isSelected.value(day.date),
                "is-start-date":
                  isRangeSelection &&
                  rangeStart &&
                  rangeEnd &&
                  dateMidnightTime === getMidnightDate(rangeStart).getTime(),
                "is-end-date":
                  isRangeSelection &&
                  rangeEnd &&
                  dateMidnightTime === getMidnightDate(rangeEnd).getTime(),
                "is-within-range": isRangeSelection && rangeEnd && isWithinRange(day.date),
                weekend: isWeekend(day.date),

                "is-start-date--hover":
                  isRangeSelection &&
                  rangeStart &&
                  !rangeEnd &&
                  options.hoveredDate.value &&
                  dateMidnightTime ===
                    getMidnightDate(
                      new Date(Math.min(rangeStart.getTime(), options.hoveredDate.value.getTime())),
                    ).getTime(),
                "is-end-date--hover":
                  isRangeSelection &&
                  rangeStart &&
                  !rangeEnd &&
                  options.hoveredDate.value &&
                  dateMidnightTime ===
                    getMidnightDate(
                      new Date(Math.max(rangeStart.getTime(), options.hoveredDate.value.getTime())),
                    ).getTime(),
                "is-within-range--hover":
                  isRangeSelection && rangeStart && !rangeEnd && isWithinRange(day.date, true),
              },
            }
          : {};
      }),
      button: computed(() => (day: { date: Date; isDisabled: boolean }) => {
        const formatter = new Intl.DateTimeFormat(toValue(options.locale), { dateStyle: "full" });
        const label = formatter.format(day.date);

        const selection = toValue(options.selection);
        const attributes = {
          "aria-label": label,
          "data-date": day.date.toDateString(),
        };

        if (!selection) return attributes;

        const disabled = day.isDisabled || toValue(options.disabled);

        return {
          ...attributes,
          tabindex: !disabled && isFocused.value(day.date) ? "0" : "-1",
          disabled,
          onClick: disabled ? undefined : () => goToDate(day.date),
        };
      }),
    },
    state: {
      focusedDate,
      currentYear,
      currentMonth,
      weeks,
      weekdays,
    },
    internals: {
      isToday,
      isSelected,
      isFocused,
      isWeekend,
      isDisabled,
      goToDate,
      goToPreviousMonth: () => {
        options.viewMonth.value = getMidnightDate(
          new Date(currentYear.value, currentMonth.value - 1, 1),
        );
      },
      goToNextMonth: () => {
        options.viewMonth.value = getMidnightDate(
          new Date(currentYear.value, currentMonth.value + 1, 1),
        );
      },
      goToToday: () => {
        const today = getMidnightDate(new Date());
        options.viewMonth.value = today;
        focusedDate.value = today;
      },
    },
  };
});
