<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTagProps } from "./types";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  color: "primary",
});
const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-tag', `onyx-tag--${props.color}`, densityClass]">
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
    <span class="onyx-tag__label onyx-text onyx-truncation-ellipsis">{{ props.label }}</span>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";

.onyx-tag {
  @include density.compact {
    --onyx-button-height: 2rem;
    --onyx-button-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-button-height: 2.5rem;
    --onyx-button-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-button-height: 3rem;
    --onyx-button-padding-vertical: var(--onyx-spacing-sm);
  }

  display: inline-flex;
  height: var(--onyx-button-height);
  max-width: 100%;
  align-items: center;
  box-sizing: border-box;
  color: var(--onyx-tag-text-color);
  font-family: var(--onyx-font-family);
  padding: var(--onyx-button-padding-vertical) var(--onyx-spacing-sm);
  border-radius: var(--onyx-radius-sm);
  border: var(--onyx-1px-in-rem) solid var(--onyx-tag-text-color);
  background-color: var(--onyx-tag-background-color);

  $colors: primary, secondary, neutral, danger, warning, success, info;

  @each $color in $colors {
    &--#{$color} {
      --onyx-tag-text-color: var(--onyx-color-base-#{$color}-800);
      --onyx-tag-background-color: var(--onyx-color-base-#{$color}-100);
    }
  }

  &__label {
    padding: 0 var(--onyx-spacing-4xs);
  }
}
</style>
