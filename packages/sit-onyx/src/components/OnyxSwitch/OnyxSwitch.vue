<script lang="ts" setup>
import { OnyxIcon } from "@/index";
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import type { OnyxSwitchProps } from "./types";
import { computed } from "vue";
const props = withDefaults(defineProps<OnyxSwitchProps>(), {
  modelValue: false,
  disabled: false,
  required: false,
  readonly: false,
  invalid: false,
});

// TODO: Implement invalid disabled state.

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
}>();

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <label
    tabindex="0"
    class="onyx-switch"
    :class="{ 'onyx-required-marker': props.required, 'onyx-optional-marker': !props.required }"
  >
    <input
      v-model="isChecked"
      class="onyx-switch__input"
      :class="{
        'onyx-switch__input--invalid': props.invalid,
        'onyx-switch__input--readonly': props.readonly,
        'onyx-switch__input--disabled': props.disabled,
      }"
      :aria-label="props.hideLabel ? props.label : undefined"
      type="checkbox"
      :disabled="props.disabled || props.readonly"
      :required="props.required"
    />
    <span class="onyx-switch__container">
      <span class="onyx-switch__track"></span>
      <span class="onyx-switch__position">
        <OnyxIcon class="onyx-switch__icon" :icon="isChecked ? checkSmall : xSmall" size="24px" />
      </span>
    </span>
    <span v-if="props.label && !props.hideLabel" class="onyx-switch__label">{{ props.label }}</span>
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
    position: absolute;
    opacity: 0;

    &:checked + .onyx-switch__container {
      .onyx-switch__track {
        background-color: var(--onyx-color-base-primary-500);
      }

      .onyx-switch__position {
        background-color: var(--onyx-color-themed-neutral-100);
        transform: translateX(14px);

        .onyx-switch__icon {
          color: var(--onyx-color-text-icons-primary-intense);
        }
      }
    }

    &:checked:disabled + .onyx-switch__container {
      .onyx-switch__track {
        background-color: var(--onyx-color-base-primary-200);
      }

      .onyx-switch__position {
        background-color: var(--onyx-color-base-background-blank);

        .onyx-switch__icon {
          color: var(--onyx-color-text-icons-primary-soft);
        }
      }
    }

    &:disabled + .onyx-switch__container {
      .onyx-switch__track {
        background-color: var(--onyx-color-base-neutral-200);
      }

      .onyx-switch__position {
        background-color: var(--onyx-color-base-neutral-300);

        .onyx-switch__icon {
          color: var(--onyx-color-text-icons-neutral-inverted);
        }
      }
    }

    &--invalid + .onyx-switch__container {
      .onyx-switch__track {
        background-color: var(--onyx-color-base-danger-200);
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-danger-500);
        height: 1.375rem;
        width: 2.25rem;
      }

      .onyx-switch__position {
        background-color: var(--onyx-color-base-danger-500);

        .onyx-switch__icon {
          color: var(--onyx-color-text-icons-neutral-inverted);
        }
      }
    }

    &--invalid:checked + .onyx-switch__container {
      .onyx-switch__track {
        background-color: var(--onyx-color-base-danger-500);
      }

      .onyx-switch__position {
        background-color: var(--onyx-color-base-background-blank);

        .onyx-switch__icon {
          color: var(--onyx-color-text-icons-danger-intense);
        }
      }
    }

    &--readonly + .onyx-switch__container {
      .onyx-switch__track {
        background-color: var(--onyx-color-base-neutral-200);
      }

      .onyx-switch__position {
        background-color: var(--onyx-color-base-neutral-300);

        .onyx-switch__icon {
          color: var(--onyx-color-text-icons-neutral-inverted);
        }
      }
    }

    &--readonly:checked + .onyx-switch__container {
      .onyx-switch__track {
        background-color: var(--onyx-color-base-primary-200);
      }

      .onyx-switch__position {
        background-color: var(--onyx-color-base-background-blank);

        .onyx-switch__icon {
          color: var(--onyx-color-text-icons-primary-soft);
        }
      }
    }
  }

  &__container {
    position: relative;
    display: block;
    margin: var(--onyx-spacing-2xs);
    width: 2.375rem;
    height: 1.5rem;

    .onyx-switch__track {
      position: absolute;
      width: 100%;
      height: 1.5rem;
      background-color: var(--onyx-color-base-neutral-300);
      border-radius: var(--onyx-radius-full);
      transition: background-color 0.2s ease;
    }

    .onyx-switch__position {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      align-content: normal;
      left: 0.125rem;
      top: 0.125rem;
      right: 0.125rem;
      bottom: 0.125rem;
      width: 1.25rem;
      height: 1.25rem;
      background-color: var(--onyx-color-themed-neutral-100);
      border-radius: 50%;
      transition:
        transform 0.2s ease,
        background-color 0.2s ease;
      overflow: hidden;

      .onyx-switch__icon {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }

  &__label {
    padding: var(--onyx-spacing-2xs) 0;
    align-items: flex-end;
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
    &:has(.onyx-switch__input:enabled) .onyx-switch__track {
      background-color: var(--onyx-color-base-neutral-400);
    }

    &:has(.onyx-switch__input:enabled:checked) .onyx-switch__track {
      background-color: var(--onyx-color-base-primary-400);
    }

    &:has(.onyx-switch__input--invalid:enabled) .onyx-switch__track {
      background-color: var(--onyx-color-base-danger-300);
    }

    &:has(.onyx-switch__input--invalid:enabled:checked) .onyx-switch__track {
      background-color: var(--onyx-color-base-danger-400);
    }
  }

  &:focus-visible {
    outline: none;

    &:has(.onyx-switch__input:enabled) .onyx-switch__track {
      outline: 0.25rem solid var(--onyx-color-base-neutral-200);
    }

    &:has(.onyx-switch__input:checked:enabled) .onyx-switch__track {
      outline: 0.25rem solid var(--onyx-color-base-primary-200);
    }

    &:has(.onyx-switch__input--invalid:enabled) .onyx-switch__track {
      outline: 0.25rem solid var(--onyx-color-base-danger-300);
    }

    &:has(.onyx-switch__input--invalid:checked:enabled) .onyx-switch__track {
      outline: 0.25rem solid var(--onyx-color-base-danger-200);
    }
  }

  &:has(.onyx-switch__input:disabled) {
    cursor: default;
  }

  &:has(.onyx-switch__input--disabled) .onyx-switch__label {
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}
</style>
