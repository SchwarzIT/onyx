<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTagProps } from "./types";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  color: "default",
});

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-tag', `onyx-tag--${props.color}`, densityClass]">
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
    <span class="onyx-text onyx-truncation-ellipsis">{{ props.label }}</span>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-tag {
  @include layers.component() {
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-density-2xs);
    width: max-content;
    max-width: 100%;
    padding: var(--onyx-density-3xs) var(--onyx-density-xs);
    border-radius: var(--onyx-radius-xs);
    font-family: var(--onyx-font-family);

    color: var(--onyx-tag-color);
    border: var(--onyx-1px-in-rem) solid var(--onyx-tag-border-color);
    background-color: var(--onyx-tag-background-color);

    $colors: primary, secondary, neutral, danger, warning, success, info;

    @each $color in $colors {
      &--#{$color} {
        --onyx-tag-background-color: var(--onyx-color-base-#{$color}-200);
        @if $color == "primary" {
          --onyx-tag-border-color: var(--onyx-color-component-border-#{$color});
        } @else {
          --onyx-tag-border-color: var(--onyx-color-base-#{$color}-600);
        }
        @if $color == "neutral" {
          // neutral does not have a bold color so we need to use medium here
          --onyx-tag-color: var(--onyx-color-text-icons-neutral-medium);
        } @else {
          --onyx-tag-color: var(--onyx-color-text-icons-#{$color}-bold);
        }
      }
    }
  }
}
</style>
