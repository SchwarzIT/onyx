<script lang="ts" setup>
import { computed } from "vue";

export type ColorPaletteValueProps = {
  step: number;
  color: string;
  textColor: string;
  name?: string;
};

const props = defineProps<ColorPaletteValueProps>();

const emit = defineEmits<{
  select: [];
}>();

const textColor = computed(() => {
  return props.step < 500
    ? `var(--onyx-color-text-${props.textColor}-bold)`
    : "var(--onyx-color-base-greyscale-white)";
});
</script>

<template>
  <div class="step" tabindex="0" @keyup.enter="emit('select')" @click="emit('select')">
    <div class="step__color">
      <span v-if="props.name" class="step__name">{{ props.name }}</span>
      <svg
        class="step__icon"
        width="24"
        height="24"
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
    <p class="step__value">{{ props.step }}</p>
  </div>
</template>

<style lang="scss" scoped>
.step {
  text-align: center;
  cursor: pointer;

  &:first-child {
    .step__color {
      border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
    }
  }

  &:last-child {
    .step__color {
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
    }
  }

  &:hover,
  &:focus-visible {
    background-color: v-bind("props.color");
    color: v-bind("textColor");
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
    color: v-bind("textColor");
  }

  &__icon {
    display: none;
  }

  &__value {
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    font-family: var(--onyx-font-family-mono);
    padding: var(--onyx-spacing-3xs) var(--onyx-spacing-2xs);
  }
}
</style>
