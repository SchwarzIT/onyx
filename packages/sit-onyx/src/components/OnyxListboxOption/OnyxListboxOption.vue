<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxListboxOptionProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxOptionProps>(), {
  active: false,
  multiple: false,
  color: "primary",
});

defineSlots<{
  /**
   * Default slot to place the option label / text content.
   */
  default(): unknown;
}>();
</script>

<template>
  <li
    class="onyx-listbox-option"
    :class="{
      'onyx-listbox-option--active': props.active,
      'onyx-listbox-option--danger': props.color === 'danger',
    }"
  >
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

    <OnyxIcon v-if="props.icon" :icon="props.icon" />

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
    --onyx-listbox-option-color: var(--onyx-color-text-icons-neutral-intense);
    --onyx-listbox-option-color-active: var(--onyx-color-text-icons-primary-intense);
    --onyx-listbox-option-background-hover: var(--onyx-color-base-primary-100);
    --onyx-listbox-option-background-selected: var(--onyx-color-base-primary-200);

    font-family: var(--onyx-font-family);
    color: var(--onyx-listbox-option-color);
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
        background-color: var(--onyx-listbox-option-background-hover);
      }

      // single select
      &[aria-selected="true"] {
        background-color: var(--onyx-color-base-primary-200);
      }

      // single + multiselect
      &[aria-selected="true"],
      &[aria-checked="true"] {
        background-color: var(--onyx-listbox-option-background-selected);

        &:hover,
        &.onyx-listbox-option--active {
          background-color: var(--onyx-listbox-option-background-selected);
          color: var(--onyx-listbox-option-color-active);
        }
      }
    }

    &[aria-disabled="true"] {
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &--danger {
      --onyx-listbox-option-color: var(--onyx-color-text-icons-danger-intense);
      --onyx-listbox-option-color-active: var(--onyx-color-text-icons-danger-intense);
      --onyx-listbox-option-background-hover: var(--onyx-color-base-danger-100);
      --onyx-listbox-option-background-selected: var(--onyx-color-base-danger-200);
    }
  }
}
</style>
