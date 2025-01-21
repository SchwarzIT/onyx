<script lang="ts" setup>
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import { useAutofocus } from "../../composables/useAutoFocus";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxErrorTooltip from "../OnyxErrorTooltip/OnyxErrorTooltip.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxSwitchProps } from "./types";

const props = withDefaults(defineProps<OnyxSwitchProps>(), {
  modelValue: false,
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  truncation: "ellipsis",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
const { densityClass } = useDensity(props);

const { disabled, showError } = useFormContext(props);
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const shownErrorMessages = computed(() =>
  showError.value !== false ? errorMessages.value : undefined,
);

const title = computed(() => (props.hideLabel && props.label) || undefined);
const skeleton = useSkeletonContext(props);

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const input = useTemplateRef("inputRef");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <div v-if="skeleton" :class="['onyx-component', 'onyx-switch-skeleton', densityClass]">
    <span class="onyx-switch-skeleton__click-area">
      <OnyxSkeleton class="onyx-switch-skeleton__input" />
    </span>
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-switch-skeleton__label" />
  </div>

  <OnyxErrorTooltip v-else :disabled="disabled" :error-messages="shownErrorMessages">
    <label
      class="onyx-component onyx-switch"
      :class="[requiredTypeClass, densityClass]"
      :title="title"
    >
      <input
        ref="inputRef"
        v-model="isChecked"
        v-custom-validity
        type="checkbox"
        role="switch"
        :class="{ 'onyx-switch__input': true, 'onyx-switch__loading': props.loading }"
        :aria-label="props.hideLabel ? props.label : undefined"
        :disabled="disabled || props.loading"
        :required="props.required"
        :autofocus="props.autofocus"
      />
      <span class="onyx-switch__click-area">
        <span class="onyx-switch__container">
          <span class="onyx-switch__icon">
            <OnyxLoadingIndicator v-if="props.loading" class="onyx-switch__spinner" type="circle" />
            <OnyxIcon v-else :icon="isChecked ? checkSmall : xSmall" />
          </span>
          <div class="onyx-switch__frame"></div>
        </span>
      </span>
      <span
        v-if="!props.hideLabel"
        class="onyx-switch__label"
        :class="[
          `onyx-truncation-${props.truncation}`,
          // shows the required marker inline for multiline labels
          props.truncation === 'multiline' ? requiredMarkerClass : undefined,
        ]"
      >
        {{ props.label }}
      </span>
      <!-- shows the required marker fixed on the right for truncated labels -->
      <div
        v-if="!props.hideLabel && props.truncation === 'ellipsis'"
        class="onyx-switch__marker"
        :class="[requiredMarkerClass]"
      ></div>
    </label>
  </OnyxErrorTooltip>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers";

.onyx-switch,
.onyx-switch-skeleton {
  --onyx-switch-icon-size: 1.25rem;
  --onyx-switch-container-padding: var(--onyx-1px-in-rem);
  // icon size + padding top/bottom + border top/bottom
  --onyx-switch-frame-height: calc(
    var(--onyx-switch-icon-size) + 2 * var(--onyx-switch-container-padding) + 2 *
      var(--onyx-1px-in-rem)
  );
  --onyx-switch-label-padding-vertical: var(--onyx-density-xs);
}

$input-width: calc(2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding));

