<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup>
import { _unstableCreateCalendar } from "@sit-onyx/headless";
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { computed, ref, toRefs, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useResizeObserver } from "../../composables/useResizeObserver.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/utils.js";
import { ONYX_BREAKPOINTS } from "../../utils/breakpoints.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import type { OnyxCalendarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxCalendarProps>(), {
  size: "auto",
  selection: "single",
  weekStartDay: "Monday",
  displayCalendarWeek: false,
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  modelValue: null,
});

const emit = defineEmits<{
  /**
   * Emitted when the selection changes
   */
  "update:modelValue": [newDate: Date];
  /**
   * Emitted when the viewed Month changes
   */
  "update:viewMonth": [newDate: Date];
}>();

defineSlots<{
  /**
   * Optional slot that is displayed below at the right of the Header.
   */
  actions?(): unknown;
  /**
   * Optional slot that is displayed inside each day, for custom calender content.
   */
  day?(props: { date: Date; size: "small" | "big" }): unknown;
}>();

const modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
  default: null,
});

const viewMonth = useVModel({
  key: "viewMonth",
  props,
  emit,
  default: null,
});
const { densityClass } = useDensity(props);

const skeleton = useSkeletonContext(props);
const { t, locale } = injectI18n();

const calendarSize = computed(() =>
  props.size !== "auto" ? props.size : width.value < ONYX_BREAKPOINTS.xs ? "small" : "big",
);

const buttonRefs = ref<Record<string, HTMLElement>>({});
const setButtonRef = (el: HTMLElement | null, dateKey: string) => {
  if (el) {
    buttonRefs.value[dateKey] = el;
  } else {
    delete buttonRefs.value[dateKey];
  }
};

const { disabled, min, max, weekStartDay, displayCalendarWeek, selection } = toRefs(props);
const hoveredDate = ref<Nullable<Date>>();
const {
  state: { currentYear, currentMonth, weeks, weekdays },
  elements: { table: tableProps, cell: cellProps, button: buttonProps },
  internals: { goToPreviousMonth, goToNextMonth, goToToday },
} = _unstableCreateCalendar({
  disabled,
  min,
  max,
  locale,
  calendarSize,
  buttonRefs,
  weekStartDay,
  displayCalendarWeek,
  viewMonth,
  modelValue,
  selection,
  hoveredDate,
});

const calendarRef = useTemplateRef("calendar");
const { width } = useResizeObserver(calendarRef);

const sizeClass = computed(() => `onyx-calendar--${calendarSize.value}`);

const addHoverClass = (day: { date: Date; isDisabled: boolean }) => {
  if (selection.value !== "range" || day.isDisabled) return;
  hoveredDate.value = day.date;
};
const removeHoverClass = () => {
  if (selection.value !== "range") return;
  hoveredDate.value = null;
};
</script>

