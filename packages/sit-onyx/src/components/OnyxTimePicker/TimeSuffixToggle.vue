<script lang="ts" setup>
import { computed } from "vue";

export interface ToggleOption {
  label: string;
  value: string | number | boolean;
}

const props = defineProps<{
  /**
   * Current selected Value
   */
  modelValue: string | number | boolean;
  /**
   * Options to Toggle
   */
  options: [ToggleOption, ToggleOption];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();

const isChecked = computed({
  get: () => props.modelValue === props.options[1].value,
  set: (val: boolean) => {
    emit("update:modelValue", val ? props.options[1].value : props.options[0].value);
  },
});
</script>

<template>
  <label class="onyx-component onyx-toggle">
    <input v-model="isChecked" type="checkbox" class="onyx-toggle__input" />

    <div class="onyx-toggle__track">
      <div class="onyx-toggle__slider" :class="{ 'is-checked': isChecked }"></div>

      <span class="onyx-toggle__option" :class="{ 'is-active': !isChecked }">
        {{ options[0].label }}
      </span>
      <span class="onyx-toggle__option" :class="{ 'is-active': isChecked }">
        {{ options[1].label }}
      </span>
    </div>
  </label>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toggle {
  @include layers.component() {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    --track-padding: min(var(--onyx-density-2xs), var(--onyx-number-spacing-200));
    &__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    &__track {
      height: calc(1lh + 2 * var(--onyx-density-xs));
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--onyx-color-base-neutral-200);
      border-radius: var(--onyx-radius-sm);
      padding: var(--track-padding);
      width: fit-content;
    }

    &__option {
      position: relative;
      font-size: var(--onyx-font-size-sm);
      font-weight: var(--onyx-font-weight-semibold);
      color: var(--onyx-color-text-icons-neutral-medium);
      padding: var(--onyx-density-3xs) var(--onyx-density-xs);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50%;
    }

    &__slider {
      position: absolute;
      top: var(--track-padding);
      left: var(--track-padding);
      right: var(--track-padding);
      height: calc(50% - var(--track-padding));
      background-color: var(--onyx-color-base-background-blank);
      border-radius: var(--onyx-radius-sm);
      transition: transform var(--onyx-duration-sm) cubic-bezier(0.4, 0, 0.2, 1);

      &.is-checked {
        transform: translateY(100%);
      }
    }
  }
}
</style>
