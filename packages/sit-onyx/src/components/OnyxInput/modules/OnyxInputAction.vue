<script setup lang="ts">
import { createToggleButton } from "@sit-onyx/headless";
import { computed } from "vue";
import { useVModel } from "../../../composables/useVModel.js";
import { mergeVueProps, useRootAttrs } from "../../../utils/attrs.js";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxTooltip from "../../OnyxTooltip/OnyxTooltip.vue";

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const props = defineProps<{
  /**
   * Icon to display within the button.
   */
  icon: string;
  /**
   * Label describing the button action.
   */
  label: string;
  /**
   * Whether the button is disabled or not.
   */
  disabled?: boolean;
  /**
   *
   */
  type?: "button" | "toggle";
  /**
   * If the button is currently active (pressed).
   */
  active?: boolean;
}>();

const emit = defineEmits<{
  /** Emitted when the active state changes. */
  "update:active": [value: boolean];
}>();

const active = useVModel({
  props,
  emit,
  key: "active",
  default: false,
});

const toggleAttrs = computed(() =>
  props.type === "toggle"
    ? createToggleButton({
        onToggle: () => (active.value = !active.value),
        isPressed: active,
      }).elements.button.value
    : {},
);
</script>

<template>
  <OnyxTooltip v-bind="rootAttrs" without-wedge alignment="center" :text="props.label">
    <template #default="{ trigger }">
      <button
        v-bind="mergeVueProps(restAttrs.value, toggleAttrs, trigger)"
        :class="{
          'onyx-input-action': true,
        }"
        type="button"
        tabindex="-1"
        :disabled="props.disabled"
      >
        <OnyxIcon
          class="onyx-input-action__icon"
          size="24px"
          :icon="props.icon"
          color="currentColor"
        />
      </button>
    </template>
  </OnyxTooltip>
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

@include layers.component() {
  .onyx-input-action {
    all: initial;
    color: var(--onyx-color-text-icons-neutral-medium);
    padding: var(--onyx-density-xs) var(--onyx-density-sm);

    &:enabled {
      cursor: pointer;
    }

    &:disabled {
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &:enabled:hover,
    &:enabled:focus-visible {
      color: var(--onyx-color-text-icons-primary-intense);
    }

    &[aria-pressed="true"],
    &:active {
      background-color: var(--onyx-color-component-cta-default);
      color: var(--onyx-color-text-icons-neutral-inverted);
    }

    &[aria-pressed="true"]:hover,
    &:active:hover {
      background-color: var(--onyx-color-component-cta-default-hover);
      color: var(--onyx-color-text-icons-neutral-inverted);
    }

    &[aria-pressed="true"]:disabled {
      background-color: var(--onyx-color-base-primary-200);
    }
  }
}
</style>
