<script lang="ts" setup>
import type { OnyxIconProps } from "./types.js";

const props = defineProps<OnyxIconProps>();
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <figure
    :class="{
      'onyx-component': true,
      'onyx-icon': true,
      'onyx-icon--inline': props.inline,
      [`onyx-icon--${props.size}`]: props.size,
      [`onyx-icon--${props.color}`]: props.color,
    }"
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
    vertical-align: middle;

    & > svg {
      // display svg as block instead of default inline, to remove vertical alignment
      display: block;
      height: inherit;
    }

    &--inline {
      --icon-size: 1em;
    }

    @include sizes.define-rem-sizes using ($name, $size) {
      &--#{$name} {
        --icon-size: #{$size};
      }
    }

    //
    // icon colors:
    //
    $colors: primary, neutral, danger, warning, success, info;

    @each $color in $colors {
      &--#{$color} {
        --icon-color: var(--onyx-color-text-icons-#{$color}-intense);
      }
    }
  }
}
</style>
