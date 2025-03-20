<script lang="ts" setup>
import { extractLinkProps } from "../../../../utils/router";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import type { OnyxNavButtonProps } from "./types";

const props = defineProps<OnyxNavButtonProps>();

defineSlots<{
  /**
   *
   */
  default(): unknown;
}>();
</script>

<template>
  <ButtonOrLinkLayout
    :class="{
      'onyx-component': true,
      'onyx-nav-item-desktop': true,
      'onyx-nav-item-desktop--active': props.active,
    }"
    v-bind="props"
    role="menuitem"
  >
    <span class="onyx-truncation-ellipsis">{{ props.label }}</span>
    <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
  </ButtonOrLinkLayout>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

@include layers.component() {
  .onyx-nav-item-desktop {
    display: inline-flex;
    position: relative;
    height: 2.5rem;
    width: max-content;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
    justify-content: center;
    align-items: center;
    gap: var(--onyx-spacing-2xs);
    flex-shrink: 0;
    border-radius: var(--onyx-radius-sm);
    background: var(--onyx-color-base-background-blank);
    text-decoration: none;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    border: none;
    outline: none;

    &:hover {
      background: var(--onyx-color-base-neutral-200, #e3eaf0);
    }

    &:focus-visible {
      outline: 0.25rem solid var(--onyx-color-component-focus-primary, #bbeaed);
    }

    &--active::after {
      content: " ";
      position: absolute;
      width: 100%;
      height: 0.125rem;
      bottom: calc(-1 * var(--onyx-spacing-2xs));
      border-radius: var(--onyx-radius-full, 100rem) var(--onyx-radius-full, 100rem) 0 0;
      background: var(--onyx-color-component-cta-default, #00c3cd);
      z-index: 1;
    }
  }
}
</style>