.onyx-switch {
  @include density.compact {
    --onyx-switch-transform: 0.125rem;
  }

  @include density.default {
    --onyx-switch-transform: var(--onyx-1px-in-rem);
  }

  @include density.cozy {
    --onyx-switch-transform: 0.01rem;
  }

  @include layers.component() {
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    max-width: 100%;

    &__input {
      // position: absolute is needed here in order to hide the native checkbox.
      position: absolute;
      opacity: 0;
      cursor: inherit;
      width: 0;
      height: 0;
      margin: 0;

      &:checked + .onyx-switch__click-area .onyx-switch__container {
        background-color: var(--onyx-color-component-cta-default);

        .onyx-switch__icon {
          background-color: var(--onyx-color-base-neutral-100);
          transform: translateX(calc(75% - var(--onyx-switch-transform)));
          color: var(--onyx-color-text-icons-primary-intense);
        }

        .onyx-switch__spinner {
          color: var(--onyx-color-text-icons-primary-intense);
        }
      }

      &:checked:disabled:not(.onyx-switch__loading)
        + .onyx-switch__click-area
        .onyx-switch__container {
        background-color: var(--onyx-color-base-primary-200);

        .onyx-switch__icon {
          background-color: var(--onyx-color-base-background-blank);
          color: var(--onyx-color-text-icons-primary-soft);
        }
      }

      &:disabled:not(.onyx-switch__loading) + .onyx-switch__click-area .onyx-switch__container {
        background-color: var(--onyx-color-base-neutral-200);

        .onyx-switch__icon {
          background-color: var(--onyx-color-base-neutral-300);
          color: var(--onyx-color-text-icons-neutral-inverted);
        }
      }

      &:user-invalid {
        & + .onyx-switch__click-area .onyx-switch__container {
          background-color: var(--onyx-color-base-danger-200);
          position: relative;

          .onyx-switch__icon {
            background-color: var(--onyx-color-base-danger-500);
            color: var(--onyx-color-text-icons-neutral-inverted);
          }

          // The frame is needed instead of setting a border directly on __container
          // because when zooming in, some browsers will mess up the center-alignment of the __icon
          // by resizing the 1px border to fractions.
          // for more info, see https://github.com/SchwarzIT/onyx/issues/503
          .onyx-switch__frame {
            position: absolute;
            border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-danger);
            height: var(--onyx-switch-frame-height);
            border-radius: var(--onyx-radius-full);
            width: $input-width;
            box-sizing: border-box;
            top: 0;
            left: 0;
          }
        }

        &:checked + .onyx-switch__click-area .onyx-switch__container {
          background-color: var(--onyx-color-component-cta-danger);

          .onyx-switch__icon {
            background-color: var(--onyx-color-base-background-blank);
            color: var(--onyx-color-text-icons-danger-intense);
          }
        }
      }
    }

    &__click-area,
    &-skeleton__click-area {
      padding: var(--onyx-switch-label-padding-vertical);
      display: flex;
      align-items: center;
    }

    &__container {
      display: inline-flex;
      width: $input-width;
      min-width: $input-width;
      padding: var(--onyx-switch-container-padding);
      box-sizing: border-box;
      background-color: var(--onyx-color-base-neutral-300);
      border-radius: var(--onyx-radius-full);
      transition: background-color var(--onyx-duration-sm) ease;

      .onyx-switch__icon {
        margin: var(--onyx-1px-in-rem);
        display: flex;
        align-self: center;
        justify-content: center;
        background-color: var(--onyx-color-base-neutral-100);
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

    &__label,
    &__marker {
      padding: var(--onyx-switch-label-padding-vertical) 0;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    &__label {
      color: var(--onyx-color-text-icons-neutral-intense);
      font-family: var(--onyx-font-family);
      font-style: normal;
      font-weight: 400;
    }

    &:hover {
      &:has(.onyx-switch__input:enabled) .onyx-switch__container {
        background-color: var(--onyx-color-base-neutral-400);
      }

      &:has(.onyx-switch__input:enabled:checked) .onyx-switch__container {
        background-color: var(--onyx-color-component-cta-default-hover);
      }

      &:has(.onyx-switch__input:user-invalid:enabled) .onyx-switch__container {
        background-color: var(--onyx-color-base-danger-300);
      }

      &:has(.onyx-switch__input:user-invalid:enabled:checked) .onyx-switch__container {
        background-color: var(--onyx-color-component-cta-danger-hover);
      }
    }

    &:has(&__input:focus-visible) {
      outline: none;

      &:has(.onyx-switch__input:enabled) .onyx-switch__container {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-neutral);
      }

      &:has(.onyx-switch__input:checked:enabled) .onyx-switch__container {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }

      &:has(.onyx-switch__input:user-invalid:enabled) .onyx-switch__container {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-danger);
      }
    }

    &:has(.onyx-switch__input:disabled) {
      cursor: default;

      .onyx-switch__label {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }
}

.onyx-switch-skeleton {
  @include layers.component() {
    display: inline-flex;
    align-items: center;

    &__input {
      height: var(--onyx-switch-frame-height);
      border-radius: var(--onyx-radius-full);
      width: $input-width;
    }

    &__label {
      height: var(--onyx-spacing-md);
      width: var(--onyx-spacing-3xl);
    }
  }
}
</style>
