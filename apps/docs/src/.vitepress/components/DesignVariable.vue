<script lang="ts" setup>
import checkIcon from "@sit-onyx/icons/check-small.svg?raw";
import copyIcon from "@sit-onyx/icons/copy.svg?raw";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";

const props = withDefaults(
  defineProps<{
    /** Variable name. */
    name: string;
    /** Value to display */
    value?: string;
    /**
     * Value type.
     * - color: shows a color preview
     * - value: shows the plain value
     *
     * @default "value"
     */
    type?: "color" | "value";
    /** If true, the user will be able to click the variable to copy its value. */
    allowCopy?: boolean;
    /** If true, a "copied" text will be displayed to indicate that the value has been copied. */
    isCopied?: boolean;
  }>(),
  {
    type: "value",
  },
);

const emit = defineEmits<{
  copy: [];
}>();
</script>

<template>
  <button
    class="variable"
    :class="{
      'variable--color': props.type === 'color',
      'variable--copyable': props.allowCopy,
      'variable__name--no-padding': !props.value,
    }"
    :disabled="!props.allowCopy"
    @click="emit('copy')"
    @keyup.enter="emit('copy')"
  >
    <div class="variable__name" :class="{ 'variable__name--no-value': !props.value }">
      <span>{{ props.name }}</span>
    </div>

    <span v-if="props.isCopied" class="variable__copied">
      <OnyxIcon :icon="checkIcon" />
      copied
    </span>

    <OnyxIcon v-else class="variable__copy" :icon="copyIcon" color="primary" />
  </button>
  <div v-if="props.value && props.type === 'value'" class="variable__value">
    {{ props.value }}
  </div>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.variable {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--onyx-spacing-md);
  width: max-content;
  max-width: 100%;
  pointer-events: none;

  // reset default button styles
  background-color: transparent;
  padding: 0 var(--onyx-spacing-2xl);
  margin: auto 0;
  border: none;
  color: inherit;
  line-height: inherit;

  &__name {
    padding: var(--onyx-spacing-4xs) var(--onyx-spacing-2xs) var(--onyx-spacing-4xs)
      var(--onyx-spacing-md);
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
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

    &--no-value {
      padding: var(--onyx-spacing-3xs) var(--onyx-spacing-2xs);
    }
    &--no-padding {
      padding: 0;
    }
  }

  &__value {
    color: var(--onyx-color-base-neutral-500);
    font-weight: 600;
    font-size: 0.8125rem;
    border-top: 1px solid var(--onyx-color-base-neutral-300);
    padding: var(--onyx-spacing-3xs) var(--onyx-spacing-2xl);
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
          border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-primary-300);
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
          background-color: v-bind("props.value");
          border-radius: var(--onyx-radius-sm);
          border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
        }
      }
    }
  }

  &__copied {
    display: flex;
    text-align: center;
    color: var(--onyx-color-text-icons-success-intense);
    font-size: 0.8125rem;
  }
}
</style>
