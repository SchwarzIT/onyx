<script lang="ts" setup>
import { iconCheckSmall, iconXSmall } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxSwitchProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSwitchProps>(), {
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  truncation: "ellipsis",
  requiredMarker: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  modelValue: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the checked state changes.
   */
  "update:modelValue": [value: boolean];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const { disabled } = useFormContext(props);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit });

const isChecked = useVModel({
  props,
  emit,
  key: "modelValue",
  default: false,
});

const displayValueLabel = computed(() => {
  if (!props.valueLabel) return undefined;
  if (typeof props.valueLabel === "object") {
    return isChecked.value ? props.valueLabel.truthy : props.valueLabel.falsy;
  }
  return props.valueLabel;
});

const normalizedLabel = computed(() => {
  const hidden = props.hideLabel;
  if (typeof props.label === "string") {
    return { label: props.label, position: "right" as const, hidden };
  }
  if (props.label) {
    return {
      ...props.label,
      hidden: hidden || props.label.hidden,
    };
  }
  return props.label;
});

const legacyProps = new Proxy(props, {
  get(target, prop, receiver) {
    if (prop === "label") {
      return normalizedLabel.value;
    }
    return Reflect.get(target, prop, receiver);
  },
});

const { formElementV2Props: legacyFormElementProps } = useLegacyFormElementProps({
  props: legacyProps,
  errorMessages,
});

const formElementV2Props = computed(() => {
  return {
    ...legacyFormElementProps.value,
    loading: false,
    label: normalizedLabel.value,
  };
});

const input = useTemplateRef("input");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(formElementV2Props, rootAttrs)"
    class="onyx-component onyx-switch"
    unstyled
  >
    <template #default="{ title, ...inputProps }">
      <label class="onyx-switch__label" :title="title">
        <input
          ref="input"
          v-bind="mergeVueProps(restAttrs, inputProps)"
          v-model="isChecked"
          v-custom-validity
          type="checkbox"
          role="switch"
          :class="{ 'onyx-switch__input': true, 'onyx-switch__loading': props.loading }"
          :disabled="disabled || props.loading"
          :required="props.required"
          :autofocus="props.autofocus"
        />
        <span class="onyx-switch__click-area">
          <span class="onyx-switch__container">
            <span class="onyx-switch__icon">
              <OnyxLoadingIndicator
                v-if="props.loading"
                class="onyx-switch__spinner"
                type="circle"
              />
              <OnyxIcon v-else :icon="isChecked ? iconCheckSmall : iconXSmall" />
            </span>
            <div class="onyx-switch__frame"></div>
          </span>
        </span>
        <span
          v-if="displayValueLabel"
          class="onyx-switch__label"
          :class="[`onyx-truncation-${props.truncation}`]"
        >
          {{ displayValueLabel }}
        </span>
      </label>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-switch {
  @include layers.component() {
    .onyx-form-element-v2__content-skeleton {
      height: var(--onyx-switch-frame-height);
      width: calc(2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding));
      border-radius: var(--onyx-radius-full);
      margin: var(--onyx-switch-label-padding-vertical) 0;
      position: relative;
    }
  }
}

.onyx-switch {
  @include layers.component() {
    --onyx-switch-icon-size: 1.25rem;
    --onyx-switch-container-padding: var(--onyx-1px-in-rem);
    // icon size + padding top/bottom + border top/bottom
    --onyx-switch-frame-height: calc(
      var(--onyx-switch-icon-size) + 2 * var(--onyx-switch-container-padding) + 2 *
        var(--onyx-1px-in-rem)
    );
    --onyx-switch-label-padding-vertical: var(--onyx-density-xs);
    --onyx-switch-transform: var(--onyx-1px-in-rem);
  }
}

$input-width: calc(2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding));

.onyx-switch {
  @include layers.component() {
    justify-content: left;
    .onyx-form-element-v2 {
      &__body {
        width: auto;
      }
      &__label {
        padding-left: var(--onyx-switch-label-padding-vertical);
      }
    }
    &__label {
      display: inline-flex;
      align-items: flex-start;
      cursor: pointer;
      max-width: 100%;
    }

    &__frame {
      position: absolute;
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-secondary);
      height: var(--onyx-switch-frame-height);
      border-radius: var(--onyx-radius-full);
      width: $input-width;
      box-sizing: border-box;
      top: 0;
      left: 0;
    }

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

          .onyx-switch__icon {
            background-color: var(--onyx-color-base-danger-500);
            color: var(--onyx-color-text-icons-neutral-inverted);
          }

          // The frame is needed instead of setting a border directly on __container
          // because when zooming in, some browsers will mess up the center-alignment of the __icon
          // by resizing the 1px border to fractions.
          // for more info, see https://github.com/SchwarzIT/onyx/issues/503
          .onyx-switch__frame {
            border-color: var(--onyx-color-component-border-danger);
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

    &__click-area {
      padding: var(--onyx-switch-label-padding-vertical) 0;
      display: flex;
      align-items: center;
    }

    &__container {
      display: inline-flex;
      position: relative;
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
          --indicator-size: var(--onyx-switch-icon-size);
        }
      }
    }

    &__label {
      padding: var(--onyx-switch-label-padding-vertical) 0 var(--onyx-switch-label-padding-vertical)
        var(--onyx-switch-label-padding-vertical);
      font-size: var(--onyx-font-size-md);
      line-height: var(--onyx-font-line-height-md);
    }

    &__label {
      color: var(--onyx-color-text-icons-neutral-intense);
      font-family: var(--onyx-font-family-paragraph);
      font-style: normal;
      font-weight: var(--onyx-font-weight-regular);
    }

    &:hover {
      &:has(.onyx-switch__input:enabled:not(.onyx-switch__input:user-invalid)) {
        .onyx-switch__container {
          background-color: var(--onyx-color-base-neutral-400);
        }
        .onyx-switch__frame {
          border-color: var(--onyx-color-component-border-secondary-hover);
        }
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
        outline: var(--onyx-outline-width) solid var(--onyx-color-base-neutral-600);
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
      .onyx-switch__frame {
        border-color: transparent;
      }
      .onyx-switch__label {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
    &:has(.onyx-switch__input:disabled.onyx-switch__loading) {
      .onyx-switch__frame {
        border-color: var(--onyx-color-component-border-secondary);
      }
    }
  }
}
</style>
