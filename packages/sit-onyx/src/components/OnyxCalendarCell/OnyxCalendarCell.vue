<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { mergeVueProps } from "../../utils/attrs.js";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxCalendarCellProps } from "./types.js";

const props = withDefaults(defineProps<OnyxCalendarCellProps>(), {
  is: "div",
  backgroundColor: "blank",
});

const slots = defineSlots<{
  /**
   * Optional slot for custom cell content.
   */
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);

const contentAttributes = computed(() => {
  return props.is === "button"
    ? { type: "button", disabled: props.disabled }
    : { "aria-disabled": props.disabled };
});
</script>

<template>
  <td
    :class="[
      'onyx-component',
      'onyx-calendar-cell',
      `onyx-calendar-cell--${props.backgroundColor}`,
      `onyx-calendar-cell--${props.size}`,
      densityClass,
      {
        [`onyx-calendar-cell--${props.color}`]: props.color,
        [`onyx-calendar-cell--range-${props.rangeType}`]: props.rangeType,
      },
    ]"
  >
    <component
      :is="props.is"
      v-bind="mergeVueProps(contentAttributes, props.buttonAttributes)"
      :class="[
        'onyx-calendar-cell__content',
        {
          'onyx-calendar-cell__content--disabled':
            (props.is !== 'button' && props.disabled) || props.showAsDisabled,
        },
      ]"
    >
      <div class="onyx-calendar-cell__header">
        <div class="onyx-calendar-cell__date-container">
          <OnyxTooltip v-if="props.toolTipText" :text="props.toolTipText">
            <template #default="{ trigger }">
              <span class="onyx-calendar-cell__date" v-bind="trigger">
                {{ props.date }}
              </span>
            </template>
          </OnyxTooltip>
          <span v-else class="onyx-calendar-cell__date">
            {{ props.date }}
          </span>
        </div>
      </div>

      <div v-if="!!slots.default" class="onyx-calendar-cell__main">
        <slot></slot>
      </div>
    </component>
  </td>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-calendar-cell {
  @include layers.component() {
    --onyx-calendar-cell-date-size: 2rem;
    --onyx-calendar-cell-padding: var(--onyx-density-2xs);

    // colors
    --onyx-calendar-cell-date-background: transparent;
    --onyx-calendar-cell-date-background-hover: var(--onyx-color-base-neutral-300);
    --onyx-calendar-cell-date-color: inherit;
    --onyx-calendar-cell-date-color-hover: var(--onyx-calendar-cell-date-color);
    --onyx-calendar-cell-range-background: var(--onyx-color-text-icons-primary-soft);
    --onyx-calendar-cell-range-color: var(--onyx-color-text-icons-primary-bold);
    --onyx-calendar-cell-focus-color: var(--onyx-color-component-focus-primary);
    font-family: var(--onyx-font-family-paragraph);
    color: var(--onyx-color-text-icons-neutral-medium);
    font-size: var(--onyx-font-size-md);
    font-weight: var(--onyx-font-weight-regular);
    line-height: var(--onyx-font-line-height-md);
    padding: 0;

    &--tinted {
      .onyx-calendar-cell__content {
        background-color: var(--onyx-color-base-background-tinted);
      }
    }

    &__header,
    &__main {
      width: 100%;
      padding-inline: var(--onyx-calendar-cell-padding);
    }

    &__content {
      background-color: transparent;
      border: none;
      padding-block: var(--onyx-calendar-cell-padding);
      padding-inline: 0;
      color: inherit;
      font: inherit;
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
      height: 100%;
      width: 100%;
      aspect-ratio: 1;
      text-align: left;

      &:disabled,
      &--disabled {
        color: var(--onyx-color-base-neutral-300);
      }

      &--disabled {
        --onyx-calendar-cell-date-color-hover: var(--onyx-color-text-icons-neutral-medium);
      }

      &:enabled {
        cursor: pointer;

        &:hover {
          .onyx-calendar-cell__date {
            color: var(--onyx-calendar-cell-date-color-hover);
            background-color: var(--onyx-calendar-cell-date-background-hover);
          }
        }

        &:focus-visible {
          outline: none;

          .onyx-calendar-cell__date {
            color: var(--onyx-calendar-cell-date-color-hover);
            border: var(--onyx-outline-width) solid var(--onyx-calendar-cell-focus-color);
          }
        }
      }
    }

    &__date {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--onyx-calendar-cell-date-size);
      height: var(--onyx-calendar-cell-date-size);
      border-radius: var(--onyx-radius-full);
      background-color: var(--onyx-calendar-cell-date-background);
      color: var(--onyx-calendar-cell-date-color);
    }

    &--primary {
      --onyx-calendar-cell-date-background: var(--onyx-color-base-primary-500);
      --onyx-calendar-cell-date-background-hover: var(--onyx-color-base-primary-700);
      --onyx-calendar-cell-date-color: var(--onyx-color-neutral-grayscale-white);
    }

    // range styles
    &--range-start,
    &--range-middle,
    &--range-end {
      --onyx-calendar-cell-focus-color: var(--onyx-color-base-primary-600);
    }
    &--range-start {
      .onyx-calendar-cell__header {
        padding-right: 0;
      }

      .onyx-calendar-cell__date-container {
        background-color: var(--onyx-calendar-cell-range-background);
        border-top-left-radius: var(--onyx-radius-full);
        border-bottom-left-radius: var(--onyx-radius-full);
      }
    }

    &--range-middle {
      --onyx-calendar-cell-date-background: var(--onyx-calendar-cell-range-background);
      --onyx-calendar-cell-date-background-hover: var(--onyx-calendar-cell-date-background);
      --onyx-calendar-cell-date-color: var(--onyx-calendar-cell-range-color);

      .onyx-calendar-cell__header {
        padding-inline: 0;
      }

      .onyx-calendar-cell__date-container {
        padding-inline: var(--onyx-calendar-cell-padding);
        background-color: var(--onyx-calendar-cell-range-background);
      }
    }

    &--range-end {
      .onyx-calendar-cell__header {
        padding-left: 0;
      }

      .onyx-calendar-cell__date-container {
        padding-left: var(--onyx-calendar-cell-padding);
        background-color: var(--onyx-calendar-cell-range-background);
        border-top-right-radius: var(--onyx-radius-full);
        border-bottom-right-radius: var(--onyx-radius-full);
        width: calc(var(--onyx-calendar-cell-padding) + var(--onyx-calendar-cell-date-size));
      }
    }

    &--neutral {
      --onyx-calendar-cell-date-background: var(--onyx-color-base-neutral-500);
      --onyx-calendar-cell-date-color: var(--onyx-color-neutral-grayscale-white);
      &[aria-disabled="true"] {
        --onyx-calendar-cell-date-background: var(--onyx-color-base-neutral-300);
        --onyx-calendar-cell-date-color: var(--onyx-color-text-icons-neutral-medium);
      }
    }

    // small styles
    &--small {
      .onyx-calendar-cell__content {
        justify-content: center;
        align-items: center;
      }

      .onyx-calendar-cell__header {
        display: flex;
        justify-content: inherit;
        align-items: inherit;
      }

      &.onyx-calendar-cell--range-start {
        .onyx-calendar-cell__header {
          justify-content: flex-end;
        }

        .onyx-calendar-cell__date-container {
          width: calc(50% + 0.5 * var(--onyx-calendar-cell-date-size));
        }
      }

      &.onyx-calendar-cell--range-middle {
        .onyx-calendar-cell__date-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      &.onyx-calendar-cell--range-end {
        .onyx-calendar-cell__header {
          justify-content: flex-start;
        }

        .onyx-calendar-cell__date-container {
          display: flex;
          justify-content: flex-end;
          width: calc(50% + 0.5 * var(--onyx-calendar-cell-date-size));
        }
      }
    }
  }
}
</style>
