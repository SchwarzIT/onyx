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

export type OnyxHeadlessCalderProps = {
  /**
   * Whether the calendar should be disabled, preventing user interaction.
   */
  disabled?: boolean;
  /**
   * The first day of the week to be displayed.
   */
  weekStartDay?: OnyxWeekDays;
  /**
   * The earliest selectable date.
   */
  min?: Date;
  /**
   * The latest selectable date.
   */
  max?: Date;
  /**
   * The Date that should initially displayed
   */
  initialDate?: Date;
};
export type OnyxWeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const getDayIndex = (dayName: OnyxWeekDays) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return days.indexOf(dayName);
};

const getNormalizedDayIndex = (date: Date, weekStartDay: OnyxWeekDays) => {
  const day = date.getDay();
  const start = getDayIndex(weekStartDay);
  // normalize: 0 = Sunday, 1 = Monday ... 6 = Saturday
  const normalizedDay = day === 0 ? 6 : day - 1;
  return (normalizedDay - start + 7) % 7;
};

const getMidnightDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const initializeDate = (props: OnyxHeadlessCalderProps) => {
  const min = props.min ? getMidnightDate(new Date(props.min)) : null;
  const max = props.max ? getMidnightDate(new Date(props.max)) : null;
  const today = getMidnightDate(new Date());

  let initialDate = props.initialDate ? getMidnightDate(new Date(props.initialDate)) : today;

  if (min && initialDate < min) {
    initialDate = min;
  }
  if (max && initialDate > max) {
    initialDate = max;
  }

  return initialDate;
};

