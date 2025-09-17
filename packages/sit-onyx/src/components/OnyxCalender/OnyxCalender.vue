<script lang="ts" setup>
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { computed, useTemplateRef, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { useResizeObserver } from "../../composables/useResizeObserver.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import { ONYX_BREAKPOINTS } from "../../utils/breakpoints.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxCalderProps } from "./types.js";
import { useCalendar } from "./useCalender.js";

const props = withDefaults(defineProps<OnyxCalderProps>(), {
  size: "auto",
  selection: "single",
  startDay: "Monday",
  displayCalendarWeek: false,
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});
/**
 * Emit selectedDate on Change
 */
const emit = defineEmits(["update:selectedDate"]);

defineSlots<{
  /**
   * Optional slot that is displayed below at the right of the Header.
   */
  actions?(): unknown;
}>();
const calenderSize = computed(() => {
  return props.size !== "auto" ? props.size : width.value < ONYX_BREAKPOINTS.xs ? "small" : "big";
});
const { t } = injectI18n();

const dayNames = computed(() => {
  const shortNames = [
    t.value("days.monday.short"),
    t.value("days.tuesday.short"),
    t.value("days.wednesday.short"),
    t.value("days.thursday.short"),
    t.value("days.friday.short"),
    t.value("days.saturday.short"),
    t.value("days.sunday.short"),
  ];
  const longNames = [
    t.value("days.monday.long"),
    t.value("days.tuesday.long"),
    t.value("days.wednesday.long"),
    t.value("days.thursday.long"),
    t.value("days.friday.long"),
    t.value("days.saturday.long"),
    t.value("days.sunday.long"),
  ];

  return calenderSize.value === "big" ? longNames : shortNames;
});
const {
  currentYear,
  currentMonth,
  selectedDate,
  weeks,
  weekdays,
  isToday,
  isSelected,
  isFocused,
  isWeekend,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  goToDate,
  handleKeyNavigation,
} = useCalendar({ ...props, dayNames });

const { densityClass } = useDensity(props);

const skeleton = useSkeletonContext(props);

watch(selectedDate, (newDate) => {
  if (newDate) {
    emit("update:selectedDate", newDate);
  }
});
const calenderRef = useTemplateRef("calender");

const { width } = useResizeObserver(calenderRef);

const sizeClass = computed(() => {
  return `onyx-calender--${calenderSize.value}`;
});
</script>

