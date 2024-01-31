<script lang="ts" setup>
import checkIcon from "@sit-onyx/icons/check-small.svg?raw";
import copyIcon from "@sit-onyx/icons/copy.svg?raw";
import OnyxIcon from "../../../../../packages/sit-onyx/src/components/OnyxIcon/OnyxIcon.vue";

const props = withDefaults(
  defineProps<{
    /** Token name. */
    name: string;
    /** Value to display */
    value: string;
    /**
     * Value type.
     * - color: shows a color preview
     * - value: shows the plain value
     *
     * @default "value"
     */
    type?: "color" | "value";
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
    class="token"
    :class="{ 'token--color': props.type === 'color' }"
    @click="emit('copy')"
    @keyup.enter="emit('copy')"
  >
    <div class="token__name">
      <span>{{ props.name }}</span>
      <span v-if="props.type === 'value'" class="token__value">{{ props.value }}</span>
    </div>

    <span v-if="props.isCopied" class="token__copied">
      <OnyxIcon :icon="checkIcon" />
      copied
    </span>

    <OnyxIcon v-else class="token__copy" :icon="copyIcon" color="primary" />
  </button>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.token {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-md);
  width: max-content;

  &__name {
    padding: var(--onyx-spacing-3xs) var(--onyx-spacing-xs) var(--onyx-spacing-3xs)
      var(--onyx-spacing-md);
    border-radius: var(--onyx-radius-sm);
    border: 1px solid var(--onyx-color-base-neutral-300);
    font-family: var(--onyx-font-family-mono);
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-spacing-xl);
    outline-color: var(--onyx-color-base-primary-300);
    background-color: var(--onyx-color-base-background-blank);
    cursor: pointer;
    min-width: 16rem;

    @include mixins.breakpoint(max, xs) {
      min-width: unset;
    }
  }

  &__value {
    font-weight: 600;
  }

  &__copy {
    display: none;
  }

  &:hover,
  &:focus-within {
    .token {
      &__name {
        border: 1px solid var(--onyx-color-base-primary-300);
      }

      &__copy {
        display: inline-block;
      }
    }
  }

  &--color {
    .token {
      &__name {
        &::after {
          content: "";
          display: inline-block;
          width: 1.25rem;
          min-width: 1.25rem;
          height: 1.25rem;
          background-color: v-bind("props.value");
          border-radius: var(--onyx-radius-sm);
          border: 1px solid var(--onyx-color-base-neutral-300);
        }
      }
    }
  }

  &__copied {
    display: flex;
    text-align: center;
    color: var(--onyx-color-text-success-intense);
    font-size: 0.8125rem;
  }
}
</style>
