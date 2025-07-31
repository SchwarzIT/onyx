<script lang="ts" setup>
import { iconCopy } from "@sit-onyx/icons";
import { OnyxIcon } from "sit-onyx";

export type ColorPaletteValueProps = {
  /** Text to show below the value. */
  description: number | string;
  /** CSS variable of the color value to use as background color. */
  color: string;
  /** Text color (should have good contrast to `color` property). */
  textColor: string;
  /** Optional name to show inside of the color. */
  name?: string;
  /** If true, a border is shown around the color value. Useful for very light/dark colors with low contrast. */
  showBorder?: boolean;
};

const props = defineProps<ColorPaletteValueProps>();

const emit = defineEmits<{
  select: [];
}>();
</script>

<template>
  <button type="button" class="step" @click="emit('select')">
    <div class="step__color" :class="{ 'step__color--with-border': props.showBorder }">
      <span v-if="props.name" class="step__name">{{ props.name }}</span>
      <OnyxIcon class="step__icon" :icon="iconCopy" />
    </div>
    <p class="step__description">{{ props.description }}</p>
  </button>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.step {
  text-align: center;
  cursor: pointer;
  width: 100%;

  @include mixins.breakpoint(max, s) {
    display: flex;
    align-items: center;
  }

  &:first-child {
    .step__color {
      border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);

      @include mixins.breakpoint(max, s) {
        border-radius: var(--onyx-radius-sm) var(--onyx-radius-sm) 0 0;
      }
    }
  }

  &:last-child {
    .step__color {
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;

      @include mixins.breakpoint(max, s) {
        border-radius: 0 0 var(--onyx-radius-sm) var(--onyx-radius-sm);
      }
    }
  }

  &:hover,
  &:focus-visible {
    background-color: v-bind("props.color");
    color: v-bind("props.textColor");
    border-radius: var(--onyx-radius-sm);

    .step {
      &__name {
        display: block;
        visibility: hidden;
        height: 0;
      }

      &__icon {
        display: inline-block;
      }

      &__color {
        padding-bottom: var(--onyx-spacing-2xs);

        &--with-border {
          padding-bottom: var(--onyx-spacing-md);
        }
      }
    }
  }

  &__color {
    padding: var(--onyx-spacing-md);
    font-weight: var(--onyx-font-weight-semibold);
    min-height: 1.5rem;
    box-sizing: content-box;
    background-color: v-bind("props.color");
    color: v-bind("props.textColor");
    width: calc(100% - 2 * var(--onyx-spacing-md));

    &--with-border {
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      min-height: calc(1.5rem - 2px);
      height: calc(1.5rem - 2px);
    }
  }

  &__icon {
    display: none;
  }

  &__description {
    margin: 0;
    font-size: var(--onyx-font-size-sm);
    line-height: var(--onyx-font-line-height-sm);
    font-family: var(--onyx-font-family-mono);
    padding: var(--onyx-spacing-5xs) var(--onyx-spacing-4xs);

    @include mixins.breakpoint(max, s) {
      width: 6.5rem;
    }
  }
}
</style>
