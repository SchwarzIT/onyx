import { computed, nextTick, ref, watch } from "vue";
import type { OnyxCalderProps, OnyxWeekDays } from "./types.js";

const getDayIndex = (dayName: OnyxWeekDays) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return days.indexOf(dayName);
};

const getMidnightDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export function useCalendar(props: OnyxCalderProps) {
  const currentDate = ref(getMidnightDate(new Date()));
  const selectedDate = ref<Date | null>(null);
  const focusedDate = ref<Date | null>(getMidnightDate(new Date()));

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

    if (!props.startDay) return;
    const startDayIndex = getDayIndex(props.startDay);
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
    if (!focusedDate.value) return;

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
        if (props.startDay)
          newDate.setDate(newDate.getDate() - newDate.getDay() + getDayIndex(props.startDay));
        handled = true;
        break;
      case "End":
        if (props.startDay)
          newDate.setDate(newDate.getDate() + (6 - newDate.getDay() + getDayIndex(props.startDay)));
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
          await nextTick();
        }

        const nextDayButton = document.querySelector(
          `.cell-content__button[data-date="${focusedDate.value.toISOString().slice(0, 10)}"]`,
        ) as HTMLElement;
        if (nextDayButton) {
          nextDayButton.focus();
        }
      }
    }
  };

  const weekdays = computed(() => {
    if (!props.startDay) return;
    const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const start = getDayIndex(props.startDay);
    return days.slice(start).concat(days.slice(0, start));
  });

  watch(selectedDate, (newDate) => {
    if (newDate) {
      focusedDate.value = getMidnightDate(newDate);
    }
  });

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
  };
}
