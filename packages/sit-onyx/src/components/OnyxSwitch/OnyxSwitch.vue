<script lang="ts" setup>
import { OnyxIcon } from "@/index";
import { areObjectsFlatEqual } from "@/utils/comparator";
import { transformValidityStateToObject } from "@/utils/forms";
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed, ref, toRefs, watch } from "vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxSwitchProps } from "./types";
import { useRequired } from "../../composables/required";
import { OnyxLoadingIndicator } from "@/index";
import { useDensity } from "../../composables/density";

const props = withDefaults(defineProps<OnyxSwitchProps>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  truncation: "ellipsis",
  skeleton: false,
});

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
  /** Emitted whenever the validity state of the input changes */
  validityChange: [state: ValidityState];
}>();

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);

const { errorMessage } = toRefs(props);
const { densityClass } = useDensity(props);
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
  <div v-if="props.skeleton" :class="['onyx-switch-skeleton', densityClass]">
    <OnyxSkeleton class="onyx-switch-skeleton__input" />
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-switch-skeleton__label" />
  </div>

  <label v-else class="onyx-switch" :class="[requiredTypeClass, densityClass]">
    <input
      ref="inputElement"
      v-model="isChecked"
      :class="{ 'onyx-switch__input': true, 'onyx-switch__loading': props.loading }"
      type="checkbox"
      :aria-label="props.hideLabel ? props.label : undefined"
      :disabled="props.disabled || props.loading"
      :required="props.required"
    />
    <span class="onyx-switch__container">
      <span class="onyx-switch__icon">
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-switch__spinner" type="circle" />
        <OnyxIcon v-else :icon="isChecked ? checkSmall : xSmall" size="24px" />
      </span>
    </span>

    <span
      v-if="!props.hideLabel"
      class="onyx-switch__label"
      :class="[`onyx-truncation-${props.truncation}`, requiredMarkerClass]"
    >
      {{ props.label }}
    </span>
  </label>
</template>

<style lang="scss">
@use "../../styles/density.scss";

.onyx-switch,
.onyx-switch-skeleton {
  // icon size + padding top/bottom + border top/bottom
  --onyx-switch-skeleton-height: calc(
    var(--onyx-switch-icon-size) + 2 * var(--onyx-switch-container-padding) + 2 *
      var(--onyx-1px-in-rem)
  );
  --onyx-switch-cozy-width: 0rem;
  --onyx-switch-container-padding: var(--onyx-1px-in-rem);

  @include density.compact {
    --onyx-switch-icon-size: 1rem;
    --onyx-switch-transform: 0.125rem;
  }

  @include density.default {
    --onyx-switch-icon-size: 1.25rem;
    --onyx-switch-transform: var(--onyx-1px-in-rem);
  }

  @include density.cozy {
    --onyx-switch-icon-size: 1.5rem;
    --onyx-switch-cozy-width: 0.75rem;
    --onyx-switch-container-padding: 0.25rem;
    --onyx-switch-transform: 0.01rem;
    --onyx-switch-input-height: 2rem;
    --onyx-switch-skeleton-height: var(--onyx-switch-input-height);
  }
}

$input-width: calc(
  2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding) +
    var(--onyx-switch-cozy-width)
);

.onyx-switch {
  display: inline-flex;
  align-items: flex-start;
  cursor: pointer;
  gap: var(--onyx-spacing-2xs);
  max-width: 100%;

  &__input {
    // position: absolute is needed here in order to hide the native checkbox.
    position: absolute;
    opacity: 0;
    cursor: inherit;
    width: 0;
    height: 0;
    margin: 0;

    &:checked + .onyx-switch__container {
      background-color: var(--onyx-color-base-primary-500);

      .onyx-switch__icon {
        background-color: var(--onyx-color-themed-neutral-100);
        transform: translateX(calc(75% - var(--onyx-switch-transform)));
        color: var(--onyx-color-text-icons-primary-intense);
      }

      .onyx-switch__spinner {
        color: var(--onyx-color-text-icons-primary-intense);
      }
    }

    &:checked:disabled:not(.onyx-switch__loading) + .onyx-switch__container {
      background-color: var(--onyx-color-base-primary-200);

      .onyx-switch__icon {
        background-color: var(--onyx-color-base-background-blank);
        color: var(--onyx-color-text-icons-primary-soft);
      }
    }

    &:disabled:not(.onyx-switch__loading) + .onyx-switch__container {
      background-color: var(--onyx-color-base-neutral-200);

      .onyx-switch__icon {
        background-color: var(--onyx-color-base-neutral-300);
        color: var(--onyx-color-text-icons-neutral-inverted);
      }
    }

    &:invalid + .onyx-switch__container {
      background-color: var(--onyx-color-base-danger-200);
      border-color: var(--onyx-color-base-danger-500);

      .onyx-switch__icon {
        background-color: var(--onyx-color-base-danger-500);
        color: var(--onyx-color-text-icons-neutral-inverted);
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
    width: $input-width;
    min-width: $input-width;
    height: var(--onyx-switch-input-height);
    padding: var(--onyx-switch-container-padding);
    box-sizing: border-box;
    background-color: var(--onyx-color-base-neutral-300);
    border-radius: var(--onyx-radius-full);
    border: var(--onyx-1px-in-rem) solid transparent;
    transition: background-color var(--onyx-duration-sm) ease;

    .onyx-switch__icon {
      display: flex;
      align-self: center;
      justify-content: center;
      background-color: var(--onyx-color-themed-neutral-100);
      border-radius: var(--onyx-radius-full);
      transition:
        transform var(--onyx-duration-sm) ease,
        background-color var(--onyx-duration-sm) ease;
      overflow: hidden;
      color: var(--onyx-color-text-icons-neutral-soft);
      height: var(--onyx-switch-icon-size);
      width: var(--onyx-switch-icon-size);

      .onyx-icon {
        --icon-size: var(--onyx-switch-icon-size);
      }

      .onyx-switch__spinner {
        padding: var(--onyx-1px-in-rem);
      }
    }
  }

  &__label {
    color: var(--onyx-color-text-icons-neutral-intense);
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

.onyx-switch-skeleton {
  display: inline-flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);

  &__input {
    height: var(--onyx-switch-skeleton-height);
    border-radius: var(--onyx-radius-full);
    width: $input-width;
  }

  &__label {
    height: var(--onyx-spacing-md);
    width: var(--onyx-spacing-3xl);
  }
}
</style>
