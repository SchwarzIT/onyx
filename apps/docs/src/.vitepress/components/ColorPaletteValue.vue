<script lang="ts" setup>
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
  <div class="step" tabindex="0" @keyup.enter="emit('select')" @click="emit('select')">
    <div class="step__color" :class="{ 'step__color--with-border': props.showBorder }">
      <span v-if="props.name" class="step__name">{{ props.name }}</span>
      <svg
        class="step__icon"
        width="24"
        height="25"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2777 6V1.5H3.27771V18H9.27771V22.5H21.2777V6H15.2777ZM4.77771 16.5V3H13.7777V6H9.27771V16.5H4.77771ZM19.7777 21H10.7777V7.5H19.7777V21Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <p class="step__description">{{ props.description }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.step {
  text-align: center;
  cursor: pointer;
  width: 100%;

  @include mixins.breakpoint(s) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: var(--onyx-spacing-sm);
  }

  &:first-child {
    .step__color {
      border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);

      @include mixins.breakpoint(s) {
        border-radius: var(--onyx-radius-sm) var(--onyx-radius-sm) 0 0;
      }
    }
  }

  &:last-child {
    .step__color {
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;

      @include mixins.breakpoint(s) {
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
        padding-bottom: var(--onyx-spacing-xs);
      }
    }
  }

  &__color {
    padding: var(--onyx-spacing-sm);
    font-weight: 600;
    min-height: 1.5rem;
    box-sizing: content-box;
    background-color: v-bind("props.color");
    color: v-bind("props.textColor");
    border: 1px solid transparent;
    width: calc(100% - 2 * var(--onyx-spacing-sm));

    &--with-border {
      border-color: var(--onyx-color-base-border-default);
    }
  }

  &__icon {
    display: none;
  }

  &__description {
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    font-family: var(--onyx-font-family-mono);
    padding: var(--onyx-spacing-3xs) var(--onyx-spacing-2xs);

    @include mixins.breakpoint(s) {
      width: 6rem;
    }
  }
}
</style>
