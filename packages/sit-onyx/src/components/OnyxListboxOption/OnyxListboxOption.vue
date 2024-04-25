<script lang="ts" setup>
import type { OnyxListboxOptionProps } from "./types";

const props = defineProps<OnyxListboxOptionProps>();

defineSlots<{
  /**
   * Default slot to place the option label / text content.
   */
  default(): unknown;
}>();
</script>

<template>
  <li class="onyx-listbox-option" :class="{ 'onyx-listbox-option--active': props.active }">
    <input
      v-if="props.multiple"
      :checked="!!$attrs['aria-checked']"
      :aria-labelledby="$attrs.id as string"
      :disabled="!!$attrs['aria-disabled']"
      :indeterminate="props.indeterminate"
      aria-hidden="true"
      tabindex="-1"
      class="onyx-listbox-option__checkbox"
      type="checkbox"
    />

    <span class="onyx-truncation-ellipsis">
      <slot></slot>
    </span>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/checkbox";

.onyx-listbox-option {
  @include checkbox.variables();

  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
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
    gap: var(--onyx-spacing-sm);

    &__checkbox {
      @include checkbox.styles();
      // prevent the checkbox to get squished by a long label
      flex-shrink: 0;
    }

    &:not([aria-disabled="true"]) {
      cursor: pointer;

      &:hover,
      &.onyx-listbox-option--active {
        background-color: var(--onyx-color-base-primary-100);
      }

      &.onyx-listbox-option--active:hover,
      &.onyx-listbox-option--active:focus-visible {
        color: var(--onyx-color-text-icons-primary-bold);
      }

      // single select
      &[aria-selected="true"] {
        background-color: var(--onyx-color-base-primary-200);

        :hover,
        :focus-visible {
          color: var(--onyx-color-text-icons-primary-bold);
        }
      }

      // single + multiselect
      &[aria-checked="true"] {
        &:hover,
        &.onyx-listbox-option--active {
          background-color: var(--onyx-color-base-primary-100);
          color: var(--onyx-color-text-icons-primary-bold);
        }
      }
    }

    &[aria-disabled="true"] {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