<template>
  <div v-if="skeleton" :class="['onyx-component', 'onyx-calender-skeleton', densityClass]">
    <OnyxSkeleton class="onyx-calender-skeleton__header" />
    <OnyxSkeleton class="onyx-calender-skeleton__body" />
  </div>

  <div
    v-else
    ref="calender"
    :class="[
      'onyx-component',
      'onyx-calender',
      sizeClass,
      densityClass,
      { 'onyx-calender--disabled': disabled },
    ]"
  >
    <div class="onyx-calender__header">
      <div class="control-container time-control-container">
        <OnyxSystemButton
          v-if="calenderSize !== 'small'"
          label="Today"
          class="control-container__today-btn"
          :disabled="disabled"
          @click="goToToday"
        />
        <OnyxSystemButton
          label="previous Month"
          :icon="iconChevronLeftSmall"
          :disabled="disabled"
          @click="goToPreviousMonth"
        />
        <OnyxHeadline is="h2" class="control-container__date-display">
          {{
            new Date(currentYear, currentMonth).toLocaleDateString("de-DE", {
              month: "long",
              year: "numeric",
            })
          }}
        </OnyxHeadline>
        <OnyxSystemButton
          label="next Month"
          :icon="iconChevronRightSmall"
          :disabled="disabled"
          @click="goToNextMonth"
        />
      </div>
      <div class="control-container">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="onyx-calender__body">
      <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -->
      <table role="grid" aria-labelledby="calendar-label" @keydown="handleKeyNavigation">
        <thead>
          <tr>
            <th v-for="(day, index) in weekdays" :key="index" scope="col" :abbr="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <td
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              role="gridcell"
              :aria-selected="day.date && isSelected(day.date) ? 'true' : 'false'"
              :aria-disabled="day.isDisabled || disabled ? 'true' : 'false'"
              :class="{
                'other-month': !day.isCurrentMonth,
                'is-disabled': day.isDisabled,
                today: day.date && isToday(day.date),
                selected: day.date && isSelected(day.date),
                weekend: day.date && isWeekend(day.date),
              }"
              type
              @click="!day.isDisabled ? goToDate(day.date) : null"
            >
              <div class="cell-content">
                <button
                  v-if="day.date"
                  type="button"
                  class="cell-content__button"
                  :tabindex="day.date && isFocused(day.date) && !day.isDisabled ? '0' : '-1'"
                  :data-date="day.date?.toISOString().slice(0, 10)"
                  :disabled="day.isDisabled || disabled"
                >
                  <span class="cell-content__button-number">
                    {{ day.date.getDate() }}
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-calender {
  @include layers.component() {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-sm);
    color: var(--onyx-color-text-icons-neutral-medium);

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .control-container {
        display: flex;
        gap: var(--onyx-density-xs);
        align-items: center;
        &__date-display {
          min-width: calc(3 * var(--onyx-density-2xl));
          text-align: center;
        }
      }
    }

    .onyx-calender__body {
      table {
        width: 100%;
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
        border-radius: var(--onyx-radius-md);
        table-layout: fixed;
        overflow: hidden;
        box-sizing: border-box;
        border-spacing: 0;
        background-color: var(--onyx-color-base-background-blank);

        th {
          color: var(--onyx-color-text-icons-neutral-medium);
          padding: var(--onyx-density-xs);
          justify-content: center;
          align-items: center;
          background: var(--onyx-color-base-neutral-200);
          border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
          font-family: var(--onyx-font-family-h4);
          font-weight: var(--onyx-font-weight-semibold);
        }

        td {
          font-family: var(--onyx-font-family);
          cursor: pointer;

          &:hover:not(.other-month, .is-disabled) {
            .cell-content__button-number {
              background-color: var(--onyx-color-base-neutral-300);
            }
          }
          &.weekend {
            background-color: var(--onyx-color-base-neutral-100);
          }
          .cell-content {
            padding: var(--onyx-density-2xs);
            box-sizing: border-box;
            width: 100%;
            aspect-ratio: 1;
            &__button {
              width: 2rem;
              height: 2rem;
              color: inherit;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              font-size: 1rem;
              cursor: inherit;
              background-color: transparent;
              padding: 0;
              &-number {
                width: 100%;
                height: 100%;
                border-radius: var(--onyx-radius-full);
                display: flex;
                justify-content: center;
                align-items: center;
              }
              &:focus-visible {
                border-radius: var(--onyx-radius-xs);
                outline: calc(var(--onyx-1px-in-rem) * 4) solid var(--onyx-color-base-primary-200);
                outline-offset: var(--onyx-density-2xs);
              }
            }
          }
          &.today {
            .cell-content__button-number {
              background: var(--onyx-color-base-neutral-500);
              color: var(--onyx-color-text-icons-neutral-inverted);
            }
          }
          &.selected {
            .cell-content__button-number {
              background-color: var(--onyx-color-base-primary-500);
              color: var(--onyx-color-text-icons-neutral-inverted);
            }
            &:hover .cell-content__button-number {
              background: var(--onyx-color-base-primary-700);
            }
          }
          &.other-month,
          &.is-disabled {
            .cell-content {
              color: var(--onyx-color-base-neutral-300);
            }
          }
          &.is-disabled {
            cursor: default;
          }
        }
      }
    }

    &--big {
      table {
        th {
          border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
          &:last-of-type {
            border-right: none;
          }
        }
        td {
          border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
          border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
          &:last-of-type {
            border-right: none;
          }
        }
        tr:last-of-type td {
          border-bottom: none;
        }
      }
    }

    &--small {
      .cell-content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .time-control-container {
        justify-content: space-between;
        width: 100%;
      }
    }

    &--disabled {
      pointer-events: none;
      .cell-content {
        opacity: 0.5;
      }
      cursor: default;
    }
    &-skeleton {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-sm);
      &__header {
        width: 100%;
        height: var(--onyx-font-line-height-lg);
      }
      &__body {
        width: 100%;
        aspect-ratio: 1;
      }
    }
  }
}
</style>
