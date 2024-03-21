<script lang="ts" setup>
import type { OnyxIconProps } from "./types";

const props = withDefaults(defineProps<OnyxIconProps>(), {
  size: "24px",
  color: "currentColor",
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <figure
    class="onyx-icon"
    :class="[
      props.size !== '24px' ? `onyx-icon--${props.size}` : '',
      props.color !== 'currentColor' ? `onyx-icon--${props.color}` : '',
    ]"
    aria-hidden="true"
    v-html="props.icon"
  ></figure>
  <!-- eslint-enable vue/no-v-html -->
</template>

<style lang="scss">
.onyx-icon {
  --icon-size: 1.5rem;
  --icon-color: currentColor;

  display: inline-block;
  width: var(--icon-size);
  min-width: var(--icon-size);
  height: var(--icon-size);
  fill: var(--icon-color);

  :where(&) {
    margin: 0;
  }

  //
  // icon sizes:
  //
  $sizes:
    12px 0.75rem,
    16px 1rem,
    24px 1.5rem,
    32px 2rem,
    48px 3rem,
    64px 4rem,
    96px 6rem;

  @each $name, $size in $sizes {
    &--#{$name} {
      --icon-size: #{$size};
    }
  }

  //
  // icon colors:
  //
  $colors: primary, secondary, neutral, danger, warning, success, info;

  @each $color in $colors {
    &--#{$color} {
      --icon-color: var(--onyx-color-text-icons-#{$color}-intense);
    }
  }
}
</style>
