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
  $sizes:
    2xs 0.75rem,
    xs 1rem,
    md 2rem,
    lg 3rem,
    xl 4rem,
    2xl 6rem;

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
      --icon-color: var(--onyx-color-icon-#{$color}-intense);
    }
  }
}
</style>
