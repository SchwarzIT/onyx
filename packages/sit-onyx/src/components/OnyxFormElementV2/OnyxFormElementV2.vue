<script lang="ts" setup>
import { computed, useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import MaybePopoverLayout from "./MaybePopoverLayout.vue";
import OnyxFormElementV2Bottom from "./OnyxFormElementV2Bottom.vue";
import OnyxFormElementV2Label from "./OnyxFormElementV2Label.vue";
import type { FormElementV2LabelOptions, OnyxFormElementV2Props } from "./types.js";

const props = withDefaults(defineProps<OnyxFormElementV2Props>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  id: () => useId(),
});

const slots = defineSlots<{
  /**
   * Actual native HTML form element (e.g. `<input>` or `<textarea>`).
   */
  default(props: typeof inputProps.value): unknown;
  /**
   * Optional slot to provide custom leading content before the actual input (e.g. an `OnyxSelect`).
   */
  leading?(): unknown;
  /**
   * Optional inner icons to display before the input but after the `leading` slot.
   */
  leadingIcons?(): unknown;
  /**
   * Optional inner icons to display after the input but before the `trailing` slot.
   */
  trailingIcons?(): unknown;
  /**
   * Optional slot to provide custom trailing content after the actual input (e.g. an `OnyxSelect`).
   */
  trailing?(): unknown;
  /**
   * Optional slot to display content on the bottom right (e.g. a character counter).
   */
  bottomRight?(): unknown;
  /**
   * Optional popover content. If set, a popover will be wrapped around the main input area.
   * Note: The input should typically be readonly or disabled when using a popover.
   */
  popover?(): unknown;
}>();

const { densityClass } = useDensity(props);

const inputProps = computed(() => {
  return {
    id: props.id,
    class: "onyx-form-element-v2__input",
    required: props.required,
    disabled: props.loading,
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
      { 'onyx-form-element-v2--label-left': label.position === 'left' },
      { 'onyx-form-element-v2--label-right': label.position === 'right' },
    ]"
  >
    <OnyxFormElementV2Label v-if="!props.hideLabel" v-bind="topProps" />

    <div class="onyx-form-element-v2__body">
      <div class="onyx-form-element-v2__content">
        <div v-if="slots.leading" class="onyx-form-element-v2__slot">
          <slot name="leading"></slot>
        </div>

        <MaybePopoverLayout v-bind="popoverLayoutProps">
          <template #default="{ trigger }">
            <div v-bind="trigger" class="onyx-form-element-v2__input-container">
              <div v-if="slots.leadingIcons" class="onyx-form-element-v2__icons">
                <slot name="leadingIcons"></slot>
              </div>

              <slot v-bind="inputProps"></slot>

              <div v-if="slots.trailingIcons" class="onyx-form-element-v2__icons">
                <slot name="trailingIcons"></slot>
              </div>
            </div>
          </template>

          <template v-if="slots.popover" #popover>
            <slot name="popover"></slot>
          </template>
        </MaybePopoverLayout>

        <div v-if="slots.trailing" class="onyx-form-element-v2__slot">
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
    --onyx-form-element-v2-background: var(--onyx-color-base-background-blank);
    --onyx-form-element-v2-padding-block: var(--onyx-density-xs);
    --onyx-form-element-v2-padding-inline: var(--onyx-density-sm);
    --onyx-form-element-v2-caret-color: var(--onyx-color-component-cta-default);
    --onyx-form-element-v2-selection-background: var(--onyx-color-base-primary-200);
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
      overflow: hidden; // needed to correctly truncate the bottom message
    }

    &__content {
      border-radius: var(--onyx-form-element-v2-border-radius);
      border: var(--onyx-1px-in-rem) solid var(--onyx-form-element-v2-border-color);
      background-color: var(--onyx-form-element-v2-background);
      display: flex;
      align-items: center;
    }

    &__input-container {
      display: flex;
      align-items: center;
      flex-grow: 1;

      &:has(.onyx-form-element-v2__input:autofill) {
        background-color: var(--onyx-color-base-warning-100);
      }
    }

    &__icons {
      color: var(--onyx-color-text-icons-neutral-medium);
      display: flex;
      padding: var(--onyx-form-element-v2-padding-block) var(--onyx-form-element-v2-padding-inline);
      gap: var(--onyx-density-2xs);

      &:first-of-type {
        padding-right: 0;
      }

      &:last-of-type {
        padding-left: 0;
      }
    }

    &__slot {
      height: 100%;

      &:first-of-type {
        border-right: var(--onyx-1px-in-rem) solid var(--onyx-form-element-v2-border-color);
      }

      &:last-of-type {
        border-left: var(--onyx-1px-in-rem) solid var(--onyx-form-element-v2-border-color);
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