export function createCalendar(
  props: OnyxHeadlessCalderProps & {
    dayNames: MaybeRefOrGetter<string[]>;
    buttonRefs: Ref<Record<string, HTMLElement>>;
  },
) {
  const initialValue = initializeDate(props);
  const currentDate = ref(initialValue);
  const focusedDate = ref(initialValue);
  const selectedDate = ref<Date | null>(null);

  const currentYear = computed(() => currentDate.value.getFullYear());
  const currentMonth = computed(() => currentDate.value.getMonth());

  const isToday = (date: Date) => {
    const today = getMidnightDate(new Date());
    return getMidnightDate(date).getTime() === today.getTime();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate.value) return false;
    return getMidnightDate(date).getTime() === getMidnightDate(selectedDate.value).getTime();
  };

  const isFocused = (date: Date) => {
    if (!focusedDate.value) return false;
    return getMidnightDate(date).getTime() === getMidnightDate(focusedDate.value).getTime();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isDisabled = (date: Date) => {
    const min = props.min ? getMidnightDate(new Date(props.min)) : undefined;
    const max = props.max ? getMidnightDate(new Date(props.max)) : undefined;
    const dateAtMidnight = getMidnightDate(date);

    return (min && dateAtMidnight < min) || (max && dateAtMidnight > max);
  };

  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    if (!props.weekStartDay) return;
    const startDayIndex = getDayIndex(props.weekStartDay);
    const firstDayOfWeek = firstDay.getDay();
    const offset = (firstDayOfWeek + 6) % 7;
    const startOffset = (offset - startDayIndex + 7) % 7;

    const totalDays = 42;
    const calendarDays = [];

    const prevMonthLastDay = new Date(year, month, 0);
    for (let i = startOffset; i > 0; i--) {
      const day = new Date(prevMonthLastDay);
      day.setDate(prevMonthLastDay.getDate() - i + 1);
      calendarDays.push({ date: day, isCurrentMonth: false, isDisabled: isDisabled(day) });
    }

    const daysInCurrentMonth = lastDay.getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const day = new Date(year, month, i);
      calendarDays.push({ date: day, isCurrentMonth: true, isDisabled: isDisabled(day) });
    }

    const daysInNextMonth = totalDays - calendarDays.length;
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

  const goToPreviousMonth = () => {
    currentDate.value = getMidnightDate(new Date(currentYear.value, currentMonth.value - 1, 1));
    focusedDate.value = currentDate.value;
  };

  const goToNextMonth = () => {
    currentDate.value = getMidnightDate(new Date(currentYear.value, currentMonth.value + 1, 1));
    focusedDate.value = currentDate.value;
  };

  const goToToday = () => {
    const today = getMidnightDate(new Date());
    currentDate.value = today;
    focusedDate.value = today;
  };

  const goToDate = (date: Date) => {
    const midnightDate = getMidnightDate(date);
    currentDate.value = midnightDate;
    selectedDate.value = midnightDate;
    focusedDate.value = midnightDate;
  };

  const handleKeyNavigation = async (event: KeyboardEvent) => {
    if (!focusedDate.value || props.disabled) return;

    const { min, max } = props;
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
        if (props.weekStartDay) {
          const currentDayIndex = getNormalizedDayIndex(newDate, props.weekStartDay);
          newDate.setDate(newDate.getDate() - currentDayIndex);
        }
        handled = true;
        break;
      case "End":
        if (props.weekStartDay) {
          const currentDayIndex = getNormalizedDayIndex(newDate, props.weekStartDay);
          newDate.setDate(newDate.getDate() + (6 - currentDayIndex));
        }
        handled = true;
        break;
      case "PageUp":
        if (event.shiftKey) {
          newDate.setFullYear(newDate.getFullYear() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() - 1);
        }
        handled = true;
        break;
      case "PageDown":
        if (event.shiftKey) {
          newDate.setFullYear(newDate.getFullYear() + 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        handled = true;
        break;
    }
    const isDateValid = (dateToCheck: Date) => {
      const minDate = min ? getMidnightDate(new Date(min)) : undefined;
      const maxDate = max ? getMidnightDate(new Date(max)) : undefined;
      const dateAtMidnight = getMidnightDate(dateToCheck);

      return !(minDate && dateAtMidnight < minDate) && !(maxDate && dateAtMidnight > maxDate);
    };

    if (handled) {
      event.preventDefault();
      if (isDateValid(newDate)) {
        focusedDate.value = newDate;

        if (newDate.getMonth() !== currentDate.value.getMonth()) {
          currentDate.value = getMidnightDate(
            new Date(newDate.getFullYear(), newDate.getMonth(), 1),
          );
          await nextTick(); // wait for rendering new Month
        }
        const dateKey = focusedDate.value.toISOString().slice(0, 10);
        const nextDayButton = props.buttonRefs.value[dateKey];
        if (nextDayButton) {
          nextDayButton.focus();
        }
      }
    }
  };
  const weekdays = computed(() => {
    if (!props.weekStartDay) return;
    const days = toValue(props.dayNames);
    const start = getDayIndex(props.weekStartDay);
    return days.slice(start).concat(days.slice(0, start));
  });

  watch(selectedDate, (newDate) => {
    if (newDate) {
      focusedDate.value = getMidnightDate(newDate);
    }
  });

  type CalendarDayItem = {
    date: Date | null;
    isCurrentMonth: boolean;
    isDisabled: boolean | undefined;
  };

  const calendarId = useId();
  const tableProps = {
    role: "grid",
    "aria-labelledby": `calendar-${calendarId}`,
    onKeydown: (e: KeyboardEvent) => handleKeyNavigation(e),
  };

  const cellProps = (day: CalendarDayItem) => {
    if (!day.date) return {};
    return {
      role: "gridcell",
      "aria-selected": isSelected(day.date) ? true : false,
      "aria-disabled": day.isDisabled || props.disabled ? true : false,
      class: {
        "other-month": !day.isCurrentMonth,
        "is-disabled": day.isDisabled,
        today: day.date && isToday(day.date),
        selected: day.date && isSelected(day.date),
        weekend: day.date && isWeekend(day.date),
      },
    };
  };
  const buttonProps = (day: CalendarDayItem) => {
    if (!day.date) return {};
    return {
      tabindex: day.date && isFocused(day.date) && !day.isDisabled ? "0" : "-1",
      disabled: day.isDisabled || props.disabled,
      class: "cell-content",
      "data-date": day.date?.toISOString().slice(0, 10),
      onClick: () => {
        if (!day.isDisabled) goToDate(day.date!);
      },
    };
  };

  return {
    selectedDate,
    focusedDate,
    currentYear,
    currentMonth,
    weeks,
    weekdays,
    isToday,
    isSelected,
    isFocused,
    isWeekend,
    isDisabled,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    goToDate,
    handleKeyNavigation,
    tableProps,
    cellProps,
    buttonProps,
  };
}
