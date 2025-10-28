<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup generic="TSelection extends OnyxCalendarSelectionMode">
import { _unstableCreateCalendar, type RenderDay, type RenderWeek } from "@sit-onyx/headless";
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
import OnyxCalendarCell from "../OnyxCalendarCell/OnyxCalendarCell.vue";
import type { CalendarCellRangeType } from "../OnyxCalendarCell/types.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import type {
  DateRange,
  OnyxCalendarProps,
  OnyxCalendarSelectionMode,
  OnyxCalendarSize,
  OnyxCalendarValueBySelection,
} from "./types.js";

const props = withDefaults(defineProps<OnyxCalendarProps<TSelection>>(), {
  size: "auto",
  weekStartDay: "Monday",
  showCalendarWeek: false,
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  modelValue: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the selection changes
   */
  "update:modelValue": [newDate: OnyxCalendarValueBySelection<TSelection>];
  /**
   * Emitted when the viewed Month changes
   */
  "update:viewMonth": [newDate: Date];
}>();

const slots = defineSlots<{
  /**
   * Optional slot that is displayed below at the right of the Header.
   */
  actions?(): unknown;
  /**
   * Optional slot that is displayed inside each day, for custom calender content.
   */
  day?(props: {
    /**
     * Date that the slot is rendered for.
     */
    date: Date;
    /**
     * Actual size of the calendar.
     */
    size: Exclude<OnyxCalendarSize, "auto">;
  }): unknown;
}>();

const modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
});

const viewMonth = useVModel({
  key: "viewMonth",
  props,
  emit,
  default: () => new Date(),
});
const { densityClass } = useDensity(props);

const skeleton = useSkeletonContext(props);
const { t, locale, d } = injectI18n();

const calendarRef = useTemplateRef("calendar");
const { width } = useResizeObserver(calendarRef);
const calendarSize = computed(() =>
  props.size !== "auto" ? props.size : width.value < ONYX_BREAKPOINTS.xs ? "small" : "big",
);

const { disabled, min, max, weekStartDay, showCalendarWeeks, selectionMode } = toRefs(props);

const {
  state: { weeksToRender, weekdayNames },
  elements: { table: tableProps, cell: cellProps, button: buttonProps },
  internals: { goToMonthByOffset, goToToday, isSelected, isToday, getRangeType, isDisabled },
} = _unstableCreateCalendar({
  disabled,
  min,
  max,
  locale,
  calendarSize,
  weekStartDay,
  showCalendarWeeks,
  viewMonth,
  modelValue,
  selectionMode,
  onUpdateViewMonth: (newDate) => ((viewMonth.value as Date) = newDate),
  onUpdateModelValue: (newValue) => (modelValue.value = newValue as typeof modelValue.value),
});

const hoveredDate = ref<Date>();

const addHoverClass = (day: RenderDay) => {
  if (selectionMode.value !== "range") return;
  hoveredDate.value = day.date;
};

const tableHeaders = computed(() => {
  if (!props.showCalendarWeeks) return weekdayNames.value;
  return [t.value("calendar.calenderWeek"), ...weekdayNames.value];
});

const getDayRangeType = computed(() => {
  return (date: Date): CalendarCellRangeType | undefined => {
    const currentRange =
      props.selectionMode === "range" ? (modelValue.value as Nullable<DateRange>) : undefined;
    if (!currentRange || currentRange.end || !hoveredDate.value) return getRangeType.value(date);

    return getRangeType.value(date, {
      start: currentRange.start,
      end:
        hoveredDate.value.getTime() === currentRange.start.getTime()
          ? undefined
          : hoveredDate.value,
    });
  };
});

