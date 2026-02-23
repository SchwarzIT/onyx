<script lang="ts" setup>
import { computed, useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import MaybePopoverLayout from "./MaybePopoverLayout.vue";
import OnyxFormElementV2Bottom from "./OnyxFormElementV2Bottom.vue";
import OnyxFormElementV2Label from "./OnyxFormElementV2Label.vue";
import type {
  FormElementV2LabelOptions,
  OnyxFormElementV2Props,
  OnyxFormElementV2Slots,
} from "./types.js";

const props = withDefaults(defineProps<OnyxFormElementV2Props>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  id: () => useId(),
});

const slots = defineSlots<OnyxFormElementV2Slots>();

const { densityClass } = useDensity(props);
const formContext = useFormContext(props);
const errorClass = useErrorClass(formContext.showError);

const inputProps = computed(() => {
  return {
    id: props.id,
    class: "onyx-form-element-v2__input",
    required: props.required,
  };
});

const topProps = useForwardProps(props, OnyxFormElementV2Label);
const bottomProps = useForwardProps(props, OnyxFormElementV2Bottom);
const popoverLayoutProps = useForwardProps(props, MaybePopoverLayout);

const label = computed<FormElementV2LabelOptions>(() => {
  if (typeof props.label === "object") return props.label;
  return { label: props.label };
});
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-form-element-v2',
      densityClass,
      errorClass,
      { 'onyx-form-element-v2--label-left': label.position === 'left' },
      { 'onyx-form-element-v2--label-right': label.position === 'right' },
    ]"
  >
    <OnyxFormElementV2Label v-if="!label.hidden" v-bind="topProps" />

    <div class="onyx-form-element-v2__body">
      <div class="onyx-form-element-v2__content">
        <div
          v-if="slots.leading"
          class="onyx-form-element-v2__slot onyx-form-element-v2__slot--leading"
        >
          <slot name="leading"></slot>
        </div>

        <MaybePopoverLayout v-bind="popoverLayoutProps">
          <template #default="{ trigger }">
            <div v-bind="trigger" class="onyx-form-element-v2__input-container">
              <div
                v-if="slots.leadingIcons"
                class="onyx-form-element-v2__icons onyx-form-element-v2__icons--leading"
              >
                <slot name="leadingIcons"></slot>
              </div>

              <slot v-bind="inputProps"></slot>

              <div
                v-if="slots.trailingIcons"
                class="onyx-form-element-v2__icons onyx-form-element-v2__icons--trailing"
              >
                <slot name="trailingIcons"></slot>
              </div>
            </div>
          </template>

          <template v-if="slots.popover" #popover>
            <slot name="popover"></slot>
          </template>
        </MaybePopoverLayout>

        <div
          v-if="slots.trailing"
          class="onyx-form-element-v2__slot onyx-form-element-v2__slot--trailing"
        >
          <slot name="trailing"></slot>
        </div>
      </div>

      <OnyxFormElementV2Bottom v-bind="bottomProps">
        <template v-if="slots.bottomRight" #bottomRight>
          <slot name="bottomRight"></slot>
        </template>
      </OnyxFormElementV2Bottom>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-v2,
.onyx-form-element-v2-skeleton {
  @include layers.component() {
    --onyx-form-element-v2-gap: var(--onyx-density-3xs);
    --onyx-form-element-v2-border-radius: var(--onyx-radius-sm);
    --onyx-form-element-v2-border-color: var(--onyx-color-component-border-neutral);
    --onyx-form-element-v2-border-color-hover: var(--onyx-color-component-border-primary-hover);
    --onyx-form-element-v2-border-color-focus: var(--onyx-color-component-border-primary);
    --onyx-form-element-v2-background: var(--onyx-color-base-background-blank);
    --onyx-form-element-v2-background-autofill: var(--onyx-color-base-warning-100);
    --onyx-form-element-v2-padding-block: var(--onyx-density-xs);
    --onyx-form-element-v2-padding-inline: var(--onyx-density-sm);
    --onyx-form-element-v2-caret-color: var(--onyx-color-component-cta-default);
    --onyx-form-element-v2-selection-background: var(--onyx-color-base-primary-200);
    --onyx-form-element-v2-outline-color: var(--onyx-color-component-focus-primary);

    // :read-only is valid for readonly and disabled state so we put shared styles for both states here
    &:has(.onyx-form-element-v2__input:read-only) {
      --onyx-form-element-v2-selection-background: var(--onyx-color-base-neutral-200);
      --onyx-form-element-v2-caret-color: var(--onyx-color-base-neutral-700);
      --onyx-form-element-v2-background: var(--onyx-color-base-background-tinted);
    }

    // styles for readonly but NOT disabled
    &:has(.onyx-form-element-v2__input:enabled:read-only) {
      --onyx-form-element-v2-border-color-hover: var(--onyx-color-component-border-neutral-hover);
      --onyx-form-element-v2-border-color-focus: var(--onyx-color-component-border-neutral);
      --onyx-form-element-v2-outline-color: var(--onyx-color-component-focus-neutral);
    }

    // see "useErrorClass" composable
    &:not(.onyx-form-element--suppress-invalid) {
      &.onyx-form-element--touched-invalid:has(
          .onyx-form-element-v2__input:user-invalid,
          .onyx-form-element-v2__input--touched:invalid
        ),
      &.onyx-form-element--immediate-invalid:has(.onyx-form-element-v2__input:invalid) {
        --onyx-form-element-v2-border-color: var(--onyx-color-component-border-danger);
        --onyx-form-element-v2-border-color-hover: var(--onyx-color-component-border-danger-hover);
        --onyx-form-element-v2-border-color-focus: var(--onyx-color-component-border-danger);
        --onyx-form-element-v2-outline-color: var(--onyx-color-component-focus-danger);
        --onyx-form-element-v2-selection-background: var(--onyx-color-base-danger-200);
        --onyx-form-element-v2-caret-color: var(--onyx-color-base-neutral-900);
      }
    }

    &:has(.onyx-form-element-v2__message--success) {
      --onyx-form-element-v2-border-color: var(--onyx-color-component-border-success);
      --onyx-form-element-v2-border-color-hover: var(--onyx-color-component-border-success-hover);
      --onyx-form-element-v2-border-color-focus: var(--onyx-color-component-border-success);
      --onyx-form-element-v2-outline-color: var(--onyx-color-component-focus-success);
      --onyx-form-element-v2-selection-background: var(--onyx-color-base-success-200);
      --onyx-form-element-v2-caret-color: var(--onyx-color-base-neutral-900);
    }
  }
}