<template>
  <div v-if="skeleton" :class="['onyx-component', 'onyx-calendar-skeleton', densityClass]">
    <OnyxSkeleton class="onyx-calendar-skeleton__header" />
    <OnyxSkeleton class="onyx-calendar-skeleton__body" />
  </div>

  <div
    v-else
    ref="calendar"
    :class="[
      'onyx-component',
      'onyx-calendar',
      sizeClass,
      densityClass,
      { 'onyx-calendar--disabled': disabled },
      `onyx-calendar--${selection}`,
    ]"
  >
    <div class="onyx-calendar__header">
      <div class="control-container time-control-container">
        <OnyxTag
          v-if="calendarSize !== 'small'"
          :label="t('calendar.todayButton.label')"
          class="control-container__today-btn"
          :disabled="disabled"
          :clickable="t('calendar.todayButton.tooltip')"
          @click="goToToday"
        />
        <OnyxIconButton
          :label="t('calendar.previousMonthButton')"
          color="neutral"
          :icon="iconChevronLeftSmall"
          :disabled="disabled"
          @click="goToPreviousMonth"
        />
        <OnyxHeadline is="h2" class="control-container__date-display">
          {{
            new Date(currentYear, currentMonth).toLocaleDateString(locale, {
              month: "long",
              year: "numeric",
            })
          }}
        </OnyxHeadline>
        <OnyxIconButton
          :label="t('calendar.nextMonthButton')"
          color="neutral"
          :icon="iconChevronRightSmall"
          :disabled="disabled"
          @click="goToNextMonth"
        />
      </div>
      <div class="control-container">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="onyx-calendar__body">
      <table v-bind="tableProps">
        <thead>
          <tr>
            <th
              v-if="displayCalendarWeek"
              class="onyx-calendar-calender-week-header onyx-text--small"
            >
              {{ t("calendar.calenderWeek") }}
            </th>
            <th
              v-for="(day, index) in weekdays"
              :key="index"
              scope="col"
              :abbr="day"
              class="onyx-text--small"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <td v-if="displayCalendarWeek" class="onyx-calendar-calender-week-cell">
              <p>
                {{ week.weekNumber }}
              </p>
            </td>

            <td
              v-for="(day, dayIndex) in week.days"
              :key="dayIndex"
              v-bind="cellProps(day)"
              @mouseenter="addHoverClass(day)"
              @focusin="addHoverClass(day)"
              @mouseleave="removeHoverClass()"
              @focusout="removeHoverClass()"
            >
              <button
                v-if="day.date"
                v-bind="buttonProps(day)"
                :ref="
                  (el) =>
                    setButtonRef(el as HTMLElement | null, day.date?.toISOString().slice(0, 10))
                "
                type="button"
              >
                <div class="cell-content__header">
                  <span class="cell-content__number">
                    <span class="cell-content__number-display">
                      {{ day.date.getDate() }}
                    </span>
                  </span>
                </div>
                <slot name="day" :date="day.date" :size="calendarSize"></slot>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-calendar {
  @include layers.component() {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-sm);
    color: var(--onyx-color-text-icons-neutral-medium);
    $calender-week-column-width: 2.5rem;
    $calender-day-number-display-width: 2rem;

    &-calender-week {
      &-header {
        width: $calender-week-column-width;
      }
      &-cell {
        background-color: var(--onyx-color-base-neutral-200);
        p {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
      }
    }
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

    .onyx-calendar__body {
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
          padding: var(--onyx-density-xs);
          justify-content: center;
          align-items: center;
          background-color: var(--onyx-color-base-neutral-200);
          border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
          font-family: var(--onyx-font-family-h4);
          font-weight: var(--onyx-font-weight-semibold);
        }

        td {
          font-family: var(--onyx-font-family);
          cursor: pointer;

          &:hover:not(.is-disabled) {
            &.other-month {
              .cell-content__number-display {
                color: var(--onyx-color-text-icons-neutral-medium);
              }
            }
            .cell-content__number-display {
              background-color: var(--onyx-color-base-neutral-300);
            }
          }

          &.weekend {
            background-color: var(--onyx-color-base-neutral-100);
          }
          .cell-content {
            position: relative;
            cursor: pointer;
            display: flex;
            color: inherit;
            flex-direction: column;
            padding: var(--onyx-density-2xs);
            background-color: initial;
            border: none;
            box-sizing: border-box;
            width: 100%;
            aspect-ratio: 1;
            &__number {
              width: $calender-day-number-display-width;
              height: $calender-day-number-display-width;
              display: flex;
              border: none;
              font-size: 1rem;
              cursor: inherit;
              background-color: transparent;
              padding: 0;
              &-display {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--onyx-radius-full);
              }
            }
            &:focus-visible {
              outline: none;
              .cell-content__number {
                border-radius: var(--onyx-radius-xs);
                outline: calc(var(--onyx-1px-in-rem) * 4) solid var(--onyx-color-base-primary-200);
                outline-offset: var(--onyx-density-2xs);
              }
            }
          }
          &.today {
            .cell-content__number-display {
              background: var(--onyx-color-base-neutral-500);
              color: var(--onyx-color-text-icons-neutral-inverted);
            }
          }
          &.selected {
            .cell-content__number-display {
              background-color: var(--onyx-color-base-primary-500);
              color: var(--onyx-color-text-icons-neutral-inverted);
            }
            &:hover .cell-content__number-display {
              background: var(--onyx-color-base-primary-700);
            }
          }
          &.is-within-range:not(.today) {
            .cell-content__number-display {
              color: var(--onyx-color-text-icons-primary-bold);
            }
            &:hover .cell-content__number-display {
              background: var(--onyx-color-base-primary-700);
              color: var(--onyx-color-text-icons-neutral-inverted);
            }
          }
          &.other-month,
          &.is-disabled {
            .cell-content {
              color: var(--onyx-color-base-neutral-300);
            }
          }
          &.is-disabled {
            * {
              cursor: default;
            }
          }
        }
        // Range
        .cell-content__number {
          position: relative;
          z-index: 1;
        }
        .cell-content__header {
          position: relative;
          &:after {
            display: none;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            // -button-border + border-space
            left: calc(-1 * (var(--onyx-density-2xs) + var(--onyx-1px-in-rem)));
            background-color: var(--onyx-color-text-icons-primary-soft);
          }
        }

        &:has(.is-end-date) .is-start-date:not(.is-end-date),
        .is-start-date--hover:not(.is-end-date--hover) {
          .cell-content__header {
            &:after {
              display: block;
              left: 1rem;
              // 100% - half of number-display-width + button-border + border-space
              width: calc(
                100% - 0.5 * $calender-day-number-display-width + var(--onyx-density-2xs) +
                  var(--onyx-1px-in-rem)
              );
            }
          }
        }
        .is-within-range,
        .is-within-range--hover {
          .cell-content__header {
            &:after {
              display: block;
              //100%+ 2 * button-border + 2 * button-space
              width: calc(100% + 2 * var(--onyx-density-2xs) + 2 * var(--onyx-1px-in-rem));
            }
          }
        }
        .is-end-date:not(.is-start-date),
        .is-end-date--hover:not(.is-start-date--hover) {
          .cell-content__header {
            &:after {
              display: block;
              // half of number-display width + button-border  + border-space
              width: calc(
                0.5 * $calender-day-number-display-width + var(--onyx-density-2xs) +
                  var(--onyx-1px-in-rem)
              );
            }
          }
        }
        .is-end-date--hover:not(.is-start-date--hover),
        .is-start-date--hover:not(.is-end-date--hover) {
          :focus-visible {
            .cell-content__number-display {
              background-color: var(--onyx-color-base-neutral-300);
            }
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
      .cell-content__header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .onyx-calendar__body table {
        &:has(.is-end-date) .is-start-date:not(.is-end-date),
        .is-start-date--hover:not(.is-end-date--hover) {
          .cell-content__header {
            &:after {
              left: 50%;
              // 50% + button-border + border-space
              width: calc(50% + var(--onyx-density-2xs) + var(--onyx-1px-in-rem));
            }
          }
        }
        .is-end-date:not(.is-start-date),
        .is-end-date--hover:not(.is-start-date--hover) {
          .cell-content__header {
            &:after {
              // 50% + button-border + border-space
              width: calc(50% + var(--onyx-density-2xs) + var(--onyx-1px-in-rem));
            }
          }
        }
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
  &--view {
    .onyx-calendar__body table td {
      cursor: default;
      .cell-content {
        cursor: default;
      }
      &:hover {
        .cell-content__number-display {
          background-color: inherit;
          color: inherit;
        }
        &.today {
          .cell-content__number-display {
            background: var(--onyx-color-base-neutral-500);
            color: var(--onyx-color-text-icons-neutral-inverted);
          }
        }
        &.other-month {
          cursor: pointer;
          .cell-content {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
