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
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/sizes.scss";

.onyx-icon {
  @include layers.component() {
    --icon-size: 1.5rem;
    --icon-color: currentColor;

    display: inline-block;
    width: var(--icon-size);
    min-width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--icon-color);

    @include sizes.define-rem-sizes using ($name, $size) {
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
}
</style>
