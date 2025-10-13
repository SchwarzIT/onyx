<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { mergeVueProps } from "../../utils/attrs.js";
import type { OnyxCalendarCellProps } from "./types.js";

const props = withDefaults(defineProps<OnyxCalendarCellProps>(), {
  is: "div",
});

const emit = defineEmits<{
  /**
   * Triggers when the cell hover / focus state is changed.
   */
  hoverChange: [inside: boolean];
}>();

defineSlots<{
  /**
   * Optional slot for custom cell content.
   */
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);

const isHovered = ref(false);
watch(isHovered, (inside) => emit("hoverChange", inside));

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
      densityClass,
      {
        [`onyx-calendar-cell--${props.color}`]: props.color,
        [`onyx-calendar-cell--range-${props.rangeType}`]: props.rangeType,
      },
    ]"
    @mouseenter="isHovered = true"
    @focusin="isHovered = true"
    @mouseleave="isHovered = false"
    @focusout="isHovered = false"
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
      <div class="onyx-calendar-cell__date-container">
        <span class="onyx-calendar-cell__date">
          {{ props.date }}
        </span>
      </div>

      <slot></slot>
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
    --onyx-calendar-cell-range-background: var(--onyx-color-text-icons-primary-soft);
    --onyx-calendar-cell-range-color: var(--onyx-color-text-icons-primary-bold);

    font-family: var(--onyx-font-family-paragraph);
    color: var(--onyx-color-text-icons-neutral-medium);
    font-size: var(--onyx-font-size-md);
    font-weight: var(--onyx-font-weight-regular);
    line-height: var(--onyx-font-line-height-md);
    padding: 0;

    &__content {
      background-color: transparent;
      border: none;
      padding: 0;
      color: inherit;
      font: inherit;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      aspect-ratio: 1;
      text-align: left;
      padding: var(--onyx-calendar-cell-padding);

      &:enabled {
        cursor: pointer;

        &:not(.onyx-calendar-cell__content--disabled) {
          &:hover {
            .onyx-calendar-cell__date {
              background-color: var(--onyx-calendar-cell-date-background-hover);
            }
          }

          &:focus-visible {
            outline: none;

            .onyx-calendar-cell__date {
              // TODO: make outline square
              outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
              outline-offset: var(--onyx-density-2xs);
            }
          }
        }
      }

      &:disabled,
      &--disabled {
        color: var(--onyx-color-base-neutral-300);
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

    &--neutral {
      --onyx-calendar-cell-date-background: var(--onyx-color-base-neutral-500);
      --onyx-calendar-cell-date-background-hover: var(--onyx-calendar-cell-date-background);
      --onyx-calendar-cell-date-color: var(--onyx-color-neutral-grayscale-white);
    }

    &--primary {
      --onyx-calendar-cell-date-background: var(--onyx-color-base-primary-500);
      --onyx-calendar-cell-date-background-hover: var(--onyx-color-base-primary-700);
      --onyx-calendar-cell-date-color: var(--onyx-color-neutral-grayscale-white);
    }

    // range styles
    &--range-start {
      .onyx-calendar-cell__content {
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

      .onyx-calendar-cell__content {
        padding-inline: 0;
      }

      .onyx-calendar-cell__date-container {
        padding-inline: var(--onyx-calendar-cell-padding);
        background-color: var(--onyx-calendar-cell-range-background);
      }
    }

    &--range-end {
      .onyx-calendar-cell__content {
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
  }
}
</style>
