<script lang="ts" setup>
import { computed, ref } from "vue";
import type { OnyxCheckboxProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxProps>(), {
  modelValue: false,
  label: "",
  indeterminate: false,
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
}>();

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

/** True if the user has interacted with the checkbox once. */
const isTouched = ref(false);
</script>

<template>
  <label class="onyx-checkbox">
    <div class="onyx-checkbox__container">
      <input
        v-model="isChecked"
        class="onyx-checkbox__input"
        :class="{ 'onyx-checkbox__input--touched': isTouched }"
        type="checkbox"
        :indeterminate="props.indeterminate"
        :disabled="props.disabled"
        :required="props.required"
        @blur="isTouched = true"
      />
    </div>

    <p v-if="props.label" class="onyx-checkbox__label">{{ props.label }}</p>
  </label>
</template>

<style lang="scss">
@mixin define-hover-border($state, $color) {
  .onyx-checkbox__input#{$state} {
    border-color: var(--onyx-color-base-#{$color}-300);
  }
}

@mixin define-focus-ring($state, $color) {
  .onyx-checkbox__container:has(.onyx-checkbox__input#{$state}) {
    background-color: var(--onyx-color-base-#{$color}-200);
  }
}

@mixin define-checked-background($state, $color) {
  &#{$state} {
    border-color: var(--onyx-color-base-#{$color}-500);
    background-color: var(--onyx-color-base-#{$color}-500);

    &:hover {
      background-color: var(--onyx-color-base-#{$color}-300);
    }
  }
}

.onyx-checkbox {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  width: max-content;

  &:hover {
    @include define-hover-border($state: ":enabled", $color: primary);

    &:has(.onyx-checkbox__input--touched) {
      @include define-hover-border($state: ":invalid", $color: danger);
    }
  }

  &:has(&__input:focus-visible) {
    @include define-focus-ring($state: ":enabled", $color: primary);

    &:has(.onyx-checkbox__input--touched) {
      @include define-focus-ring($state: ":invalid", $color: danger);
    }
  }

  &:has(&__input:disabled) {
    cursor: default;
    color: var(--onyx-color-text-icons-neutral-soft);
  }

  &__container {
    display: inline-flex;
    align-items: center;
    padding: var(--onyx-spacing-sm);
    border-radius: var(--onyx-radius-full);
  }

  &__input {
    height: 1rem;
    width: 1rem;
    appearance: none;
    margin: 0;
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-400);
    outline: none;
    background: var(--onyx-color-base-background-blank);
    cursor: inherit;

    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &:checked,
    &:indeterminate {
      @include define-checked-background(":enabled", primary);

      &.onyx-checkbox__input--touched {
        @include define-checked-background(":invalid", danger);
      }

      &:disabled {
        background-color: var(--onyx-color-base-neutral-300);
      }
    }

    &:disabled {
      border-color: var(--onyx-color-base-neutral-300);
    }

    &--touched {
      &:invalid {
        border-color: var(--onyx-color-base-danger-500);
      }
    }

    &:checked {
      // icon (with added fill='white'): check-small.svg
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' xml:space='preserve' viewBox='0 0 32 32'%3E%3Cpath d='m21.311 10.793-8.293 8.293-3.291-3.292-1.415 1.415 4.706 4.705 9.707-9.707z'/%3E%3C/svg%3E");
    }

    &:indeterminate {
      // icon (with added fill='white'): minus-small.svg
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' xml:space='preserve' viewBox='0 0 32 32'%3E%3Cpath d='M8 15h16v2H8z'/%3E%3C/svg%3E");
    }
  }

  &__label {
    display: inline-block;
    margin: 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &:has(&__input:required) {
    .onyx-checkbox__label {
      &::after {
        content: "*";
        color: var(--onyx-color-text-icons-danger-intense);
        padding-left: var(--onyx-spacing-5xs);
      }
    }
  }
}
</style>