.onyx-form-element-v2 {
  @include layers.component() {
    font-family: var(--onyx-font-family-paragraph);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-form-element-v2-gap);
    color: var(--onyx-color-text-icons-neutral-intense);
    font-size: var(--onyx-font-size-md);
    line-height: var(--onyx-font-line-height-md);
    max-width: 100%;

    &--label-left,
    &--label-right {
      --onyx-form-element-v2-gap: var(--onyx-density-lg);
      align-items: flex-start;
      justify-content: space-between;

      > .onyx-form-element-v2__label {
        width: max-content;
        padding-block: calc(var(--onyx-form-element-v2-padding-block) + var(--onyx-1px-in-rem));
        line-height: var(--onyx-font-line-height-md);
      }
    }

    &--label-left {
      flex-direction: row;
    }

    &--label-right {
      flex-direction: row-reverse;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-3xs);
      width: 100%;
      // TODO: truncates outline
      // overflow: hidden; // needed to correctly truncate the bottom message
    }

    &__content {
      border-radius: var(--onyx-form-element-v2-border-radius);
      background-color: var(--onyx-form-element-v2-background);
      display: flex;
      align-items: center;
    }

    &__input-container {
      display: flex;
      align-items: center;
      flex-grow: 1;
      border: var(--onyx-1px-in-rem) solid var(--onyx-form-element-v2-border-color);
      border-radius: inherit;

      &:has(.onyx-form-element-v2__input:read-write):hover {
        border-color: var(--onyx-form-element-v2-border-color-hover);
      }

      &:has(.onyx-form-element-v2__input:enabled:focus) {
        border-color: var(--onyx-form-element-v2-border-color-focus);
        outline: var(--onyx-outline-width) solid var(--onyx-form-element-v2-outline-color);
      }

      &:has(.onyx-form-element-v2__input:autofill) {
        background-color: var(--onyx-form-element-v2-background-autofill);
      }
    }

    &__icons {
      color: var(--onyx-color-text-icons-neutral-medium);
      display: flex;
      padding: var(--onyx-form-element-v2-padding-block) var(--onyx-form-element-v2-padding-inline);
      gap: var(--onyx-density-2xs);

      &--leading {
        padding-right: 0;
      }

      &--trailing {
        padding-left: 0;
      }
    }

    &__slot {
      height: 100%;
      border: var(--onyx-1px-in-rem) solid var(--onyx-form-element-v2-border-color);

      &--leading {
        border-right: none;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
      }

      &--trailing {
        border-left: none;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
      }

      // override OnyxSelect styles to seamlessly integrate into the slots
      .onyx-select-input__wrapper {
        border: none;
        background-color: transparent;
        padding-block: var(--onyx-form-element-v2-padding-block);
        padding-inline: var(--onyx-form-element-v2-padding-inline);
      }
      .onyx-select-input__native {
        width: 3ch;
      }
    }

    &:not(:has(&__input:focus)) {
      &:has(.onyx-form-element-v2__slot--leading) {
        .onyx-form-element-v2__input-container {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }

      &:has(.onyx-form-element-v2__slot--trailing) {
        .onyx-form-element-v2__input-container {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }

    &__input {
      border: none;
      border-radius: inherit;
      background-color: transparent;
      color: inherit;
      width: 100%;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      caret-color: var(--onyx-form-element-v2-caret-color);
      padding: var(--onyx-form-element-v2-padding-block) var(--onyx-form-element-v2-padding-inline);

      &::placeholder {
        color: var(--onyx-color-text-icons-neutral-soft);
        font-weight: var(--onyx-font-weight-regular);
        opacity: 1;
      }

      &::selection {
        background: var(--onyx-form-element-v2-selection-background);
      }

      &:autofill {
        background-color: transparent;
        -webkit-text-fill-color: var(--onyx-color-text-icons-neutral-intense);

        // many browsers use "!important" to set the autofill background so we need this
        // transition workaround to make the background transparent
        transition: background-color calc(infinity * 1s);
      }
    }

    &__tooltip {
      margin-left: var(--onyx-spacing-2xs);
    }

    &:has(&__bottom:not(:empty)) {
      .onyx-form-element-v2__popover {
        --onyx-basic-popover-gap: var(--onyx-form-element-v2-bottom-height);
      }
    }
  }
}
</style>
