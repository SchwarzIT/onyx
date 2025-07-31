<script lang="ts" setup>
import { iconCheck, iconCopy } from "@sit-onyx/icons";
import { OnyxIcon } from "sit-onyx";

const props = defineProps<{
  /** Variable name. */
  name: string;
  /** Color value to display as preview */
  color?: string;
  /** If true, the user will be able to click the variable to copy its value. */
  allowCopy?: boolean;
  /** If true, a "copied" text will be displayed to indicate that the value has been copied. */
  isCopied?: boolean;
}>();

const emit = defineEmits<{
  copy: [];
}>();
</script>

<template>
  <button
    :class="{
      variable: true,
      'variable--color': props.color,
      'variable--copyable': props.allowCopy,
    }"
    :disabled="!props.allowCopy"
    type="button"
    @click="emit('copy')"
    @keyup.enter="emit('copy')"
  >
    <div class="variable__name">
      <span>{{ props.name }}</span>
    </div>

    <span v-if="props.isCopied" class="variable__copied">
      <OnyxIcon :icon="iconCheck" />
      copied
    </span>

    <OnyxIcon v-else class="variable__copy" :icon="iconCopy" color="primary" />
  </button>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.variable {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-md);
  width: max-content;
  max-width: 100%;
  pointer-events: none;

  // reset default button styles
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: none;
  color: inherit;
  line-height: inherit;
  outline: none;

  &__name {
    padding: var(--onyx-spacing-4xs) var(--onyx-spacing-2xs) var(--onyx-spacing-4xs)
      var(--onyx-spacing-md);
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    font-family: var(--onyx-font-family-mono);
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-spacing-xl);
    outline-color: var(--onyx-color-base-primary-300);
    background-color: var(--onyx-color-base-background-blank);
    cursor: pointer;

    @include mixins.breakpoint(max, xs) {
      min-width: unset;
    }
  }

  &__copy {
    display: none;
  }

  &--copyable {
    pointer-events: unset;

    &:hover,
    &:focus-within {
      .variable {
        &__name {
          border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-primary);
        }

        &__copy {
          display: inline-block;
        }
      }
    }
  }

  &--color {
    .variable {
      &__name {
        &::after {
          content: "";
          display: inline-block;
          width: 1.25rem;
          min-width: 1.25rem;
          height: 1.25rem;
          background-color: v-bind("props.color");
          border-radius: var(--onyx-radius-sm);
          border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
        }
      }
    }
  }

  &__copied {
    display: flex;
    text-align: center;
    color: var(--onyx-color-text-icons-success-intense);
    font-size: var(--onyx-font-size-sm);
  }
}
</style>
