<script lang="ts" setup>
import { computed, ref, toValue } from "vue";
import type { DateRange } from "../../utils/dates.js";
import { _unstableCreateCalendar, type SelectionMode } from "./createCalendar.js";

const props = withDefaults(
  defineProps<{
    mode?: SelectionMode;
  }>(),
  {
    mode: "single",
  },
);

const showCalendarWeeks = ref(false);
const locale = ref("en-US");
const calendarSize = ref<"small" | "big">("big");
const weekStartDay = ref<"Monday" | "Sunday">("Monday");
const viewMonth = ref(new Date(2024, 9, 1));
const modelValue = ref<Date | Date[] | DateRange | undefined>(new Date(2024, 9, 15));

const onUpdateViewMonth = (date: Date) => {
  viewMonth.value = date;
};
const onUpdateModelValue = (newValue: typeof modelValue.value) => {
  modelValue.value = newValue;
};

const {
  state: { weekdayNames, weeksToRender, viewMonth: currentViewMonth },
  elements: { table, cell, button },
  internals: { goToMonthByOffset, isSelected, isFocused, isDisabled, isToday },
} = _unstableCreateCalendar({
  locale,
  calendarSize,
  weekStartDay,
  viewMonth,
  modelValue,
  onUpdateViewMonth,
  onUpdateModelValue: onUpdateModelValue,
  selectionMode: computed(() => props.mode),
});

const viewMonthLabel = computed(() => {
  return currentViewMonth.value.toLocaleDateString(toValue(locale), {
    year: "numeric",
    month: "long",
  });
});
</script>

<template>
  <div class="calendar-wrapper">
    <div class="header">
      <button
        aria-label="Previous month"
        data-testid="prev-month"
        type="button"
        @click="goToMonthByOffset(-1)"
      >
        &lt;
      </button>
      <h2 :aria-label="viewMonthLabel">{{ viewMonthLabel }}</h2>
      <button
        aria-label="Next month"
        data-testid="next-month"
        type="button"
        @click="goToMonthByOffset(1)"
      >
        &gt;
      </button>
    </div>

    <table v-bind="table" :aria-label="viewMonthLabel">
      <thead>
        <tr>
          <th v-if="toValue(showCalendarWeeks)">CW</th>
          <th v-for="dayName in weekdayNames" :key="dayName" scope="col">{{ dayName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, weekIndex) in weeksToRender" :key="weekIndex">
          <td v-if="toValue(showCalendarWeeks)">{{ week.weekNumber }}</td>

          <td v-for="day in week.days" :key="day.date.toDateString()" v-bind="cell(day)">
            <button
              type="button"
              v-bind="button(day)"
              :class="{
                'day-button': true,
                'is-today': isToday(day.date),
                'is-focused': isFocused(day.date),
                'is-selected': isSelected(day.date),
                'is-disabled': isDisabled(day.date),
                'is-faded': !day.isCurrentMonth,
              }"
            >
              {{ day.date.getDate() }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  width: 30rem;
}
.day-button {
  padding: 8px;
  border: 1px solid transparent;
  background: none;
}
.day-button[tabindex="0"]:focus {
  outline: 2px solid blue;
  border-color: blue;
}
.is-selected {
  background-color: lightgreen;
}
.is-faded {
  opacity: 0.5;
}
.is-disabled {
  text-decoration: line-through;
  cursor: not-allowed;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
table {
  border-collapse: collapse;
}
th,
td {
  text-align: center;
}
</style>
