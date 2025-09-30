import {
  computed,
  nextTick,
  ref,
  toValue,
  useId,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import { createBuilder, type VBindAttributes } from "../../utils/builder.js";
import type { Nullable } from "../../utils/types.js";

export type OnyxWeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OnyxHeadlessCalendarOptions = {
  disabled?: MaybeRefOrGetter<boolean>;
  weekStartDay?: MaybeRefOrGetter<OnyxWeekDays>;
  min?: MaybeRefOrGetter<Nullable<Date>>;
  max?: MaybeRefOrGetter<Nullable<Date>>;
  initialDate?: MaybeRefOrGetter<Nullable<Date>>;
  locale: MaybeRefOrGetter<string>;
  calendarSize: MaybeRefOrGetter<"big" | "small">;
  buttonRefs: Ref<Record<string, HTMLElement>>;
};

const getDayIndex = (dayName: OnyxWeekDays) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return days.indexOf(dayName);
};

const getNormalizedDayIndex = (date: Date, weekStartDay: OnyxWeekDays) => {
  const day = date.getDay();
  const start = getDayIndex(weekStartDay);
  const normalizedDay = day === 0 ? 6 : day - 1;
  return (normalizedDay - start + 7) % 7;
};

const getMidnightDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const initializeDate = (options: {
  min?: Nullable<Date>;
  max?: Nullable<Date>;
  initialDate?: Nullable<Date>;
}) => {
  const min = options.min ? getMidnightDate(new Date(options.min)) : null;
  const max = options.max ? getMidnightDate(new Date(options.max)) : null;
  const today = getMidnightDate(new Date());

  let initialDate = options.initialDate ? getMidnightDate(new Date(options.initialDate)) : today;

  if (min && initialDate < min) initialDate = min;
  if (max && initialDate > max) initialDate = max;

  return initialDate;
};

/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export const _unstableCreateCalendar = createBuilder((options: OnyxHeadlessCalendarOptions) => {
  const dayNames = computed(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2024, 0, 1 + i);
      return date;
    });

    const formatStyle = toValue(options.calendarSize) === "big" ? "long" : "short";

    const formatter = new Intl.DateTimeFormat(toValue(options.locale), { weekday: formatStyle });
    return days.map((day) => formatter.format(day));
  });

  const initialValue = initializeDate({
    initialDate: toValue(options.initialDate),
    min: toValue(options.min),
    max: toValue(options.max),
  });

  const currentDate = ref(initialValue);
  const focusedDate = ref(initialValue);
  const selectedDate = ref<Date | null>(null);

  const currentYear = computed(() => currentDate.value.getFullYear());
  const currentMonth = computed(() => currentDate.value.getMonth());

  const isToday = (date: Date) =>
    getMidnightDate(date).getTime() === getMidnightDate(new Date()).getTime();

  const isSelected = (date: Date) =>
    !!selectedDate.value &&
    getMidnightDate(date).getTime() === getMidnightDate(selectedDate.value).getTime();

  const isFocused = (date: Date) =>
    !!focusedDate.value &&
    getMidnightDate(date).getTime() === getMidnightDate(focusedDate.value).getTime();

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
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return weeks;
  };

  const weeks = computed(() => generateCalendar(currentYear.value, currentMonth.value));

  const goToDate = (date: Date) => {
    const midnightDate = getMidnightDate(date);
    currentDate.value = midnightDate;
    selectedDate.value = midnightDate;
    focusedDate.value = midnightDate;
  };

  const handleKeyNavigation = async (event: KeyboardEvent) => {
    if (!focusedDate.value || toValue(options.disabled)) return;

    const { min, max } = options;
    const newDate = new Date(focusedDate.value);
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

        if (newDate.getMonth() !== currentDate.value.getMonth()) {
          currentDate.value = getMidnightDate(
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

  watch(selectedDate, (newDate) => {
    if (newDate) focusedDate.value = getMidnightDate(newDate);
  });

  const calendarId = useId();

  return {
    elements: {
      table: computed<VBindAttributes>(() => ({
        role: "grid",
        "aria-labelledby": `calendar-${calendarId}`,
        onKeydown: (e: KeyboardEvent) => handleKeyNavigation(e),
      })),
      cell: computed(
        () => (day: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }) =>
          day.date
            ? {
                role: "gridcell",
                "aria-selected": isSelected(day.date),
                "aria-disabled": day.isDisabled || toValue(options.disabled),
                class: {
                  "other-month": !day.isCurrentMonth,
                  "is-disabled": day.isDisabled,
                  today: isToday(day.date),
                  selected: isSelected(day.date),
                  weekend: isWeekend(day.date),
                },
              }
            : {},
      ),
      button: computed(
        () => (day: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }) =>
          day.date
            ? {
                tabindex: isFocused(day.date) && !day.isDisabled ? "0" : "-1",
                disabled: day.isDisabled || toValue(options.disabled),
                class: "cell-content",
                "data-date": day.date.toISOString().slice(0, 10),
                onClick: () => !day.isDisabled && goToDate(day.date),
              }
            : {},
      ),
    },
    state: {
      selectedDate,
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
      goToPreviousMonth: () =>
        (currentDate.value = getMidnightDate(
          new Date(currentYear.value, currentMonth.value - 1, 1),
        )),
      goToNextMonth: () =>
        (currentDate.value = getMidnightDate(
          new Date(currentYear.value, currentMonth.value + 1, 1),
        )),
      goToToday: () => {
        const today = getMidnightDate(new Date());
        currentDate.value = today;
        focusedDate.value = today;
      },
    },
  };
});
