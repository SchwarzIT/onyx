<script lang="ts">
/**
 * @deprecated This component is still under active development and its API might change in patch
 *   releases.
 * @experimental
 */
export default {};
</script>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { useForwardProps } from "../../utils/props.js";
import ButtonOrLinkLayout from "../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import { NAV_BAR_IS_EXPANDED_INJECTION_KEY } from "../OnyxNavBar/types.js";
import type { OnyxNavButtonProps } from "./types.js";

const props = withDefaults(defineProps<OnyxNavButtonProps>(), {
  color: "neutral",
});

defineSlots<{
  /**
   * You can replace the label of the navButton with your custom content.
   */
  default?(): unknown;
}>();

const isExpanded = inject(NAV_BAR_IS_EXPANDED_INJECTION_KEY, undefined);

const isLabelHidden = computed(() => {
  if (props.hideLabel === "auto") {
    return !isExpanded?.value;
  }
  return Boolean(props.hideLabel);
});

const buttonOrLinkLayoutProps = useForwardProps(props, ButtonOrLinkLayout);
</script>

<template>
  <ButtonOrLinkLayout
    v-bind="buttonOrLinkLayoutProps"
    :class="[
      'onyx-component',
      'onyx-nav-button',
      'onyx-truncation-ellipsis',
      { 'onyx-nav-button--primary': props.color === 'primary' },
    ]"
    :aria-label="isLabelHidden ? props.label : undefined"
    :title="isLabelHidden ? props.label : undefined"
  >
    <slot>
      <OnyxIcon v-if="props.icon" :icon="props.icon" />
      <span v-if="!isLabelHidden" class="onyx-nav-button__labels">{{ props.label }}</span>
    </slot>
  </ButtonOrLinkLayout>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-nav-button {
  @include layers.component() {
    --onyx-nav-button-background: transparent;
    --onyx-nav-button-background-hover: var(--onyx-color-base-neutral-200);
    --onyx-nav-button-color: var(--onyx-color-text-icons-neutral-intense);
    --onyx-nav-button-outline-color: var(--onyx-color-component-focus-primary);
    --onyx-nav-button-padding-block: var(--onyx-spacing-2xs);
    --onyx-nav-button-padding-inline: var(--onyx-spacing-md);

    border-radius: var(--onyx-radius-sm);
    background-color: var(--onyx-nav-button-background);
    color: var(--onyx-nav-button-color);
    display: inline-flex;
    align-items: center;
    padding: var(--onyx-nav-button-padding-block) var(--onyx-nav-button-padding-inline);
    gap: var(--onyx-spacing-2xs);
    border: none;

    font-family: var(--onyx-font-family-h3);
    font-size: var(--onyx-font-size-md);
    font-weight: var(--onyx-font-weight-semibold);
    line-height: var(--onyx-font-line-height-md);

    &--primary {
      --onyx-nav-button-background: var(--onyx-color-base-primary-100);
      --onyx-nav-button-background-hover: var(--onyx-color-base-primary-200);
      --onyx-nav-button-outline-color: var(--onyx-color-base-primary-300);
    }

    &:not(:has(&__label)) {
      padding: var(--onyx-nav-button-padding-block);
    }

    &:enabled,
    &:is(a) {
      cursor: pointer;

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-nav-button-background-hover);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-nav-button-outline-color);
      }
    }

    &:disabled {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
