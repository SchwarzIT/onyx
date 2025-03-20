<script lang="ts" setup>
import { useAttrs } from "vue";
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxTagProps } from "./types";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  color: "neutral",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);

const attrs = useAttrs();
const isInteractive = Object.keys(attrs).some((key) => key.startsWith("on"));
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-tag-skeleton', densityClass]" />

  <component
    :is="isInteractive ? 'button' : 'div'"
    v-else
    :class="['onyx-component', 'onyx-tag', `onyx-tag--${props.color}`, densityClass]"
  >
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
    <span class="onyx-text onyx-truncation-ellipsis">{{ props.label }}</span>
    <OnyxIcon v-if="props.interactiveIcon" :icon="props.interactiveIcon" size="16px" />
  </component>
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

    $colors: primary, neutral, danger, warning, success, info, filter;

    @each $color in $colors {
      &--#{$color} {
        @if $color == "neutral" {
          --onyx-tag-background-color: var(--onyx-color-base-background-blank);
        } @else if $color == "filter" {
          --onyx-tag-background-color: var(--onyx-color-base-neutral-600);
        } @else {
          --onyx-tag-background-color: var(--onyx-color-base-#{$color}-100);
        }

        @if $color == "primary" {
          --onyx-tag-border-color: var(--onyx-color-component-border-primary);
        } @else if $color == "neutral" or $color == "success" {
          --onyx-tag-border-color: var(--onyx-color-base-#{$color}-500);
        } @else if $color == "filter" {
          border: none;
        } @else {
          --onyx-tag-border-color: var(--onyx-color-base-#{$color}-600);
        }

        @if $color == "neutral" {
          // neutral does not have a bold color so we need to use medium here
          --onyx-tag-color: var(--onyx-color-text-icons-neutral-medium);
        } @else if $color == "filter" {
          --onyx-tag-color: var(--onyx-color-text-icons-neutral-inverted);
        } @else {
          --onyx-tag-color: var(--onyx-color-text-icons-#{$color}-bold);
        }
      }
    }
  }
  &-skeleton {
    width: var(--onyx-density-2xl);
    height: calc(1.5rem + 2 * var(--onyx-density-3xs));
    display: inline-block;
    vertical-align: middle;
  }
}
button.onyx-tag {
  cursor: pointer;
  &:hover {
    background-color: var(--onyx-tag-hover-background-color);
  }
  &:focus-visible {
    background-color: var(--onyx-tag-focus-background-color);
    outline: var(--onyx-outline-width) solid var(--onyx-tag-focus-color);
  }

  $colors: primary, neutral, danger, warning, success, info, filter;

  @each $color in $colors {
    &--#{$color} {
      @if $color == "filter" {
        --onyx-tag-hover-background-color: var(--onyx-color-base-neutral-900);
      } @else {
        --onyx-tag-hover-background-color: var(--onyx-color-base-#{$color}-200);
      }

      @if $color == "info" {
        --onyx-tag-focus-color: var(--onyx-color-base-info-200);
      } @else if $color == "filter" {
        --onyx-tag-focus-color: var(--onyx-color-component-focus-neutral);
      } @else {
        --onyx-tag-focus-color: var(--onyx-color-component-focus-#{$color});
      }

      @if $color == "filter" {
        --onyx-tag-focus-background-color: var(--onyx-color-base-neutral-600);
      } @else {
        --onyx-tag-focus-background-color: var(--onyx-color-base-#{$color}-200);
      }
    }
  }
}
</style>
