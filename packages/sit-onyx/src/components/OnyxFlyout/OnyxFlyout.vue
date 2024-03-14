<script
  lang="ts"
  setup
  generic="
    TValue extends CheckboxGroupOptionValue = CheckboxGroupOptionValue,
    TMultiselect extends boolean = false
  "
>
import type { CheckboxGroupOptionValue } from "../OnyxCheckboxGroup/types";
import type { OnyxFlyoutProps } from "./types";

const props = defineProps<OnyxFlyoutProps<TValue, TMultiselect>>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: NonNullable<typeof props.modelValue>];
}>();
</script>

<template>
  <div class="onyx-flyout">
    <div class="onyx-flyout__options">
      <div v-for="option in props.options" :key="option.id" class="onyx-flyout__option">
        {{ option.label }}
      </div>
    </div>

    <span v-if="props.label" class="onyx-flyout__label onyx-text--small">
      {{ props.label }}
    </span>
  </div>
</template>

<style lang="scss">
.dark {
  .onyx-flyout {
    box-shadow: none;
  }
}

.onyx-flyout {
  border-radius: var(--onyx-radius-md);
  background-color: var(--onyx-color-base-background-blank);
  padding: var(--onyx-spacing-2xs) 0;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: max-content;
  min-width: var(--onyx-spacing-4xl);
  font-family: var(--onyx-font-family);

  &__label {
    color: var(--onyx-color-text-icons-neutral-soft);
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    text-align: right;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm) 0;
  }

  $option-height: calc(1.5rem + 2 * var(--onyx-spacing-2xs));

  &__option {
    height: $option-height;
    box-sizing: border-box;
  }

  &__options {
    max-height: calc(8 * $option-height);
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
