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

  display: block;
  font-style: normal; // reset styles for <i>
  width: var(--icon-size);
  height: var(--icon-size);
  fill: currentColor;

  //
  // icon sizes:
  //
  &--2xs {
    --icon-size: 12px;
  }

  &--xs {
    --icon-size: 16px;
  }

  &--md {
    --icon-size: 32px;
  }

  &--lg {
    --icon-size: 48px;
  }

  &--xl {
    --icon-size: 64px;
  }

  &--2xl {
    --icon-size: 96px;
  }

  //
  // icon colors:
  //
  &--primary {
    fill: var(--onyx-color-icon-primary-intense);
  }

  &--secondary {
    fill: var(--onyx-color-icon-secondary-intense);
  }

  &--neutral {
    fill: var(--onyx-color-icon-neutral-intense);
  }

  &--danger {
    fill: var(--onyx-color-icon-danger-intense);
  }

  &--warning {
    fill: var(--onyx-color-icon-warning-intense);
  }

  &--success {
    fill: var(--onyx-color-icon-success-intense);
  }

  &--info {
    fill: var(--onyx-color-icon-info-intense);
  }
}
</style>