const selectWeek = (week: RenderWeek) => {
  //TODO: add isDisabled if start or end is disabled
  if (selectionMode.value !== "range") return;
  const newRange: DateRange = {
    start: week.days[0]!.date,
    end: week.days[6]!.date,
  };

  modelValue.value = newRange as unknown as typeof modelValue.value;
};
const getWeekNumberProps = (week: RenderWeek) => {
  const isDisabled = props.disabled;
  //TODO: add isDisabled if start or end is disabled
  if (props.selectionMode === "range") {
    return {
      role: "button",
      tabindex: "0",
      "aria-disabled": isDisabled,
    };
  }
  return {};
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
    :class="['onyx-component', 'onyx-calendar', `onyx-calendar--${calendarSize}`, densityClass]"
  >
    <div class="onyx-calendar__header">
      <div class="control-container time-control-container">
        <OnyxSystemButton
          :label="t('calendar.todayButton.label')"
          class="control-container__today-btn"
          :disabled="disabled"
          :clickable="t('calendar.todayButton.tooltip')"
          @click="goToToday"
        />

        <OnyxHeadline is="h2" class="control-container__date-display">
          {{ d(viewMonth, { month: "long", year: "numeric" }) }}
        </OnyxHeadline>
        <OnyxTag
          v-if="showCalendarWeeks && calendarSize === 'big'"
          color="primary"
          :label="`${t('calendar.calenderWeek')} ${weeksToRender[0]?.weekNumber} - ${weeksToRender[weeksToRender.length - 1]?.weekNumber} `"
        />
        <OnyxIconButton
          class="control-container__prev-month-button"
          :label="t('calendar.previousMonthButton')"
          color="neutral"
          :icon="iconChevronLeftSmall"
          :disabled="disabled"
          @click="goToMonthByOffset(-1)"
        />
        <OnyxIconButton
          class="control-container__next-month-button"
          :label="t('calendar.nextMonthButton')"
          color="neutral"
          :icon="iconChevronRightSmall"
          :disabled="disabled"
          @click="goToMonthByOffset(1)"
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
            <th v-for="header in tableHeaders" :key="header" scope="col" :abbr="header">
              {{ header }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="week in weeksToRender" :key="week.weekNumber">
            <th
              v-if="showCalendarWeeks"
              scope="row"
              v-bind="getWeekNumberProps(week)"
              @click="selectWeek(week)"
            >
              {{ week.weekNumber }}
            </th>

            <OnyxCalendarCell
              :is="props.selectionMode ? 'button' : 'div'"
              v-for="day in week.days"
              v-bind="cellProps({ date: day.date })"
              :key="day.date.toDateString()"
              :date="day.date.getDate()"
              :button-attributes="buttonProps({ date: day.date })"
              :disabled="isDisabled(day.date)"
              :show-as-disabled="!day.isCurrentMonth"
              :color="isSelected(day.date) ? 'primary' : isToday(day.date) ? 'neutral' : undefined"
              :background-color="[0, 6].includes(day.date.getDay()) ? 'tinted' : 'blank'"
              :range-type="getDayRangeType(day.date)"
              :size="calendarSize"
              :tool-tip-text="isToday(day.date) ? t('calendar.todayButton.label') : undefined"
              @hovered="addHoverClass(day)"
            >
              <template v-if="!!slots.day" #default>
                <slot name="day" :date="day.date" :size="calendarSize"></slot>
              </template>
            </OnyxCalendarCell>
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
    font-family: var(--onyx-font-family);
    $calender-week-column-width: 2.5rem;
    $calender-day-number-display-width: 2rem;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .control-container {
        display: flex;
        gap: var(--onyx-density-2xs);
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
          font-size: var(--onyx-font-size-sm);
          line-height: var(--onyx-font-line-height-sm);

          &[scope="row"] {
            border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
          }
        }

        // calendar week styles
        &:has(th[scope="row"]) {
          th:first-of-type {
            width: $calender-week-column-width;
            &[role="button"] {
              cursor: pointer;
            }
          }

          tr:last-of-type {
            th[scope="row"] {
              border-bottom: none;
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
            // to fix aspect-ratio for last column
            padding-top: var(--onyx-1px-in-rem);
          }
        }
        tr:last-of-type td {
          border-bottom: none;
        }
      }
    }

    &--small {
      .time-control-container {
        width: 100%;
      }
      .control-container__prev-month-button {
        margin-left: auto;
      }
      &:has(th[scope="row"]) {
        th:first-of-type {
          border-bottom: none;
        }
      }
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
