<script lang="ts" setup>
import type { OnyxListboxOptionProps } from "./types";
const props = defineProps<OnyxListboxOptionProps>();

defineSlots<{
  /**
   * Default slot to place the option label / text content.
   */
  default(props: Record<string, never>): unknown;
}>();
</script>

<template>
  <li class="onyx-listbox-option" :class="{ 'onyx-listbox-option--focused': props.focused }">
    <span class="onyx-truncation-ellipsis">
      <slot></slot>
    </span>
  </li>
</template>

<style lang="scss">
.onyx-listbox-option {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  box-sizing: border-box;
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  background-color: var(--onyx-color-base-background-blank);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;

  border: none;
  width: 100%;
  outline: none;

  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);

  &:not([aria-disabled="true"]) {
    cursor: pointer;

    &:hover,
    &.onyx-listbox-option--focused {
      background-color: var(--onyx-color-base-primary-100);
    }

    &[aria-selected="true"],
    &[aria-checked="true"] {
      background-color: var(--onyx-color-base-primary-200);

      &:hover,
      &.onyx-listbox-option--focused {
        background-color: var(--onyx-color-base-primary-200);
        color: var(--onyx-color-text-icons-primary-bold);
      }
    }
  }

  &[aria-disabled="true"] {
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}
</style>
