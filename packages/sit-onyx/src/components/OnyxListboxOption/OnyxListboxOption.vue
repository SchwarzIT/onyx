<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxListboxOptionProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxOptionProps>(), {
  active: false,
  selected: false,
  disabled: false,
  multiple: false,
});

const emit = defineEmits<{
  click: [];
}>();

defineSlots<{
  /**
   * Optional slot to override the option label / text content.
   */
  default?(): unknown;
}>();

const handleClick = () => {
  if (!props.disabled) emit("click");
};
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
  <!-- eslint-disable vuejs-accessibility/interactive-supports-focus -->
  <li
    :id="props.id"
    class="onyx-listbox-option"
    :class="{ 'onyx-listbox-option--active': props.active }"
    :aria-disabled="props.disabled"
    :aria-label="props.label"
    role="option"
    :aria-selected="props.multiple ? undefined : props.selected ?? false"
    :aria-checked="props.multiple ? props.selected ?? false : undefined"
    @click="handleClick"
  >
    <input
      v-if="multiple"
      :checked="props.selected"
      :aria-labelledby="props.id"
      aria-hidden="true"
      :disabled="props.disabled"
      tabindex="-1"
      class="onyx-listbox-option__checkbox"
      type="checkbox"
    />

    <OnyxIcon v-if="props.icon" :icon="props.icon" />

    <span class="onyx-truncation-ellipsis">
      <slot>{{ props.label }}</slot>
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

      &[aria-selected="true"],
      &[aria-checked="true"] {
        background-color: var(--onyx-color-base-primary-200);

        &:hover,
        &.onyx-listbox-option--active {
          background-color: var(--onyx-color-base-primary-200);
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
