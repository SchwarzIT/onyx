<script lang="ts" setup>
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import { useCustomValidity } from "../../composables/useCustomValidity";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxSwitchProps } from "./types";

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
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
const { densityClass } = useDensity(props);
const { vCustomValidity, title } = useCustomValidity({ props, emit });

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-switch-skeleton', densityClass]">
    <span class="onyx-switch-skeleton__click-area">
      <OnyxSkeleton class="onyx-switch-skeleton__input" />
    </span>
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-switch-skeleton__label" />
  </div>

  <OnyxTooltip v-else :icon="circleInformation" open text="Tooltip text">
    <template #tooltip>
      This is
      <strong>custom content</strong>
    </template>

    <label class="onyx-switch" :class="[requiredTypeClass, densityClass]" :title="title">
      <!-- Linter incorrectly finds an error. For a native `input` the `aria-checked` is not necessary. There is an open issue about it: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/932  -->
      <!-- eslint-disable vuejs-accessibility/role-has-required-aria-props -->
      <!-- TODO: disable can be removed when https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/pull/1071 was released -->
      <input
        v-model="isChecked"
        v-custom-validity
        type="checkbox"
        role="switch"
        :class="{ 'onyx-switch__input': true, 'onyx-switch__loading': props.loading }"
        :aria-label="props.hideLabel ? props.label : undefined"
        :disabled="props.disabled || props.loading"
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
        v-if="props.truncation === 'ellipsis'"
        class="onyx-switch__marker"
        :class="[requiredMarkerClass]"
      ></div>
    </label>
  </OnyxTooltip>
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
  --onyx-switch-cozy-width: 0rem;

  @include density.compact {
    --onyx-switch-container-margin: 0.25rem;
    --onyx-switch-transform: 0.125rem;
    --onyx-switch-click-height: var(--onyx-spacing-xl);
    --onyx-switch-label-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-switch-transform: var(--onyx-1px-in-rem);
    --onyx-switch-click-height: 2.5rem;
    --onyx-switch-label-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-switch-transform: 0.01rem;
    --onyx-switch-click-height: var(--onyx-spacing-2xl);
    --onyx-switch-label-padding-vertical: var(--onyx-spacing-sm);
  }
}

$input-width: calc(
  2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding) +
    var(--onyx-switch-cozy-width)
);

.onyx-switch {
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
            border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-danger-500);
            height: var(--onyx-switch-frame-height);
            border-radius: var(--onyx-radius-full);
            width: $input-width;
            box-sizing: border-box;
            top: 0;
            left: 0;
          }
        }

        &:checked + .onyx-switch__click-area .onyx-switch__container {
          background-color: var(--onyx-color-base-danger-500);

          .onyx-switch__icon {
            background-color: var(--onyx-color-base-background-blank);
            color: var(--onyx-color-text-icons-danger-intense);
          }
        }
      }
    }

    &__click-area,
    &-skeleton__click-area {
      padding: 0 var(--onyx-spacing-2xs);
      height: var(--onyx-switch-click-height);
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
        background-color: var(--onyx-color-base-primary-400);
      }

      &:has(.onyx-switch__input:user-invalid:enabled) .onyx-switch__container {
        background-color: var(--onyx-color-base-danger-300);
      }

      &:has(.onyx-switch__input:user-invalid:enabled:checked) .onyx-switch__container {
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

      &:has(.onyx-switch__input:user-invalid:enabled) .onyx-switch__container {
        outline: 0.25rem solid var(--onyx-color-base-danger-300);
      }

      &:has(.onyx-switch__input:user-invalid:checked:enabled) .onyx-switch__container {
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
