<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { extractLinkProps } from "../../../../utils/router";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import type { OnyxNavButtonProps } from "../OnyxNavButton/types";

const props = defineProps<
  OnyxNavButtonProps & {
    /**
     * displays an arrow
     */
    hasChildren?: boolean;
  }
>();

defineSlots<{
  /**
   * Button text and additional inline content
   */
  default(): unknown;
}>();
</script>

<template>
  <ButtonOrLinkLayout
    v-bind="props"
    :class="{
      'onyx-component': true,
      'onyx-text': true,
      'onyx-nav-item-mobile': true,
      'onyx-nav-item-mobile--active': props.active,
    }"
    role="menuitem"
  >
    <span class="onyx-nav-item-mobile__label">
      <slot>{{ props.label }}</slot>
      <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
    </span>
    <OnyxIcon
      v-if="props.hasChildren"
      class="onyx-nav-item-mobile__mobile-chevron"
      :icon="chevronRightSmall"
      size="24px"
    />
  </ButtonOrLinkLayout>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

$border-radius: var(--onyx-radius-sm);

@include layers.component() {
  .onyx-nav-item-mobile {
    display: flex;
    justify-content: space-between;

    color: var(--onyx-color-text-icons-neutral-intense);
    padding: var(--onyx-spacing-sm);
    width: 100%;
    align-self: stretch;
    line-height: 1.5rem;
    text-align: start;
    font-family: var(--onyx-font-family);
    font-size: 1rem;
    font-weight: 400;
    border-radius: var(--onyx-radius-sm, 4px);
    border: 1px solid var(--onyx-color-component-border-neutral);
    background: var(--onyx-color-base-background-blank);
    cursor: pointer;

    &:hover:not(&--active) {
      background-color: var(--onyx-color-base-background-tinted);
    }
    a,
    button {
      all: unset;
    }

    &--active {
      --onyx-list-item-background-selected: var(--onyx-color-base-primary-100);
      --onyx-list-item-color-selected: var(--onyx-color-text-icons-primary-intense);
      background-color: var(--onyx-list-item-background-selected);
      border-color: var(--onyx-color-base-primary-200);
      color: var(--onyx-color-text-icons-primary-bold);
      font-weight: 600;
      cursor: default;
    }
  }
}
</style>
