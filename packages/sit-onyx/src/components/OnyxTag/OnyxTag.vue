<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxTagProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  color: "neutral",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);
const tagClasses = computed(() => [
  "onyx-component",
  "onyx-tag",
  `onyx-tag--${props.color}`,
  { "onyx-tag--interactive": props.clickable },
  densityClass.value,
]);
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-tag-skeleton', densityClass]" />

  <OnyxTooltip
    v-else-if="props.clickable"
    :text="typeof props.clickable === 'object' ? props.clickable.label : props.clickable"
  >
    <template #default="{ trigger }">
      <button v-bind="trigger" :class="tagClasses" type="button">
        <OnyxIcon v-if="props.icon" :icon="props.icon" inline />
        <span class="onyx-text onyx-truncation-ellipsis">{{ props.label }}</span>
        <OnyxIcon
          v-if="typeof props.clickable === 'object' && props.clickable.actionIcon"
          :icon="props.clickable.actionIcon"
          inline
        />
      </button>
    </template>
  </OnyxTooltip>
  <div v-else :class="tagClasses">
    <OnyxIcon v-if="props.icon" :icon="props.icon" inline />
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

    $colors: primary, neutral, danger, warning, success, info;

    @each $color in $colors {
      &--#{$color} {
        @if $color == "neutral" {
          --onyx-tag-background-color: var(--onyx-color-base-background-blank);
        } @else {
          --onyx-tag-background-color: var(--onyx-color-base-#{$color}-100);
        }

        @if $color == "primary" {
          --onyx-tag-border-color: var(--onyx-color-component-border-primary);
        } @else {
          --onyx-tag-border-color: var(--onyx-color-base-#{$color}-400);
        }

        @if $color == "neutral" {
          // neutral does not have a bold color so we need to use medium here
          --onyx-tag-color: var(--onyx-color-text-icons-neutral-intense);
        } @else {
          --onyx-tag-color: var(--onyx-color-text-icons-#{$color}-bold);
        }

        --onyx-tag-hover-background-color: var(--onyx-color-base-#{$color}-200);
        @if $color == "info" {
          --onyx-tag-focus-color: var(--onyx-color-base-info-200);
        } @else {
          --onyx-tag-focus-color: var(--onyx-color-component-focus-#{$color});
        }
        --onyx-tag-focus-background-color: var(--onyx-color-base-#{$color}-200);
      }
    }
    &--interactive {
      cursor: pointer;
      &:hover {
        background-color: var(--onyx-tag-hover-background-color);
      }
      &:focus-visible {
        background-color: var(--onyx-tag-focus-background-color);
        outline: var(--onyx-outline-width) solid var(--onyx-tag-focus-color);
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
</style>
