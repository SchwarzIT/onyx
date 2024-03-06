<script lang="ts" setup>
import { OnyxIcon } from "@/index";
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import type { OnyxSwitchProps } from "./types";
import { areObjectsFlatEqual } from "@/utils/comparator";
import { transformValidityStateToObject } from "@/utils/forms";
import { computed, ref, toRefs, watch } from "vue";

const props = withDefaults(defineProps<OnyxSwitchProps>(), {
  modelValue: false,
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
  /** Emitted whenever the validity state of the input changes */
  validityChange: [state: ValidityState];
}>();

const { errorMessage } = toRefs(props);
const inputElement = ref<HTMLInputElement>();
const validityState = ref(inputElement.value?.validity);

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

watch([inputElement, errorMessage], () => {
  if (!inputElement.value) return;
  // by using setCustomValidity, the ValidityState will turn invalid
  // as long as it is not an empty string
  inputElement.value.setCustomValidity(props.errorMessage || "");
});

watch(
  [inputElement, isChecked, errorMessage],
  () => {
    if (!inputElement.value) return;

    const newValidityState = transformValidityStateToObject(inputElement.value.validity);
    //  only update + emit the validity state when it changed
    if (!validityState.value || !areObjectsFlatEqual(newValidityState, validityState.value)) {
      validityState.value = newValidityState;
      emit("validityChange", validityState.value);
    }
  },
  { immediate: true },
);
</script>

<template>
  <label
    class="onyx-switch"
    :class="{ 'onyx-required-marker': props.required, 'onyx-optional-marker': !props.required }"
  >
    <input
      ref="inputElement"
      v-model="isChecked"
      class="onyx-switch__input"
      type="checkbox"
      :aria-label="props.hideLabel ? props.label : undefined"
      :disabled="props.disabled"
      :required="props.required"
    />
    <span class="onyx-switch__container">
      <span class="onyx-switch__icon">
        <OnyxIcon :icon="isChecked ? checkSmall : xSmall" size="24px" />
      </span>
    </span>
    <span v-if="!props.hideLabel" class="onyx-switch__label">{{ props.label }}</span>
  </label>
</template>

<style lang="scss">
.onyx-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin: var(--onyx-spacing-2xs);
  height: 1.5rem;

  &__input {
    // position: absolute is needed here in order to hide the native checkbox.
    position: absolute;
    opacity: 0;

    &:checked + .onyx-switch__container {
      background-color: var(--onyx-color-base-primary-500);

      .onyx-switch__icon {
        background-color: var(--onyx-color-themed-neutral-100);
        transform: translateX(0.875rem);
        color: var(--onyx-color-text-icons-primary-intense);
      }
    }

    &:checked:disabled + .onyx-switch__container {
      background-color: var(--onyx-color-base-primary-200);

      .onyx-switch__icon {
        background-color: var(--onyx-color-base-background-blank);
        color: var(--onyx-color-text-icons-primary-soft);
      }
    }

    &:disabled + .onyx-switch__container {
      background-color: var(--onyx-color-base-neutral-200);

      .onyx-switch__icon {
        background-color: var(--onyx-color-base-neutral-300);
        color: var(--onyx-color-text-icons-neutral-inverted);
      }
    }

    &:invalid + .onyx-switch__container {
      background-color: var(--onyx-color-base-danger-200);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-danger-500);
      height: 1.375rem;
      width: 2.25rem;

      .onyx-switch__icon {
        background-color: var(--onyx-color-base-danger-500);
        color: var(--onyx-color-text-icons-neutral-inverted);
        height: 1.125rem;
        width: 1.125rem;
      }
    }

    &:invalid:checked + .onyx-switch__container {
      background-color: var(--onyx-color-base-danger-500);

      .onyx-switch__icon {
        background-color: var(--onyx-color-base-background-blank);
        color: var(--onyx-color-text-icons-danger-intense);
      }
    }
  }

  &__container {
    display: inline-flex;
    margin: var(--onyx-spacing-2xs);
    width: 2.375rem;
    height: 1.5rem;
    background-color: var(--onyx-color-base-neutral-300);
    border-radius: var(--onyx-radius-full);
    transition: background-color var(--onyx-duration-sm) ease;

    .onyx-switch__icon {
      display: flex;
      flex-wrap: wrap;
      align-content: baseline;
      align-self: center;
      justify-content: flex-end;
      margin: var(--onyx-spacing-5xs);
      width: 1.25rem;
      height: 1.25rem;
      background-color: var(--onyx-color-themed-neutral-100);
      border-radius: var(--onyx-radius-full);
      transition:
        transform var(--onyx-duration-sm) ease,
        background-color var(--onyx-duration-sm) ease;
      overflow: hidden;
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }

  &__label {
    padding: var(--onyx-spacing-2xs) 0;
    overflow: hidden;
    color: var(--onyx-color-text-icons-neutral-intense);
    text-overflow: ellipsis;
    font-family: var(--onyx-font-family);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
  }

  &:hover {
    &:has(.onyx-switch__input:enabled) .onyx-switch__container {
      background-color: var(--onyx-color-base-neutral-400);
    }

    &:has(.onyx-switch__input:enabled:checked) .onyx-switch__container {
      background-color: var(--onyx-color-base-primary-400);
    }

    &:has(.onyx-switch__input:invalid:enabled) .onyx-switch__container {
      background-color: var(--onyx-color-base-danger-300);
    }

    &:has(.onyx-switch__input:invalid:enabled:checked) .onyx-switch__container {
      background-color: var(--onyx-color-base-danger-400);
    }
  }

  &:has(&__input:focus-visible) {
    outline: none;

    &:has(.onyx-switch__input:enabled) .onyx-switch__container {
      outline: 0.25rem solid var(--onyx-color-base-neutral-200);
    }

    &:has(.onyx-switch__input:checked:enabled) .onyx-switch__container {
      outline: 0.25rem solid var(--onyx-color-base-primary-200);
    }

    &:has(.onyx-switch__input:invalid:enabled) .onyx-switch__container {
      outline: 0.25rem solid var(--onyx-color-base-danger-300);
    }

    &:has(.onyx-switch__input:invalid:checked:enabled) .onyx-switch__container {
      outline: 0.25rem solid var(--onyx-color-base-danger-200);
    }
  }

  &:has(.onyx-switch__input:disabled) {
    cursor: default;

    .onyx-switch__label {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
