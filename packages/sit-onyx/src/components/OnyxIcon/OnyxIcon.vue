<script lang="ts" setup>
import type { OnyxIconProps } from "./types";

const props = withDefaults(defineProps<OnyxIconProps>(), {
  size: "sm",
  color: "currentColor",
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <i
    class="onyx-icon"
    :class="[
      props.size !== 'sm' ? `onyx-icon--${props.size}` : '',
      props.color !== 'currentColor' ? `onyx-icon--${props.color}` : '',
    ]"
    aria-hidden="true"
    v-html="props.icon"
  ></i>
  <!-- eslint-enable vue/no-v-html -->
</template>

<style lang="scss">
.onyx-icon {
  --icon-size: 24px;
  --icon-color: currentColor;

  display: inline-block;
  font-style: normal; // reset styles for <i>
  width: var(--icon-size);
  height: var(--icon-size);
  fill: var(--icon-color);

  //
  // icon sizes:
  //
  &--2xs {
    --icon-size: 0.75rem;
  }

  &--xs {
    --icon-size: 1rem;
  }

  &--md {
    --icon-size: 2rem;
  }

  &--lg {
    --icon-size: 3rem;
  }

  &--xl {
    --icon-size: 4rem;
  }

  &--2xl {
    --icon-size: 6rem;
  }

  //
  // icon colors:
  //
  &--primary {
    --icon-color: var(--onyx-color-icon-primary-intense);
  }

  &--secondary {
    --icon-color: var(--onyx-color-icon-secondary-intense);
  }

  &--neutral {
    --icon-color: var(--onyx-color-icon-neutral-intense);
  }

  &--danger {
    --icon-color: var(--onyx-color-icon-danger-intense);
  }

  &--warning {
    --icon-color: var(--onyx-color-icon-warning-intense);
  }

  &--success {
    --icon-color: var(--onyx-color-icon-success-intense);
  }

  &--info {
    --icon-color: var(--onyx-color-icon-info-intense);
  }
}
</style>
