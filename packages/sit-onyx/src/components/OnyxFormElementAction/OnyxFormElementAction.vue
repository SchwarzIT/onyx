<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script setup lang="ts">
import { createToggleButton } from "@sit-onyx/headless";
import { computed } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxFormElementActionProps } from "./types.js";

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const props = withDefaults(defineProps<OnyxFormElementActionProps>(), {
  pressed: undefined,
  disabled: FORM_INJECTED_SYMBOL,
  size: "sm",
  showOnFocus: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the pressed state of the toggle button changes.
   */
  "update:pressed": [value: boolean];
}>();

const pressed = useVModel({
  props,
  emit,
  key: "pressed",
  default: false,
});

const { disabled } = useFormContext(props);

const toggleAttrs = computed(() =>
  props.type === "toggle"
    ? createToggleButton({
        onToggle: () => (pressed.value = !pressed.value),
        isPressed: pressed,
      }).elements.button.value
    : {},
);
</script>

<template>
  <OnyxTooltip
    v-bind="rootAttrs"
    alignment="center"
    :text="props.label"
    :density="props.density"
    :class="[
      'onyx-form-element-action',
      {
        'onyx-form-element-action--lg': props.size === 'lg',
        'onyx-form-element-action--show-on-focus': props.showOnFocus,
        'onyx-form-element-action--highlight-on-focus': props.highlightOnFocus,
      },
    ]"
  >
    <template #default="{ trigger }">
      <button
        v-bind="mergeVueProps(restAttrs, toggleAttrs, trigger)"
        class="onyx-form-element-action__button"
        type="button"
        tabindex="-1"
        :aria-label="props.label"
        :disabled
      >
        <OnyxIcon :icon="props.icon" />
      </button>
    </template>
  </OnyxTooltip>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-action {
  @include layers.component() {
    --onyx-form-element-action-color: var(--onyx-color-text-icons-neutral-medium);
    --onyx-form-element-action-color-hover: var(--onyx-color-text-icons-primary-intense);
    display: inline-flex;

    &__button {
      all: initial;
      color: var(--onyx-form-element-action-color);

      &[aria-pressed="true"] {
        --onyx-form-element-action-color: var(--onyx-color-text-icons-neutral-intense);
      }

      &:enabled {
        cursor: pointer;

        &:hover,
        &:focus-visible {
          color: var(--onyx-form-element-action-color-hover);
        }
      }

      &:disabled {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    &--lg {
      .onyx-form-element-action__button {
        padding: var(--onyx-density-xs) var(--onyx-density-sm);
      }
    }

    &--show-on-focus {
      display: none;
    }
  }
}

.onyx-form-element-v2 {
  @include layers.component() {
    // the nested selectors here are needed so the styles are NOT applied if the OnyxFormElementV2 contains other form elements in its leading/trailing
    // slot such as OnyxSelect
    $contentSelector: "> .onyx-form-element-v2__body > .onyx-form-element-v2__content";
    $inputContainerSelector: "#{$contentSelector} > .onyx-form-element-v2__input-container";
    $popoverSelector: "#{$contentSelector} > .onyx-form-element-v2__popover";

    // TODO: check with UX if clear icon should also be shown on hover
    // has input focus
    &:has(#{$inputContainerSelector}:focus-within),
    // has input hover
    &:has(#{$inputContainerSelector}:hover),
    // has popover input
    &:has(#{$popoverSelector}:hover),
    // has open popover
    &:has(#{$popoverSelector} .onyx-basic-popover__dialog:popover-open) {
      #{$popoverSelector},
      #{$inputContainerSelector} {
        .onyx-form-element-action {
          &--show-on-focus {
            display: inline-flex;
          }

          &--highlight-on-focus {
            --onyx-form-element-action-color: var(--onyx-form-element-action-color-hover);
          }
        }
      }
    }
  }
}
</style>
