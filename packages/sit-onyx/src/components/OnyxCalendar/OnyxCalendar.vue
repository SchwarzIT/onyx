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
import { computed, ref, toRefs, useTemplateRef, watch } from "vue";
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
import type { OnyxCalendarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxCalendarProps>(), {
  size: "auto",
  selection: "single",
  weekStartDay: "Monday",
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

const { densityClass } = useDensity(props);

const skeleton = useSkeletonContext(props);
const { locale } = injectI18n();

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

const { disabled, min, max, initialDate, weekStartDay } = toRefs(props);

const {
  state: { currentYear, currentMonth, selectedDate, weeks, weekdays },
  elements: { table: tableProps, cell: cellProps, button: buttonProps },
  internals: { goToPreviousMonth, goToNextMonth, goToToday },
} = _unstableCreateCalendar({
  disabled,
  min,
  max,
  initialDate,
  locale,
  calendarSize,
  buttonRefs,
  weekStartDay,
});

watch(selectedDate, (newDate) => {
  if (newDate) {
    emit("update:selectedDate", newDate);
  }
});

const calendarRef = useTemplateRef("calendar");
const { width } = useResizeObserver(calendarRef);

const sizeClass = computed(() => `onyx-calendar--${calendarSize.value}`);
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
    ]"
  >
    <div class="onyx-calendar__header">
      <div class="control-container time-control-container">
        <OnyxSystemButton
          v-if="calendarSize !== 'small'"
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
            new Date(currentYear, currentMonth).toLocaleDateString(locale, {
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
    <div class="onyx-calendar__body">
      <table v-bind="tableProps">
        <thead>
          <tr>
            <th v-for="(day, index) in weekdays" :key="index" scope="col" :abbr="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <td v-for="(day, dayIndex) in week" :key="dayIndex" v-bind="cellProps(day)">
              <button
                v-if="day.date"
                v-bind="buttonProps(day)"
                :ref="
                  (el) =>
                    setButtonRef(el as HTMLElement | null, day.date?.toISOString().slice(0, 10))
                "
                type="button"
              >
                <span class="cell-content__number">
                  <span class="cell-content__number-display">
                    {{ day.date.getDate() }}
                  </span>
                </span>
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
            .cell-content__number-display {
              background-color: var(--onyx-color-base-neutral-300);
            }
          }
          &.weekend {
            background-color: var(--onyx-color-base-neutral-100);
          }
          .cell-content {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            padding: var(--onyx-density-2xs);
            background-color: initial;
            border: none;
            box-sizing: border-box;
            width: 100%;
            aspect-ratio: 1;
            &__number {
              width: 2rem;
              height: 2rem;
              color: inherit;
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
